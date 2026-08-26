import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

const SkillsGapAnalysisView = ({ 
  activeSubTab = 'Gap Analysis', 
  onSubTabChange, 
  overallMatch,
  roleMatch,
  onOpenMCQ 
}) => {
  const [targetRole, setTargetRole] = useState('Cloud & Full-Stack Engineer - TCS Alignment');
  const [localMatch, setLocalMatch] = useState(82);

  const handleRoleChange = (role) => {
    setTargetRole(role);
    if (role.includes('Cloud & Full-Stack')) {
      setLocalMatch(82);
    } else if (role.includes('Frontend Developer')) {
      setLocalMatch(94);
    } else if (role.includes('Data Engineer')) {
      setLocalMatch(68);
    }
  };

  return (
    <div className="px-margin-desktop py-stack-md max-w-container-max mx-auto space-y-6">
      
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

      {/* Target Selector Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm gap-4">
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Analyzing benchmark</span>
            <div className="flex items-center gap-2 mt-1">
              <select 
                value={targetRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="bg-transparent font-extrabold text-sm text-indigo-905 border-none p-0 focus:ring-0 cursor-pointer pr-6 outline-none"
              >
                <option value="Cloud & Full-Stack Engineer - TCS Alignment">Target Role: Cloud &amp; Full-Stack Engineer - TCS Alignment</option>
                <option value="Senior Frontend Developer - Infosys">Target Role: Senior Frontend Developer - Infosys</option>
                <option value="Data Engineer - Wipro">Target Role: Data Engineer - Wipro</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3.5 bg-slate-50 border p-3 rounded-2xl">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="transform -rotate-90 w-12 h-12">
              <circle className="text-slate-200" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4.5"></circle>
              <circle className="text-emerald-500" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" 
                      strokeDasharray="125" 
                      strokeDashoffset={125 * (1 - (localMatch + (roleMatch - 82)) / 100)} 
                      strokeWidth="4.5"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-extrabold text-[12px] text-emerald-600">
              {Math.min(localMatch + (roleMatch - 82), 100)}%
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-none">Role Match Index</span>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              ⚡ Trending Up
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout Gaps Breakdown */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Gaps Breakdown Details (60%) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <section className="bg-white border border-slate-200/70 p-6 rounded-2xl shadow-sm text-left">
            <h2 className="text-base font-extrabold text-slate-800 mb-5">Competency Gap Breakdown</h2>
            <div className="space-y-5">
              
              {/* Matches */}
              <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-extrabold text-xs text-slate-800">Verified Matches</h3>
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded font-bold text-[9px] ml-auto uppercase">On Track</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-100"><span>React.js</span><span className="text-emerald-600 font-bold">94%</span></div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-100"><span>Node.js</span><span className="text-emerald-600 font-bold">88%</span></div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-100"><span>REST APIs</span><span className="text-emerald-600 font-bold">92%</span></div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-100"><span>Git &amp; CI/CD</span><span className="text-emerald-600 font-bold">85%</span></div>
                </div>
              </div>

              {/* Moderate */}
              <div className="border border-slate-200 border-l-4 border-l-amber-500 rounded-xl p-4.5 bg-white">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h3 className="font-extrabold text-xs text-slate-800">Moderate Gaps</h3>
                  <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded font-bold text-[9px] ml-auto uppercase">+8% Match Boost</span>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-slate-700">Docker &amp; Microservices</span>
                      <div><span className="text-amber-500 font-bold">62%</span> <span className="text-slate-400">/ 80% req.</span></div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border">
                      <div className="bg-amber-500 h-2 rounded-full transition-all" style={{"width": "62%"}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical */}
              <div className="border border-slate-200 border-l-4 border-l-rose-500 rounded-xl p-4.5 bg-white">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <h3 className="font-extrabold text-xs text-slate-800">Critical Gaps</h3>
                  <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded font-bold text-[9px] ml-auto uppercase">+14% Match Boost</span>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-slate-700">System Design &amp; Kubernetes</span>
                      <div><span className="text-rose-500 font-bold">45%</span> <span className="text-slate-400">/ 75% req.</span></div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border">
                      <div className="bg-rose-500 h-2 rounded-full transition-all" style={{"width": "45%"}}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Sprint Planner & Chart (40%) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          
          <div className="bg-indigo-950 text-white rounded-2xl border border-indigo-900 p-6 shadow-sm text-left relative overflow-hidden group">
            {/* Glow orb */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400 fill-indigo-400" />
              <h3 className="text-sm font-extrabold text-white">AI-Curated 7-Day Sprint</h3>
            </div>
            
            <p className="text-xs text-indigo-200 mb-5 leading-relaxed">Targeted path to close critical system architecture and orchestration gaps.</p>
            
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 flex items-center justify-between border border-white/5 shadow-sm">
                <div className="text-left">
                  <h4 className="font-bold text-xs text-white leading-tight">Docker Containerization Lab</h4>
                  <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-wider mt-1">2.5 hrs • Sandbox</p>
                </div>
                <button 
                  onClick={() => onOpenMCQ('Docker Containerization Lab Test')}
                  className="bg-white hover:bg-slate-100 text-indigo-955 px-4 py-2 rounded-lg font-bold text-xs active:scale-95 transition-all shadow-md"
                >
                  Start Lab
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 flex items-center justify-between border border-white/5 shadow-sm">
                <div className="text-left">
                  <h4 className="font-bold text-xs text-white leading-tight">System Design Fundamentals</h4>
                  <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-wider mt-1">45 mins • MCQ Quiz</p>
                </div>
                <button 
                  onClick={() => onOpenMCQ('System Design Fundamentals Test')}
                  className="bg-transparent hover:bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-bold text-xs active:scale-95 transition-all"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Skill demand benchmarks */}
          <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm text-left">
            <h3 className="text-xs font-extrabold text-slate-800 mb-4 uppercase tracking-wider">Skill Demand Ratio Analysis</h3>
            <div className="space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-20 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Frontend</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full relative overflow-hidden flex border">
                  <div className="h-full bg-emerald-500 rounded-l-full" style={{"width": "90%"}}></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-20 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Backend</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full relative overflow-hidden flex border">
                  <div className="h-full bg-emerald-500 rounded-l-full" style={{"width": "85%"}}></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-20 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">DevOps</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full relative overflow-hidden flex border">
                  <div className="h-full bg-amber-500 rounded-l-full" style={{"width": "65%"}}></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-20 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Sys Design</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full relative overflow-hidden flex border">
                  <div className="h-full bg-rose-500 rounded-l-full" style={{"width": "45%"}}></div>
                </div>
              </div>

            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 block"></span> Matched</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 block"></span> Developing</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 block"></span> Critical Gap</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SkillsGapAnalysisView;
