import React from 'react';
import RoadmapTree from '../CareerRoadmap/RoadmapTree';

const SkillsRoadmapView = ({ 
  activeSubTab = 'Roadmap', 
  onSubTabChange, 
  studentProfile,
  onOpenCoding
}) => {

  const role = studentProfile?.targetRole?.toLowerCase() || '';
  const isFrontend = role.includes('front') || role.includes('react') || role.includes('ui');

  return (
    <div className="w-full h-full flex flex-col pt-6 pb-20 px-6 overflow-y-auto">
      
      {/* Top Navigation */}
      <div className="flex items-center gap-8 border-b border-slate-200 mb-8 shrink-0 overflow-x-auto scrollbar">
        <button 
          onClick={() => onSubTabChange('Assessment')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeSubTab === 'Assessment' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Assessment
        </button>
        <button 
          onClick={() => onSubTabChange('Profile & Matrix')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeSubTab === 'Profile & Matrix' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Profile & Matrix
        </button>
        <button 
          onClick={() => onSubTabChange('Gap Analysis')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeSubTab === 'Gap Analysis' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Gap Analysis
        </button>
        <button 
          onClick={() => onSubTabChange('Roadmap')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeSubTab === 'Roadmap' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Skill Roadmap
        </button>
      </div>

      <div className="w-full min-h-[1200px] overflow-y-auto overflow-x-auto p-8 relative bg-slate-50/50 rounded-2xl border border-slate-200/70 shadow-inner">
        <RoadmapTree studentProfile={studentProfile} onOpenCoding={onOpenCoding} />
      </div>

    </div>
  );
};

export default SkillsRoadmapView;