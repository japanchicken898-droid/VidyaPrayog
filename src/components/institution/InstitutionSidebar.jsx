import React from 'react';
import { 
  BarChart3, 
  Briefcase, 
  TrendingUp, 
  Target, 
  Users, 
  Cpu, 
  Calendar, 
  GraduationCap, 
  Video, 
  Trophy, 
  X, 
  Building2 
} from 'lucide-react';

const InstitutionSidebar = ({ activeTab, onTabChange, mobileMenuOpen, setMobileMenuOpen }) => {
  const group1Items = [
    { id: 'Overview', label: 'Overview / Skill Analytics', icon: BarChart3 },
    { id: 'Internships', label: 'Internship Analytics', icon: Briefcase },
    { id: 'Placements', label: 'Placement Analytics', icon: TrendingUp },
    { id: 'Demand', label: 'Industry Demand', icon: Target },
    { id: 'Student Progress', label: 'Student Progress', icon: Users }
  ];

  const group2Items = [
    { id: 'Live Projects', label: 'Live Projects', icon: Cpu },
    { id: 'Mentorship', label: 'Mentorship', icon: Calendar },
    { id: 'Workshops', label: 'Workshops', icon: GraduationCap },
    { id: 'Guest Lectures', label: 'Guest Lectures', icon: Video },
    { id: 'Challenges', label: 'Innovation Challenges', icon: Trophy }
  ];

  return (
    <aside className={`h-screen w-72 flex flex-col fixed left-0 top-0 bg-white/95 backdrop-blur-md border-r border-slate-200/80 z-40 md:flex transition-transform duration-300 ${
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <div className="flex flex-col h-full py-6 px-5 justify-between overflow-y-auto">
        <div>
          {/* Logo brand area */}
          <div className="mb-6 px-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Building2 className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">VidyaPrayog</h1>
                <p className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider leading-none mt-1.5">Governance Hub</p>
              </div>
            </div>
            {mobileMenuOpen && (
              <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-slate-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Group 1: Skill Analytics */}
          <div className="mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1 flex items-center gap-1.5">
              <span>📊</span> SKILL ANALYTICS
            </h3>
            <nav className="flex flex-col gap-1">
              {group1Items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4.5 py-2 rounded-xl font-bold transition-all duration-200 relative ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 rounded-xl scale-[0.98]' 
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Group 2: Collaboration Hub */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1 flex items-center gap-1.5">
              <span>🤝</span> COLLABORATION HUB
            </h3>
            <nav className="flex flex-col gap-1">
              {group2Items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4.5 py-2 rounded-xl font-bold transition-all duration-200 relative ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 rounded-xl scale-[0.98]' 
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Admin Profile Badge at bottom */}
        <div className="border-t border-slate-100 pt-4 mt-6">
          <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-100 p-3 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs">
              AIT
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">Apex Institute</p>
              <p className="text-[9px] text-slate-400 font-semibold mt-1">College Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InstitutionSidebar;
