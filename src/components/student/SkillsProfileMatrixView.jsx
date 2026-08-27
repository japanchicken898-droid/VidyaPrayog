import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Flame, Plus } from 'lucide-react';
import SkillDomainChart from './SkillDomainChart';

const SkillsProfileMatrixView = ({ 
  activeSubTab = 'Profile & Matrix', 
  onSubTabChange, 
  onOpenUpload 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMounted, setIsMounted] = useState(false);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const benchmarkData = [
    { skill: 'Python', user: 56, industry: 68 },
    { skill: 'SQL', user: 64, industry: 60 },
    { skill: 'Java', user: 30, industry: 53 },
    { skill: 'React', user: 68, industry: 64 },
    { skill: 'AWS', user: 15, industry: 56 },
  ];

  const categories = [
    { id: 'All', name: 'All Skills' },
    { id: 'Frontend', name: 'Frontend' },
    { id: 'Backend', name: 'Backend & APIs' },
    { id: 'DevOps', name: 'DevOps & Cloud' },
    { id: 'Databases', name: 'Databases' },
    { id: 'CoreCS', name: 'Core CS' }
  ];

  const skillsList = [
    { name: "Python", category: "Backend", level: "Intermediate", score: 56, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" },
    { name: "SQL", category: "Databases", level: "Advanced", score: 64, status: "Verified", statusText: "Verified via Lab Exam", color: "bg-emerald-500" },
    { name: "FastAPI", category: "Backend", level: "Expert", score: 85, status: "Verified", statusText: "Verified via Assessment", color: "bg-emerald-500" },
    { name: "Kubernetes", category: "DevOps", level: "Developing", score: 35, status: "Pending", statusText: "Assessment Pending", color: "bg-rose-500" },
    { name: "React.js", category: "Frontend", level: "Expert", score: 94, status: "Verified", statusText: "Verified via Proctored Diagnostic", color: "bg-emerald-500" },
    { name: "Node.js", category: "Backend", level: "Advanced", score: 88, status: "Verified", statusText: "Verified via Assessment", color: "bg-emerald-500" },
    { name: "Docker", category: "DevOps", level: "Intermediate", score: 62, status: "Pending", statusText: "Self-Assessed + Lab in progress", color: "bg-amber-500" },
  ];

  const filteredSkills = skillsList.filter(skill => {
    if (selectedCategory === 'All') return true;
    return skill.category === selectedCategory;
  });

  useEffect(() => {
    if (!isMounted) return;
    const duration = 800; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      
      const newCounters = {};
      skillsList.forEach(skill => {
        newCounters[skill.name] = Math.floor(skill.score * progress);
      });
      setCounters(newCounters);

      if (progress >= 1) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isMounted]);

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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* "Your Level vs Industry Benchmark" Grouped Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm text-left flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <h3 className="font-extrabold text-slate-800 text-base">Your Level vs Industry Benchmark</h3>
              <div className="flex gap-4 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>Your Level</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div>Industry</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-around h-48 pt-4 border-b border-slate-100 pb-2">
            {benchmarkData.map((data, index) => {
              const delay = index * 80;
              return (
                <div key={data.skill} className="flex flex-col items-center gap-2 group relative">
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl pointer-events-none z-10 w-36 flex flex-col gap-1.5 transform -translate-y-2 group-hover:-translate-y-4">
                    <div className="flex justify-between"><span>Your Level:</span><span className="font-bold">{data.user}%</span></div>
                    <div className="flex justify-between text-slate-300"><span>Industry:</span><span>{data.industry}%</span></div>
                    <div className={`mt-1 pt-1 border-t border-slate-600 font-bold ${data.user >= data.industry ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {data.user >= data.industry ? `+${data.user - data.industry}% Ahead` : `-${data.industry - data.user}% Gap`}
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                  </div>

                  <div className="flex items-end gap-1.5 h-40">
                    {/* User Bar */}
                    <div className="w-8 bg-indigo-500 rounded-t-md relative transition-all duration-200 hover:brightness-110 hover:scale-y-[1.03] group-hover:bg-indigo-400 origin-bottom"
                         style={{ 
                           height: isMounted ? `${data.user}%` : '0%',
                           transition: `height 800ms cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}ms` 
                         }}
                    ></div>
                    {/* Industry Bar */}
                    <div className="w-8 bg-slate-200 rounded-t-md relative transition-all duration-200 hover:brightness-95 hover:scale-y-[1.03] origin-bottom"
                         style={{ 
                           height: isMounted ? `${data.industry}%` : '0%',
                           transition: `height 800ms cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}ms`
                         }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600 mt-2">{data.skill}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill Domain Distribution Donut Chart */}
        <SkillDomainChart />
      </div>

      <h3 className="font-extrabold text-slate-800 text-lg text-left mb-4">Competency Matrix</h3>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-4 scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills Matrix Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <div 
            key={skill.name} 
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer text-left flex flex-col"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? 'translateY(0)' : 'translateY(15px)',
              transition: `opacity 400ms ease-out ${index * 80}ms, transform 400ms ease-out ${index * 80}ms, box-shadow 200ms, border-color 200ms`
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-extrabold text-sm text-slate-800">{skill.name}</h4>
              {skill.status === 'Verified' && (
                <div 
                  className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
                  style={{
                    transform: isMounted ? 'scale(1)' : 'scale(0)',
                    transition: `transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80 + 300}ms`
                  }}
                  title="Verified Skill"
                >
                  <CheckCircle className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
              )}
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Proficiency Score</span>
                <span className="text-indigo-600">{counters[skill.name] || 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full ${skill.color} rounded-full`}
                  style={{ 
                    width: isMounted ? `${skill.score}%` : '0%',
                    transition: `width 800ms ease-out ${index * 80 + 100}ms`
                  }}
                ></div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-auto pt-3 border-t border-slate-100">{skill.statusText}</p>
          </div>
        ))}
        
        {/* Add New Skill Card */}
        <div 
          className="flex items-center justify-center bg-slate-50/50 p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-colors duration-300 cursor-pointer text-left min-h-[140px]"
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? 'translateY(0)' : 'translateY(15px)',
            transition: `all 400ms ease-out ${filteredSkills.length * 80}ms`
          }}
          onClick={onOpenUpload}
        >
          <div className="flex flex-col items-center gap-2 text-indigo-500">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wide">Add New Skill</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SkillsProfileMatrixView;
