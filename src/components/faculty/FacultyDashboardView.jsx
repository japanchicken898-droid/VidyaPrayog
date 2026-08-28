import React, { useState } from 'react';
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
import { useApp } from '../../context/AppContext';

const TEACHING_SUBJECTS = [
  {
    code: 'IT3401',
    name: 'Internet of Things & Edge Computing',
    dept: 'B.Tech IT',
    yearSem: 'Year III / Sem VI',
    section: 'Sec A & B',
    studentsCount: 124,
    avgAttendance: '94%',
    avgInternalScore: '81.4%',
    syllabusCoverage: 78,
    status: 'Active Term'
  },
  {
    code: 'CS3502',
    name: 'Cloud Infrastructure & Distributed Systems',
    dept: 'B.Tech IT',
    yearSem: 'Year II / Sem IV',
    section: 'Sec A',
    studentsCount: 62,
    avgAttendance: '91%',
    avgInternalScore: '76.8%',
    syllabusCoverage: 65,
    status: 'Active Term'
  },
  {
    code: 'IT3611',
    name: 'Embedded ML & Edge AI Laboratory',
    dept: 'B.Tech IT',
    yearSem: 'Year III / Sem VI',
    section: 'Sec Lab-1',
    studentsCount: 62,
    avgAttendance: '98%',
    avgInternalScore: '88.5%',
    syllabusCoverage: 85,
    status: 'Active Lab'
  }
];

const STUDENT_METRICS = {
  topPerformers: [
    { name: 'Deepak B.', roll: '111725203017', score: '96%', badge: 'IoT Edge Master' },
    { name: 'Priya S.', roll: '111725203045', score: '93%', badge: 'Cloud Architect' },
    { name: 'Karthik V.', roll: '111725203029', score: '91%', badge: 'Firmware Dev' }
  ],
  needsAttention: [
    { name: 'Sanjay R.', roll: '111725203058', score: '54%', gap: 'MQTT Protocol Lab' },
    { name: 'Meera K.', roll: '111725203038', score: '58%', gap: 'Edge Gateway Dockerization' }
  ]
};

export function AssessmentReportTemplate({ selectedSubject }) {
  return (
    <div 
      id="pdf-report-template" 
      className="w-[800px] bg-white text-slate-900 flex flex-col p-6"
    >
        {/* Header Bar */}
        <div className="py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-600">
                OFFICIAL AICTE / NBA DIAGNOSTIC
              </span>
              <h2 className="font-bold text-base text-slate-900">
                Class Diagnostic & Skill Assessment Report
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject: <strong className="text-slate-700">{selectedSubject?.name || 'Embedded ML & Edge AI Laboratory'} ({selectedSubject?.code || 'IT3611'})</strong> • Faculty: <strong>Ms. Renugadevi R</strong>
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="py-6 space-y-6">

          {/* KPI Banner */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Cohort Size</span>
              <div className="text-lg font-black text-indigo-900 mt-0.5">62 Students</div>
              <span className="text-[10px] text-slate-500">Sec Lab-1 (Year III)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Avg Lab Score</span>
              <div className="text-lg font-black text-emerald-900 mt-0.5">88.5%</div>
              <span className="text-[10px] text-emerald-600">+4.2% vs Dept Mean</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Practical Readiness</span>
              <div className="text-lg font-black text-amber-900 mt-0.5">91.2%</div>
              <span className="text-[10px] text-slate-500">Live Hardware Rig Pass</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Remedial Target</span>
              <div className="text-lg font-black text-rose-900 mt-0.5">6 Students</div>
              <span className="text-[10px] text-rose-600">Action Plan Active</span>
            </div>
          </div>

          {/* Visual Row: SVG Donut Chart + Competency Breakdown */}
          <div className="grid grid-cols-2 gap-5">
            
            {/* Visual Grade Distribution Pie/Donut Chart */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                <span>🥧 Grade & Mastery Distribution</span>
                <span className="text-[10px] text-emerald-500 font-semibold">100% Evaluated</span>
              </h3>

              <div className="flex items-center gap-6 justify-center">
                {/* Visual SVG Donut */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background Ring */}
                    <path
                      className="text-slate-100"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Distinction Segment (34%) */}
                    <path
                      className="text-emerald-500"
                      strokeDasharray="34, 100"
                      strokeDashoffset="0"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* First Class Segment (47%) */}
                    <path
                      className="text-indigo-500"
                      strokeDasharray="47, 100"
                      strokeDashoffset="-34"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Pass Segment (14%) */}
                    <path
                      className="text-amber-400"
                      strokeDasharray="14, 100"
                      strokeDashoffset="-81"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Remedial (5%) */}
                    <path
                      className="text-rose-500"
                      strokeDasharray="5, 100"
                      strokeDashoffset="-95"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-black text-slate-800">88.5%</span>
                    <span className="text-[8px] text-slate-400 uppercase">Avg Yield</span>
                  </div>
                </div>

                {/* Legend Items */}
                <div className="space-y-1.5 text-[11px] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></span> Distinction (&gt;85%)
                    </span>
                    <span className="font-bold text-emerald-600">34% (42)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></span> First Class (70-85%)
                    </span>
                    <span className="font-bold text-indigo-600">47% (58)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></span> Pass (50-69%)
                    </span>
                    <span className="font-bold text-amber-600">14% (18)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></span> Remedial (&lt;50%)
                    </span>
                    <span className="font-bold text-rose-600">5% (6)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Learning Outcome (CO-PO) Attainment */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2.5">
                📊 Module Competency Attainment
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-600 font-medium">CO1: Edge Microcontroller Architecture (ESP32-S3)</span>
                    <span className="font-bold text-emerald-500">96% Target Met</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-600 font-medium">CO2: Sensor Interfacing & MQTT Telemetry Bus</span>
                    <span className="font-bold text-indigo-500">89% Target Met</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-600 font-medium">CO3: TensorFlow Lite Embedded Model Deployment</span>
                    <span className="font-bold text-indigo-500">84% Target Met</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-600 font-medium">CO4: Cloud Gateway Dockerization & Ingress APIs</span>
                    <span className="font-bold text-amber-500">72% In Progress</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Diagnostic Remediation Workflow Flowchart */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <span>🔄 Automated Skill Remediation & Action Flowchart</span>
            </h3>

            {/* Visual Flow Steps */}
            <div className="grid grid-cols-4 gap-2.5 relative">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] inline-flex items-center justify-center mb-1">1</span>
                <h4 className="font-bold text-xs text-slate-800">Diagnostic Sandbox</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Unit test harness flags MQTT & Ingress syntax gaps</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] inline-flex items-center justify-center mb-1">2</span>
                <h4 className="font-bold text-xs text-slate-800">Micro-Lab Module</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">3 tailored practice tasks auto-assigned to 6 students</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] inline-flex items-center justify-center mb-1">3</span>
                <h4 className="font-bold text-xs text-slate-800">Peer Code Review</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Paired with top performers for architecture feedback</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 shadow-sm text-center">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] inline-flex items-center justify-center mb-1">4</span>
                <h4 className="font-bold text-xs text-emerald-800">Re-Assessment Pass</h4>
                <p className="text-[10px] text-emerald-600 mt-0.5">Scorecard updated & verified on Institution Ledger</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs">
          <span className="text-slate-400">Generated by VidyaPrayog AI Analytics Engine</span>
        </div>

    </div>
  );
}

