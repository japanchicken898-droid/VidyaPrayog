import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

const SkillsGapAnalysisView = ({ 
  activeSubTab = 'Gap Analysis', 
  onSubTabChange, 
  onOpenMCQ 
}) => {
  const [targetRole, setTargetRole] = useState('Cloud & Full-Stack Engineer'); 
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const ROLE_PROFILES = {
    'Cloud & Full-Stack Engineer': {
      requiredSkills: [
        { name: 'React.js', category: 'Frontend', req: 80 },
        { name: 'Node.js', category: 'Backend', req: 85 },
        { name: 'REST APIs', category: 'Backend', req: 80 },
        { name: 'Git & CI/CD', category: 'DevOps', req: 75 },
        { name: 'Docker & Microservices', category: 'DevOps', req: 80 },
        { name: 'System Design & Kubernetes', category: 'Sys Design', req: 75 },
      ]
    }
  };

  const STUDENT_SCORES = {
    'React.js': 94,
    'Node.js': 88,
    'REST APIs': 92,
    'Git & CI/CD': 85,
    'Docker & Microservices': 62,
    'System Design & Kubernetes': 45,
  };

  const IMPACT_WEIGHTS = {
    'Docker & Microservices': 8,
    'System Design & Kubernetes': 14,
  };

  const COURSE_DATA = {
    'Docker & Microservices': { title: 'Docker Containerization Lab', duration: '2.5 hrs', type: 'Sandbox', id: 'Docker Containerization Lab Test' },
    'System Design & Kubernetes': { title: 'System Design Fundamentals', duration: '45 mins', type: 'MCQ Quiz', id: 'System Design Fundamentals Test' }
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

      {(() => {
        if (!targetRole) {
          return (
            <div className="h-[50vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/70">
              <ShieldAlert className="w-12 h-12 text-slate-300 mb-4" />
              <h2 className="text-lg font-bold text-slate-700 mb-2">No Target Role Selected</h2>
              <p className="text-slate-500 mb-6 max-w-sm text-center text-sm">Select a target role in your Career Roadmap to see your personalized gap analysis.</p>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm">
                Select Target Role <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        }

        const profile = ROLE_PROFILES[targetRole];
        if (!profile) return null;

        const verifiedMatches = [];
        const moderateGaps = [];
        const criticalGaps = [];
        const categoryStats = {};

        profile.requiredSkills.forEach(skill => {
          const score = STUDENT_SCORES[skill.name] || 0;
          const req = skill.req;
          const ratio = score / req;
          
          if (!categoryStats[skill.category]) {
            categoryStats[skill.category] = { total: 0, matched: 0, worstGap: 'match' };
          }
          categoryStats[skill.category].total += 1;

          if (ratio >= 1.0) {
            verifiedMatches.push({ ...skill, score });
            categoryStats[skill.category].matched += 1;
          } else if (ratio >= 0.6) {
            moderateGaps.push({ ...skill, score });
            if (categoryStats[skill.category].worstGap !== 'critical') {
              categoryStats[skill.category].worstGap = 'moderate';
            }
          } else {
            criticalGaps.push({ ...skill, score });
            categoryStats[skill.category].worstGap = 'critical';
          }
        });

        const allGaps = [...criticalGaps, ...moderateGaps];
        const gapNames = allGaps.map(g => g.name);
        const sprintDays = allGaps.length <= 2 ? 7 : 14;
        const sprintActions = allGaps.map(g => COURSE_DATA[g.name]).filter(Boolean).slice(0, 3);

        return (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Card: GAP BREAKDOWN */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-left">
                <Target className="w-5 h-5 text-indigo-500" />
                <h2 className="text-base font-extrabold text-slate-800">Competency Gap Breakdown</h2>
              </div>

              <div className="space-y-6">
                {verifiedMatches.length > 0 && (
                  <div className="border border-emerald-200/60 rounded-xl p-4.5 bg-emerald-50/30">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-emerald-100/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-extrabold text-xs text-slate-800">Verified Matches</h3>
                      <span className="px-2 py-0.5 bg-emerald-100/50 border border-emerald-200 text-emerald-700 rounded font-bold text-[9px] ml-auto uppercase">On Track</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                      {verifiedMatches.map(skill => (
                        <div key={skill.name} className="flex flex-col p-2.5 bg-white rounded-lg border border-slate-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] text-left">
                          <span className="font-bold text-slate-700 truncate">{skill.name}</span>
                          <span className="text-emerald-600 font-black text-sm mt-0.5">{skill.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {moderateGaps.length > 0 && (
                  <div className="border border-amber-200 border-l-4 border-l-amber-500 rounded-xl p-4.5 bg-white shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <h3 className="font-extrabold text-xs text-slate-800">Moderate Gaps</h3>
                    </div>
                    <div className="space-y-5">
                      {moderateGaps.map(skill => (
                        <div key={skill.name} className="flex flex-col gap-1.5 text-xs text-slate-600 text-left">
                          <div className="flex justify-between items-end">
                            <span className="font-bold text-slate-700">{skill.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded font-bold text-[9px] uppercase">
                                +{IMPACT_WEIGHTS[skill.name] || 5}% Match Boost
                              </span>
                              <div><span className="text-amber-500 font-bold">{skill.score}%</span> <span className="text-slate-400">/ {skill.req}% req.</span></div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border">
                            <div className="bg-amber-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: isMounted ? `${(skill.score/skill.req)*100}%` : "0%"}}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {criticalGaps.length > 0 && (
                  <div className="border border-rose-200 border-l-4 border-l-rose-500 rounded-xl p-4.5 bg-white shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <h3 className="font-extrabold text-xs text-slate-800">Critical Gaps</h3>
                    </div>
                    <div className="space-y-5">
                      {criticalGaps.map(skill => (
                        <div key={skill.name} className="flex flex-col gap-1.5 text-xs text-slate-600 text-left">
                          <div className="flex justify-between items-end">
                            <span className="font-bold text-slate-700">{skill.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded font-bold text-[9px] uppercase">
                                +{IMPACT_WEIGHTS[skill.name] || 10}% Match Boost
                              </span>
                              <div><span className="text-rose-500 font-bold">{skill.score}%</span> <span className="text-slate-400">/ {skill.req}% req.</span></div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border">
                            <div className="bg-rose-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{width: isMounted ? `${(skill.score/skill.req)*100}%` : "0%"}}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

                        {/* Right Column */}
            <div className="hidden">
               {/* Content removed */}
            </div>
          </div>        );
      })()}

    </div>
  );
};

export default SkillsGapAnalysisView;
