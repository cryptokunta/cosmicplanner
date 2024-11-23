-- Monthly Correspondences Table
CREATE TABLE IF NOT EXISTS monthly_correspondences (
  month TEXT PRIMARY KEY,
  zodiac TEXT,
  element_house TEXT,
  crystals TEXT,
  colors TEXT,
  trees TEXT,
  flowers TEXT,
  animals TEXT,
  herbs_oils TEXT,
  deities TEXT,
  tarot TEXT,
  numerology TEXT,
  themes_energies TEXT,
  festivals TEXT,
  practices TEXT,
  affirmations TEXT,
  mantra TEXT,
  planetary_movements TEXT,
  lunar_phases TEXT
);

-- Celestial Events Table
CREATE TABLE IF NOT EXISTS celestial_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  event TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT
);

-- Moon Phases Table
CREATE TABLE IF NOT EXISTS moon_phases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  phase TEXT NOT NULL,
  symbol TEXT NOT NULL,
  ritual TEXT
);

-- Planetary Hours Table
CREATE TABLE IF NOT EXISTS planetary_hours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  planet TEXT NOT NULL,
  symbol TEXT NOT NULL,
  day TEXT NOT NULL,
  hour INTEGER NOT NULL,
  influence TEXT,
  recommended TEXT,
  avoid TEXT
);

-- Journal Entries Table
CREATE TABLE IF NOT EXISTS journal_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  practices TEXT,
  celestial_alignments TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Daily Practices Table
CREATE TABLE IF NOT EXISTS daily_practices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  practice_type TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT
);