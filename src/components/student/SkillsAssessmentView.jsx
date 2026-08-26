import React from 'react';
import { Award, CheckCircle, TrendingUp, AlertTriangle, Brain, Target, Zap, Code2, Database, Cloud, Layers, FlaskConical } from 'lucide-react';

const SkillsAssessmentView = ({ 
  activeSubTab = 'Assessment', 
  onSubTabChange, 
  onOpenMCQ, 
  onOpenUpload, 
  onOpenCert,
  onOpenAptitude,
  onOpenCoding,
  proctoredHistory = []
}) => {

  const glassCard = "bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200";

  return (
    <div className="px-margin-desktop py-stack-md max-w-container-max mx-auto space-y-6">

      {/* Branding Header */}
      <div className="text-left mb-1">
        <p className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">VidyaPrayog | Skill Assessment &amp; Diagnostics</p>
      </div>

      {/* Top Sub-Navigation Tabs */}
      <div className="flex gap-8 border-b border-slate-200/60 px-4 mb-6 relative">
        <button 
          onClick={() => onSubTabChange('Assessment')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
            activeSubTab === 'Assessment' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Assessment
        </button>
        <button 
          onClick={() => onSubTabChange('Profile & Matrix')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
            activeSubTab === 'Profile & Matrix' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Profile &amp; Matrix
        </button>
        <button 
          onClick={() => onSubTabChange('Gap Analysis')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
            activeSubTab === 'Gap Analysis' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Gap Analysis
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className={`${glassCard} p-5 flex flex-col justify-between`}>
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Verified</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-800">14</span>
            <span className="text-xs text-slate-400 font-semibold mb-0.5">Badges</span>
          </div>
        </div>

        <div className={`${glassCard} p-5 flex flex-col justify-between`}>
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Assessments Passed</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-800">8</span>
            <span className="text-xs text-slate-400 font-semibold mb-0.5">Tests</span>
          </div>
        </div>

        <div className={`${glassCard} p-5 flex flex-col justify-between`}>
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Avg. Diagnostic Score</span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shadow-inner">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-800">86%</span>
            <span className="text-xs text-emerald-600 font-bold mb-0.5">+2%</span>
          </div>
        </div>

        <div className="bg-rose-50/70 backdrop-blur-md rounded-2xl border border-rose-100 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-3">
            <span className="text-rose-600 text-[10px] uppercase font-bold tracking-wider">Gaps Identified</span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shadow-inner">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-rose-700">2</span>
            <span className="text-xs text-rose-500 font-bold mb-0.5">Critical Gaps</span>
          </div>
        </div>
      </div>

      {/* ─── Main Layout Grid ─── */}
      <div className="grid grid-cols-12 gap-6">

        {/* Left Column: 3 Assessment Sections */}
        <div className="col-span-12 lg:col-span-8 space-y-7">

          {/* ══════════════════════════════════════════════ */}
          {/* SECTION 1: Foundational Skill Assessments     */}
          {/* ══════════════════════════════════════════════ */}
          <section className={`${glassCard} p-6`}>
            {/* Section Header */}
            <div className="flex items-start justify-between mb-1 text-left">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="text-lg">🧠</span> Foundational Skill Assessments
                  <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 rounded text-[9px] font-black uppercase tracking-wider">Core Placement Filters</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">Standard baseline evaluations to test core logical aptitude and dynamic problem-solving proficiency.</p>
              </div>
            </div>
            <div className="border-t border-slate-100 mt-4 mb-5" />

            <div className="space-y-4">

              {/* Card 1 — Aptitude */}
              <div className="group relative bg-gradient-to-r from-emerald-50/60 to-teal-50/40 border border-emerald-200/70 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                {/* Accent stripe */}
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
                <div className="flex-1 pl-3">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <h3 className="text-sm font-extrabold text-slate-800">Comprehensive Aptitude Diagnostic</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">10 QUESTIONS • 20 MINS</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Quantitative Aptitude, Logical Reasoning &amp; Data Interpretation</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2.5 text-[10px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1">⏱ 20 minutes</span>
                    <span className="flex items-center gap-1">📋 10 Randomized Questions</span>
                    <span className="flex items-center gap-1">🎯 Live Countdown Timer</span>
                  </div>
                </div>
                <button
                  onClick={onOpenAptitude}
                  className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:from-emerald-600 hover:to-teal-700 active:scale-95 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  Launch Aptitude Test
                </button>
              </div>

              {/* Card 2 — Coding Sandbox */}
              <div className="group relative bg-gradient-to-r from-violet-50/60 to-indigo-50/40 border border-violet-200/70 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-violet-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-violet-500 to-indigo-600" />
                <div className="flex-1 pl-3">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <h3 className="text-sm font-extrabold text-slate-800">Core Problem Solving &amp; DSA Sprint</h3>
                    <span className="px-2.5 py-0.5 bg-violet-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">5 PROBLEMS • CODING SANDBOX</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Dynamic test cases on Arrays, Two Pointers, HashMaps, and Stacks</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2.5 text-[10px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1">💻 Live In-Browser IDE</span>
                    <span className="flex items-center gap-1">🧪 Auto Test Case Runner</span>
                    <span className="flex items-center gap-1">📊 Instant Scoring</span>
                  </div>
                </div>
                <button
                  onClick={onOpenCoding}
                  className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-violet-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:from-violet-700 hover:to-indigo-800 active:scale-95 shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Launch Coding Sandbox
                </button>
              </div>

            </div>
          </section>

          {/* ══════════════════════════════════════════════════ */}
          {/* SECTION 2: Target Job Role Preparation Benchmarks */}
          {/* ══════════════════════════════════════════════════ */}
          <section className={`${glassCard} p-6`}>
            <div className="flex items-start justify-between mb-1 text-left">
              <div>
                <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="text-lg">🎯</span> Target Job Role Preparation
                  <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded text-[9px] font-black uppercase tracking-wider">Domain Technical Benchmarks</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">In-depth technical evaluations aligned with specific engineering job profiles to benchmark stack mastery.</p>
              </div>
            </div>
            <div className="border-t border-slate-100 mt-4 mb-5" />

            <div className="grid grid-cols-1 gap-4">

              {/* Role Card 1 — Full-Stack */}
              <div className="group relative bg-white/70 border border-slate-200/80 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-800">Full-Stack Web Architect Diagnostic</h3>
                      <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded text-[9px] font-black uppercase">Advanced</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5 pl-9">Target Role: Full-Stack Engineer</p>
                    <div className="flex flex-wrap gap-1.5 mb-3 pl-9">
                      {['React', 'Node.js', 'RESTful APIs', 'State Architecture'].map(t => (
                        <span key={t} className="px-2 py-0.5 bg-indigo-50/80 border border-indigo-100 rounded-md text-[9px] font-bold text-indigo-600">{t}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-3 pl-9">
                      <span>📋 40 MCQs + 2 Interactive Component Debugging Labs</span>
                      <span className="font-bold text-indigo-500">⏱ 60 mins</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenMCQ('Full-Stack Web Architect Diagnostic')}
                    className="w-full sm:w-auto flex-shrink-0 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5" />
                    Start Role Assessment
                  </button>
                </div>
              </div>

              {/* Role Card 2 — Database */}
              <div className="group relative bg-white/70 border border-slate-200/80 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-800">Database Optimization &amp; SQL Performance Sprint</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded text-[9px] font-black uppercase">Intermediate</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5 pl-9">Target Role: Backend &amp; Data Engineer</p>
                    <div className="flex flex-wrap gap-1.5 mb-3 pl-9">
                      {['PostgreSQL', 'Indexing Strategies', 'Query Optimization', 'Redis'].map(t => (
                        <span key={t} className="px-2 py-0.5 bg-emerald-50/80 border border-emerald-100 rounded-md text-[9px] font-bold text-emerald-600">{t}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-3 pl-9">
                      <span>📋 15 MCQs + 3 Interactive SQL Sandboxes</span>
                      <span className="font-bold text-emerald-500">⏱ 45 mins</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenMCQ('Database Optimization & SQL Performance Sprint')}
                    className="w-full sm:w-auto flex-shrink-0 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5" />
                    Start Role Assessment
                  </button>
                </div>
              </div>

              {/* Role Card 3 — Cloud & DevOps */}
              <div className="group relative bg-white/70 border border-slate-200/80 rounded-xl p-5 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 flex-shrink-0">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-800">Cloud Infrastructure &amp; DevOps Benchmark</h3>
                      <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-600 rounded text-[9px] font-black uppercase">Intermediate</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5 pl-9">Target Role: Cloud / DevOps Engineer</p>
                    <div className="flex flex-wrap gap-1.5 mb-3 pl-9">
                      {['Docker', 'Kubernetes', 'CI/CD', 'AWS Architecture'].map(t => (
                        <span key={t} className="px-2 py-0.5 bg-sky-50/80 border border-sky-100 rounded-md text-[9px] font-bold text-sky-600">{t}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-3 pl-9">
                      <span>📋 20 Scenario MCQs + Dockerfile Validation</span>
                      <span className="font-bold text-sky-500">⏱ 45 mins</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenMCQ('Cloud Infrastructure & DevOps Benchmark')}
                    className="w-full sm:w-auto flex-shrink-0 bg-sky-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-sky-700 active:scale-95 shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5" />
                    Start Role Assessment
                  </button>
                </div>
              </div>

              {/* Role Card 4 — System Design */}
              <div className="group relative bg-white/70 border border-slate-200/80 rounded-xl p-5 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 flex-shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-800">High-Throughput System Design</h3>
                      <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-600 rounded text-[9px] font-black uppercase">Advanced</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5 pl-9">Target Role: Distributed Systems Engineer</p>
                    <div className="flex flex-wrap gap-1.5 mb-3 pl-9">
                      {['Microservices', 'Kafka / RabbitMQ', 'Caching', 'Load Balancing'].map(t => (
                        <span key={t} className="px-2 py-0.5 bg-amber-50/80 border border-amber-100 rounded-md text-[9px] font-bold text-amber-600">{t}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-3 pl-9">
                      <span>📋 10 Architecture Case Studies</span>
                      <span className="font-bold text-amber-500">⏱ 50 mins</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenMCQ('High-Throughput System Design')}
                    className="w-full sm:w-auto flex-shrink-0 bg-amber-500 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-amber-600 active:scale-95 shadow-md shadow-amber-400/20 transition-all flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5" />
                    Start Role Assessment
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* ══════════════════════════════════════════════ */}
          {/* SECTION 3: Modular Quick Practice Quizzes     */}
          {/* ══════════════════════════════════════════════ */}
          <section className={`${glassCard} p-6`}>
            <div className="text-left mb-1">
              <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                <span className="text-lg">🧩</span> Modular Quick Practice Quizzes
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Rapid individual skill checks for focused practice on key technologies.</p>
            </div>
            <div className="border-t border-slate-100 mt-4 mb-5" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Quiz 1 — React.js Ecosystem */}
              <div className="bg-white/70 border border-slate-200/80 rounded-xl p-4 text-left group hover:border-indigo-300 hover:shadow-sm transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">React.js Ecosystem</h4>
                  </div>
                  <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-[8px] font-black text-indigo-600 uppercase">Level 3</span>
                </div>
                <div className="flex gap-1 mb-1">
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Best: <strong className="text-emerald-600 font-extrabold">88%</strong></span>
                  <button onClick={() => onOpenMCQ('React.js Ecosystem Quiz')} className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                    Retake ➔
                  </button>
                </div>
              </div>

              {/* Quiz 2 — Node.js Internals */}
              <div className="bg-white/70 border border-slate-200/80 rounded-xl p-4 text-left group hover:border-violet-300 hover:shadow-sm transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-violet-100 rounded-lg flex items-center justify-center">
                      <FlaskConical className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">Node.js Internals</h4>
                  </div>
                  <span className="px-1.5 py-0.5 bg-violet-50 border border-violet-100 rounded text-[8px] font-black text-violet-600 uppercase">Level 1</span>
                </div>
                <div className="flex gap-1 mb-1">
                  <div className="h-1.5 w-full rounded-full bg-violet-400 animate-pulse" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Best: --</span>
                  <button onClick={() => onOpenMCQ('Node.js Internals Quiz')} className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                    Start ➔
                  </button>
                </div>
              </div>

              {/* Quiz 3 — PostgreSQL Advanced */}
              <div className="bg-white/70 border border-slate-200/80 rounded-xl p-4 text-left group hover:border-emerald-300 hover:shadow-sm transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">PostgreSQL Advanced</h4>
                  </div>
                  <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded text-[8px] font-black text-emerald-600 uppercase">Level 4</span>
                </div>
                <div className="flex gap-1 mb-1">
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Best: <strong className="text-emerald-600 font-extrabold">94%</strong></span>
                  <button onClick={() => onOpenMCQ('PostgreSQL Advanced Quiz')} className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                    Retake ➔
                  </button>
                </div>
              </div>

              {/* Quiz 4 — Docker Essentials */}
              <div className="bg-white/70 border border-slate-200/80 rounded-xl p-4 text-left group hover:border-sky-300 hover:shadow-sm transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center">
                      <FlaskConical className="w-3.5 h-3.5 text-sky-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">Docker Essentials</h4>
                  </div>
                  <span className="px-1.5 py-0.5 bg-sky-50 border border-sky-100 rounded text-[8px] font-black text-sky-600 uppercase">Level 2</span>
                </div>
                <div className="flex gap-1 mb-1">
                  <div className="h-1.5 w-full rounded-full bg-sky-400" />
                  <div className="h-1.5 w-full rounded-full bg-sky-400" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Best: <strong className="text-slate-700 font-extrabold">62%</strong></span>
                  <button onClick={() => onOpenMCQ('Docker Essentials Quiz')} className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                    Retake ➔
                  </button>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* ─── Right Column: History + Upload ─── */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          <div className={`${glassCard} p-6`}>
            <h3 className="text-sm font-extrabold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 text-left">
              📜 Proctored Test History
            </h3>
            <div className="space-y-4">
              {proctoredHistory.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 pb-4 border-b border-slate-100 last:border-0 last:pb-0 text-left">
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-xs text-indigo-900 leading-tight">{item.title}</h4>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap font-bold">{item.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 border rounded font-bold text-[9px] ${
                        item.score >= 80 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                          : 'bg-amber-50 border-amber-200 text-amber-700'
                      }`}>{item.score}%</span>
                      <span className={`text-[9px] font-bold ${
                        item.score >= 80 ? 'text-emerald-600' : 'text-slate-500'
                      }`}>{item.badge}</span>
                    </div>
                    {item.status === 'cert' ? (
                      <button 
                        onClick={() => onOpenCert(item.details)}
                        className="text-[10px] font-bold text-indigo-600 hover:underline hover:text-indigo-700"
                      >
                        View Cert
                      </button>
                    ) : item.status === 'solutions' ? (
                      <button 
                        onClick={() => alert(`Reviewing Solution Trace for: "${item.title}". Solutions verified.`)}
                        className="text-[10px] font-bold text-indigo-600 hover:underline hover:text-indigo-700"
                      >
                        [Inspect Code]
                      </button>
                    ) : (
                      <button 
                        onClick={() => alert(item.details)}
                        className="text-[9px] font-bold text-slate-400 cursor-not-allowed"
                      >
                        Retake Avail.
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Endorsement Upload */}
          <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 shadow-sm text-center hover:shadow-md transition-all duration-200">
            <h4 className="font-extrabold text-xs text-indigo-950 mb-1.5">Request Endorsement Uploads</h4>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">Validate a niche certificate or course. Drag and drop file credentials for Faculty review.</p>
            <button 
              onClick={onOpenUpload}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/10 active:scale-95 transition-all"
            >
              Upload &amp; Request
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SkillsAssessmentView;
