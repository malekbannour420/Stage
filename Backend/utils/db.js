const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function ensureFile(name) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const file = filePath(name);
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf-8");
}

function readData(name) {
  ensureFile(name);
  const raw = fs.readFileSync(filePath(name), "utf-8");
  return JSON.parse(raw || "[]");
}

function writeData(name, data) {
  ensureFile(name);
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readData, writeData };
