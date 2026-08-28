import React, { useState } from 'react';

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

const STUDENT_PERFORMANCE_METRICS = [
  {
    subject: 'Internet of Things & Edge Computing',
    topPerformers: [
      { name: 'Deepak B.', roll: '111725203017', score: '96%', practicalBadge: 'IoT Edge Master' },
      { name: 'Priya S.', roll: '111725203045', score: '93%', practicalBadge: 'Cloud Architect' },
      { name: 'Karthik V.', roll: '111725203029', score: '91%', practicalBadge: 'Firmware Dev' }
    ],
    needsAttention: [
      { name: 'Sanjay R.', roll: '111725203058', score: '54%', gap: 'MQTT Protocol Lab' },
      { name: 'Meera K.', roll: '111725203038', score: '58%', gap: 'Edge Gateway Dockerization' }
    ],
    classDistribution: { distinction: 42, firstClass: 58, pass: 18, critical: 6 }
  }
];

export default function FacultyDashboard() {
  const [selectedSubject, setSelectedSubject] = useState(TEACHING_SUBJECTS[0]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      
      {/* 1. Header Profile Banner */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-600/30">
            RD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Ms. Renugadevi R</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase">
                Assistant Professor
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Department of Information Technology • Academic Year 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            Total Students: <span className="text-indigo-500 font-bold">186 Enrolled</span>
          </div>
          <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold">
            Average Batch Performance: 82.2%
          </div>
        </div>
      </div>

      {/* 2. TOP SECTION: Assigned Subjects & Course Load */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              📚 Assigned Subjects & Course Load
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current semester classes, lab units, and syllabus coverage</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">3 Active Courses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEACHING_SUBJECTS.map((sub) => (
            <div
              key={sub.code}
              onClick={() => setSelectedSubject(sub)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedSubject.code === sub.code
                  ? 'bg-white dark:bg-slate-900 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {sub.code}
                </span>
                <span className="text-[10px] font-bold text-indigo-500">{sub.status}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight mb-1">{sub.name}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{sub.dept} • {sub.yearSem} ({sub.section})</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Students:</span> <strong className="text-slate-800 dark:text-slate-200">{sub.studentsCount}</strong>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Avg Attendance:</span> <strong className="text-emerald-500">{sub.avgAttendance}</strong>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Syllabus Covered:</span> <strong className="text-indigo-400">{sub.syllabusCoverage}%</strong>
                </div>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${sub.syllabusCoverage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SECOND SECTION: Student Performance & Class Diagnostics */}
      <div>
        <div className="mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            📊 Student Performance & Skill Diagnostics ({selectedSubject.name})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Cohort scores, top student achievements, and targeted remedial alerts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Top Performers Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">⭐ Top Benchmark Performers</h3>
            <div className="space-y-3">
              {STUDENT_PERFORMANCE_METRICS[0].topPerformers.map((st, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{st.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Reg: {st.roll}</p>
                    <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      {st.practicalBadge}
                    </span>
                  </div>
                  <div className="text-sm font-black text-emerald-500">{st.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Remedial Focus Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3">⚠️ Requires Remedial Support</h3>
            <div className="space-y-3">
              {STUDENT_PERFORMANCE_METRICS[0].needsAttention.map((st, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{st.name}</h4>
                    <span className="text-xs font-bold text-amber-500">{st.score}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mb-1">Reg: {st.roll}</p>
                  <div className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded inline-block font-semibold">
                    Skill Gap: {st.gap}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grade Distribution Overview */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">📈 Class Grade Distribution</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Distinction (&gt;85%):</span>
                <span className="font-bold text-emerald-400">42 Students (34%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">First Class (70-85%):</span>
                <span className="font-bold text-indigo-400">58 Students (47%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pass (50-69%):</span>
                <span className="font-bold text-amber-400">18 Students (14%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Remedial Focus (&lt;50%):</span>
                <span className="font-bold text-rose-400">6 Students (5%)</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button className="px-3 py-1.5 text-[11px] font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                Export Class Assessment Report ↓
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
