const fs = require('fs');
const path = require('path');

function loadJSON(file) {
  try {
    const dataPath = path.join(__dirname, '../data', file);
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`❌ Failed to read ${file}:`, err);
    return [];
  }
}

function saveJSON(file, data) {
  try {
    const dataPath = path.join(__dirname, '../data', file);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`❌ Failed to write ${file}:`, err);
  }
}

module.exports = {
  loadJSON,
  saveJSON
};
