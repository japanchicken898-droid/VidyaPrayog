import React, { useState } from 'react';
import { Award, CheckCircle, Flame, Plus } from 'lucide-react';

const SkillsProfileMatrixView = ({ 
  activeSubTab = 'Profile & Matrix', 
  onSubTabChange, 
  onOpenUpload 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All Skills' },
    { id: 'Frontend', name: 'Frontend' },
    { id: 'Backend', name: 'Backend & APIs' },
    { id: 'DevOps', name: 'DevOps & Cloud' },
    { id: 'Databases', name: 'Databases' },
    { id: 'CoreCS', name: 'Core CS' }
  ];

  const skillsList = [
    { name: "React.js", category: "Frontend", level: "Expert", score: 94, status: "Verified via Proctored Diagnostic", color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" },
    { name: "Node.js & Express", category: "Backend", level: "Advanced", score: 88, status: "Verified via Hackathon Project", color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" },
    { name: "PostgreSQL & SQL", category: "Databases", level: "Expert", score: 94, status: "Verified via Lab Exam", color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" },
    { name: "Docker & Containers", category: "DevOps", level: "Intermediate", score: 62, status: "Self-Assessed + Lab in progress", color: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" },
    { name: "Python / FastAPI", category: "Backend", level: "Advanced", score: 85, status: "Verified via Assessment", color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" },
    { name: "System Design", category: "CoreCS", level: "Developing", score: 45, status: "Assessment Pending", color: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" }
  ];

  const filteredSkills = skillsList.filter(skill => {
    if (selectedCategory === 'All') return true;
    return skill.category === selectedCategory;
  });

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

      {/* KPI Tiers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm text-left">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-1">Total Verified</p>
          <p className="text-xl font-black text-slate-800">14 Skills</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm text-left">
          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-wider mb-1">Expert/Advanced</p>
          <p className="text-xl font-black text-emerald-600">6 Skills</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm text-left">
          <p className="text-amber-600 font-bold text-[10px] uppercase tracking-wider mb-1">Intermediate</p>
          <p className="text-xl font-black text-amber-600">5 Skills</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm text-left">
          <p className="text-rose-600 font-bold text-[10px] uppercase tracking-wider mb-1">Developing</p>
          <p className="text-xl font-black text-rose-600">3 Skills</p>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-6 scrollbar">
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
        {filteredSkills.map((skill) => (
          <div 
            key={skill.name} 
            onClick={() => alert(`Reviewing blockchain ledger hashes for "${skill.name}"... Integrity validated.`)}
            className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer text-left"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-extrabold text-sm text-slate-800">{skill.name}</h4>
              <span className={`w-3 h-3 rounded-full ${skill.color}`}></span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Accreditation Level</span><span className="text-indigo-600 font-bold">{skill.level}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Diagnostic Score</span><span className="text-slate-800 font-extrabold">{skill.score}%</span></div>
              <p className="text-[10px] text-slate-400 mt-3 pt-3 border-t border-slate-100">{skill.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Request and upload block footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-semibold text-center sm:text-left">Expand your credential transcript by requesting peer review endorsements.</p>
        <button 
          onClick={onOpenUpload}
          className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Request Endorsement / Upload Certificate
        </button>
      </div>

    </div>
  );
};

export default SkillsProfileMatrixView;
