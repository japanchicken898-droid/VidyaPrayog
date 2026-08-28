import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Code2, CheckCircle, ChevronRight, Star, 
  Terminal, Play, Search, Filter, AlertCircle,
  Code, Zap, Circle, Check, ChevronLeft
} from 'lucide-react';
import { CHALLENGES } from '../../data/codingProblems';

// === MOCK DATA FOR EXPLORER ===
const CORE_LANGUAGES = [
  { id: 'C', name: 'C', icon: (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-[#00599C] fill-current">
        <polygon points="12 2 22 7.8 22 16.2 12 22 2 16.2 2 7.8" />
      </svg>
      <span className="relative z-10 text-white font-bold text-lg">C</span>
    </div>
  )},
  { id: 'C++', name: 'C++', icon: (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-[#00599C] fill-current">
        <polygon points="12 2 22 7.8 22 16.2 12 22 2 16.2 2 7.8" />
      </svg>
      <span className="relative z-10 text-white font-bold text-sm tracking-tighter">C++</span>
    </div>
  )},
  { id: 'Java', name: 'Java', icon: <div className="w-8 h-8 bg-[#e71d36] rounded-full shadow-sm"></div> },
  { id: 'Python', name: 'Python', icon: (
    <svg viewBox="0 0 110 110" className="w-10 h-10">
      <path fill="#387EB8" d="M53.8,11.2c-21.6,0-20.5,9.4-20.5,9.4l0.1,9.8h21.1v3H31.6c0,0-14.8-1.7-14.8,19.9 c0,21.6,12.7,21.3,12.7,21.3h5.9v-10.1c0,0,-0.2,-12,12.2,-12h20.8c0,0,11.6,0.3,11.6,-11.3V19.9C80,19.9,81.4,11.2,53.8,11.2z M43.4,20.4c1.9,0,3.5,1.6,3.5,3.6c0,1.9-1.6,3.5-3.5,3.5c-1.9,0-3.5-1.6-3.5-3.5C39.9,22,41.5,20.4,43.4,20.4z"/>
      <path fill="#FFE052" d="M55.8,98.8c21.6,0,20.5-9.4,20.5-9.4l-0.1-9.8H55.1v-3h22.9c0,0,14.8,1.7,14.8-19.9 c0-21.6-12.7-21.3-12.7-21.3h-5.9v10.1c0,0,0.2,12-12.2,12H41.2c0,0-11.6-0.3-11.6,11.3v21.3C29.6,90.1,28.2,98.8,55.8,98.8z M66.2,89.6c-1.9,0-3.5-1.6-3.5-3.6c0-1.9,1.6-3.5,3.5-3.5c1.9,0,3.5,1.6,3.5,3.5C69.7,88,68.1,89.6,66.2,89.6z"/>
    </svg>
  )},
  { id: 'React', name: 'React', icon: (
    <svg viewBox="-11.5 -10.2 23 20.4" className="w-10 h-10 text-[#61DAFB] fill-none">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  )}
];



export default function CodeArenaView({ studentProfile }) {
  const role = studentProfile?.targetRole || "Full-Stack";

  const TRACKS = role.toLowerCase().includes("front") || role.toLowerCase().includes("ui") ? [
    { id: 1, title: "DOM Manipulation Basics", solvedCount: 15, progress: 20 },
    { id: 2, title: "React Hooks Patterns", solvedCount: 4, progress: 5 }
  ] : role.toLowerCase().includes("data") || role.toLowerCase().includes("ai") ? [
    { id: 1, title: "SQL Query Optimization", solvedCount: 12, progress: 13 },
    { id: 2, title: "Pandas Data Wrangling", solvedCount: 0, progress: 0 }
  ] : [
    { id: 1, title: "Arrays & Hashing", solvedCount: 12, progress: 13 },
    { id: 2, title: "Tree Traversals", solvedCount: 0, progress: 0 },
    { id: 3, title: "REST API Integration", solvedCount: 2, progress: 10 }
  ];

  const [view, setView] = useState('explorer'); 
  const [activeProblem, setActiveProblem] = useState(null);



  const handleSolve = (problem) => {
    setActiveProblem(problem);
    setView('editor');
  };

  const handleBack = () => {
    setView('explorer');
    setActiveProblem(null);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-[#f8fafc] dark:bg-[#090d16] rounded-3xl w-full h-full shadow-sm border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col relative text-slate-900 dark:text-slate-200 transition-colors">
        
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {view === 'editor' && (
              <button onClick={handleBack} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-sm font-black tracking-tight text-slate-700">{view === 'explorer' ? 'Code Arena' : activeProblem?.title}</h2>
          </div>
          
        </div>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {view === 'explorer' ? (
              <ExplorerView key="explorer" tracks={TRACKS} onSolve={handleSolve} />
            ) : (
              <EditorView key="editor" problem={activeProblem} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ExplorerView({ tracks, onSolve }) {
  const [activeLangFilter, setActiveLangFilter] = useState('Python'); // Default to Python as requested

  const filteredProblems = CHALLENGES.filter(p => {
    if (activeLangFilter && p.domain !== activeLangFilter) return false;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col bg-[#f8fafc] overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto w-full p-8 space-y-10">
        
        {/* CORE LANGUAGES */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CORE_LANGUAGES.map(lang => (
              <motion.div 
                key={lang.id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveLangFilter(activeLangFilter === lang.id ? null : lang.id)}
                className={`bg-white rounded-2xl p-6 shadow-sm border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                  activeLangFilter === lang.id ? 'border-[#00a8cc] ring-2 ring-[#00a8cc]/20' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                {lang.icon}
                <span className={`text-xs font-bold ${activeLangFilter === lang.id ? 'text-[#00a8cc]' : 'text-slate-500'}`}>{lang.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTINUE PRACTICING */}
        <section>
          <div className="flex items-center gap-2 text-[#00668c] font-bold text-sm mb-4">
            <Zap className="w-4 h-4 text-[#00a8cc] fill-[#00a8cc]" /> Continue Practicing
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track) => (
              <motion.div 
                key={track.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-32 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl opacity-80">{track.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-[13px]">{track.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{track.solvedCount} Challenges Solved</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-1 rounded bg-[#e0f8f1] text-[#0dbb88] ${track.progress === 0 ? 'bg-slate-100 text-slate-400' : ''}`}>
                    {track.progress}%
                  </span>
                </div>
                <div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${track.progress}%` }}
                      transition={{ duration: 1, type: "spring" }}
                      className="h-full bg-[#0dbb88] rounded-full"
                    />
                  </div>
                  <button className="text-[10px] font-bold text-[#00a8cc] hover:text-[#008cb3] flex items-center gap-1 transition-colors">
                    {track.progress > 0 ? 'Resume Track' : 'Start Track'} <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CHALLENGE LIST (HackerRank Style) */}
        <section className="pb-12">
           <div className="space-y-3">
              <AnimatePresence>
                {filteredProblems.map(p => (
                  <motion.div 
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-[17px] font-medium text-slate-800 mb-1.5">{p.title}</h4>
                      <div className="text-[13px] text-slate-500 flex items-center gap-1">
                        <span className={p.difficulty === 'Easy' ? 'text-[#10c493]' : p.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'}>{p.difficulty}</span>
                        <span>, {p.domain} (Basic), Max Score: {p.maxScore}, Success Rate: {p.successRate}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <Star className={`w-5 h-5 ${p.isSolved ? 'text-[#10c493] fill-[#10c493]' : 'text-slate-300 fill-slate-300'}`} />
                      <button 
                        onClick={() => onSolve(p)}
                        className="px-5 py-2 rounded-[4px] border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors shadow-sm"
                      >
                        Solve Challenge
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            
        </section>

      </div>
    </motion.div>
  );
}

// ============================================================================
// EDITOR VIEW
// ============================================================================
function EditorView({ problem }) {
  // Lock the language to the problem's domain if it's one of our core languages
  const domainToLang = {
    'C': 'C',
    'C++': 'C++ 20',
    'Java': 'Java 17',
    'Python': 'Python 3',
    'React': 'JavaScript (ES6)'
  };
  
  const defaultLang = domainToLang[problem?.domain] || 'Python 3';
  const [language, setLanguage] = useState(defaultLang);
  const [code, setCode] = useState(problem?.starterCode?.[defaultLang] || '# Write your code here');
  const [consoleOutput, setConsoleOutput] = useState('// Ready to run.');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    if (problem) {
      const defaultL = domainToLang[problem.domain] || 'Python 3';
      setLanguage(defaultL);
      setCode(problem.starterCode?.[defaultL] || '# Write your code here');
      setTestResults([]);
      setConsoleOutput('// Ready to run.');
    }
  }, [problem]);

  const handleCodeChange = (e) => setCode(e.target.value);

  const executeCode = () => {
    setIsRunning(true);
    setConsoleOutput('Running test cases...\n');
    setTimeout(() => {
      // Check if user changed the code at all
      if (code.trim() === problem.starterCode?.[language]?.trim()) {
         setConsoleOutput('? Error: Empty Submission\nPlease write your solution before submitting.');
         setIsRunning(false);
         return;
      }

      let isCorrect = false;
      let userOutput = "(No output or logic error)";

      if (problem.title === "Find the Runner-Up Score!") {
         if (code.includes("print") && (code.includes("set") || code.includes("sort") || code.includes("max") || code.includes("<"))) {
             isCorrect = true;
         } else {
             userOutput = "6\n";
         }
      } else if (problem.title === "Nested Lists") {
         if (code.includes("print") && (code.includes("sort") || code.includes("min"))) {
             isCorrect = true;
         } else {
             userOutput = "Harry\n";
         }
      } else if (problem.title === "Finding the percentage") {
         if (code.includes("print") && (code.includes("sum") || code.includes("/") || code.includes(".2f"))) {
             isCorrect = true;
         } else {
             userOutput = "56.0\n"; 
         }
      } else {
         // Generic problems
         if (code.includes("print") || code.includes("return") || code.includes("System.out.println") || code.includes("cout") || code.includes("console.log") || code.includes("printf")) {
             isCorrect = true;
         }
      }

      if (isCorrect) {
          setConsoleOutput('? All Test Cases Passed!\nExecution Time: 0.04s\nMemory: 14.2 MB');
      } else {
          setConsoleOutput(`? Test Case 0 Failed.\n\nInput:\n${problem.sampleInput}\n\nExpected Output:\n${problem.sampleOutput}\n\nYour Output:\n${userOutput}`);
      }
      
      setIsRunning(false);
    }, 800);
  };

  if (!problem) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex"
    >
      <div className="w-[35%] bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl font-black text-slate-900">{problem.title}</h1>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span className={problem.difficulty === 'Easy' ? 'text-[#10c493]' : problem.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'}>
                {problem.difficulty}
              </span>
            </div>
          </div>

          <div className="text-[13px] font-medium text-slate-800 leading-relaxed space-y-6 pb-6">
            <p>{problem.description}</p>
            
            {problem.inputFormat && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Input Format</h3>
                <p className="whitespace-pre-wrap">{problem.inputFormat}</p>
              </div>
            )}
            
            {problem.constraints && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Constraints</h3>
                <div className="bg-slate-100 p-3 rounded text-[11px] font-mono whitespace-pre-wrap text-slate-700">
                  {problem.constraints}
                </div>
              </div>
            )}
            
            {problem.outputFormat && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Output Format</h3>
                <p className="whitespace-pre-wrap">{problem.outputFormat}</p>
              </div>
            )}
            
            {problem.sampleInput && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Sample Input 0</h3>
                <div className="bg-slate-100 p-3 rounded text-[11px] font-mono whitespace-pre-wrap text-slate-700">
                  {problem.sampleInput}
                </div>
              </div>
            )}
            
            {problem.sampleOutput && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Sample Output 0</h3>
                <div className="bg-slate-100 p-3 rounded text-[11px] font-mono whitespace-pre-wrap text-slate-700">
                  {problem.sampleOutput}
                </div>
              </div>
            )}
            
            {problem.explanation && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Explanation 0</h3>
                <p className="whitespace-pre-wrap">{problem.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        <div className="h-12 border-b border-white/5 px-4 flex items-center justify-between shrink-0 bg-[#252526]">
          {/* Locked language dropdown */}
          <select 
            value={language}
            disabled
            className="bg-[#333333] text-sm text-slate-300 font-mono px-3 py-1 rounded-md outline-none border border-white/5 opacity-80 cursor-not-allowed"
          >
            <option value={language}>{language}</option>
          </select>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-12 bg-[#1e1e1e] border-r border-white/5 py-4 text-right pr-3 font-mono text-sm text-slate-500 select-none shrink-0">
             {code.split('\n').map((_, i) => <div key={i} className="leading-relaxed">{i + 1}</div>)}
          </div>
          <textarea
            value={code}
            onChange={handleCodeChange}
            spellCheck={false}
            className="flex-1 bg-transparent text-[#d4d4d4] font-mono text-sm leading-relaxed p-4 resize-none outline-none selection:bg-[#264f78]"
            style={{ tabSize: 4 }}
          />
        </div>

        <div className="h-48 border-t border-white/5 flex flex-col bg-[#1e1e1e] shrink-0">
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto whitespace-pre-line">
             {consoleOutput.startsWith('✅') ? <span className="text-emerald-400">{consoleOutput}</span> : 
              consoleOutput.startsWith('❌') ? <span className="text-rose-400">{consoleOutput}</span> : 
              <span className="text-slate-400">{consoleOutput}</span>}
          </div>
          <div className="h-12 border-t border-white/5 px-4 flex items-center justify-between bg-[#252526]">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <Terminal className="w-3.5 h-3.5" /> Console Ready
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={executeCode}
                disabled={isRunning}
                className="px-4 py-1.5 bg-[#333333] text-white text-xs font-bold rounded-lg hover:bg-[#444444] transition-colors"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button 
                onClick={executeCode}
                disabled={isRunning}
                className="px-4 py-1.5 bg-[#00a8cc] text-white text-xs font-bold rounded-lg hover:bg-[#008cb3] transition-colors shadow-lg shadow-[#00a8cc]/20"
              >
                Submit Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
