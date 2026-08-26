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
  BarChart3, 
  TrendingUp, 
  Clock, 
  FileCheck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TalentAnalyticsView = () => {
  // Skill distribution data
  const distributionData = [
    { category: 'Frontend', count: 94, fill: '#6366f1' },
    { category: 'Backend', count: 88, fill: '#10b981' },
    { category: 'AI/ML', count: 42, fill: '#f59e0b' },
    { category: 'Cloud/Infra', count: 30, fill: '#0ea5e9' }
  ];

  // Grid Heatmap mapping departments to skills
  // Competency level: 1 (Critical Gap, red), 2 (Moderate Gap, orange), 3 (High Match Density, green)
  const heatmapData = [
    { dept: "Computer Science (CSE)", react: 3, node: 3, devops: 2, ml: 3 },
    { dept: "Information Tech (IT)", react: 3, node: 3, devops: 1, ml: 2 },
    { dept: "Electronics (ECE)", react: 2, node: 2, devops: 1, ml: 1 },
    { dept: "Electrical (EEE)", react: 1, node: 1, devops: 1, ml: 1 }
  ];

  const getHeatmapColor = (level) => {
    if (level === 3) return "bg-emerald-50 border-emerald-200 text-emerald-800";
    if (level === 2) return "bg-amber-50 border-amber-200 text-amber-800";
    return "bg-rose-50 border-rose-200 text-rose-800";
  };

  const getHeatmapLabel = (level) => {
    if (level === 3) return "High Match";
    if (level === 2) return "Moderate Gap";
    return "Critical Gap";
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Talent Analytics &amp; Demographics <BarChart3 className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor competency pools, study institution-wide talent matrices, and track recruiting funnels.
        </p>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Median Time-to-Hire</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">14.2 Days</p>
            <p className="text-[9px] text-emerald-600 font-semibold mt-1">✓ 2.5 days faster than benchmark</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Offer Acceptance Rate</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">86.4%</p>
            <p className="text-[9px] text-emerald-600 font-semibold mt-1">✓ +3.2% increase this cycle</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate Quality Index</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">92.1%</p>
            <p className="text-[9px] text-indigo-600 font-semibold mt-1">✓ Verified by Dean accreditation</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Charts & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cohort Skill Distribution (Bar Chart) */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Cohort Skill Distribution</h3>
            <p className="text-[11px] text-slate-400 mb-6">
              Number of students currently meeting proctored accreditation thresholds in major categories.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '11px' }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Institution-wide Skill Gap Heatmap */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-extrabold text-slate-900 mb-2">Institution-wide Skill Gap Heatmap</h3>
          <p className="text-[11px] text-slate-400 mb-6">
            Detailed department-wise competency matrix. Critical gaps indicate fields where candidate supply is scarce.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-extrabold uppercase">
                  <th className="pb-3 pr-2">Department</th>
                  <th className="pb-3 text-center">React</th>
                  <th className="pb-3 text-center">Node.js</th>
                  <th className="pb-3 text-center">DevOps</th>
                  <th className="pb-3 text-center">AI/ML</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-700">
                {heatmapData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 pr-2 font-bold text-slate-800">{row.dept}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-lg border text-[9px] font-extrabold ${getHeatmapColor(row.react)}`}>
                        {getHeatmapLabel(row.react)}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-lg border text-[9px] font-extrabold ${getHeatmapColor(row.node)}`}>
                        {getHeatmapLabel(row.node)}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-lg border text-[9px] font-extrabold ${getHeatmapColor(row.devops)}`}>
                        {getHeatmapLabel(row.devops)}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-lg border text-[9px] font-extrabold ${getHeatmapColor(row.ml)}`}>
                        {getHeatmapLabel(row.ml)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-start gap-2.5 text-[10px] text-indigo-800">
            <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Strategic Recommendation:</strong> Collaborate with the ECE and IT departments to sponsor a dedicated Docker/Kubernetes container sandbox challenge to bridge the critical DevOps competency gaps.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TalentAnalyticsView;
