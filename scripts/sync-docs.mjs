#!/usr/bin/env node
/**
 * Sync docs/, llms.txt, and llms-full.txt from attebury/topogram.
 * Preserves site-local docs under src/content/docs/index.mdx and post/.
 */
import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const ref = process.env.TOPOGRAM_DOCS_REF ?? "main";
const repo = process.env.TOPOGRAM_DOCS_REPO ?? "attebury/topogram";
const cacheKey = crypto
  .createHash("sha1")
  .update(`${root}\0${repo}\0${ref}`)
  .digest("hex")
  .slice(0, 12);
const cacheDir =
  process.env.TOPOGRAM_DOCS_CACHE_DIR ??
  path.join(os.tmpdir(), "topogram-website-docs", cacheKey);
const docsOut = path.join(root, "src", "content", "docs");
const publicDir = path.join(root, "public");
const preservedHome = path.join(docsOut, "index.mdx");
const GITHUB_BLOB = `https://github.com/${repo}/blob/${ref}`;
const FIELD_NOTES_START = "<!-- topogram-website:field-notes:start -->";
const FIELD_NOTES_END = "<!-- topogram-website:field-notes:end -->";

const SITE_LOCAL_DOCS = new Set(["index.mdx", "post"]);
const SKIP_UPSTREAM_DOC_ENTRIES = new Set(["README.md", "post"]);

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", ...opts });
}

function copyDir(src, dest, { skip = SKIP_UPSTREAM_DOC_ENTRIES } = {}) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to, { skip: new Set() });
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

/** Starlight requires YAML title; upstream docs use # headings instead. */
function ensureStarlightFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  if (content.startsWith("---\n")) return;

  const titleMatch = content.match(/^#\s+(.+?)\s*$/m);
  const title = titleMatch?.[1] ?? path.basename(filePath, ".md");
  const descMatch = content.match(/^>\s+(.+?)\s*$/m);

  let frontmatter = `---\ntitle: ${JSON.stringify(title)}\n`;
  if (descMatch?.[1]) {
    frontmatter += `description: ${JSON.stringify(descMatch[1])}\n`;
  }
  frontmatter += "---\n\n";

  fs.writeFileSync(filePath, frontmatter + content, "utf8");
}

function walkMarkdownFiles(dir, visit, { rootDir = dir, skipDirs = new Set() } = {}) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const rel = path.relative(rootDir, full).split(path.sep).join("/");
      if (skipDirs.has(rel)) continue;
      walkMarkdownFiles(full, visit, { rootDir, skipDirs });
    } else if (entry.name.endsWith(".md")) {
      visit(full);
    }
  }
}

/** Rewrite upstream .md and repo-relative links for static site routing. */
function rewriteMarkdownLinks(filePath) {
  const relDir = path.dirname(path.relative(docsOut, filePath));
  const fromDir = relDir === "." ? "" : relDir;

  const content = fs.readFileSync(filePath, "utf8");
  const rewritten = content.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (match, text, rawUrl, titleAttr) => {
      const next = rewriteUrl(fromDir, rawUrl);
      if (next === rawUrl) return match;
      const title = titleAttr ? ` "${titleAttr}"` : "";
      return `[${text}](${next}${title})`;
    },
  );
  if (rewritten !== content) {
    fs.writeFileSync(filePath, rewritten, "utf8");
  }
}

