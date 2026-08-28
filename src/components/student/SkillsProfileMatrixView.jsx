import React, { useState, useEffect } from 'react';
import { CHALLENGES } from '../../data/codingProblems';
import { Award, CheckCircle, Flame, Plus } from 'lucide-react';
import SkillDomainChart from './SkillDomainChart';

const SkillsProfileMatrixView = ({ 
  studentProfile, 
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



  const role = studentProfile?.targetRole || 'Full-Stack Developer';
  const isFrontend = role.toLowerCase().includes('front') || role.toLowerCase().includes('ui');
  const isDataAI = role.toLowerCase().includes('ai') || role.toLowerCase().includes('data');

  const categories = isFrontend ? [
    { id: 'All', name: 'Role Skills' },
    { id: 'UI', name: 'UI & Styling' },
    { id: 'JS', name: 'JavaScript Ecosystem' },
    { id: 'CoreCS', name: 'Core CS' }
  ] : isDataAI ? [
    { id: 'All', name: 'Role Skills' },
    { id: 'ML', name: 'Machine Learning' },
    { id: 'Data', name: 'Data Engineering' },
    { id: 'CoreCS', name: 'Core CS' }
  ] : [
    { id: 'All', name: 'Role Skills' },
    { id: 'Frontend', name: 'Frontend' },
    { id: 'Backend', name: 'Backend & APIs' },
    { id: 'DevOps', name: 'DevOps & Cloud' },
    { id: 'Databases', name: 'Databases' },
    { id: 'CoreCS', name: 'Core CS' }
  ];

  const skillsList = isFrontend ? [
    { name: "React.js", category: "JS", level: "Expert", score: 94, status: "Verified", statusText: "Verified via Diagnostic", color: "bg-emerald-500" },
    { name: "CSS/Tailwind", category: "UI", level: "Advanced", score: 85, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" },
    { name: "JavaScript", category: "JS", level: "Advanced", score: 88, status: "Verified", statusText: "Verified via Lab", color: "bg-emerald-500" },
    { name: "System Design", category: "CoreCS", level: "Intermediate", score: 62, status: "Pending", statusText: "Assessment Pending", color: "bg-amber-500" }
  ] : isDataAI ? [
    { name: "Python", category: "Data", level: "Expert", score: 92, status: "Verified", statusText: "Verified via Diagnostic", color: "bg-emerald-500" },
    { name: "PyTorch", category: "ML", level: "Developing", score: 45, status: "Pending", statusText: "Assessment Pending", color: "bg-rose-500" },
    { name: "SQL", category: "Data", level: "Advanced", score: 84, status: "Verified", statusText: "Verified via Lab", color: "bg-emerald-500" },
    { name: "Algorithms", category: "CoreCS", level: "Advanced", score: 80, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" }
  ] : [
    { name: "Python", category: "Backend", level: "Intermediate", score: 56, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" },
    { name: "SQL", category: "Databases", level: "Advanced", score: 64, status: "Verified", statusText: "Verified via Lab Exam", color: "bg-emerald-500" },
    { name: "FastAPI", category: "Backend", level: "Expert", score: 85, status: "Verified", statusText: "Verified via Assessment", color: "bg-emerald-500" },
    { name: "Kubernetes", category: "DevOps", level: "Developing", score: 35, status: "Pending", statusText: "Assessment Pending", color: "bg-rose-500" },
    { name: "React.js", category: "Frontend", level: "Expert", score: 94, status: "Verified", statusText: "Verified via Proctored Diagnostic", color: "bg-emerald-500" },
    { name: "Node.js", category: "Backend", level: "Advanced", score: 88, status: "Verified", statusText: "Verified via Assessment", color: "bg-emerald-500" },
    { name: "Docker", category: "DevOps", level: "Intermediate", score: 62, status: "Pending", statusText: "Self-Assessed + Lab in progress", color: "bg-amber-500" }
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

      {/* Charts Grid */}
      <div className="mb-10">
        <div className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col md:flex-row items-center gap-16 justify-center">
          
          {/* Circular Progress */}
          <div className="relative flex items-center justify-center">
            <svg width="180" height="180" className="transform -rotate-90">
              <circle cx="90" cy="90" r="80" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle 
                cx="90" cy="90" r="80" 
                fill="none" 
                stroke="#ffc01e" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray="502.6"
                strokeDashoffset={isMounted ? 502.6 - (Math.round((CHALLENGES.filter(c => c.isSolved).length / CHALLENGES.length) * 100) / 100) * 502.6 : 502.6}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-1 text-slate-800">
                <span className="text-[40px] leading-none font-black tracking-tighter">{CHALLENGES.filter(c => c.isSolved).length}</span>
                <span className="text-sm font-bold text-slate-400">/{CHALLENGES.length}</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-slate-500 font-bold text-[13px]">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Solved
              </div>
            </div>
          </div>

          {/* Stats List */}
          <div className="flex flex-col gap-4 w-full max-w-[340px]">
            {/* Easy */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[13px] font-bold text-[#00b8a3]">Easy</span>
                <span className="text-[13px] font-bold text-slate-700">{CHALLENGES.filter(c => c.difficulty === 'Easy' && c.isSolved).length}<span className="text-slate-400 font-medium">/{CHALLENGES.filter(c => c.difficulty === 'Easy').length}</span></span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00b8a3] h-full transition-all duration-1000 ease-out" style={{ width: isMounted ? `${(CHALLENGES.filter(c => c.difficulty === 'Easy' && c.isSolved).length / CHALLENGES.filter(c => c.difficulty === 'Easy').length) * 100}%` : '0%' }}></div>
              </div>
            </div>
            
            {/* Medium */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[13px] font-bold text-[#ffc01e]">Med.</span>
                <span className="text-[13px] font-bold text-slate-700">{CHALLENGES.filter(c => c.difficulty === 'Medium' && c.isSolved).length}<span className="text-slate-400 font-medium">/{CHALLENGES.filter(c => c.difficulty === 'Medium').length}</span></span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ffc01e] h-full transition-all duration-1000 ease-out" style={{ width: isMounted ? `${(CHALLENGES.filter(c => c.difficulty === 'Medium' && c.isSolved).length / CHALLENGES.filter(c => c.difficulty === 'Medium').length) * 100}%` : '0%' }}></div>
              </div>
            </div>

            {/* Hard */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[13px] font-bold text-[#ef4743]">Hard</span>
                <span className="text-[13px] font-bold text-slate-700">{CHALLENGES.filter(c => c.difficulty === 'Hard' && c.isSolved).length}<span className="text-slate-400 font-medium">/{CHALLENGES.filter(c => c.difficulty === 'Hard').length}</span></span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ef4743] h-full transition-all duration-1000 ease-out" style={{ width: isMounted ? `${(CHALLENGES.filter(c => c.difficulty === 'Hard' && c.isSolved).length / CHALLENGES.filter(c => c.difficulty === 'Hard').length) * 100}%` : '0%' }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>

            <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-slate-800 text-lg text-left">Competency Matrix</h3>
        <button 
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Upload Certificate / Badges
        </button>
      </div>

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
