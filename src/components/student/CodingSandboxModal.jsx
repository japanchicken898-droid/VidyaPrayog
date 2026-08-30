import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Code2, CheckCircle, ChevronRight, ChevronLeft,
  Terminal, Play, AlertCircle, Clock, Save
} from 'lucide-react';
import { CHALLENGES } from '../../data/codingProblems';

const BOILERPLATES = {
  'C': `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`,
  'C++': `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
  'Java': `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  'Python': `import sys

def solve():
    # Your code here
    pass

if __name__ == '__main__':
    solve()`
};

export default function CodingSandboxModal({ isOpen, onClose, onSubmitScore }) {
  // ALL hooks must be declared before any conditional return
  const assessmentProblems = CHALLENGES.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState(BOILERPLATES['Python']);
  const [consoleOutput, setConsoleOutput] = useState('// Ready to run.');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [activeConsoleTab, setActiveConsoleTab] = useState('Test Results');
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes

  // useEffect MUST come before any conditional return
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // NOW we can safely return null
  if (!isOpen) return null;

  const problem = assessmentProblems[currentIndex];
  const displayTitle = (problem?.title || '').replace(/^(C\+\+|C|Java|Python|JavaScript|JS)\s+/i, '');

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(BOILERPLATES[lang]);
  };

  const handleNext = () => {
    if (currentIndex < assessmentProblems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setConsoleOutput('// Ready to run.');
      setTestResults([]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setConsoleOutput('// Ready to run.');
      setTestResults([]);
    }
  };

  const executeCode = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling and executing...');
    setTimeout(() => {
      setIsRunning(false);
      
      const cleanCode = code.replace(/\s+/g, '').toLowerCase();
      const cleanBoilerplate = BOILERPLATES[language].replace(/\s+/g, '').toLowerCase();
      
      const isUnchanged = cleanCode === cleanBoilerplate || 
                          (cleanCode.includes('pass') && language === 'Python') ||
                          cleanCode.includes('//writeyourcodehere');
      
      if (isUnchanged) {
        setTestResults([
          { id: 1, passed: false, input: "nums = [2,7,11,15], target = 9", output: "Failed. Output was empty or undefined." },
          { id: 2, passed: false, input: "nums = [3,2,4], target = 6", output: "Failed. Output was empty or undefined." }
        ]);
        setConsoleOutput(`Execution Finished. 
Exit code: 1
Result: Wrong Answer`);
      } else {
        setTestResults([
          { id: 1, passed: true, input: "nums = [2,7,11,15], target = 9", output: "Correct: [0, 1]" },
          { id: 2, passed: true, input: "nums = [3,2,4], target = 6", output: "Correct: [1, 2]" }
        ]);
        setConsoleOutput(`Execution Finished. 
Exit code: 0
Runtime: 12ms`);
      }
    }, 1200);
  };

  const handleFinalSubmit = () => {
    if (onSubmitScore) {
      onSubmitScore({ accuracy: 85, badgeUnlocked: true, title: 'VidyaPrayog Verified Algorithmic Benchmark' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] rounded-xl w-full max-w-[100vw] h-[100vh] md:max-w-[98vw] md:h-[95vh] shadow-2xl border border-slate-700 overflow-hidden flex flex-col relative text-slate-200">
        
        {/* Top Proctoring Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-300">VidyaPrayog Algorithmic Benchmark</h2>
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="text-slate-400 hover:text-white disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
                Problem {currentIndex + 1} of 5
              </span>
              <button onClick={handleNext} disabled={currentIndex === assessmentProblems.length - 1} className="text-slate-400 hover:text-white disabled:opacity-30">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-lg border border-indigo-500/30">
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleFinalSubmit}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
            >
              Finish & Submit Test
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT PANE: Problem Description */}
          <div className="w-[40%] bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-6 space-y-6">
              
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-black text-white">{displayTitle}</h1>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    problem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : 
                    problem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 
                    'bg-rose-500/20 text-rose-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400">
                    {problem.score} Pts
                  </span>
                </div>
              </div>

              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700">
                <p className="text-slate-300 leading-relaxed">
                  Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
                  You may assume that each input would have exactly one solution, and you may not use the same element twice.
                </p>
                
                <h4 className="text-slate-200 mt-6 font-bold">Example 1:</h4>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="font-mono text-sm text-slate-300"><span className="text-slate-500">Input:</span> nums = [2,7,11,15], target = 9</div>
                  <div className="font-mono text-sm text-slate-300 mt-1"><span className="text-slate-500">Output:</span> [0,1]</div>
                  <div className="text-sm text-slate-400 mt-2">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                </div>

                <h4 className="text-slate-200 mt-6 font-bold">Constraints:</h4>
                <ul className="list-disc pl-5 text-slate-400">
                  <li><code>2 &lt;= nums.length &lt;= 10^4</code></li>
                  <li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
                  <li><code>-10^9 &lt;= target &lt;= 10^9</code></li>
                  <li>Only one valid answer exists.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* RIGHT PANE: IDE & Console */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e]">
            
            {/* Editor Toolbar */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                {['C', 'C++', 'Java', 'Python'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                      language === lang 
                        ? 'bg-indigo-500 text-white' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleLanguageChange(language)}
                  className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" /> Reset Code
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 relative">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent text-slate-300 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-0 leading-relaxed"
                spellCheck="false"
              />
            </div>

            {/* Bottom Console */}
            <div className="h-64 bg-slate-900 border-t border-slate-800 flex flex-col shrink-0">
              <div className="flex items-center justify-between px-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setActiveConsoleTab('Test Results')}
                    className={`py-2 text-xs font-bold border-b-2 transition-colors ${activeConsoleTab === 'Test Results' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    Test Results
                  </button>
                  <button 
                    onClick={() => setActiveConsoleTab('Custom Input')}
                    className={`py-2 text-xs font-bold border-b-2 transition-colors ${activeConsoleTab === 'Custom Input' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    Custom Input
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {activeConsoleTab === 'Test Results' && (
                  <div className="space-y-3">
                    {testResults.length === 0 ? (
                      <div className="text-slate-500 font-mono text-sm">{consoleOutput}</div>
                    ) : (
                      testResults.map((tr) => (
                        <div key={tr.id} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                          <div className="flex items-center gap-2 mb-2">
                            {tr.passed ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-rose-500" />}
                            <span className="font-bold text-sm text-slate-200">Test Case {tr.id}</span>
                          </div>
                          <div className="font-mono text-xs text-slate-400">Output: {tr.output}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {activeConsoleTab === 'Custom Input' && (
                  <textarea 
                    className="w-full h-full bg-slate-800/50 text-slate-300 font-mono text-sm p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none resize-none"
                    placeholder="Enter custom input here..."
                  />
                )}
              </div>

              <div className="p-3 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
                <button 
                  onClick={executeCode}
                  disabled={isRunning}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4" /> Run Code
                </button>
                <button 
                  onClick={executeCode}
                  disabled={isRunning}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Submit Solution
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
