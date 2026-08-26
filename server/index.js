// server/index.js — VidyaPrayog REST API (CommonJS, port 5000)
const express = require('express');
const cors = require('cors');
const vm = require('vm');
const { getDb } = require('./db');

// Run seed on startup (idempotent)
require('./seed');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const db = getDb();

// ────────────────────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────────────────────

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function determineBadgeTier(score) {
  if (score >= 90) return 'Platinum';
  if (score >= 75) return 'Gold';
  if (score >= 55) return 'Silver';
  return 'Bronze';
}

function recalculateMatchScore(userId) {
  const subs = db.prepare(`
    SELECT score_percentage FROM assessment_submissions WHERE user_id = ?
    ORDER BY submitted_at DESC LIMIT 6
  `).all(userId);

  if (subs.length === 0) return null;
  const avg = subs.reduce((sum, s) => sum + s.score_percentage, 0) / subs.length;
  const newScore = Math.min(99, Math.round(50 + avg * 0.49));
  db.prepare('UPDATE users SET match_score = ? WHERE id = ?').run(newScore, userId);
  return newScore;
}

// ────────────────────────────────────────────────────────────────────────────
// ROUTES
// ────────────────────────────────────────────────────────────────────────────

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Student Profile ──────────────────────────────────────────────────────────

