const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = __dirname;
const DOMAIN = "https://www.lionparcel-bandung.com";

function getLastModified(filePath) {
  try {
    return execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", filePath],
      { encoding: "utf8" }
    ).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const urls = [];

// ==========================
// HOMEPAGE
// ==========================
urls.push({
  loc: `${DOMAIN}/`,
  lastmod: getLastModified("index.html"),
  priority: "1.0"
});

// ==========================
// HALAMAN ARTIKEL
// ==========================
urls.push({
  loc: `${DOMAIN}/artikel/`,
  lastmod: getLastModified("artikel/index.html"),
  priority: "0.9"
});

// ==========================
// SEMUA ARTIKEL HTML
// ==========================
const artikelFolder = path.join(ROOT, "artikel");

if (fs.existsSync(artikelFolder)) {
  const files = fs.readdirSync(artikelFolder)
    .filter(file =>
      file.endsWith(".html") &&
      file !== "index.html" &&
      file !== "template.html"
    )
    .sort();

  files.forEach(file => {
    urls.push({
      loc: `${DOMAIN}/artikel/${file}`,
      lastmod: getLastModified(`artikel/${file}`),
      priority: "0.8"
    });
  });
}

// ==========================
// HALAMAN VIDEO
// ==========================
urls.push({
  loc: `${DOMAIN}/video/`,
  lastmod: getLastModified("video/index.html"),
  priority: "0.8"
});

// ==========================
// BUAT XML
// ==========================
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

urls.forEach(item => {
  xml += `  <url>\n`;
  xml += `    <loc>${escapeXml(item.loc)}</loc>\n`;
  xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
  xml += `    <priority>${item.priority}</priority>\n`;
  xml += `  </url>\n\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  xml,
  "utf8"
);

console.log(`Sitemap berhasil dibuat: ${urls.length} URL`);
