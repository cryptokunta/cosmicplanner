import Database from 'better-sqlite3';
import { monthlyCorrespondences, moonPhases, celestialEvents } from '../data/cosmicData';

const db = new Database('cosmic_journal.db');

// Create tables
db.exec(`
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

  CREATE TABLE IF NOT EXISTS moon_phases (
    date TEXT PRIMARY KEY,
    phase TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS celestial_events (
    date TEXT PRIMARY KEY,
    event TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    content TEXT NOT NULL,
    mood TEXT,
    practices TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Prepare insert statements
const insertMonthlyCorr = db.prepare(`
  INSERT OR REPLACE INTO monthly_correspondences (
    month, zodiac, element_house, crystals, colors, trees, flowers, animals,
    herbs_oils, deities, tarot, numerology, themes_energies, festivals,
    practices, affirmations, mantra, planetary_movements, lunar_phases
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMoonPhase = db.prepare(`
  INSERT OR REPLACE INTO moon_phases (date, phase) VALUES (?, ?)
`);

const insertCelestialEvent = db.prepare(`
  INSERT OR REPLACE INTO celestial_events (date, event) VALUES (?, ?)
`);

// Insert data
db.transaction(() => {
  // Insert monthly correspondences
  Object.entries(monthlyCorrespondences).forEach(([month, data]) => {
    insertMonthlyCorr.run(
      month,
      data.Zodiac,
      data["Element & House"],
      data.Crystals,
      data.Colors,
      data.Trees,
      data.Flowers,
      data.Animals,
      data["Herbs & Oils"],
      data.Deities,
      data.Tarot,
      data.Numerology,
      data["Themes & Energies"],
      data.Festivals,
      data["Historical & Cultural Practices"],
      data.Affirmations,
      data.Mantra,
      data["Planetary Movements"],
      data["Lunar Phases & Reflections"]
    );
  });

  // Insert moon phases
  moonPhases.forEach(({ date, phase }) => {
    insertMoonPhase.run(date, phase);
  });

  // Insert celestial events
  celestialEvents.forEach(({ date, event }) => {
    insertCelestialEvent.run(date, event);
  });
})();

console.log('Database setup completed successfully!');