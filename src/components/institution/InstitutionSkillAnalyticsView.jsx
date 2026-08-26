import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Bar, 
  Cell 
} from 'recharts';
import { 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const InstitutionSkillAnalyticsView = ({ deptFilter, onTabChange }) => {
  const { studentSubmissions, liveIndustryDemand, opportunities } = useApp();
  // Mock department-wise readiness metrics
  const readinessData = [
    { name: 'IT', rate: 88, fill: '#6366f1' },
    { name: 'CSE', rate: 85, fill: '#10b981' },
    { name: 'ECE', rate: 72, fill: '#f59e0b' },
    { name: 'Mech', rate: 58, fill: '#0ea5e9' }
  ];

  // Filter based on dropdown
  const getReadinessChartData = () => {
    if (deptFilter === 'All') return readinessData;
    return readinessData.filter(d => d.name === deptFilter);
  };

  // Stack mastery distribution
  const masteryData = [
    { category: 'Cloud/DevOps', count: 480, fill: '#6366f1' },
    { category: 'Full-Stack', count: 960, fill: '#10b981' },
    { category: 'AI/ML', count: 320, fill: '#f59e0b' },
    { category: 'Embedded', count: 240, fill: '#0ea5e9' }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Institution Overview &amp; Skill Analytics <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor competency indicators, placement readiness levels, and core department capabilities.
        </p>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled Students</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">2,450 Students</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Across 4 departments</p>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Skill Index</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">82.4% Avg</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">✓ +3.8% this quarter</p>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Readiness</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">74% Readiness</span>
          </div>
          <p className="text-[10px] text-indigo-600 font-semibold mt-1">Cleared initial diagnostics</p>
        </div>

        <div 
          onClick={() => onTabChange('Demand')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5 animate-pulse"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Industry Demand</span>
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">{liveIndustryDemand}% Intensity</span>
          </div>
          <p className="text-[10px] text-rose-600 font-semibold mt-1">{opportunities.length} Active Recruitments</p>
        </div>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Department-wise Readiness Bar Chart */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Department-wise Readiness</h3>
            <p className="text-[11px] text-slate-400 mb-6">
              Percentage of student cohort clearing minimum industry standard diagnostics.
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getReadinessChartData()} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '11px' }} />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {getReadinessChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Stack Mastery Distribution */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Stack Mastery Distribution</h3>
            <p className="text-[11px] text-slate-400 mb-6">
              Total counts of student certifications categorized by technology stack domain.
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={masteryData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '11px' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {masteryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstitutionSkillAnalyticsView;
