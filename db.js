const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to database", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      crop TEXT NOT NULL,
      state TEXT NOT NULL,
      market TEXT NOT NULL,
      target_price INTEGER NOT NULL,
      condition TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error("Error creating alerts table:", err.message);
    } else {
      console.log("Alerts table ready.");
    }
  });

});
db.configure("busyTimeout", 5000);
 
module.exports = db;