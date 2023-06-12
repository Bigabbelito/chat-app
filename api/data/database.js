const path = require('path');
const { fileURLToPath } = require('url');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/adapters');

function getDb() {
  // Skapa sökväg till databasen
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(__dirname, 'db.json');
  const adapter = new JSONFile(file);
  const db = new Low(adapter);
  // {} är default data
  return db;
}

module.exports = { getDb };
