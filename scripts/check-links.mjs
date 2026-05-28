#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const skipPattern =
  "mailto:|https://topogram.dev|github.com/attebury/topogram/(edit|blob)/";

if (!fs.existsSync(distDir)) {
  console.error("Missing dist/. Run npm run build before npm run check:links.");
  process.exit(1);
}

function contentType(filePath) {
  const ext = path.extname(filePath);
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".txt") return "text/plain; charset=utf-8";
  if (ext === ".xml") return "application/xml; charset=utf-8";
  return "application/octet-stream";
}

function resolveRequest(url) {
  const requestPath = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const normalized = path.normalize(requestPath).replace(/^(\.\.(\/|\\|$))+/, "");
  let target = path.join(distDir, normalized);
  if (target.endsWith(path.sep)) {
    target = path.join(target, "index.html");
  } else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }
  return target;
}

const server = http.createServer((req, res) => {
  const target = resolveRequest(req.url ?? "/");
  const relative = path.relative(distDir, target);
  if (relative.startsWith("..") || path.isAbsolute(relative) || !fs.existsSync(target)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "content-type": contentType(target) });
  fs.createReadStream(target).pipe(res);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;

const linkinatorBin = path.join(root, "node_modules", ".bin", "linkinator");
const child = spawn(
  linkinatorBin,
  [origin, "--recurse", "--skip", skipPattern],
  {
    cwd: root,
    stdio: "inherit",
  },
);

const exitCode = await new Promise((resolve) => {
  child.on("exit", (code) => resolve(code ?? 1));
});

await new Promise((resolve) => server.close(resolve));
process.exit(exitCode);
