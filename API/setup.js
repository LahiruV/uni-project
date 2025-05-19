const db = require('./models/db');

const setup = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS inquiries;
-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  isAdmin INTEGER DEFAULT 0,
  email TEXT UNIQUE,
  name TEXT
);

-- FEEDBACK
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK(type IN ('feedback', 'bug', 'feature', 'other')) NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- INQUIRIES
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  program TEXT NOT NULL,
  startDate TEXT NOT NULL,
  priority TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK(status IN ('pending', 'completed')) DEFAULT 'pending',
  createdAt TEXT NOT NULL,
  completedAt TEXT,
  completedBy TEXT,
  userId TEXT NOT NULL
);
`;

db.exec(setup, (err) => {
  if (err) console.error("Setup error:", err.message);
  else console.log("Database tables created successfully");
});