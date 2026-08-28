import React from 'react';
import { TrendingUp, Users, DollarSign, Award, CheckCircle } from 'lucide-react';

const PlacementAnalyticsView = ({ deptFilter }) => {
  // Mock placement funnel
  const funnelData = [
    { stage: '1. Registered & Eligible', count: 340, fill: 'bg-indigo-600' },
    { stage: '2. Proctored Diagnostics Cleared', count: 220, fill: 'bg-indigo-500' },
    { stage: '3. Recruiter Shortlisted', count: 180, fill: 'bg-indigo-400' },
    { stage: '4. Signed Contracts / Placed', count: 142, fill: 'bg-emerald-600' }
  ];

  const getHiringCompanies = () => [
    { name: "Tata Consultancy Services", hires: 54, avgCtc: "₹7.2 LPA" },
    { name: "Acme Tech Labs", hires: 32, avgCtc: "₹11.5 LPA" },
    { name: "Cisco Systems India", hires: 24, avgCtc: "₹14.0 LPA" },
    { name: "Cognizant Technology", hires: 32, avgCtc: "₹5.8 LPA" }
  ];

  // Adjust stats based on department dropdown
  const getSalaryStats = () => {
    switch (deptFilter) {
      case 'CSE':
        return { highest: '₹28.0 LPA', median: '₹9.2 LPA', average: '₹10.1 LPA' };
      case 'ECE':
        return { highest: '₹18.0 LPA', median: '₹7.2 LPA', average: '₹7.8 LPA' };
      case 'IT':
        return { highest: '₹24.0 LPA', median: '₹8.8 LPA', average: '₹9.5 LPA' };
      default:
        return { highest: '₹28.0 LPA', median: '₹8.5 LPA', average: '₹9.2 LPA' };
    }
  };

  const salary = getSalaryStats();

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Accreditation Placement Analytics <TrendingUp className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor your recruitment funnel, salary spreads (highest, median, average), and corporate hiring audits.
        </p>
      </div>

      {/* Salary Spreads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highest CTC Offered</span>
            <p className="text-xl font-extrabold text-indigo-600 mt-1">{salary.highest}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Top tier corporate placements</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Median CTC Package</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{salary.median}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Mid-point salary metrics</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Salary Outlay</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{salary.average}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Weighted average package</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Funnel and Top Recruiters split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* Placement Funnel */}
        <div className="lg:col-span-6 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" /> Placement Drive Funnel
          </h3>

          <div className="space-y-4">
            {funnelData.map((f, i) => {
              // Adjust count based on filter
              let count = f.count;
              if (deptFilter === 'CSE') count = Math.round(f.count * 1.25);
              if (deptFilter === 'ECE') count = Math.round(f.count * 0.7);
              if (deptFilter === 'IT') count = Math.round(f.count * 0.9);

              const maxCount = deptFilter === 'CSE' ? 425 : deptFilter === 'ECE' ? 238 : deptFilter === 'IT' ? 306 : 340;
              const widthPct = (count / maxCount) * 100;

              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">{f.stage}</span>
                    <span className="text-slate-900 font-bold">{count} Students</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`h-full ${f.fill} rounded-full`} style={{ width: `${widthPct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Recruiting Companies */}
        <div className="lg:col-span-4 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" /> Top Recruiting Partners
          </h3>

          <div className="divide-y divide-slate-100">
            {getHiringCompanies().map((comp, idx) => (
              <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center text-xs font-semibold text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-950">{comp.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">Avg Offer: {comp.avgCtc}</span>
                </div>
                <span className="text-indigo-600 font-bold">{comp.hires} Placements</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlacementAnalyticsView;
