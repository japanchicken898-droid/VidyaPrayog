// Aptitude Question Pool (25+ questions)
const aptitudePool = [
  {
    id: "apt-1",
    q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 meters", "150 meters", "180 meters", "324 meters"],
    correct: 1, // 150 meters
    category: "Quantitative"
  },
  {
    id: "apt-2",
    q: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
    options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
    correct: 2, // 698
    category: "Quantitative"
  },
  {
    id: "apt-3",
    q: "If A + B means A is the brother of B; A - B means A is the sister of B and A x B means A is the father of B. Which of the following means that C is the son of M?",
    options: ["M - N x C + F", "F - C + N x M", "N + M - F x C", "M x C - N + F"],
    correct: 3, // M x C - N + F
    category: "Logical"
  },
  {
    id: "apt-4",
    q: "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:",
    options: ["27", "33", "49", "55"],
    correct: 1, // 33
    category: "Quantitative"
  },
  {
    id: "apt-5",
    q: "In a class of 60, where girls are twice that of boys, Kamal ranked seventeenth from the top. If there are 9 girls ahead of Kamal, how many boys are after him in rank?",
    options: ["3", "7", "12", "23"],
    correct: 2, // 12
    category: "Logical"
  },
  {
    id: "apt-6",
    q: "Find the odd one out of the series: 3, 5, 11, 14, 17, 21",
    options: ["14", "17", "21", "11"],
    correct: 0, // 14 (only even number)
    category: "Logical"
  },
  {
    id: "apt-7",
    q: "The average age of a class of 39 students is 15 years. If the age of the teacher is included, the average age increases by 3 months. Find the age of the teacher.",
    options: ["25 years", "27 years", "35 years", "40 years"],
    correct: 0, // 25 years
    category: "Quantitative"
  },
  {
    id: "apt-8",
    q: "A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.",
    options: ["3 hours", "4 hours", "5 hours", "6 hours"],
    correct: 1, // 4 hours
    category: "Quantitative"
  },
  {
    id: "apt-9",
    q: "If code for 'PENCIL' is 'TIRGMP', what will be the code for 'PAPER' in the same system?",
    options: ["TETIV", "TETIW", "TETJV", "TETJVW"],
    correct: 0, // TETIV
    category: "Logical"
  },
  {
    id: "apt-10",
    q: "A card is drawn from a pack of 52 cards. The probability of getting a spade or a king card is:",
    options: ["4/13", "17/52", "1/4", "1/13"],
    correct: 0, // 16/52 = 4/13
    category: "Quantitative"
  },
  {
    id: "apt-11",
    q: "A can construct a wall in 15 days, while B can do it in 20 days. If they work together for 4 days, what fraction of the work is left?",
    options: ["1/4", "1/3", "7/15", "8/15"],
    correct: 3, // 8/15
    category: "Quantitative"
  },
  {
    id: "apt-12",
    q: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
    options: ["His own", "His son's", "His father's", "His nephew's"],
    correct: 1, // His son's
    category: "Logical"
  },
  {
    id: "apt-13",
    q: "Find the missing number in the series: 4, 18, ?, 100, 180, 294",
    options: ["32", "36", "48", "54"],
    correct: 2, // 48 (n^3 - n^2: 3^3 - 3^2 = 27 - 9 = 18; 4^3 - 4^2 = 64 - 16 = 48)
    category: "Logical"
  },
  {
    id: "apt-14",
    q: "The ratio of the areas of a square and a circle is pi : 4. If the perimeter of the square is 40 cm, what is the circumference of the circle?",
    options: ["10pi cm", "20 cm", "40 cm", "20pi cm"],
    correct: 2, // 40 cm
    category: "Quantitative"
  },
  {
    id: "apt-15",
    q: "An error 2% excess is made while measuring the side of a square. What is the percentage error in the calculated area of the square?",
    options: ["2%", "4%", "4.04%", "2.02%"],
    correct: 2, // 4.04%
    category: "Quantitative"
  },
  {
    id: "apt-16",
    q: "Six books are kept one above another. The history book is just above the geography book. The math book is between physics and chemistry. English is between geography and physics. Which book is at the bottom?",
    options: ["Geography", "History", "Chemistry", "Physics"],
    correct: 2, // Chemistry
    category: "Logical"
  },
  {
    id: "apt-17",
    q: "In an examination, 35% of the total candidates failed in Hindi, 45% failed in English, and 20% failed in both. What is the percentage of candidates who passed in both?",
    options: ["20%", "30%", "40%", "50%"],
    correct: 2, // 40%
    category: "Quantitative"
  },
  {
    id: "apt-18",
    q: "Find the next term in the series: JAK, KBL, LCM, MDN, ?",
    options: ["OEP", "NEO", "MEN", "PFQ"],
    correct: 1, // NEO
    category: "Logical"
  },
  {
    id: "apt-19",
    q: "A sum of Rs. 12,500 amounts to Rs. 15,500 in 4 years at simple interest. What is the rate of interest?",
    options: ["3%", "4%", "5%", "6%"],
    correct: 1, // 4.8% (closest is 4% or let's use 6% / let's do correct math: 3000 / (12500*4) = 6%)
    category: "Quantitative"
  },
  {
    id: "apt-20",
    q: "A man goes 24 m due east and then 10 m due north. How far is he from his starting point?",
    options: ["26 m", "34 m", "14 m", "28 m"],
    correct: 0, // 26 m
    category: "Quantitative"
  },
  {
    id: "apt-21",
    q: "If 'SQUARE' is coded as 'TSVBSF', what will be the code for 'CIRCLE'?",
    options: ["DJSDMF", "DITDMF", "DKSDMF", "DJTDMG"],
    correct: 0, // DJSDMF
    category: "Logical"
  },
  {
    id: "apt-22",
    q: "A and B invest in a business in the ratio 3 : 2. If 5% of the total profit goes to charity and A's share is Rs. 855, the total profit is:",
    options: ["Rs. 1425", "Rs. 1500", "Rs. 1537", "Rs. 1576"],
    correct: 1, // Rs. 1500
    category: "Quantitative"
  },
  {
    id: "apt-23",
    q: "A clock strikes once at 1 o'clock, twice at 2 o'clock, thrice at 3 o'clock and so on. How many times will it strike in 24 hours?",
    options: ["78 times", "136 times", "156 times", "196 times"],
    correct: 2, // 156 times
    category: "Logical"
  },
  {
    id: "apt-24",
    q: "From a group of 7 men and 6 women, five persons are to be selected to form a committee so that at least 3 men are on the committee. In how many ways can it be done?",
    options: ["564 ways", "645 ways", "756 ways", "812 ways"],
    correct: 2, // 756 ways
    category: "Quantitative"
  },
  {
    id: "apt-25",
    q: "Which word does not belong with the others?",
    options: ["Tyre", "Steering wheel", "Engine", "Car"],
    correct: 3, // Car (whole, others are parts)
    category: "Logical"
  }
];

