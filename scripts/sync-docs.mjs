#!/usr/bin/env node
/**
 * Public docs and posts are disabled while the website redirects to attebury.dev.
 * Keep only the homepage redirect and remove any reintroduced docs or posts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docsOut = path.join(root, "src", "content", "docs");
const keep = new Set(["index.mdx"]);

if (fs.existsSync(docsOut)) {
  for (const entry of fs.readdirSync(docsOut, { withFileTypes: true })) {
    if (keep.has(entry.name)) continue;
    fs.rmSync(path.join(docsOut, entry.name), { recursive: true, force: true });
  }
}

console.log("Docs sync skipped: public site redirects to attebury.dev.");
