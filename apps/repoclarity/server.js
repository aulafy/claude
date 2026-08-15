import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "public");
const base = __dirname;
const port = Number(process.env.PORT || 4177);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function runMcp(tool, payload) {
  const bin = path.join(base, "bin/codebase-memory-mcp");
  if (!existsSync(bin)) {
    return {
      error: "Code search backend is not bundled in the public demo. Install codebase-memory-mcp locally to enable /api/search.",
      results: [],
    };
  }
  const env = { ...process.env, CBM_CACHE_DIR: path.join(base, "cache") };
  const raw = execFileSync(bin, ["cli", tool, JSON.stringify(payload)], { env, encoding: "utf8", maxBuffer: 12 * 1024 * 1024 });
  const jsonLine = raw.trim().split(/\r?\n/).findLast((line) => line.trim().startsWith("{"));
  return JSON.parse(jsonLine || "{}");
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);

  if (url.pathname === "/api/search") {
    try {
      const project = url.searchParams.get("project");
      const pattern = url.searchParams.get("q");
      if (!project || !pattern) return sendJson(res, 400, { error: "project and q are required" });
      return sendJson(res, 200, runMcp("search_code", { project, pattern, limit: 25 }));
    } catch (error) {
      return sendJson(res, 500, { error: String(error.message || error) });
    }
  }

  const staticRoot = url.pathname.startsWith("/reports/")
    ? path.join(base, "reports")
    : url.pathname.startsWith("/inventory/")
      ? path.join(base, "inventory")
      : root;
  const staticPath = url.pathname.startsWith("/reports/")
    ? url.pathname.replace("/reports/", "/")
    : url.pathname.startsWith("/inventory/")
      ? url.pathname.replace("/inventory/", "/")
      : url.pathname;

  let filePath = path.normalize(path.join(staticRoot, staticPath === "/" ? "index.html" : staticPath));
  if (!filePath.startsWith(staticRoot) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = path.join(root, "index.html");
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { "content-type": contentTypes[ext] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`RepoClarity running at http://127.0.0.1:${port}`);
});
