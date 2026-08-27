import React from 'react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Calendar, 
  Activity, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const FacultyDashboardView = ({ onTabChange, onApplyProposal }) => {
  const activeCalls = [
    { id: 1, title: "DST Clean Energy Innovation Grant 2026", agency: "DST Science Schemes", budget: "₹25.0 Lakhs", daysLeft: 8, priority: "Deadline Approaching" },
    { id: 2, title: "Smart India Hackathon (SIH) Expert Mentorship Requests", agency: "Ministry of Education", budget: "N/A", daysLeft: 12, priority: "Action Required" },
    { id: 3, title: "AICTE Sponsored FDP on Cyber Observability", agency: "AICTE ATAL Academy", budget: "Fully Funded", daysLeft: 20, priority: "Registration Open" }
  ];

  const benchmarks = [
    { metric: "Research Citations", current: 312, target: 400, percent: 78, status: "On Track" },
    { metric: "Annual FDP CEUs", current: 42, target: 40, percent: 100, status: "Completed" },
    { metric: "NIRF API Performance", current: 84, target: 100, percent: 84, status: "On Track" }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Faculty Command Hub <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor your research portfolio, consultancies, credit requirements, and active global calls.
        </p>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div 
          onClick={() => onTabChange('Research')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Research Grants</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">3 Funded</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">₹42 Lakhs Total Outlay</p>
        </div>

        {/* KPI 2 */}
        <div 
          onClick={() => onTabChange('FDP')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed FDP</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">42 Hours</span>
          </div>
          <p className="text-[10px] text-indigo-600 font-semibold mt-1">AICTE Accredited Credits</p>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => onTabChange('Consultancy')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultancies</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">2 Ongoing</span>
          </div>
          <p className="text-[10px] text-amber-600 font-semibold mt-1">Enterprise Deployments</p>
        </div>

        {/* KPI 4 */}
        <div 
          onClick={() => onTabChange('Collaboration')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Supervisions</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">14 Batches</span>
          </div>
          <p className="text-[10px] text-indigo-600 font-semibold mt-1">Student Capstones</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Active Institutional & Industry Calls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600 animate-pulse" /> Active Institutional &amp; Industry Calls
            </h3>
            <button 
              onClick={() => onTabChange('Faculty Opportunities')}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 transition-colors"
            >
              See All Calls <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {activeCalls.map((call) => (
              <div 
                key={call.id}
                className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{call.title}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{call.agency} • Grant Budget: {call.budget}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 text-[8px] font-extrabold rounded-full border ${
                        call.priority === 'Deadline Approaching' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                        call.priority === 'Action Required' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                        'bg-indigo-50 border-indigo-100 text-indigo-600'
                      }`}>
                        {call.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 shrink-0">
                  <span className="text-[10px] font-bold text-slate-500">
                    {call.daysLeft} days remaining
                  </span>
                  <button 
                    onClick={() => onApplyProposal(call)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md shadow-indigo-500/10 active:scale-95 transition-all"
                  >
                    Draft Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): NIRF Radar & Benchmark Metrics */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 px-1">
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> NIRF &amp; Academic Radar
          </h3>

          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-4">
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              Your overall teaching, research, and collaborative metrics aligned with annual institution KPIs.
            </p>

            <div className="space-y-3.5">
              {benchmarks.map((bench, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-semibold">
                    <span className="text-slate-800 font-bold">{bench.metric}</span>
                    <span className="text-slate-400">{bench.current} / {bench.target} {bench.metric.includes('Hours') ? 'Hrs' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          bench.percent >= 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`} 
                        style={{ width: `${Math.min(100, bench.percent)}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-700 shrink-0 w-8 text-right">{bench.percent}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[9px] text-slate-500 font-medium">
              <AlertCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                <strong>Accreditation Tip:</strong> You have exceeded target CEUs. 12 extra credits will carry over to next year's NIRF appraisal dossier.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FacultyDashboardView;
