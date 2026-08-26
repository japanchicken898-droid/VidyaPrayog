// server/db.js — SQLite schema initializer (CommonJS)
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'vidyaprayog.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      reg_no TEXT UNIQUE,
      department TEXT,
      year INTEGER DEFAULT 2,
      college TEXT,
      match_score REAL DEFAULT 0,
      badges_count INTEGER DEFAULT 0,
      streak_days INTEGER DEFAULT 0,
      roadmap_steps_done INTEGER DEFAULT 0,
      roadmap_steps_total INTEGER DEFAULT 8,
      active_applications INTEGER DEFAULT 0,
      avatar_url TEXT,
      banner_url TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      portfolio_url TEXT,
      headline TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS skill_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      category TEXT NOT NULL,
      label TEXT NOT NULL,
      score REAL NOT NULL DEFAULT 0,
      color TEXT DEFAULT 'bg-emerald-500',
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS assessment_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      sub_domain TEXT,
      difficulty TEXT DEFAULT 'medium',
      question_type TEXT DEFAULT 'mcq',
      prompt TEXT NOT NULL,
      options_json TEXT,
      correct_option INTEGER,
      starter_code_json TEXT,
      test_cases_json TEXT,
      explanation TEXT,
      tags TEXT
    );

    CREATE TABLE IF NOT EXISTS assessment_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      assessment_title TEXT NOT NULL,
      category TEXT NOT NULL,
      score_percentage REAL NOT NULL,
      correct_count INTEGER,
      total_count INTEGER,
      badge_tier TEXT,
      metrics_json TEXT,
      submitted_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS industry_postings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      logo_emoji TEXT DEFAULT '🏢',
      title TEXT NOT NULL,
      role_type TEXT NOT NULL,
      location TEXT DEFAULT 'Remote / Hybrid',
      duration TEXT,
      match_threshold INTEGER DEFAULT 70,
      stipend TEXT,
      skills_required TEXT,
      status TEXT DEFAULT 'Open',
      deadline TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

module.exports = { getDb };
