// src/services/api.js — Centralized API client for VidyaPrayog backend

const BASE_URL = 'http://localhost:3001/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

// ── Student Profile ──────────────────────────────────────────────────────────

/**
 * Fetches the student's full profile, skill scores, and KPIs.
 * @returns {Promise<object>}
 */
export async function getStudentProfile() {
  return request('/student/profile');
}

/**
 * Fetches the student's assessment submission history.
 * @param {number} userId
 * @returns {Promise<{submissions: object[], total: number}>}
 */
export async function getSubmissions(userId = 1) {
  return request(`/student/submissions?userId=${userId}`);
}

// ── Assessment Questions ──────────────────────────────────────────────────────

/**
 * Generates a randomized question set from the server.
 * Correct answers are NEVER included in the response.
 * @param {'aptitude'|'domain'|'coding'} category
 * @param {number} count
 * @returns {Promise<{questions: object[], total: number}>}
 */
export async function generateAssessment(category = 'aptitude', count = 10) {
  return request(`/assessments/generate?category=${category}&count=${count}`);
}

// ── Assessment Submission ─────────────────────────────────────────────────────

/**
 * Submits assessment answers for server-side grading.
 * @param {object} payload - { userId, category, title, answers: {qId: optionIndex}, timeSpent }
 * @returns {Promise<{score_percentage, correct_count, total_count, badge_tier, percentile, domain_scores, new_match_score}>}
 */
export async function submitAssessment(payload) {
  return request('/assessments/submit', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Sandbox Execution ─────────────────────────────────────────────────────────

/**
 * Executes submitted code against server-side test cases in a vm sandbox.
 * @param {string} code
 * @param {number} problemId
 * @param {string} language
 * @returns {Promise<{results, passed_count, total_count, runtime_ms}>}
 */
export async function executeSandbox(code, problemId, language = 'javascript') {
  return request('/sandbox/execute', {
    method: 'POST',
    body: JSON.stringify({ code, problemId, language }),
  });
}

// ── Industry Postings ─────────────────────────────────────────────────────────

/**
 * Fetches active industry postings.
 * @returns {Promise<{postings: object[], total: number}>}
 */
export async function getPostings(status = 'Open') {
  return request(`/postings?status=${status}`);
}

// ── Health Check ─────────────────────────────────────────────────────────────

/**
 * Pings the backend to verify connectivity.
 * @returns {Promise<{status: string}>}
 */
export async function checkHealth() {
  return request('/health');
}
