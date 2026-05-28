import fs from "node:fs";
import path from "node:path";

const FIELD_NOTE_ORDER = [
  "post/layers-and-slices",
  "post/how-topogram-manages-sdlc",
];

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) return {};

  const end = content.indexOf("\n---", 4);
  if (end === -1) return {};

  const metadata = {};
  const frontmatter = content.slice(4, end);
  for (const line of frontmatter.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.+?)\s*$/);
    if (!match) continue;
    metadata[match[1]] = parseScalar(match[2]);
  }
  return metadata;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

function firstMarkdownHeading(content) {
  return content.match(/^#\s+(.+?)\s*$/m)?.[1];
}

function firstBlockquote(content) {
  return content.match(/^>\s+(.+?)\s*$/m)?.[1];
}

function slugFromFile(docsRoot, filePath) {
  return path
    .relative(docsRoot, filePath)
    .split(path.sep)
    .join("/")
    .replace(/\.mdx?$/i, "");
}

function fieldNoteFromFile(docsRoot, filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const metadata = parseFrontmatter(content);
  const slug = slugFromFile(docsRoot, filePath);
  const title =
    metadata.title ?? firstMarkdownHeading(content) ?? path.basename(slug);

  return {
    slug,
    href: `/${slug}/`,
    title,
    draft: metadata.draft,
    description: metadata.description ?? firstBlockquote(content) ?? "",
  };
}

function sortFieldNotes(notes) {
  return [...notes].sort((left, right) => {
    const leftOrder = FIELD_NOTE_ORDER.indexOf(left.slug);
    const rightOrder = FIELD_NOTE_ORDER.indexOf(right.slug);
    const leftRank = leftOrder === -1 ? Number.MAX_SAFE_INTEGER : leftOrder;
    const rightRank = rightOrder === -1 ? Number.MAX_SAFE_INTEGER : rightOrder;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return left.title.localeCompare(right.title);
  });
}

export function discoverFieldNotes(docsRoot) {
  const postDir = path.join(docsRoot, "post");
  if (!fs.existsSync(postDir)) return [];

  const notes = fs
    .readdirSync(postDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => /^index\.mdx?$/i.test(entry.name) === false)
    .filter((entry) => /\.mdx?$/i.test(entry.name))
    .map((entry) => fieldNoteFromFile(docsRoot, path.join(postDir, entry.name)))
    .filter((note) => note.draft !== "true");

  return sortFieldNotes(notes);
}

export function fieldNoteSidebarItems(docsRoot) {
  return [
    { label: "All field notes", slug: "post" },
    ...discoverFieldNotes(docsRoot).map(({ title, slug }) => ({
      label: title,
      slug,
    })),
  ];
}
