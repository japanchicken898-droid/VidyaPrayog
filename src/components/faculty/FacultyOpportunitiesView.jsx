import React, { useState, useRef } from 'react';
import { Briefcase, TrendingUp, Award, Building2, X, FileText, Clock, HelpCircle, Upload, CheckCircle, Calendar, Download, ChevronRight, Sparkles } from 'lucide-react';

const FACULTY_SKILLS = ['IoT', 'Cloud Computing', 'Edge ML', 'Deep Learning', 'Distributed Systems', 'AI/ML'];

const domainMatchMap = { 'AI/ML': 94, 'Cloud': 87, 'Cyber Security': 72, 'IoT': 91 };

const generateICS = (title, org) => {
  const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  return [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//VidyaPrayog//EN',
    'BEGIN:VEVENT','DTSTART:20261002T090000Z','DTEND:20261002T120000Z',
    `DTSTAMP:${now}`,`SUMMARY:${title}`,`DESCRIPTION:Jury duty – ${org}`,
    'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
};

const FacultyOpportunitiesView = ({ triggerToast }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain]   = useState('All');
  const [appliedStatus, setAppliedStatus] = useState({});
  const [juryAccepted,  setJuryAccepted]  = useState(false);
  const [nominationDone, setNominationDone] = useState(false);
  const [activeApplyCard,   setActiveApplyCard]   = useState(null);
  const [activeDetailsCard, setActiveDetailsCard] = useState(null);
  const [showJuryAccept,    setShowJuryAccept]    = useState(false);
  const [showNomination,    setShowNomination]    = useState(false);
  const [nominationStep,    setNominationStep]    = useState(0);
  const [sop,   setSop]   = useState('');
  const [hours, setHours] = useState('8');
  const [cvFile,    setCvFile]    = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [cvProgress,    setCvProgress]    = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const cvRef    = useRef();
  const coverRef = useRef();

  const opportunitiesList = [
    {
      id: 1, title: "Visiting AI Research Fellow – IIT Madras R&D Park",
      org: "Center for Industrial AI", category: "Research Fellowships", domain: "AI/ML",
      stipend: "₹1.2L / mo", duration: "6 Months",
      tags: ["Generative AI", "Edge Compute", "Funded"],
      eligibility: "PhD in CSE/ECE with 3+ years research experience in Deep Learning. Minimum 2 IEEE/ACM publications required.",
      scope: "Lead edge deployment models for automated robotics diagnostics.",
      timeline: "Applications close Sept 15, 2026. Commences Oct 1, 2026.",
      ctaType: "Submit Application"
    },
    {
      id: 2, title: "Smart India Hackathon 2026 – Senior Evaluation Jury",
      org: "AICTE & Ministry of Education", category: "Hackathon Mentorship", domain: "Cyber Security",
      stipend: "Provided (Honorarium)", duration: "Hybrid",
      tags: ["National Hackathon", "Mentorship", "SIH 2026"],
      eligibility: "Assistant Professor grade or above with experience guiding student hackathon teams.",
      scope: "Evaluate top-tier software prototypes submitted under Cyber Security & Smart Infrastructure themes.",
      timeline: "Invites open until Sept 30, 2026. Evaluation rounds start Oct 2026.",
      ctaType: "Accept Invitation"
    },
    {
      id: 3, title: "Industry Immersion: Cloud-Native Microservices",
      org: "AWS Academic Alliance", category: "Sabbaticals", domain: "Cloud",
      stipend: "4-Week Sabbatical", duration: "Advanced",
      tags: ["Kubernetes", "Cloud Architecture", "Industry Cert"],
      eligibility: "Faculty members teaching cloud systems or distributed computing. AWS Solutions Architect Associate preferred.",
      scope: "Hands-on immersion with AWS Core Services teams, designing auto-scaling pipelines.",
      timeline: "Nomination deadline Oct 5, 2026.",
      ctaType: "Register Nomination"
    }
  ];

  const filteredOpportunities = opportunitiesList.filter(opp => {
    const catOk = selectedCategory === 'All' || opp.category === selectedCategory;
    const domOk = selectedDomain   === 'All' || opp.domain   === selectedDomain;
    return catOk && domOk;
  });

  const simulateUpload = (setter) => {
    setter(10);
    [30,55,75,90,100].forEach((v,i) => setTimeout(() => setter(v), (i+1)*280));
  };

  const handleCvChange    = e => { const f=e.target.files?.[0]; if(f){setCvFile(f);    simulateUpload(setCvProgress);    }};
  const handleCoverChange = e => { const f=e.target.files?.[0]; if(f){setCoverFile(f); simulateUpload(setCoverProgress); }};

  const handleApplyClick = (opp) => {
    setActiveApplyCard(opp); setSop(''); setHours('8');
    setCvFile(null); setCoverFile(null); setCvProgress(0); setCoverProgress(0);
  };

  const handleConfirmApply = (e) => {
    e.preventDefault();
    if (!sop.trim()) { triggerToast("Please provide a Statement of Purpose."); return; }
    setAppliedStatus(prev => ({ ...prev, [activeApplyCard.id]: true }));
    triggerToast(`Application for "${activeApplyCard.title}" submitted!`);
    setActiveApplyCard(null);
  };

  const downloadICS = (opp) => {
    const blob = new Blob([generateICS(opp.title, opp.org)], { type: 'text/calendar;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'SIH_Jury_VidyaPrayog.ics' });
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleAcceptJury = () => {
    setJuryAccepted(true); setShowJuryAccept(false);
    downloadICS(opportunitiesList[1]);
    triggerToast("SIH 2026 Jury invitation accepted! .ics calendar downloaded.");
  };

  const nominationSteps = [
    { label: "Faculty Self-Nomination",    desc: "Confirm your intent and eligibility details." },
    { label: "Department HoD Clearance",   desc: "Simulated: HoD Dr. S. Kumaran reviewing nomination…" },
    { label: "Nomination Submitted",        desc: "Forwarded to AWS Academic Alliance portal." },
  ];

  const advanceNomination = () => {
    if (nominationStep < 2) { setNominationStep(s => s + 1); }
    else { setNominationDone(true); setShowNomination(false); setNominationStep(0); triggerToast("Nomination registered and forwarded to HoD!"); }
  };

  const handleCTA = (opp) => {
    if (opp.ctaType === 'Accept Invitation')    { setShowJuryAccept(true); return; }
    if (opp.ctaType === 'Register Nomination')  { setShowNomination(true); setNominationStep(0); return; }
    handleApplyClick(opp);
  };

  const matchScore = (domain) => domainMatchMap[domain] || 78;

  return (
    <div className="space-y-6 text-left">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label:'Total Active Calls',    value:'24',                       icon:Briefcase, color:'text-indigo-600', bg:'bg-indigo-50 border-indigo-200' },
          { label:'Industry Sabbaticals',  value:'6',                        icon:Building2, color:'text-emerald-600',bg:'bg-emerald-50 border-emerald-200'},
          { label:'Hackathon Jury Invites',value:juryAccepted ? '9' : '8', icon:Award,     color:'text-purple-600', bg:'bg-purple-50 border-purple-200' },
          { label:'Govt Grant Schemes',    value:'10',                       icon:TrendingUp,color:'text-amber-600',  bg:'bg-amber-50 border-amber-200'   },
        ].map((s,i) => (
          <div key={i} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mt-1`}>{s.value}</p>
            </div>
            <div className={`p-3 rounded-xl border ${s.bg} ${s.color}`}><s.icon className="w-5 h-5"/></div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-slate-700">Category:</span>
          <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 outline-none focus:border-indigo-400">
            <option value="All">All Categories</option>
            <option value="Sabbaticals">Sabbaticals</option>
            <option value="Research Fellowships">Research Fellowships</option>
            <option value="Hackathon Mentorship">Hackathon Mentorship</option>
          </select>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-slate-700">Domain:</span>
          <div className="flex gap-2 flex-wrap">
            {['All','AI/ML','IoT','Cloud','Cyber Security'].map(d => (
              <button key={d} onClick={()=>setSelectedDomain(d)}
                className={`px-3.5 py-1.5 border rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedDomain===d ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map(opp => {
          const isApplied  = appliedStatus[opp.id];
          const isJury     = opp.id === 2;
          const isNom      = opp.id === 3;
          const score      = matchScore(opp.domain);
          return (
            <div key={opp.id} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
              {/* Domain Match Badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                  score>=90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : score>=80 ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}><Sparkles className="w-2.5 h-2.5"/>{score}% Match</span>
              </div>

              <div className="pr-24">
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-2">{opp.title}</h3>
                <p className="text-xs text-slate-600 font-semibold mb-1">{opp.org}</p>
                <div className="flex flex-col gap-1 text-xs text-slate-500 mb-4">
                  <span>Compensation: <strong className="text-emerald-600">{opp.stipend}</strong></span>
                  <span>Duration: <strong className="text-slate-700">{opp.duration}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {opp.tags.map((t,i)=>(
                    <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded text-[10px] font-bold">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                {isJury ? (
                  juryAccepted
                    ? <button disabled className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-xl px-2 py-2 text-[11px] cursor-not-allowed flex items-center justify-center gap-1"><CheckCircle className="w-3.5 h-3.5"/>Accepted · Calendar Synced</button>
                    : <button onClick={()=>setShowJuryAccept(true)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors">Accept Invitation</button>
                ) : isNom ? (
                  nominationDone
                    ? <button disabled className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-xl px-2 py-2 text-[11px] cursor-not-allowed flex items-center justify-center gap-1"><CheckCircle className="w-3.5 h-3.5"/>Nomination Submitted</button>
                    : <button onClick={()=>{setShowNomination(true);setNominationStep(0);}} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors">Register Nomination</button>
                ) : (
                  isApplied
                    ? <button disabled className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-xl px-2 py-2 text-[11px] cursor-not-allowed flex items-center justify-center gap-1"><CheckCircle className="w-3.5 h-3.5"/>Applied</button>
                    : <button onClick={()=>handleCTA(opp)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors">{opp.ctaType}</button>
                )}
                <button onClick={()=>setActiveDetailsCard(opp)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-2 py-2 text-[11px] transition-colors">View Details</button>
              </div>
            </div>
          );
        })}
        {filteredOpportunities.length===0 && <div className="col-span-full py-12 text-center text-slate-400">No opportunities match your filters.</div>}
      </div>

      {/* ── Application Drawer ── */}
      {activeApplyCard && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl shadow-2xl relative animate-fade-in max-h-[90vh] flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-t-2xl"/>
            <div className="flex justify-between items-start p-6 pb-4 shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-800">Submit Application</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5 max-w-xs truncate">{activeApplyCard.title}</p>
              </div>
              <button onClick={()=>setActiveApplyCard(null)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            {/* Pre-filled profile banner */}
            <div className="mx-6 mb-4 bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0">R</div>
              <div>
                <p className="text-xs font-bold text-slate-800">Ms. Renugadevi R · Assistant Professor, IT Dept</p>
                <p className="text-[10px] text-indigo-600 font-semibold">Profile auto-filled · 2 IEEE Publications · PhD in Progress</p>
              </div>
              <CheckCircle className="w-4 h-4 text-indigo-500 ml-auto shrink-0"/>
            </div>
            <form onSubmit={handleConfirmApply} className="overflow-y-auto px-6 pb-6 space-y-4 flex-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Statement of Purpose</label>
                <textarea required rows="3" value={sop} onChange={e=>setSop(e.target.value)}
                  placeholder="Explain your motivation and domain expertise..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"/>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Available Hours / Week</label>
                <input type="number" min="2" max="40" required value={hours} onChange={e=>setHours(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 transition-all"/>
              </div>
              {/* CV Upload */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload CV / Résumé</label>
                <div onClick={()=>cvRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 text-center cursor-pointer transition-all group">
                  <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvChange}/>
                  {cvFile ? (
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-indigo-700">{cvFile.name}</p>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{width:`${cvProgress}%`}}/>
                      </div>
                      <p className="text-[9px] text-slate-400 font-semibold">{cvProgress<100?`Uploading… ${cvProgress}%`:'✓ Uploaded'}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-indigo-500 transition-colors">
                      <Upload className="w-5 h-5"/><p className="text-[11px] font-semibold">Click to upload PDF / DOCX</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Cover Letter Upload */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cover Letter <span className="text-slate-400 font-normal">(optional)</span></label>
                <div onClick={()=>coverRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl p-4 text-center cursor-pointer transition-all group">
                  <input ref={coverRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCoverChange}/>
                  {coverFile ? (
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-sky-700">{coverFile.name}</p>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full transition-all duration-300" style={{width:`${coverProgress}%`}}/>
                      </div>
                      <p className="text-[9px] text-slate-400 font-semibold">{coverProgress<100?`Uploading… ${coverProgress}%`:'✓ Uploaded'}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-sky-500 transition-colors">
                      <FileText className="w-5 h-5"/><p className="text-[11px] font-semibold">Click to upload cover letter</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setActiveApplyCard(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm transition-colors">Confirm Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Accept Jury Modal ── */}
      {showJuryAccept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-2xl"/>
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600"/>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Accept Jury Invitation</h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">SIH 2026 — Senior Evaluation Jury</p>
                </div>
              </div>
              <button onClick={()=>setShowJuryAccept(false)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 space-y-2 mb-5 text-xs text-slate-600">
              {[['Event','Smart India Hackathon 2026'],['Role','Senior Evaluation Jury'],['Mode','Hybrid (Oct 2–4, 2026)'],['Organizer','AICTE & MoE']].map(([k,v])=>(
                <div key={k} className="flex justify-between"><span className="font-semibold text-slate-500">{k}:</span><span className="font-bold text-slate-800">{v}</span></div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3 mb-5 text-xs text-amber-800">
              <Calendar className="w-4 h-4 shrink-0"/>
              <span>Clicking <strong>Accept & Add to Calendar</strong> will download an ICS file compatible with Google Calendar / Outlook.</span>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setShowJuryAccept(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Decline</button>
              <button onClick={handleAcceptJury} className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                <Download className="w-3.5 h-3.5"/> Accept & Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HoD Nomination Approval Workflow ── */}
      {showNomination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl"/>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-800">Register Nomination</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Industry Immersion: Cloud-Native Microservices</p>
              </div>
              <button onClick={()=>setShowNomination(false)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            {/* Stepper */}
            <div className="flex items-center gap-0 mb-6">
              {nominationSteps.map((step,i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                      i < nominationStep  ? 'bg-emerald-500 border-emerald-500 text-white'
                      : i === nominationStep ? 'bg-white border-indigo-600 text-indigo-600'
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>{i < nominationStep ? '✓' : i+1}</div>
                    <p className={`text-[8px] font-bold mt-1.5 text-center leading-tight max-w-[64px] ${i<=nominationStep?'text-slate-700':'text-slate-400'}`}>{step.label}</p>
                  </div>
                  {i < nominationSteps.length-1 && (
                    <div className={`h-0.5 w-8 mb-5 rounded-full transition-all ${i<nominationStep?'bg-emerald-400':'bg-slate-200'}`}/>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 mb-5 min-h-[80px] flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-800 mb-1">{nominationSteps[nominationStep].label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{nominationSteps[nominationStep].desc}</p>
              {nominationStep===1 && (
                <div className="mt-3 flex items-center gap-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>
                  <span>Awaiting sign-off from <strong>Dr. S. Kumaran (HoD, IT Dept)</strong></span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setShowNomination(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Cancel</button>
              <button onClick={advanceNomination} className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                <ChevronRight className="w-3.5 h-3.5"/>
                {nominationStep===0 ? 'Submit to HoD' : nominationStep===1 ? 'Confirm Clearance' : 'Finalize Nomination'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Details Modal ── */}
      {activeDetailsCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-t-2xl"/>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-800">Opportunity Eligibility &amp; Scope</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeDetailsCard.org}</p>
              </div>
              <button onClick={()=>setActiveDetailsCard(null)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5"><FileText className="w-3.5 h-3.5 text-indigo-500"/> Grant / Project Scope</h4>
                <p className="leading-relaxed">{activeDetailsCard.scope}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5"><HelpCircle className="w-3.5 h-3.5 text-purple-500"/> Eligibility Criteria</h4>
                <p className="leading-relaxed bg-purple-50/30 border border-purple-100 p-3 rounded-xl">{activeDetailsCard.eligibility}</p>
              </div>
              <div className="flex items-center justify-between bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 text-[11px]">
                <span className="flex items-center gap-1 font-semibold text-slate-500"><Clock className="w-3.5 h-3.5 text-indigo-500"/> Timeline:</span>
                <span className="font-bold text-slate-700">{activeDetailsCard.timeline}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={()=>setActiveDetailsCard(null)} className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyOpportunitiesView;
