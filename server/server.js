// Tiny dependency-free Node.js server: serves the site and saves newsletter emails to data/subscribers.txt.
// Run from the project root:  node server/server.js   then open http://localhost:3000
const http = require("http"), fs = require("fs"), path = require("path");

const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "data", "subscribers.txt");
const PORT = process.env.PORT || 3000;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".ico": "image/x-icon" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function send(res, code, body, type) {
  res.writeHead(code, { "Content-Type": type || "application/json; charset=utf-8" });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

function subscribe(req, res) {
  let raw = "";
  req.on("data", chunk => { raw += chunk; if (raw.length > 2048) req.destroy(); });
  req.on("end", () => {
    let email = "";
    try { email = String(JSON.parse(raw).email || "").trim().toLowerCase(); } catch (e) {}
    if (!EMAIL.test(email) || email.length > 254) return send(res, 400, { ok: false, error: "Invalid email address." });
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    const existing = fs.existsSync(FILE) ? fs.readFileSync(FILE, "utf8").split("\n").map(l => l.split("\t")[1]) : [];
    if (existing.includes(email)) return send(res, 200, { ok: true, status: "exists" });
    fs.appendFileSync(FILE, new Date().toISOString() + "\t" + email + "\n");
    send(res, 200, { ok: true, status: "added" });
  });
}

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  if (req.method === "POST" && url === "/subscribe") return subscribe(req, res);
  if (req.method !== "GET") return send(res, 405, { ok: false });
  const rel = path.normalize(url === "/" ? "index.html" : url).replace(/^([/\\])+/, "");
  const blocked = rel.startsWith("..") || /^(data|server)([/\\]|$)/.test(rel);   // never expose emails or server code
  const file = path.join(ROOT, rel);
  if (blocked || !TYPES[path.extname(file)] || !fs.existsSync(file)) return send(res, 404, "Not found", "text/plain");
  send(res, 200, fs.readFileSync(file), TYPES[path.extname(file)]);
}).listen(PORT, () => console.log("GrantCheck.kz running at http://localhost:" + PORT + "  (emails -> data/subscribers.txt)"));
