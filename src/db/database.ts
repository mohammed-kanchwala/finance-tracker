import Database from 'better-sqlite3';

const db = new Database('finance_tracker.db');

// Initialize the database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,
    amount REAL,
    category TEXT,
    account TEXT,
    date TEXT,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

export default db;