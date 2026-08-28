import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { academiaData } from '../data/mockData';
import {
  Award, ArrowLeft, Calendar, MessageSquare, Plus, FileText,
  ExternalLink, CalendarDays, CheckCircle2, AlertCircle,
  Users, BookOpen, Clock, Send, Check, ChevronRight
} from 'lucide-react';

import FacultySidebar from '../components/faculty/FacultySidebar';
import FacultyHeader from '../components/faculty/FacultyHeader';
import FacultyOpportunitiesView from '../components/faculty/FacultyOpportunitiesView';
import FacultyFDPView from '../components/faculty/FacultyFDPView';
import FacultyResearchView from '../components/faculty/FacultyResearchView';
import FacultyConsultancyView from '../components/faculty/FacultyConsultancyView';
import FacultyCollaborationView from '../components/faculty/FacultyCollaborationView';
import { AssessmentReportTemplate } from '../components/faculty/FacultyDashboardView';
import html2pdf from 'html2pdf.js';

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

const AcademiaPortal = () => {
  const { professorName, department, institution, grants, fdpCalendar, consultancyCalls } = academiaData;

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeProjects, setActiveProjects] = useState(grants.projects);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalAgency, setProposalAgency] = useState('DST');
  const [proposalBudget, setProposalBudget] = useState('₹10.0 Lakhs');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(TEACHING_SUBJECTS[0]);

  const handleDownloadReport = async () => {
    const element = document.getElementById('pdf-report-template');
    if (element) {
      triggerToast('Generating PDF Report...');

      // Function to convert any CSS color string containing oklch(...) to rgba(...) using a 1x1 canvas
      const convertColorToRgb = (colorStr) => {
        if (!colorStr || !colorStr.includes('oklch')) return colorStr;
        
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) return colorStr;
        
        // Resolve any var() variables inside the string first
        const varRegex = /var\((--[^,()]+)(?:,\s*([^()]+))?\)/g;
        let resolvedStr = colorStr.replace(varRegex, (match, varName, fallback) => {
          let val = getComputedStyle(document.documentElement).getPropertyValue(varName.trim()).trim();
          if (!val && fallback) {
            val = fallback.trim();
          }
          return val || match;
        });

        // Match oklch function calls including nested parentheses (like var definitions)
        const oklchRegex = /oklch\((?:[^()]+|\([^()]*\))*\)/g;
        return resolvedStr.replace(oklchRegex, (match) => {
          // Simplify any nested oklch/rgba functions that resulted from variable resolution
          let cleanMatch = match.replace(/oklch\((oklch\([^)]+\))\)/g, '$1');
          cleanMatch = cleanMatch.replace(/oklch\((rgba?\([^)]+\))\)/g, '$1');
          
          // Handle opacity values that might still contain var() or be unresolved
          if (cleanMatch.includes('/')) {
            const parts = cleanMatch.split('/');
            const alphaPart = parts[1].trim();
            if (alphaPart.includes('var(') || isNaN(parseFloat(alphaPart))) {
              // Strip unresolved opacity channel, falling back to 100% opacity (closing the parenthesis)
              cleanMatch = parts[0].trim() + ')';
            }
          }

          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = cleanMatch;
          ctx.fillRect(0, 0, 1, 1);
          const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
          return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        });
      };

      // Temporarily convert oklch in all stylesheet rules to rgba
      const restoredRules = [];
      const styles = Array.from(document.styleSheets);

      styles.forEach((sheet) => {
        try {
          if (!sheet.cssRules) return;
          
          const processRules = (rules) => {
            Array.from(rules).forEach((rule) => {
              if (rule.style && rule.style.cssText && rule.style.cssText.includes('oklch')) {
                const originalText = rule.style.cssText;
                try {
                  const newText = convertColorToRgb(originalText);
                  restoredRules.push({ rule, text: originalText });
                  rule.style.cssText = newText;
                } catch (e) {
                  console.error('Error rewriting rule:', e);
                }
              }
              if (rule.cssRules) {
                processRules(rule.cssRules);
              }
            });
          };

          processRules(sheet.cssRules);
        } catch (e) {
          // Ignore cross-origin stylesheet errors
          console.warn('Skipped stylesheet due to CORS:', e);
        }
      });

      // Temporarily monkeypatch window.getComputedStyle to translate oklch to rgb/rgba
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = function(el, pseudo) {
        const style = originalGetComputedStyle(el, pseudo);
        return new Proxy(style, {
          get(target, prop) {
            if (prop === 'getPropertyValue') {
              return function(propertyName) {
                const val = target.getPropertyValue(propertyName);
                if (typeof val === 'string' && val.includes('oklch')) {
                  return convertColorToRgb(val);
                }
                return val;
              };
            }
            const value = target[prop];
            if (typeof value === 'string' && value.includes('oklch')) {
              return convertColorToRgb(value);
            }
            if (typeof value === 'function') {
              return value.bind(target);
            }
            return value;
          }
        });
      };

      setTimeout(() => {
        try {
          html2pdf().from(element).set({
            margin: [10, 10, 10, 10],
            filename: `Class_Assessment_Report_${selectedSubject.code}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          }).outputPdf('blob').then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Class_Assessment_Report_${selectedSubject.code}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            triggerToast('PDF Downloaded successfully!');
            window.getComputedStyle = originalGetComputedStyle;
            // Restore stylesheets
            restoredRules.forEach(({ rule, text }) => {
              try {
                rule.style.cssText = text;
              } catch (e) {}
            });
          }).catch((err) => {
            console.error('PDF Generation Promise Error:', err);
            triggerToast('Error generating PDF.');
            window.getComputedStyle = originalGetComputedStyle;
            // Restore stylesheets
            restoredRules.forEach(({ rule, text }) => {
              try {
                rule.style.cssText = text;
              } catch (e) {}
            });
          });
        } catch (err) {
          console.error('PDF Generation Catch Error:', err);
          triggerToast('Error generating PDF.');
          window.getComputedStyle = originalGetComputedStyle;
          restoredRules.forEach(({ rule, text }) => {
            try {
              rule.style.cssText = text;
            } catch (e) {}
          });
        }
      }, 500);
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleCreateProposal = (e) => {
    e.preventDefault();
    if (!proposalTitle) return;
    const newProj = {
      id: `grant-${activeProjects.length + 1}`,
      title: proposalTitle,
      fundingAgency: proposalAgency,
      amount: proposalBudget,
      status: 'Submitted (Reviewing)',
      collaborators: 'TCS Research',
    };
    setActiveProjects(prev => [newProj, ...prev]);
    setShowSubmitModal(false);
    triggerToast(`Research proposal "${proposalTitle}" submitted successfully to ${proposalAgency}!`);
    setProposalTitle('');
  };

  const statusPill = (status) => {
    if (status.includes('Ongoing'))
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200/80';
    if (status.includes('Approved') || status.includes('Reviewing'))
      return 'bg-sky-100 text-sky-800 border border-sky-200/80';
    return 'bg-amber-100 text-amber-800 border border-amber-200/80';
  };

  const fdpStatusPill = (status) => {
    if (status === 'Open for Reg')
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200/60';
    if (status === 'Upcoming')
      return 'bg-sky-100 text-sky-700 border border-sky-200/60';
    return 'bg-slate-100 text-slate-500 border border-slate-200/60';
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans relative bg-transparent">
      
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <FacultySidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* ── Main Content Area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-y-auto relative z-10">
        <FacultyHeader />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-7 flex flex-col gap-6">
          
          {/* ── Toast ───────────────────────────────────────────────────────────── */}
          {toastMessage && (
            <div className="fixed top-24 right-5 z-50 px-4 py-3 rounded-xl bg-white border border-emerald-200 shadow-xl text-emerald-700 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {activeTab === 'Dashboard' ? (
            <>

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
        <div className="mt-6 mb-8">
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
                onClick={handleDownloadReport}
                className="w-full mt-4 py-2 px-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Export Class Assessment Report</span>
                <span>↓</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── KPI Row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Grants */}
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sanctioned R&D Grants</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{grants.total}</p>
              <p className="text-[9px] text-slate-400 mt-1 font-semibold">3 Approved Schemes</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Consultancies */}
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Consultancies</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">3 Active Calls</p>
              <p className="text-[9px] text-slate-400 mt-1 font-semibold">AI/ML &amp; IoT Optimization</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          {/* FDP */}
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">FDP Nominations</span>
              <p className="text-2xl font-black text-purple-600 mt-1">12 Faculty</p>
              <p className="text-[9px] text-slate-400 mt-1 font-semibold">ATAL &amp; IIT Cloud Modules</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* ── Split Layout ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

          {/* ── Left Panel (60%): R&D Grant Ledger ─────────────────────────── */}
          <div className="lg:col-span-6">
            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">

              {/* Panel Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  R&amp;D Grant Ledger &amp; Proposal Hub
                </h3>
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-colors shadow-sm active:scale-[0.97]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Submit New Proposal
                </button>
              </div>

              {/* Grant Items */}
              <div className="space-y-3">
                {activeProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-4 hover:border-slate-300 hover:bg-white transition-all flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded uppercase tracking-wide">
                          {project.fundingAgency}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 mt-2 leading-relaxed">{project.title}</h4>
                      </div>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusPill(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-[10px] text-slate-500">
                      <span>
                        Collaborators:{' '}
                        <strong className="text-slate-700">{project.collaborators || 'N/A'}</strong>
                      </span>
                      <span>
                        Grant Budget:{' '}
                        <strong className="text-emerald-600">{project.amount}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Panel (40%): FDP + Consultancy ────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* FDP Calendar */}
            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-5">
                <Calendar className="w-4 h-4 text-sky-500" />
                Upcoming FDP Calendar
              </h3>

              <div className="space-y-3">
                {fdpCalendar.map((fdp, idx) => (
                  <div key={idx} className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5 hover:bg-white hover:border-slate-300 transition-all">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] font-extrabold text-sky-600 uppercase tracking-wider">
                        {fdp.date}
                      </span>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${fdpStatusPill(fdp.status)}`}>
                        {fdp.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 mb-2 leading-relaxed">{fdp.title}</h4>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 font-medium">
                      <span>Sponsor: <strong className="text-slate-700">{fdp.sponsor}</strong></span>
                      <span className="text-slate-600 font-semibold">{fdp.registered} Registered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultancy Calls */}
            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-5">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Consultancy Calls Queue
              </h3>

              <div className="space-y-3">
                {consultancyCalls.map((call, idx) => (
                  <div key={idx} className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5 hover:bg-white hover:border-slate-300 transition-all flex flex-col gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-slate-800">{call.company}</span>
                        <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                          {call.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed italic">
                        &ldquo;{call.query}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[9px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3 h-3" />
                        {call.date}
                      </span>
                      <button
                        onClick={() => triggerToast(`Connecting to secure consultancy room for ${call.company}...`)}
                        className="text-[9px] font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5 transition-colors"
                      >
                        Accept &amp; Start
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </>
          ) : activeTab === 'Faculty Opportunities' ? (
            <FacultyOpportunitiesView triggerToast={triggerToast} />
          ) : activeTab === 'FDP' ? (
            <FacultyFDPView triggerToast={triggerToast} />
          ) : activeTab === 'Research' ? (
            <FacultyResearchView triggerToast={triggerToast} />
          ) : activeTab === 'Consultancy' ? (
            <FacultyConsultancyView triggerToast={triggerToast} />
          ) : activeTab === 'Collaboration' ? (
            <FacultyCollaborationView triggerToast={triggerToast} />
          ) : (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm min-h-[400px]">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-xl mx-auto flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-slate-400">construction</span>
                </div>
                <h3 className="text-lg font-bold text-slate-700">{activeTab} View</h3>
                <p className="text-slate-500 text-sm mt-1">This module is currently in development.</p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Submit Proposal Modal ───────────────────────────────────────────── */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />

            <div className="flex items-center gap-2.5 mb-4 mt-1">
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Submit R&D Proposal</h3>
                <p className="text-[10px] text-slate-500 font-medium">Create a draft for academic verification.</p>
              </div>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  placeholder="e.g. Distributed Ledger Tech for Rural Clinics"
                  required
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Funding Agency
                  </label>
                  <select
                    value={proposalAgency}
                    onChange={(e) => setProposalAgency(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-400 transition-all"
                  >
                    <option value="DST">DST (Science &amp; Tech)</option>
                    <option value="AICTE">AICTE</option>
                    <option value="MEITY">MEITY</option>
                    <option value="TNSCST">TNSCST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Budget Amount
                  </label>
                  <input
                    type="text"
                    value={proposalBudget}
                    onChange={(e) => setProposalBudget(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow-sm transition-colors active:scale-[0.98]"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Render Hidden PDF Template */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', pointerEvents: 'none' }}>
        <AssessmentReportTemplate selectedSubject={selectedSubject} />
      </div>
    </div>
  );
};

export default AcademiaPortal;
