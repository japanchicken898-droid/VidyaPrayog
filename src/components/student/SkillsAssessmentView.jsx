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
          <button 
            onClick={() => onSubTabChange('Roadmap')}
            className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
              activeSubTab === 'Roadmap' 
                ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`}
          >
            Skill Roadmap
          </button>
        </div>
      <div className="grid grid-cols-12 gap-6">

        {/* Left Column: 3 Assessment Sections */}
        <div className="col-span-12 space-y-7">

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
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-sm font-extrabold text-slate-800">Aptitude</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">15 QUESTIONS  30 MINS</span>
                  </div>
                </div>
                <button
                  onClick={onOpenAptitude}
                  className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:from-emerald-600 hover:to-teal-700 active:scale-95 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  Solve Aptitude &rarr;
                </button>
              </div>

                            {/* Card 2 - Coding Assessment */}
              <div className="group relative bg-gradient-to-r from-violet-50/60 to-indigo-50/40 border border-violet-200/70 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-violet-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-violet-500 to-indigo-600" />
                <div className="flex-1 pl-3">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h3 className="text-sm font-extrabold text-slate-800">Coding Assessment</h3>
                    <span className="px-2.5 py-0.5 bg-violet-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">5 PROBLEMS * PROCTORED BENCHMARK</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Standard baseline evaluation to test algorithmic problem-solving and role-specific coding logic.</p>
                </div>
                <button
                  onClick={onOpenCoding}
                  className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-violet-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:from-violet-700 hover:to-indigo-800 active:scale-95 shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5"
                >
                  Solve Coding Assessment &rarr;
                </button>
              </div>

            </div>
          </section>

          {/* ══════════════════════════════════════════════════ */}

        </div>

      </div>
    </div>
  );
};

export default SkillsAssessmentView;
