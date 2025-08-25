// server/helpers/persist_module.js
const fs = require('fs');
const path = require('path');

function resolveDataPath(file) {
  // If caller passed an absolute path, keep it; otherwise, resolve under /server/data
  return path.isAbsolute(file) ? file : path.join(__dirname, '..', 'data', file);
}

function loadJSON(file) {
  const p = resolveDataPath(file);
  try {
    if (!fs.existsSync(p)) return [];                 // first run: no file yet
    const txt = fs.readFileSync(p, 'utf8');
    return txt.trim() ? JSON.parse(txt) : [];
  } catch (err) {
    console.error(`❌ Failed to read ${p}:`, err);
    return [];
  }
}

function saveJSON(file, data) {
  const p = resolveDataPath(file);
  try {
    fs.mkdirSync(path.dirname(p), { recursive: true }); // ensure folder exists
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`❌ Failed to write ${p}:`, err);
  }
}

module.exports = { loadJSON, saveJSON };
