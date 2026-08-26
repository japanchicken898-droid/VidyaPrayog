import React from 'react';
import { Briefcase, TrendingUp, Award, DollarSign } from 'lucide-react';

const InternshipAnalyticsView = ({ deptFilter }) => {
  // Mock company partners data
  const partnersData = [
    { id: 1, name: "Acme Tech Labs", interns: 84, rating: "4.8/5", status: "Active Collaboration" },
    { id: 2, name: "TCS Global Research", interns: 120, rating: "4.6/5", status: "Active Collaboration" },
    { id: 3, name: "Google Developer Relations", interns: 18, rating: "4.9/5", status: "Special Initiative" },
    { id: 4, name: "Cisco Systems India", interns: 45, rating: "4.5/5", status: "Active Collaboration" }
  ];

  // Adjust metrics slightly by dept
  const getInternshipStats = () => {
    switch (deptFilter) {
      case 'CSE':
        return { active: 180, stipend: '₹28k/mo', ppo: '72%' };
      case 'ECE':
        return { active: 90, stipend: '₹22k/mo', ppo: '58%' };
      case 'IT':
        return { active: 110, stipend: '₹25k/mo', ppo: '65%' };
      default:
        return { active: 420, stipend: '₹25k/mo', ppo: '68%' };
    }
  };

  const stats = getInternshipStats();

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Internship Analytics Dashboard <Briefcase className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Study company-wise student hires, median stipends, and placement conversions (PPOs).
        </p>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Internships</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{stats.active} Interns</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Across various domains</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Stipend</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{stats.stipend}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Monthly compensation avg</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PPO Conversion Rate</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{stats.ppo} rate</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">✓ High student absorption</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recruiter Breakdown Table */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">Industry Partner Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase bg-slate-50/50">
                <th className="p-3 pl-4">Company Partner</th>
                <th className="p-3 text-center">Interns Hired</th>
                <th className="p-3 text-center">Performance Rating</th>
                <th className="p-3 text-right pr-4">Sponsorship Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {partnersData.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50/50">
                  <td className="p-3 pl-4 font-bold text-slate-900">{partner.name}</td>
                  <td className="p-3 text-center">{partner.interns}</td>
                  <td className="p-3 text-center text-amber-600 font-extrabold">{partner.rating}</td>
                  <td className="p-3 text-right pr-4">
                    <span className="inline-block text-[9px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full">
                      {partner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InternshipAnalyticsView;
