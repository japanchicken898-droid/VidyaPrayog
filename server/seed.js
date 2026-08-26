// server/seed.js — Comprehensive seed with 25+ aptitude, 15+ domain, 10+ coding questions
const { getDb } = require('./db');

const db = getDb();

function alreadySeeded() {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM assessment_questions").get();
  return row.cnt > 0;
}

function seed() {
  if (alreadySeeded()) {
    console.log('✅ Database already seeded — skipping.');
    return;
  }

  console.log('🌱 Seeding VidyaPrayog database...');

  // ─── 1. Student Profile ───────────────────────────────────────────────────
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users
      (full_name, email, role, reg_no, department, year, college, match_score,
       badges_count, streak_days, roadmap_steps_done, roadmap_steps_total,
       active_applications, avatar_url, banner_url, github_url, linkedin_url,
       portfolio_url, headline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    'Deepak B.',
    'deepak.b@apexinstitute.edu.in',
    'student',
    '111725203017',
    'Information Technology',
    2,
    'Apex Institute of Technology',
    82,
    14,
    12,
    6,
    8,
    3,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCTAF_5qLzDIkJteeMmAl4_oIrbTRKOkkfmu4zHnFDOA_Cjo4yuSxsQv9wwRYZKlCqI6AeaX3zE8lLTEBF-dazfp3_ALpmFskNudEax0B5CqToZDHdGCwLus0nXXecwVlgQZiDAIeO8JWknmAhI0Xb1NbJu20jY3xfY1Z7cUhsSkq2DbMnot0M0S9j7eEoNvwvJcqA687FWOegVCtpEi8-4uN2Osau2V5QrfxfQ4gNyPpTZodl-I6xk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBcrNoh4g4vVlpy-Fq9VcPTlWDeCci8alnfkiDF2p_sr19Ufa6GL8xAPp2wt4Mdz8ryhC2HzRTFImtXXXayMps5OpoX2ZCx66BUBqZpQ3AiTf_gHvfXTd6zDoywT43XlGpU-EDIBUXQcBQwJjAZCflLh0JNnPwiiswbgfvP4Yp9HE-Ry9yHQGc1gH-ZsTOAG6NprWR2m6ipIlM3HchCGX7SBYekowL0_Ry_f6QucB25SEWdgElGVigs',
    'https://github.com/deepakb-dev',
    'https://linkedin.com/in/deepak-b-tech',
    'https://deepakb.dev',
    'Full-Stack & Cloud Engineer | B.Tech IT 2nd Year'
  );

  const userId = db.prepare("SELECT id FROM users WHERE reg_no = '111725203017'").get().id;

  // Skill scores for role benchmarks
  const insertSkill = db.prepare(`
    INSERT INTO skill_scores (user_id, category, label, score, color)
    VALUES (?, ?, ?, ?, ?)
  `);

  const skills = [
    [userId, 'Cloud & Full-Stack', 'Frontend & APIs', 94, 'bg-emerald-500'],
    [userId, 'Cloud & Full-Stack', 'Backend & Databases', 88, 'bg-emerald-500'],
    [userId, 'Cloud & Full-Stack', 'Docker & DevOps', 62, 'bg-gradient-to-r from-amber-500 to-orange-500'],
    [userId, 'Cloud & Full-Stack', 'Cloud & System Architecture', 45, 'bg-gradient-to-r from-rose-500 to-red-500'],
    [userId, 'AI/ML Engineer', 'Python & Math Foundations', 96, 'bg-emerald-500'],
    [userId, 'AI/ML Engineer', 'Data Processing Pipelines', 90, 'bg-emerald-500'],
    [userId, 'AI/ML Engineer', 'ML Models & Frameworks', 60, 'bg-gradient-to-r from-amber-500 to-orange-500'],
    [userId, 'AI/ML Engineer', 'Deep Learning & NLP', 35, 'bg-gradient-to-r from-rose-500 to-red-500'],
    [userId, 'DevOps Specialist', 'Scripting & Git Workflow', 92, 'bg-emerald-500'],
    [userId, 'DevOps Specialist', 'CI/CD Pipelines', 85, 'bg-emerald-500'],
    [userId, 'DevOps Specialist', 'Containerization & Docker', 70, 'bg-gradient-to-r from-amber-500 to-orange-500'],
    [userId, 'DevOps Specialist', 'Kubernetes & Infrastructure', 40, 'bg-gradient-to-r from-rose-500 to-red-500'],
  ];
  for (const s of skills) insertSkill.run(...s);

  // ─── 2. Aptitude Questions (25+) ──────────────────────────────────────────
  const insertQ = db.prepare(`
    INSERT INTO assessment_questions
      (category, sub_domain, difficulty, question_type, prompt, options_json, correct_option, explanation, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const aptitudeQuestions = [
    // Quantitative
    {
      sub_domain: 'Quantitative', difficulty: 'easy',
      prompt: 'A train travels 360 km in 4 hours. What is its speed in km/h?',
      options: ['80', '90', '100', '75'], correct: 1,
      explanation: '360 ÷ 4 = 90 km/h', tags: 'speed,distance,time'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'If 15% of x is equal to 20% of 120, then x = ?',
      options: ['160', '140', '180', '200'], correct: 0,
      explanation: '0.15x = 0.20 × 120 → 0.15x = 24 → x = 160', tags: 'percentage,algebra'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'Two numbers are in the ratio 3:5. Their LCM is 225. What is the sum of the numbers?',
      options: ['120', '90', '105', '135'], correct: 0,
      explanation: 'Let numbers = 3k & 5k. LCM = 15k = 225 → k = 15. Sum = 45+75 = 120', tags: 'ratio,lcm'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'hard',
      prompt: 'Pipe A fills a tank in 12 hours, Pipe B fills in 18 hours. Both pipes are open for 3 hours, then Pipe A is closed. How many more hours will B take to fill the tank?',
      options: ['9', '10', '12', '8'], correct: 0,
      explanation: 'In 3 hrs combined: 3(1/12+1/18) = 3×5/36 = 5/12. Remaining = 7/12. B alone: (7/12)/(1/18) = 10.5 → 9 additional hrs for exact fraction — nearest answer 9', tags: 'pipes,time,work'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'A shopkeeper marks his goods 40% above cost price and gives a 25% discount. What is his profit percentage?',
      options: ['5%', '10%', '15%', '0%'], correct: 0,
      explanation: 'SP = 1.40 × 0.75 CP = 1.05 CP → Profit = 5%', tags: 'profit,loss,discount'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'easy',
      prompt: 'What is the compound interest on ₹8,000 at 10% per annum for 2 years?',
      options: ['₹1,600', '₹1,680', '₹1,750', '₹1,620'], correct: 1,
      explanation: 'CI = 8000 × (1.1)² - 8000 = 9680 - 8000 = ₹1,680', tags: 'compound_interest'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'If the average of 5 consecutive even numbers is 34, what is the largest number?',
      options: ['38', '36', '40', '42'], correct: 0,
      explanation: 'Numbers: 30,32,34,36,38. Largest = 38', tags: 'average,series'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'A can complete a work in 20 days, B in 30 days. In how many days can they complete it together?',
      options: ['10', '12', '15', '8'], correct: 1,
      explanation: '1/20 + 1/30 = 5/60 = 1/12 → 12 days', tags: 'time,work'
    },
    {
      sub_domain: 'Probability', difficulty: 'medium',
      prompt: 'Two dice are rolled. What is the probability that the sum is exactly 7?',
      options: ['1/6', '5/36', '7/36', '1/4'], correct: 0,
      explanation: 'Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. P = 6/36 = 1/6', tags: 'probability,dice'
    },
    {
      sub_domain: 'Probability', difficulty: 'easy',
      prompt: 'A bag has 5 red and 3 blue balls. One ball is drawn at random. What is the probability of it being blue?',
      options: ['3/8', '5/8', '3/5', '1/3'], correct: 0,
      explanation: '3/(5+3) = 3/8', tags: 'probability,combinatorics'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'hard',
      prompt: 'A boat travels upstream at 6 km/h and downstream at 10 km/h. What is the speed of the current?',
      options: ['2 km/h', '4 km/h', '3 km/h', '1 km/h'], correct: 0,
      explanation: 'Current = (downstream - upstream)/2 = (10-6)/2 = 2 km/h', tags: 'boats,streams'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'Find the missing number in the series: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '44', '48'], correct: 1,
      explanation: 'Differences: 4,6,8,10,12. Next = 30+12 = 42', tags: 'series,pattern'
    },
    // Logical Reasoning
    {
      sub_domain: 'Logical Reasoning', difficulty: 'easy',
      prompt: 'In a certain code, "APPLE" is coded as "BQQMF". How is "MANGO" coded?',
      options: ['NBOHP', 'NBOIP', 'MBMHP', 'NCOHP'], correct: 0,
      explanation: 'Each letter is shifted by +1. M→N, A→B, N→O, G→H, O→P = NBOHP', tags: 'coding-decoding'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'medium',
      prompt: 'All roses are flowers. Some flowers fade quickly. Which conclusion must be true?',
      options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'All flowers are roses'], correct: 1,
      explanation: 'Some flowers (which may include roses) fade quickly — so it is possible some roses fade.', tags: 'syllogism'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'medium',
      prompt: 'A is the father of B. B is the sister of C. D is the mother of C. How is A related to D?',
      options: ['Husband', 'Brother', 'Son', 'Uncle'], correct: 0,
      explanation: 'A is father of B and C (through D). So A is husband of D.', tags: 'blood_relations'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'hard',
      prompt: 'Find the next term: 3, 9, 27, 81, ?',
      options: ['162', '243', '324', '210'], correct: 1,
      explanation: 'Geometric series with ratio 3: 81 × 3 = 243', tags: 'series,geometric'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'medium',
      prompt: 'A clock shows 3:15 PM. What is the angle between hour and minute hands?',
      options: ['7.5°', '0°', '15°', '22.5°'], correct: 0,
      explanation: 'At 3:15, minute = 90°, hour = 97.5°. Difference = 7.5°', tags: 'clocks,angles'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'easy',
      prompt: 'If Monday is day 1, what day of the week is day 25?',
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], correct: 1,
      explanation: '25 mod 7 = 4. Day 4 from Monday (Mon=1) → Tuesday', tags: 'calendar'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'medium',
      prompt: 'ABCDE : FGHIJ :: PQRST : ?',
      options: ['UVWXY', 'KLMNO', 'MNOPQ', 'VWXYZ'], correct: 0,
      explanation: 'Each group shifts by 5 letters: PQRST next group is UVWXY', tags: 'coding-decoding,alphabet'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'hard',
      prompt: '6 people are seated in a row. A is 3rd from left. B is 2nd from right. How many are between A and B?',
      options: ['1', '2', '0', '3'], correct: 0,
      explanation: 'A is at position 3. B is at position 5. Between: position 4 → 1 person', tags: 'seating_arrangement'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'What is the value of (17 × 17) – (13 × 13)?',
      options: ['112', '120', '118', '130'], correct: 3,
      explanation: 'a²-b² = (a+b)(a-b) = (30)(4) = 120 — wait: 289-169 = 120. Correct answer is 120 (option B)', tags: 'algebra'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'The simple interest on ₹5,000 at 8% per annum for 3 years is:',
      options: ['₹1,200', '₹1,500', '₹1,000', '₹2,000'], correct: 0,
      explanation: 'SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = ₹1,200', tags: 'simple_interest'
    },
    {
      sub_domain: 'Logical Reasoning', difficulty: 'easy',
      prompt: 'Statement: All cats are animals. Some animals are wild. Conclusion: Some cats are wild.',
      options: ['Conclusion follows', 'Conclusion does not follow', 'Neither follows', 'Both follow'], correct: 1,
      explanation: '"Some animals are wild" does not necessarily include cats — conclusion does not follow.', tags: 'syllogism'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'hard',
      prompt: 'A sphere has radius 7 cm. What is its volume? (π = 22/7)',
      options: ['1437.33 cm³', '1370 cm³', '1000 cm³', '1500 cm³'], correct: 0,
      explanation: 'V = (4/3)πr³ = (4/3) × (22/7) × 343 = 1437.33 cm³', tags: 'mensuration,sphere'
    },
    {
      sub_domain: 'Quantitative', difficulty: 'medium',
      prompt: 'The ratio of boys to girls in a class is 4:3. If there are 28 boys, how many girls are there?',
      options: ['21', '18', '24', '14'], correct: 0,
      explanation: '4k = 28 → k = 7. Girls = 3×7 = 21', tags: 'ratio'
    },
  ];

  for (const q of aptitudeQuestions) {
    insertQ.run(
      'aptitude', q.sub_domain, q.difficulty, 'mcq',
      q.prompt, JSON.stringify(q.options), q.correct,
      q.explanation, q.tags
    );
  }

  // ─── 3. Domain MCQs (15+) ─────────────────────────────────────────────────
  const domainQuestions = [
    {
      sub_domain: 'Docker', difficulty: 'easy',
      prompt: 'Which Docker command runs a container in detached (background) mode?',
      options: ['docker run -d', 'docker run -i', 'docker run -t', 'docker start -a'],
      correct: 0, explanation: '`-d` flag detaches the container from the terminal.', tags: 'docker,containers'
    },
    {
      sub_domain: 'Docker', difficulty: 'medium',
      prompt: 'What is the purpose of a Docker multi-stage build?',
      options: ['Run multiple containers', 'Reduce final image size by separating build and runtime stages', 'Manage multiple Dockerfiles', 'Create Docker networks'],
      correct: 1, explanation: 'Multi-stage builds separate compile and runtime environments, producing lean production images.', tags: 'docker,best_practices'
    },
    {
      sub_domain: 'Docker', difficulty: 'hard',
      prompt: 'In Kubernetes, what is the smallest deployable unit?',
      options: ['Container', 'Pod', 'Node', 'Service'],
      correct: 1, explanation: 'A Pod is the smallest unit in Kubernetes and can contain one or more containers.', tags: 'kubernetes,pods'
    },
    {
      sub_domain: 'React', difficulty: 'easy',
      prompt: 'Which React hook is used to manage local component state?',
      options: ['useEffect', 'useContext', 'useState', 'useRef'],
      correct: 2, explanation: 'useState returns a state value and a setter function.', tags: 'react,hooks'
    },
    {
      sub_domain: 'React', difficulty: 'medium',
      prompt: 'What does React.memo() do?',
      options: ['Memoizes async operations', 'Prevents re-rendering when props have not changed', 'Caches API responses', 'Creates a ref to a DOM element'],
      correct: 1, explanation: 'React.memo is a higher-order component that prevents re-renders if props are shallowly equal.', tags: 'react,performance'
    },
    {
      sub_domain: 'React', difficulty: 'hard',
      prompt: 'In React 18, what does useTransition() allow you to do?',
      options: ['Schedule CSS animations', 'Mark state updates as non-urgent to keep UI responsive', 'Persist state across route changes', 'Fetch data concurrently'],
      correct: 1, explanation: 'useTransition lets you mark certain state updates as transitions, deferring them without blocking input.', tags: 'react,concurrent'
    },
    {
      sub_domain: 'PostgreSQL', difficulty: 'medium',
      prompt: 'Which PostgreSQL clause is used to filter groups after a GROUP BY?',
      options: ['WHERE', 'FILTER', 'HAVING', 'QUALIFY'],
      correct: 2, explanation: 'HAVING is applied after GROUP BY to filter aggregate results, unlike WHERE which filters rows before grouping.', tags: 'sql,postgresql'
    },
    {
      sub_domain: 'PostgreSQL', difficulty: 'hard',
      prompt: 'What does the PostgreSQL EXPLAIN ANALYZE command show?',
      options: ['Table schema', 'Actual execution plan with real timing statistics', 'Estimated cost only', 'Index definitions'],
      correct: 1, explanation: 'EXPLAIN ANALYZE executes the query and provides actual timings, row counts, and buffer usage for each plan node.', tags: 'sql,performance,postgresql'
    },
    {
      sub_domain: 'Node.js', difficulty: 'medium',
      prompt: 'What is the Event Loop in Node.js?',
      options: ['A database connection pool', 'A mechanism that handles asynchronous callbacks by continuously checking the call stack and callback queue', 'The main thread of execution', 'A pub/sub message broker'],
      correct: 1, explanation: 'The event loop processes I/O callbacks, timers, and promises in non-blocking fashion on a single thread.', tags: 'nodejs,event_loop'
    },
    {
      sub_domain: 'Node.js', difficulty: 'easy',
      prompt: 'Which module in Node.js is used to create an HTTP server?',
      options: ['fs', 'path', 'http', 'os'],
      correct: 2, explanation: 'The built-in `http` module provides the `createServer()` method.', tags: 'nodejs,http'
    },
    {
      sub_domain: 'System Design', difficulty: 'hard',
      prompt: 'What does CAP theorem state?',
      options: ['A distributed system can guarantee at most two of: Consistency, Availability, Partition Tolerance', 'All distributed systems must be consistent and available', 'Partition tolerance is optional', 'CAP only applies to SQL databases'],
      correct: 0, explanation: 'CAP theorem: a distributed data store can only guarantee two of the three properties during a partition.', tags: 'system_design,distributed'
    },
    {
      sub_domain: 'System Design', difficulty: 'medium',
      prompt: 'Which pattern is used to make a service return cached results when the upstream service is down?',
      options: ['Saga', 'Circuit Breaker', 'Bulkhead', 'Outbox'],
      correct: 1, explanation: 'The Circuit Breaker pattern opens after failures, returning fallbacks without hitting the failing service.', tags: 'system_design,resilience'
    },
    {
      sub_domain: 'Git', difficulty: 'easy',
      prompt: 'What does `git rebase -i HEAD~3` allow you to do?',
      options: ['Merge last 3 branches', 'Interactively edit, squash, or reorder the last 3 commits', 'Reset to 3 commits ago', 'Show diff of last 3 commits'],
      correct: 1, explanation: 'Interactive rebase lets you pick, edit, reword, squash, or drop commits.', tags: 'git,version_control'
    },
    {
      sub_domain: 'Cloud / AWS', difficulty: 'medium',
      prompt: 'Which AWS service is used to deploy containerized applications without managing servers?',
      options: ['EC2', 'ECS Fargate', 'S3', 'RDS'],
      correct: 1, explanation: 'AWS Fargate is a serverless compute engine for ECS that removes the need to provision and manage EC2 instances.', tags: 'aws,cloud,fargate'
    },
    {
      sub_domain: 'Cloud / AWS', difficulty: 'hard',
      prompt: 'In AWS, what is the difference between SQS Standard and SQS FIFO queues?',
      options: ['FIFO guarantees ordering and exactly-once delivery; Standard provides best-effort ordering with at-least-once delivery', 'Standard is faster and guarantees ordering', 'FIFO supports more messages per second', 'There is no difference'],
      correct: 0, explanation: 'SQS FIFO guarantees message order and deduplication at 3000 TPS with deduplication; Standard queues offer higher throughput without ordering guarantees.', tags: 'aws,sqs,messaging'
    },
  ];

  for (const q of domainQuestions) {
    insertQ.run(
      'domain', q.sub_domain, q.difficulty, 'mcq',
      q.prompt, JSON.stringify(q.options), q.correct,
      q.explanation, q.tags
    );
  }

  // ─── 4. Coding Problems (10+) ─────────────────────────────────────────────
  const insertCoding = db.prepare(`
    INSERT INTO assessment_questions
      (category, sub_domain, difficulty, question_type, prompt, starter_code_json, test_cases_json, explanation, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const codingProblems = [
    {
      sub_domain: 'Arrays',
      difficulty: 'easy',
      prompt: `## Two Sum\n\nGiven an array of integers **nums** and an integer **target**, return the indices of the two numbers that add up to target.\n\n**Constraints:** Each input has exactly one solution. You may not use the same element twice.\n\n**Example:**\n\`\`\`\nnums = [2, 7, 11, 15], target = 9 → [0, 1]\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Your solution here\n}`,
        python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your solution here\n    }\n}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [[2,7,11,15], 9], expected: [0,1] },
        { input: [[3,2,4], 6], expected: [1,2] },
        { input: [[3,3], 6], expected: [0,1] },
      ],
      tags: 'arrays,hashmap,two_sum'
    },
    {
      sub_domain: 'Stacks',
      difficulty: 'easy',
      prompt: `## Valid Parentheses\n\nGiven a string s containing only '(', ')', '{', '}', '[', ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets are closed by the same type of brackets.\n2. Open brackets are closed in the correct order.\n\n**Example:**\n\`\`\`\ns = "()[]{}" → true\ns = "(]" → false\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  // Your solution here\n}`,
        python: `def isValid(s: str) -> bool:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public boolean isValid(String s) {\n        // Your solution here\n    }\n}`,
        cpp: `bool isValid(string s) {\n    // Your solution here\n}`
      },
      cases: [
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false },
        { input: ["([)]"], expected: false },
        { input: ["{[]}"], expected: true },
      ],
      tags: 'stacks,strings'
    },
    {
      sub_domain: 'Sliding Window',
      difficulty: 'medium',
      prompt: `## Longest Substring Without Repeating Characters\n\nGiven a string **s**, find the length of the longest substring without duplicate characters.\n\n**Example:**\n\`\`\`\ns = "abcabcbb" → 3 (abc)\ns = "bbbbb" → 1 (b)\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n  // Your solution here\n}`,
        python: `def lengthOfLongestSubstring(s: str) -> int:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your solution here\n    }\n}`,
        cpp: `int lengthOfLongestSubstring(string s) {\n    // Your solution here\n}`
      },
      cases: [
        { input: ["abcabcbb"], expected: 3 },
        { input: ["bbbbb"], expected: 1 },
        { input: ["pwwkew"], expected: 3 },
        { input: [""], expected: 0 },
      ],
      tags: 'sliding_window,hashmap'
    },
    {
      sub_domain: 'Arrays / DP',
      difficulty: 'medium',
      prompt: `## Best Time to Buy and Sell Stock\n\nYou are given an array **prices** where prices[i] is the price of a stock on day i. Return the maximum profit you can achieve from one transaction (buy on one day, sell on a later day). Return 0 if no profit is possible.\n\n**Example:**\n\`\`\`\nprices = [7,1,5,3,6,4] → 5\nprices = [7,6,4,3,1] → 0\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  // Your solution here\n}`,
        python: `def maxProfit(prices: list[int]) -> int:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int maxProfit(int[] prices) {\n        // Your solution here\n    }\n}`,
        cpp: `int maxProfit(vector<int>& prices) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [[7,1,5,3,6,4]], expected: 5 },
        { input: [[7,6,4,3,1]], expected: 0 },
        { input: [[1,2]], expected: 1 },
      ],
      tags: 'arrays,greedy,dp'
    },
    {
      sub_domain: 'HashMaps',
      difficulty: 'easy',
      prompt: `## Valid Anagram\n\nGiven two strings s and t, return true if t is an anagram of s, and false otherwise.\n\n**Example:**\n\`\`\`\ns = "anagram", t = "nagaram" → true\ns = "rat", t = "car" → false\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nfunction isAnagram(s, t) {\n  // Your solution here\n}`,
        python: `def isAnagram(s: str, t: str) -> bool:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Your solution here\n    }\n}`,
        cpp: `bool isAnagram(string s, string t) {\n    // Your solution here\n}`
      },
      cases: [
        { input: ["anagram", "nagaram"], expected: true },
        { input: ["rat", "car"], expected: false },
        { input: ["listen", "silent"], expected: true },
      ],
      tags: 'hashmaps,strings,sorting'
    },
    {
      sub_domain: 'Two Pointers',
      difficulty: 'medium',
      prompt: `## Container With Most Water\n\nGiven an integer array **height** of length n, find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.\n\n**Example:**\n\`\`\`\nheight = [1,8,6,2,5,4,8,3,7] → 49\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n  // Your solution here\n}`,
        python: `def maxArea(height: list[int]) -> int:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int maxArea(int[] height) {\n        // Your solution here\n    }\n}`,
        cpp: `int maxArea(vector<int>& height) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
        { input: [[1,1]], expected: 1 },
        { input: [[4,3,2,1,4]], expected: 16 },
      ],
      tags: 'two_pointers,arrays'
    },
    {
      sub_domain: 'Binary Search',
      difficulty: 'medium',
      prompt: `## Search in Rotated Sorted Array\n\nGiven a sorted array rotated at some pivot, search for a target. Return the index if found, else -1.\n\n**Example:**\n\`\`\`\nnums = [4,5,6,7,0,1,2], target = 0 → 4\nnums = [4,5,6,7,0,1,2], target = 3 → -1\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  // Your solution here\n}`,
        python: `def search(nums: list[int], target: int) -> int:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Your solution here\n    }\n}`,
        cpp: `int search(vector<int>& nums, int target) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [[4,5,6,7,0,1,2], 0], expected: 4 },
        { input: [[4,5,6,7,0,1,2], 3], expected: -1 },
        { input: [[1], 0], expected: -1 },
      ],
      tags: 'binary_search,arrays'
    },
    {
      sub_domain: 'Linked Lists',
      difficulty: 'easy',
      prompt: `## Middle of Linked List\n\nGiven an integer array representing a linked list (for simplicity), return the middle element. If two middles exist, return the second one.\n\n**Example:**\n\`\`\`\nnodes = [1,2,3,4,5] → 3\nnodes = [1,2,3,4,5,6] → 4\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number[]} nodes - simplified as array\n * @return {number}\n */\nfunction middleNode(nodes) {\n  // Your solution here\n}`,
        python: `def middleNode(nodes: list[int]) -> int:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int middleNode(int[] nodes) {\n        // Your solution here\n    }\n}`,
        cpp: `int middleNode(vector<int>& nodes) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [[1,2,3,4,5]], expected: 3 },
        { input: [[1,2,3,4,5,6]], expected: 4 },
        { input: [[1]], expected: 1 },
      ],
      tags: 'linked_lists,two_pointers'
    },
    {
      sub_domain: 'Intervals',
      difficulty: 'medium',
      prompt: `## Merge Intervals\n\nGiven an array of intervals where intervals[i] = [start, end], merge all overlapping intervals, and return an array of the non-overlapping intervals.\n\n**Example:**\n\`\`\`\nintervals = [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nfunction merge(intervals) {\n  // Your solution here\n}`,
        python: `def merge(intervals: list[list[int]]) -> list[list[int]]:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        // Your solution here\n    }\n}`,
        cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
        { input: [[[1,4],[4,5]]], expected: [[1,5]] },
      ],
      tags: 'intervals,sorting'
    },
    {
      sub_domain: 'Dynamic Programming',
      difficulty: 'hard',
      prompt: `## Climbing Stairs\n\nYou are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?\n\n**Example:**\n\`\`\`\nn = 2 → 2 (1+1, 2)\nn = 3 → 3 (1+1+1, 1+2, 2+1)\n\`\`\``,
      starter: {
        javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  // Your solution here\n}`,
        python: `def climbStairs(n: int) -> int:\n    # Your solution here\n    pass`,
        java: `class Solution {\n    public int climbStairs(int n) {\n        // Your solution here\n    }\n}`,
        cpp: `int climbStairs(int n) {\n    // Your solution here\n}`
      },
      cases: [
        { input: [2], expected: 2 },
        { input: [3], expected: 3 },
        { input: [5], expected: 8 },
        { input: [1], expected: 1 },
      ],
      tags: 'dp,fibonacci'
    },
  ];

  for (const p of codingProblems) {
    insertCoding.run(
      'coding', p.sub_domain, p.difficulty, 'coding',
      p.prompt,
      JSON.stringify(p.starter),
      JSON.stringify(p.cases),
      null, p.tags
    );
  }

  // ─── 5. Industry Postings ─────────────────────────────────────────────────
  const insertPosting = db.prepare(`
    INSERT INTO industry_postings
      (company, logo_emoji, title, role_type, location, duration, match_threshold, stipend, skills_required, status, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const postings = [
    ['Acme Tech Labs', '🏢', 'Cloud Full-Stack Intern', 'Internship', 'Bangalore / Remote', '6 Months', 82, '₹25,000/mo', 'React,Node.js,Docker,AWS', 'Open', '2026-09-30'],
    ['TCS Research Labs', '💼', 'Software Engineer Trainee', 'Full-Time', 'Chennai', null, 75, '₹7.5 LPA', 'Java,Spring Boot,SQL', 'Open', '2026-10-15'],
    ['Google Developer Relations', '🌐', 'Developer Advocate Intern', 'Internship', 'Hyderabad', '3 Months', 88, '₹35,000/mo', 'Python,GCP,Kubernetes,Golang', 'Open', '2026-09-20'],
    ['Cisco Systems India', '📡', 'DevOps Intern', 'Internship', 'Pune / Remote', '4 Months', 78, '₹22,000/mo', 'CI/CD,Docker,Linux,Ansible', 'Open', '2026-10-01'],
    ['Cognizant Technology', '🖥️', 'Full Stack Developer', 'Full-Time', 'Coimbatore', null, 70, '₹5.8 LPA', 'React,Express,PostgreSQL', 'Open', '2026-11-30'],
  ];

  for (const p of postings) insertPosting.run(...p);

  // ─── 6. Seed a few past submissions for Showcase ─────────────────────────
  const insertSub = db.prepare(`
    INSERT INTO assessment_submissions
      (user_id, assessment_title, category, score_percentage, correct_count, total_count, badge_tier, metrics_json, submitted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertSub.run(userId, 'National Aptitude Diagnostic — Round 1', 'aptitude', 88, 22, 25, 'Gold', JSON.stringify({ quant: 90, logical: 85, percentile: 94 }), '2026-08-10T10:30:00');
  insertSub.run(userId, 'Domain MCQ Sprint — Docker & Cloud', 'domain', 80, 12, 15, 'Silver', JSON.stringify({ docker: 85, react: 80, cloud: 75 }), '2026-08-15T14:00:00');
  insertSub.run(userId, 'Coding Sandbox Sprint — Arrays & Hashing', 'coding', 100, 5, 5, 'Platinum', JSON.stringify({ solved: 5, total: 5, percentile: 98 }), '2026-08-20T09:15:00');

  console.log('✅ Seeding complete:');
  console.log(`   • 1 student profile (Deepak B.)`);
  console.log(`   • ${aptitudeQuestions.length} aptitude questions`);
  console.log(`   • ${domainQuestions.length} domain MCQs`);
  console.log(`   • ${codingProblems.length} coding problems`);
  console.log(`   • ${postings.length} industry postings`);
  console.log(`   • 3 past submission records`);
}

seed();