/** Shiki does not ship a Topogram grammar; render .tg examples as plain text. */
function rewriteUnsupportedCodeFences(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const rewritten = content.replace(/^(\s*```)tg([ \t]*)$/gm, "$1text$2");
  if (rewritten !== content) {
    fs.writeFileSync(filePath, rewritten, "utf8");
  }
}

function resolveFromDocsRoot(fromDir, pathPart) {
  return path.posix
    .normalize(path.posix.join(`/${fromDir || ""}`, pathPart))
    .replace(/^\//, "");
}

function githubUrl(repoPath, hash = "") {
  const base = repoPath.includes(".")
    ? GITHUB_BLOB
    : GITHUB_BLOB.replace("/blob/", "/tree/");
  return `${base}/${repoPath}${hash}`;
}

function rewriteUrl(fromDir, rawUrl) {
  if (/^(https?:|mailto:|#)/.test(rawUrl)) return rawUrl;

  const hashIdx = rawUrl.indexOf("#");
  const pathPart = hashIdx >= 0 ? rawUrl.slice(0, hashIdx) : rawUrl;
  const hash = hashIdx >= 0 ? rawUrl.slice(hashIdx) : "";

  if (pathPart.startsWith("/") && !pathPart.includes("..")) {
    const site = pathPart.replace(/^\//, "").replace(/\.mdx?$/i, "");
    return `/${site}/${hash}`;
  }

  const normalized = resolveFromDocsRoot(fromDir, pathPart);

  if (normalized === "llms.txt" || normalized === "llms-full.txt") {
    return `/${normalized}${hash}`;
  }

  if (normalized === "README.md" || normalized === "docs/README.md") {
    return `/${hash}`;
  }

  const repoRoots =
    /^(engine|scripts|topo|\.topogram|NOTICE|LICENSE)(\/|$)|^(AGENTS|CONTRIBUTING)\.md$/;
  if (repoRoots.test(normalized) || /\.(js|json|tg)$/.test(normalized)) {
    return githubUrl(normalized, hash);
  }

  if (/\.mdx?$/i.test(normalized)) {
    const slug = normalized.replace(/\.mdx?$/i, "");
    return `/${slug}/${hash}`;
  }

  if (normalized.startsWith("docs/") && /\.mdx?$/i.test(normalized)) {
    const slug = normalized.slice(5).replace(/\.mdx?$/i, "");
    return `/${slug}/${hash}`;
  }

  return rawUrl;
}

function removeExcept(dir, keepNames) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (keepNames.has(entry.name)) continue;
    const target = path.join(dir, entry.name);
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function stripFieldNotesBlock(content) {
  const pattern = new RegExp(
    `\\n?${escapeRegExp(FIELD_NOTES_START)}[\\s\\S]*?${escapeRegExp(FIELD_NOTES_END)}\\n?`,
    "g",
  );
  return content.replace(pattern, "\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fieldNotesBlock(items) {
  const links = items
    .map(({ title, href, description }) => `- [${title}](${href}) — ${description}`)
    .join("\n");
  return `${FIELD_NOTES_START}

## Field Notes

${links}

${FIELD_NOTES_END}`;
}

function injectFieldNotesBlock(relativePath, items) {
  const target = path.join(docsOut, relativePath);
  if (!fs.existsSync(target)) return;
  const content = stripFieldNotesBlock(fs.readFileSync(target, "utf8"));
  fs.writeFileSync(target, `${content.trimEnd()}\n\n${fieldNotesBlock(items)}\n`, "utf8");
}

function applyFieldNotesIntegration() {
  injectFieldNotesBlock("concepts/sdlc.md", [
    {
      title: "How Topogram Manages SDLC",
      href: "/post/how-topogram-manages-sdlc/",
      description: "why work records, proof, and command-owned state live together.",
    },
  ]);
  injectFieldNotesBlock("agent-first-run.md", [
    {
      title: "How Topogram Manages SDLC",
      href: "/post/how-topogram-manages-sdlc/",
      description: "how agents should treat work state, proof, and CLI-owned mutations.",
    },
  ]);
}

console.log(`Syncing ${repo}@${ref} …`);

fs.mkdirSync(path.dirname(cacheDir), { recursive: true });
if (fs.existsSync(path.join(cacheDir, ".git"))) {
  run(`git -C "${cacheDir}" fetch --depth 1 origin ${ref}`, { cwd: root });
  run(`git -C "${cacheDir}" checkout FETCH_HEAD`, { cwd: root });
} else {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  run(
    `git clone --depth 1 --branch ${ref} "https://github.com/${repo}.git" "${cacheDir}"`,
    { cwd: root },
  );
}

const upstreamDocs = path.join(cacheDir, "docs");
if (!fs.existsSync(upstreamDocs)) {
  console.error(`Missing docs/ in ${repo}`);
  process.exit(1);
}

let savedHome = null;
if (fs.existsSync(preservedHome)) {
  savedHome = fs.readFileSync(preservedHome, "utf8");
}

fs.mkdirSync(docsOut, { recursive: true });
removeExcept(docsOut, SITE_LOCAL_DOCS);
copyDir(upstreamDocs, docsOut);

if (savedHome !== null) {
  fs.writeFileSync(preservedHome, savedHome, "utf8");
}

const siteLocalMarkdownDirs = new Set(["post"]);
walkMarkdownFiles(docsOut, ensureStarlightFrontmatter, {
  skipDirs: siteLocalMarkdownDirs,
});
walkMarkdownFiles(docsOut, rewriteMarkdownLinks, {
  skipDirs: siteLocalMarkdownDirs,
});
walkMarkdownFiles(docsOut, rewriteUnsupportedCodeFences, {
  skipDirs: siteLocalMarkdownDirs,
});
const syncedReadme = path.join(docsOut, "README.md");
if (fs.existsSync(syncedReadme)) {
  fs.rmSync(syncedReadme);
}
applyFieldNotesIntegration();

fs.mkdirSync(publicDir, { recursive: true });
for (const rag of ["llms.txt", "llms-full.txt"]) {
  const src = path.join(cacheDir, rag);
  if (!fs.existsSync(src)) {
    console.warn(`Warning: ${rag} not found in ${repo}@${ref}`);
    continue;
  }
  fs.copyFileSync(src, path.join(publicDir, rag));
}

console.log("Docs sync complete.");
