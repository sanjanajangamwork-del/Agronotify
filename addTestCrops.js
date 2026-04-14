const sqlite3 = require('sqlite3').verbose();

// Open your existing database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Insert sample crop data
const crops = [
  ['Wheat', 'Gujarat', 'Ahmedabad', 'Market 1', 1800, 2000, 1900],
  ['Rice', 'Punjab', 'Amritsar', 'Market 2', 2500, 2700, 2600],
  ['Onion', 'Maharashtra', 'Pune', 'Market 3', 1200, 1500, 1350],
];

const stmt = db.prepare(`INSERT INTO crops (crop, state, city, market, minPrice, maxPrice, avgPrice)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`);

crops.forEach(item => stmt.run(item));
stmt.finalize(() => {
  console.log('Test data inserted.');
  db.close();
});