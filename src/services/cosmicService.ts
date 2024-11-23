import Database from 'better-sqlite3';
import { monthlyCorrespondences, celestialEvents, planetaryCorrespondences } from '../data/cosmicData';

const db = new Database('cosmic_journal.db');

export interface MonthlyCorrespondence {
  month: string;
  zodiac: string;
  element_house: string;
  crystals: string[];
  colors: string[];
  themes_energies: string[];
  affirmations: string;
  mantra: string;
  lunar_phases: Record<string, string>;
  planetary_movements: Record<string, string>;
}

export interface CelestialEvent {
  date: string;
  event: string;
  type: string;
  description: string;
}

export interface JournalEntry {
  id: number;
  date: string;
  content: string;
  mood?: string;
  practices?: string[];
  celestial_alignments?: string[];
  created_at: string;
}

export const cosmicService = {
  initializeDatabase() {
    // Read and execute schema.sql
    const schema = require('fs').readFileSync('./src/db/schema.sql', 'utf8');
    db.exec(schema);

    // Insert initial data
    const insertMonthlyCorr = db.prepare(`
      INSERT OR REPLACE INTO monthly_correspondences (
        month, zodiac, element_house, crystals, colors, themes_energies,
        affirmations, mantra, lunar_phases, planetary_movements
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertCelestialEvent = db.prepare(`
      INSERT OR REPLACE INTO celestial_events (date, event, type, description)
      VALUES (?, ?, ?, ?)
    `);

    const insertPlanetaryHour = db.prepare(`
      INSERT OR REPLACE INTO planetary_hours (
        planet, symbol, day, hour, influence, recommended, avoid
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    db.transaction(() => {
      // Insert monthly correspondences
      Object.entries(monthlyCorrespondences).forEach(([month, data]) => {
        insertMonthlyCorr.run(
          month,
          data.Zodiac,
          data["Element & House"],
          JSON.stringify(data.Crystals),
          JSON.stringify(data.Colors),
          JSON.stringify(data["Themes & Energies"]),
          data.Affirmations,
          data.Mantra,
          JSON.stringify(data.Lunar_Phases),
          JSON.stringify(data.Planetary_Movements)
        );
      });

      // Insert celestial events
      celestialEvents.forEach((event) => {
        insertCelestialEvent.run(
          event.date,
          event.event,
          event.type,
          event.description
        );
      });

      // Insert planetary hours
      planetaryCorrespondences.forEach((planet) => {
        insertPlanetaryHour.run(
          planet.planet,
          planet.symbol,
          planet.day,
          planet.hour,
          planet.influence,
          JSON.stringify(planet.recommended),
          JSON.stringify(planet.avoid)
        );
      });
    })();
  },

  getMonthlyCorrespondences(month: string): MonthlyCorrespondence {
    const result = db.prepare(
      'SELECT * FROM monthly_correspondences WHERE month = ?'
    ).get(month);

    if (result) {
      return {
        ...result,
        crystals: JSON.parse(result.crystals),
        colors: JSON.parse(result.colors),
        themes_energies: JSON.parse(result.themes_energies),
        lunar_phases: JSON.parse(result.lunar_phases),
        planetary_movements: JSON.parse(result.planetary_movements)
      };
    }
    return null;
  },

  getCelestialEvents(date: string): CelestialEvent[] {
    return db.prepare(
      'SELECT * FROM celestial_events WHERE date = ?'
    ).all(date);
  },

  getPlanetaryHour(date: Date): any {
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    return db.prepare(`
      SELECT * FROM planetary_hours 
      WHERE day = ? AND hour = ?
    `).get(
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek],
      ((hour + (dayOfWeek * 24)) % 7) + 1
    );
  },

  saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'created_at'>): number {
    const stmt = db.prepare(`
      INSERT INTO journal_entries (
        date, content, mood, practices, celestial_alignments
      ) VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      entry.date,
      entry.content,
      entry.mood,
      JSON.stringify(entry.practices),
      JSON.stringify(entry.celestial_alignments)
    );
    return result.lastInsertRowid as number;
  },

  saveDailyPractice(date: string, practiceType: string, completed: boolean, notes?: string) {
    const stmt = db.prepare(`
      INSERT INTO daily_practices (date, practice_type, completed, notes)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(date, practiceType, completed ? 1 : 0, notes);
  },

  getDailyPractices(date: string) {
    return db.prepare(
      'SELECT * FROM daily_practices WHERE date = ?'
    ).all(date);
  }
};