const FacultyDashboardView = ({ onTabChange, onApplyProposal }) => {
  const { fdps, grants } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(TEACHING_SUBJECTS[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
          Monitor your academic load, research portfolio, consultancies, and active global calls.
        </p>
      </div>

      {/* 1. Assigned Subjects & Course Load */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              📚 Assigned Subjects & Course Load
            </h2>
            <p className="text-xs text-slate-500">Current semester classes, lab units, and syllabus progress</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
            3 Active Courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEACHING_SUBJECTS.map((sub) => (
            <div
              key={sub.code}
              onClick={() => setSelectedSubject(sub)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedSubject.code === sub.code
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/85 hover:bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {sub.code}
                </span>
                <span className="text-[10px] font-bold text-indigo-600">{sub.status}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-800 leading-tight mb-1">{sub.name}</h3>
              <p className="text-[11px] text-slate-500 mb-3">{sub.dept} • {sub.yearSem} ({sub.section})</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Enrolled:</span> <strong className="text-slate-700">{sub.studentsCount} Students</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Attendance:</span> <strong className="text-emerald-600">{sub.avgAttendance}</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Syllabus Covered:</span> <strong className="text-indigo-600">{sub.syllabusCoverage}%</strong>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${sub.syllabusCoverage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Student Performance & Skill Diagnostics */}
      <div>
        <div className="mb-3">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            📊 Student Performance & Diagnostics ({selectedSubject.name})
          </h2>
          <p className="text-xs text-slate-500">Cohort scores, verified mastery badges, and remedial alerts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Top Performers */}
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">⭐ Top Benchmark Performers</h3>
            <div className="space-y-2.5">
              {STUDENT_METRICS.topPerformers.map((st, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{st.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Reg: {st.roll}</p>
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {st.badge}
                    </span>
                  </div>
                  <div className="text-sm font-black text-emerald-600">{st.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Remedial Support Alerts */}
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">⚠️ Requires Remedial Support</h3>
            <div className="space-y-2.5">
              {STUDENT_METRICS.needsAttention.map((st, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-slate-800">{st.name}</h4>
                    <span className="text-xs font-bold text-amber-600">{st.score}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mb-1">Reg: {st.roll}</p>
                  <div className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded inline-block font-semibold">
                    Skill Gap: {st.gap}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class Distribution & Quick Actions */}
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">📈 Class Grade Distribution</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Distinction (&gt;85%):</span>
                  <span className="font-bold text-emerald-600">42 Students (34%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">First Class (70-85%):</span>
                  <span className="font-bold text-indigo-600">58 Students (47%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pass (50-69%):</span>
                  <span className="font-bold text-amber-600">18 Students (14%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Remedial Focus (&lt;50%):</span>
                  <span className="font-bold text-rose-600">6 Students (5%)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full mt-4 py-2 px-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Export Class Assessment Report</span>
              <span>↓</span>
            </button>
          </div>

        </div>
      </div>

      <hr className="border-slate-200/60" />

      {/* 3. Old Content: Top KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div 
          onClick={() => onTabChange && onTabChange('Research')}
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
          onClick={() => onTabChange && onTabChange('FDP')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed FDP</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">{fdps?.length || 0} Programs</span>
          </div>
          <p className="text-[10px] text-indigo-600 font-semibold mt-1">AICTE Accredited Credits</p>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => onTabChange && onTabChange('Consultancy')}
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
          onClick={() => onTabChange && onTabChange('Collaboration')}
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

      {/* 4. Old Content: Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Active Institutional & Industry Calls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600 animate-pulse" /> Active Institutional &amp; Industry Calls
            </h3>
            <button 
              onClick={() => onTabChange && onTabChange('Faculty Opportunities')}
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
                    onClick={() => onApplyProposal && onApplyProposal(call)}
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

      {/* Render Modal */}
      <AssessmentReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        selectedSubject={selectedSubject} 
      />
    </div>
  );
};

export default FacultyDashboardView;
