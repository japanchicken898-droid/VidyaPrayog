import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Compass, GraduationCap, BookOpen, Layers, Network, Award, ArrowLeft
} from 'lucide-react';

const FacultySidebar = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Faculty Opportunities', label: 'Faculty Opportunities', icon: Compass },
    { id: 'FDP', label: 'FDP', icon: GraduationCap },
    { id: 'Research', label: 'Research', icon: BookOpen },
    { id: 'Consultancy', label: 'Consultancy', icon: Layers },
    { id: 'Collaboration', label: 'Collaboration', icon: Network }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white/85 backdrop-blur-md border-r border-slate-200/80 shadow-sm h-full flex flex-col relative z-20">
      <div className="p-6 border-b border-slate-200/80">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600">
            <Award className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-base tracking-tight leading-none">
              VidyaPrayog
            </h1>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Academia Command</p>
          </div>
        </div>
        <Link 
          to="/" 
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors text-xs font-semibold w-full"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Gateway
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1.5">
        {navigationItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange && onTabChange(item.id)}
              className={
                isActive 
                  ? "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100 transition-colors cursor-pointer"
                  : "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              }
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  );
};

export default FacultySidebar;