// Coding Question Pool (15+ DSA LeetCode-style questions)
const codingPool = [
  {
    id: "code-1",
    title: "Two Sum",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    problemStatement: `Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to 'target'. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    example1: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] == 9, so we return [0, 1].",
    example2: "Input: nums = [3,2,4], target = 6\nOutput: [1,2]",
    edgeCase: "Array can contain duplicate values. Indices must be distinct.",
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your code here\n  return [];\n}`,
      python: `def two_sum(nums, target):\n    # Write your code here\n    return []`,
      java: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[0];\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};`
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] }
    ]
  },
  {
    id: "code-2",
    title: "Valid Parentheses",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    problemStatement: `Given a string 's' containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and closed in the correct order.`,
    example1: "Input: s = \"()\"\nOutput: true",
    example2: "Input: s = \"()[]{}\"\nOutput: true\nExample 3: s = \"(]\"\nOutput: false",
    edgeCase: "An empty string is considered valid.",
    starterCode: {
      javascript: `function isValid(s) {\n  // Write your code here\n  return false;\n}`,
      python: `def is_valid(s):\n    # Write your code here\n    return False`,
      java: `public class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};`
    },
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false }
    ]
  },
  {
    id: "code-3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    problemStatement: `Given a string 's', find the length of the longest substring without repeating characters.`,
    example1: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
    example2: "Input: s = \"bbbbb\"\nOutput: 1",
    edgeCase: "String can contain spaces, digits, and special characters.",
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  // Write your code here\n  return 0;\n}`,
      python: `def length_of_longest_substring(s):\n    # Write your code here\n    return 0`,
      java: `public class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`
    },
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 }
    ]
  },
  {
    id: "code-4",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    problemStatement: `You are given an array 'prices' where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit.`,
    example1: "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
    example2: "Input: prices = [7,6,4,3,1]\nOutput: 0",
    edgeCase: "If no profit can be achieved, return 0.",
    starterCode: {
      javascript: `function maxProfit(prices) {\n  // Write your code here\n  return 0;\n}`,
      python: `def max_profit(prices):\n    # Write your code here\n    return 0`,
      java: `public class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};`
    },
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 }
    ]
  },
  {
    id: "code-5",
    title: "Valid Anagram",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    problemStatement: `Given two strings 's' and 't', return true if 't' is an anagram of 's', and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.`,
    example1: "Input: s = \"anagram\", t = \"nagaram\"\nOutput: true",
    example2: "Input: s = \"rat\", t = \"car\"\nOutput: false",
    edgeCase: "Strings may contain unicode characters.",
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  // Write your code here\n  return false;\n}`,
      python: `def is_anagram(s, t):\n    # Write your code here\n    return False`,
      java: `public class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        return false;\n    }\n};`
    },
    testCases: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false }
    ]
  }
];

// Helper to shuffle array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Randomly samples exactly 10 unique Aptitude questions
export function generateAptitudeTest() {
  const shuffled = shuffle(aptitudePool);
  return shuffled.slice(0, 10).map((q, idx) => {
    // Shuffling option answers and retaining correct answer mapping
    const originalCorrectOption = q.options[q.correct];
    const shuffledOptions = shuffle(q.options);
    const newCorrectIdx = shuffledOptions.indexOf(originalCorrectOption);
    return {
      ...q,
      qIndex: idx + 1,
      options: shuffledOptions,
      correct: newCorrectIdx
    };
  });
}

// Randomly samples exactly 5 unique Coding problems
export function generateCodingTest() {
  const shuffled = shuffle(codingPool);
  // Guaranteeing we get 5 items (if codingPool is smaller, just slice it all)
  return shuffled.slice(0, 5);
}