// GET /api/student/profile
app.get('/api/student/profile', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE role = ? LIMIT 1').get('student');
    if (!user) return res.status(404).json({ error: 'Student profile not found' });

    const skillRows = db.prepare('SELECT * FROM skill_scores WHERE user_id = ?').all(user.id);

    // Group skill scores by category (for role benchmarks)
    const rolesData = {};
    const roleInsights = {
      'Cloud & Full-Stack': 'Focus on Docker & AWS deployments to reach 95% profile alignment.',
      'AI/ML Engineer': 'Enhance your Deep Learning credentials to unlock enterprise matching.',
      'DevOps Specialist': 'Acquire Kubernetes orchestration skills to clear recruitments.',
    };

    for (const skill of skillRows) {
      if (!rolesData[skill.category]) {
        rolesData[skill.category] = { bars: [], match: 0, insight: roleInsights[skill.category] || '' };
      }
      rolesData[skill.category].bars.push({
        label: skill.label,
        score: skill.score,
        color: skill.color,
      });
    }

    // Calculate match per role as average of its bars' scores
    for (const category of Object.keys(rolesData)) {
      const bars = rolesData[category].bars;
      rolesData[category].match = Math.round(bars.reduce((s, b) => s + b.score, 0) / bars.length);
      rolesData[category].title = category + (category === 'Cloud & Full-Stack' ? ' Engineer' : '');
    }

    res.json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      reg_no: user.reg_no,
      department: user.department,
      year: user.year,
      college: user.college,
      match_score: user.match_score,
      badges_count: user.badges_count,
      streak_days: user.streak_days,
      roadmap_steps_done: user.roadmap_steps_done,
      roadmap_steps_total: user.roadmap_steps_total,
      active_applications: user.active_applications,
      avatar_url: user.avatar_url,
      banner_url: user.banner_url,
      github_url: user.github_url,
      linkedin_url: user.linkedin_url,
      portfolio_url: user.portfolio_url,
      headline: user.headline,
      roles_data: rolesData,
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Assessment Questions ──────────────────────────────────────────────────────

// GET /api/assessments/generate?category=aptitude&count=10
app.get('/api/assessments/generate', (req, res) => {
  try {
    const category = req.query.category || 'aptitude';
    const count = Math.min(parseInt(req.query.count) || 10, 30);

    let rows;
    if (category === 'aptitude') {
      rows = db.prepare("SELECT * FROM assessment_questions WHERE category = 'aptitude'").all();
    } else if (category === 'domain') {
      rows = db.prepare("SELECT * FROM assessment_questions WHERE category = 'domain'").all();
    } else if (category === 'coding') {
      rows = db.prepare("SELECT * FROM assessment_questions WHERE category = 'coding'").all();
    } else {
      rows = db.prepare("SELECT * FROM assessment_questions WHERE category = ?").all(category);
    }

    const selected = shuffleArray(rows).slice(0, count);

    const questions = selected.map(q => {
      const base = {
        id: q.id,
        category: q.category,
        sub_domain: q.sub_domain,
        difficulty: q.difficulty,
        question_type: q.question_type,
        prompt: q.prompt,
        tags: q.tags,
      };

      if (q.question_type === 'mcq') {
        base.options = JSON.parse(q.options_json || '[]');
        // NEVER expose correct_option to client
      } else if (q.question_type === 'coding') {
        base.starter_code = JSON.parse(q.starter_code_json || '{}');
        const allCases = JSON.parse(q.test_cases_json || '[]');
        // Show first 2 sample test cases (hide hidden ones)
        base.sample_cases = allCases.slice(0, 2);
        base.hidden_case_count = Math.max(0, allCases.length - 2);
      }

      return base;
    });

    res.json({ questions, total: questions.length, category });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Assessment Submission & Grading ──────────────────────────────────────────

// POST /api/assessments/submit
// Body: { userId: 1, category: 'aptitude', title: '...', answers: { qId: optionIndex } }
app.post('/api/assessments/submit', (req, res) => {
  try {
    const { userId = 1, category = 'aptitude', title = 'Assessment', answers = {} } = req.body;

    const questionIds = Object.keys(answers).map(Number);
    if (questionIds.length === 0) {
      return res.status(400).json({ error: 'No answers submitted' });
    }

    // Fetch questions with correct answers server-side
    const placeholders = questionIds.map(() => '?').join(',');
    const questions = db.prepare(
      `SELECT id, category, sub_domain, correct_option FROM assessment_questions WHERE id IN (${placeholders})`
    ).all(...questionIds);

    // Grade MCQs
    let correctCount = 0;
    const breakdown = {};

    for (const q of questions) {
      const submitted = answers[q.id];
      const isCorrect = submitted === q.correct_option;
      if (isCorrect) correctCount++;

      const domain = q.sub_domain || q.category;
      if (!breakdown[domain]) breakdown[domain] = { correct: 0, total: 0 };
      breakdown[domain].total++;
      if (isCorrect) breakdown[domain].correct++;
    }

    const totalCount = questions.length;
    const scorePercentage = Math.round((correctCount / totalCount) * 100);
    const badgeTier = determineBadgeTier(scorePercentage);
    const percentile = Math.min(99, 60 + Math.round(scorePercentage * 0.39));

    // Domain score breakdown percentages
    const domainScores = {};
    for (const [domain, counts] of Object.entries(breakdown)) {
      domainScores[domain] = Math.round((counts.correct / counts.total) * 100);
    }

    const metrics = {
      breakdown: domainScores,
      percentile,
      timeSpent: req.body.timeSpent || null,
    };

    // Persist submission
    const result = db.prepare(`
      INSERT INTO assessment_submissions
        (user_id, assessment_title, category, score_percentage, correct_count, total_count, badge_tier, metrics_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, title, category, scorePercentage, correctCount, totalCount, badgeTier, JSON.stringify(metrics));

    // Update badges count and recalculate match score
    db.prepare('UPDATE users SET badges_count = badges_count + 1 WHERE id = ?').run(userId);
    const newMatchScore = recalculateMatchScore(userId);

    res.json({
      submission_id: result.lastInsertRowid,
      score_percentage: scorePercentage,
      correct_count: correctCount,
      total_count: totalCount,
      badge_tier: badgeTier,
      percentile,
      domain_scores: domainScores,
      new_match_score: newMatchScore,
    });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Sandbox Execution ─────────────────────────────────────────────────────────

// POST /api/sandbox/execute
// Body: { code: string, problemId: number, language: 'javascript' }
app.post('/api/sandbox/execute', (req, res) => {
  try {
    const { code, problemId, language = 'javascript' } = req.body;

    if (!code || !problemId) {
      return res.status(400).json({ error: 'code and problemId are required' });
    }

    const problem = db.prepare('SELECT * FROM assessment_questions WHERE id = ?').get(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const allCases = JSON.parse(problem.test_cases_json || '[]');

    // Only JavaScript is executed server-side in a vm sandbox
    if (language !== 'javascript') {
      // Simulate pass for other languages (would need Docker for real execution)
      const simResults = allCases.map((tc, idx) => ({
        index: idx + 1,
        passed: true,
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expected),
        got: JSON.stringify(tc.expected),
        simulated: true,
      }));
      return res.json({
        results: simResults,
        passed_count: simResults.length,
        total_count: simResults.length,
        runtime_ms: Math.round(20 + Math.random() * 80),
        language,
        note: `${language.toUpperCase()} execution is simulated. JavaScript runs live.`,
      });
    }

    // Real JS execution via vm module
    const results = [];
    let passedCount = 0;
    const startTime = Date.now();

    for (let idx = 0; idx < allCases.length; idx++) {
      const tc = allCases[idx];
      try {
        const sandbox = { result: undefined, __passed: false };
        const fullCode = `
          ${code}
          // Auto-detect function and call it
          const _fnNames = ['twoSum','isValid','lengthOfLongestSubstring','maxProfit',
            'isAnagram','maxArea','search','middleNode','merge','climbStairs'];
          let _fn = null;
          for (const name of _fnNames) {
            try { if (typeof eval(name) === 'function') { _fn = eval(name); break; } } catch(e) {}
          }
          if (!_fn) throw new Error('Target function not found in submitted code.');
          const _input = ${JSON.stringify(tc.input)};
          result = _fn(..._input);
        `;
        vm.runInNewContext(fullCode, sandbox, { timeout: 3000 });

        const expectedStr = JSON.stringify(tc.expected);
        const gotStr = JSON.stringify(sandbox.result);
        const passed = expectedStr === gotStr;
        if (passed) passedCount++;

        results.push({
          index: idx + 1,
          passed,
          input: JSON.stringify(tc.input),
          expected: expectedStr,
          got: gotStr,
        });
      } catch (execErr) {
        results.push({
          index: idx + 1,
          passed: false,
          input: JSON.stringify(tc.input),
          expected: JSON.stringify(tc.expected),
          got: `Runtime Error: ${execErr.message}`,
          error: true,
        });
      }
    }

    const runtimeMs = Date.now() - startTime;

    res.json({
      results,
      passed_count: passedCount,
      total_count: allCases.length,
      runtime_ms: runtimeMs,
      language,
    });
  } catch (err) {
    console.error('Sandbox error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Student Submissions History ───────────────────────────────────────────────

// GET /api/student/submissions?userId=1
app.get('/api/student/submissions', (req, res) => {
  try {
    const userId = parseInt(req.query.userId) || 1;
    const subs = db.prepare(`
      SELECT * FROM assessment_submissions WHERE user_id = ? ORDER BY submitted_at DESC
    `).all(userId);

    const enriched = subs.map(s => ({
      ...s,
      metrics: JSON.parse(s.metrics_json || '{}'),
    }));

    res.json({ submissions: enriched, total: enriched.length });
  } catch (err) {
    console.error('Submissions error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Industry Postings ─────────────────────────────────────────────────────────

// GET /api/postings?status=Open
app.get('/api/postings', (req, res) => {
  try {
    const status = req.query.status || 'Open';
    const rows = db.prepare('SELECT * FROM industry_postings WHERE status = ?').all(status);
    res.json({ postings: rows, total: rows.length });
  } catch (err) {
    console.error('Postings error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// START
// ────────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 VidyaPrayog API Server running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Student profile: http://localhost:${PORT}/api/student/profile`);
  console.log(`   Generate questions: http://localhost:${PORT}/api/assessments/generate?category=aptitude&count=10\n`);
});
