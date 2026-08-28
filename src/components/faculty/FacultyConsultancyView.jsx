import React, { useState } from 'react';
import { Layers, Briefcase, FileCheck, CheckCircle2, Building, Send, Video, X, ChevronRight, Sparkles, Download, Link2, Loader2 } from 'lucide-react';

const MILESTONES = [
  { pct: 10,  label: 'Project Kick-off',           disbursement: '10% Advance Released' },
  { pct: 30,  label: 'Phase 1 Deliverable Review', disbursement: '20% on Phase 1 Approval' },
  { pct: 60,  label: 'Mid-Term Evaluation',        disbursement: '30% on Mid-Term Sign-off' },
  { pct: 85,  label: 'Phase 3 Submission',         disbursement: '25% on Phase 3 Approval' },
  { pct: 100, label: 'Final Deployment & Closure', disbursement: '15% Final Disbursement' },
];

const generateMeetLink = (company) => `https://meet.google.com/vp-${company.toLowerCase().replace(/\s+/g,'-').slice(0,6)}-${Math.random().toString(36).slice(2,6)}`;

const generateICS = (company, slot) => {
  const now = new Date().toISOString().replace(/[-:.]/g,'').slice(0,15)+'Z';
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//VidyaPrayog//EN',
    'BEGIN:VEVENT','DTSTART:20261002T090000Z','DTEND:20261002T100000Z',
    `DTSTAMP:${now}`,`SUMMARY:Discovery Call – ${company}`,
    `DESCRIPTION:Slot: ${slot}`,
    'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR'].join('\r\n');
};

const FacultyConsultancyView = ({ triggerToast }) => {
  const [activeProjects, setActiveProjects] = useState([
    { id: 1, client: "Tech Corp",     title: "Mobile Edge ML Optimization",      value: "₹8.5L", progress: 70, statusText: "Phase 3 Milestone Due in 12 days" },
    { id: 2, client: "AgroTech Labs", title: "Multi-Spectral Crop Disease Detector", value: "₹6.0L", progress: 45, statusText: "In Progress" }
  ]);

  const [queue, setQueue] = useState([
    { id: 3, company: "FinServe Analytics", title: "Fraud Detection Engine Hardening",    desc: "Need academic review and architectural hardening of our real-time ML pipeline." },
    { id: 4, company: "AutoDrive Systems",  title: "Lidar Point Cloud Segmentation",      desc: "Consultancy requested for implementing novel CNN approaches on edge hardware." }
  ]);

  // Modal states
  const [activeMilestoneProject,  setActiveMilestoneProject]  = useState(null);
  const [activeProposalStatement, setActiveProposalStatement] = useState(null);
  const [activeDiscoveryStatement,setActiveDiscoveryStatement]= useState(null);
  const [discoveryStep,           setDiscoveryStep]           = useState('form'); // 'form' | 'confirmed'
  const [meetLink,                setMeetLink]                = useState('');

  // Form states
  const [proposalDeliverables, setProposalDeliverables] = useState('');
  const [contractSigned,       setContractSigned]       = useState(false);
  const [aiDraftLoading,       setAiDraftLoading]       = useState(false);
  const [aiDraftText,          setAiDraftText]          = useState('');
  const [selectedSlot,         setSelectedSlot]         = useState('Monday, 10:00 AM');

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!contractSigned) { triggerToast("You must agree to the contract sign-off terms."); return; }
    const newProj = {
      id: activeProposalStatement.id,
      client: activeProposalStatement.company,
      title: activeProposalStatement.title,
      value: "₹5.0L (Proposed)", progress: 0,
      statusText: "Proposal Submitted (Awaiting Client Sign-Off)"
    };
    setActiveProjects(prev=>[...prev, newProj]);
    setQueue(prev=>prev.filter(i=>i.id!==activeProposalStatement.id));
    triggerToast(`Technical proposal for "${activeProposalStatement.title}" submitted!`);
    setActiveProposalStatement(null); setProposalDeliverables(''); setContractSigned(false); setAiDraftText('');
  };

  const handleGenerateAiDraft = () => {
    if (!activeProposalStatement) return;
    setAiDraftLoading(true); setAiDraftText('');
    setTimeout(() => {
      setAiDraftText(
        `${activeProposalStatement.company} seeks an academic collaboration to ${activeProposalStatement.desc} `+
        `The proposed engagement will leverage institutional expertise in AI/ML and distributed systems to deliver a robust, production-ready solution. `+
        `Milestones include a 4-week discovery sprint, phased prototype delivery, and a final knowledge-transfer workshop. `+
        `Estimated effort: 3 months · Budget: ₹5.0L · Faculty Lead: Ms. Renugadevi R (IT Dept).`
      );
      setAiDraftLoading(false);
    }, 1200);
  };

  const handleBookDiscovery = (e) => {
    e.preventDefault();
    const link = generateMeetLink(activeDiscoveryStatement.company);
    setMeetLink(link);
    setDiscoveryStep('confirmed');
    triggerToast(`Discovery Call booked with ${activeDiscoveryStatement.company} for ${selectedSlot}!`);
  };

  const downloadDiscoveryICS = () => {
    const blob = new Blob([generateICS(activeDiscoveryStatement.company, selectedSlot)], {type:'text/calendar;charset=utf-8'});
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'),{href:url,download:'DiscoveryCall_VidyaPrayog.ics'});
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    triggerToast('Calendar invite (.ics) downloaded!');
  };

  const getCurrentMilestoneIndex = (progress) =>
    MILESTONES.reduce((acc,m,i)=> progress >= m.pct ? i : acc, -1);

  return (
    <div className="space-y-6 text-left">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label:'Ongoing Consultancies', value:activeProjects.length, icon:Layers,     color:'text-indigo-600', bg:'bg-indigo-50 border-indigo-200'  },
          { label:'Commercial Value',       value:'₹18.5L',             icon:Briefcase,  color:'text-emerald-600',bg:'bg-emerald-50 border-emerald-200' },
          { label:'Completed Deployments',  value:'7',                  icon:FileCheck,  color:'text-purple-600', bg:'bg-purple-50 border-purple-200'   },
        ].map((s,i)=>(
          <div key={i} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} mt-1`}>{s.value}</p>
            </div>
            <div className={`p-3 rounded-xl border ${s.bg} ${s.color}`}><s.icon className="w-5 h-5"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects — clickable for milestone tracker */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500"/> Active Projects Workspace
          </h3>
          <div className="space-y-4">
            {activeProjects.map(proj=>(
              <div key={proj.id}
                onClick={()=>setActiveMilestoneProject(proj)}
                className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 hover:border-indigo-300 hover:bg-white cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded tracking-wide">{proj.client}</span>
                  <span className="text-xs font-bold text-emerald-600">{proj.value}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">{proj.title}</h4>
                <div className="w-full bg-slate-200 h-2 rounded-full mb-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{width:`${proj.progress}%`}}/>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-semibold text-slate-500">{proj.statusText}</p>
                  <span className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View Milestones <ChevronRight className="w-3 h-3"/>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Requests */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Building className="w-4 h-4 text-indigo-500"/> Corporate Problem Statements Queue
          </h3>
          <div className="space-y-4">
            {queue.map(req=>(
              <div key={req.id} className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 flex flex-col hover:border-slate-300 transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{req.company}</span>
                <h4 className="font-bold text-slate-800 text-sm mb-2">{req.title}</h4>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">{req.desc}</p>
                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200/60">
                  <button onClick={()=>{setActiveProposalStatement(req);setProposalDeliverables('');setContractSigned(false);setAiDraftText('');}}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors flex items-center justify-center gap-1.5">
                    <Send className="w-3 h-3"/> Technical Proposal
                  </button>
                  <button onClick={()=>{setActiveDiscoveryStatement(req);setDiscoveryStep('form');setMeetLink('');}}
                    className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl px-2 py-2 text-[11px] transition-colors flex items-center justify-center gap-1.5">
                    <Video className="w-3 h-3"/> Discovery Call
                  </button>
                </div>
              </div>
            ))}
            {queue.length===0 && <div className="py-12 text-center text-slate-400">All active requests addressed.</div>}
          </div>
        </div>
      </div>

      {/* ── Milestone Tracker Modal ── */}
      {activeMilestoneProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in max-h-[88vh] flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-t-2xl"/>
            <div className="flex justify-between items-start mb-5 shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-800">Project Milestone Tracker</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeMilestoneProject.client} · {activeMilestoneProject.title}</p>
              </div>
              <button onClick={()=>setActiveMilestoneProject(null)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>

            {/* Overall progress */}
            <div className="mb-5 shrink-0">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                <span>Overall Completion</span>
                <span className="text-indigo-600">{activeMilestoneProject.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-700" style={{width:`${activeMilestoneProject.progress}%`}}/>
              </div>
            </div>

            {/* Milestone steps */}
            <div className="overflow-y-auto flex-1 space-y-3 pr-1">
              {MILESTONES.map((m,i)=>{
                const curIdx   = getCurrentMilestoneIndex(activeMilestoneProject.progress);
                const isDone   = i <= curIdx;
                const isCurrent= i === curIdx + 1;
                return (
                  <div key={i} className={`flex gap-4 p-4 rounded-xl border transition-all ${
                    isDone    ? 'bg-emerald-50 border-emerald-200'
                    : isCurrent ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black border-2 ${
                      isDone    ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isCurrent ? 'bg-white border-indigo-500 text-indigo-600'
                      : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {isDone ? '✓' : i+1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className={`text-xs font-bold ${isDone?'text-emerald-800':isCurrent?'text-indigo-800':'text-slate-600'}`}>{m.label}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                          isDone    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                          : isCurrent ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>{isDone?'Complete':isCurrent?'In Progress':'Upcoming'}</span>
                      </div>
                      <p className={`text-[10px] mt-0.5 font-semibold ${isDone?'text-emerald-600':isCurrent?'text-indigo-600':'text-slate-400'}`}>{m.disbursement}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 shrink-0">
              <button onClick={()=>setActiveMilestoneProject(null)} className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-xs font-bold text-white transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Technical Proposal Modal ── */}
      {activeProposalStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl shadow-2xl relative animate-fade-in flex flex-col max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-2xl"/>
            <div className="flex justify-between items-start p-6 pb-4 shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-800">Submit Technical Proposal</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeProposalStatement.company} · {activeProposalStatement.title}</p>
              </div>
              <button onClick={()=>setActiveProposalStatement(null)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            <form onSubmit={handleSubmitProposal} className="overflow-y-auto px-6 pb-6 space-y-4 flex-1">
              {/* AI Draft Section */}
              <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200/60 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-violet-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5"/> AI Draft Pitch
                  </span>
                  <button type="button" onClick={handleGenerateAiDraft} disabled={aiDraftLoading}
                    className="text-[10px] font-bold text-violet-700 hover:text-violet-900 bg-white border border-violet-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1">
                    {aiDraftLoading ? <><Loader2 className="w-3 h-3 animate-spin"/> Drafting…</> : <><Sparkles className="w-3 h-3"/> Auto-Generate</>}
                  </button>
                </div>
                {aiDraftText ? (
                  <p className="text-[11px] text-violet-900 leading-relaxed">{aiDraftText}</p>
                ) : (
                  <p className="text-[11px] text-violet-500 italic">Click "Auto-Generate" to create an AI-drafted project pitch based on the problem statement.</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Proposed Deliverables</label>
                <textarea required rows="3" value={proposalDeliverables} onChange={e=>setProposalDeliverables(e.target.value)}
                  placeholder="Summarize structural milestones, test scripts, and edge deployments..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 transition-all resize-none"/>
              </div>
              <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <input type="checkbox" id="signoff" checked={contractSigned} onChange={e=>setContractSigned(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"/>
                <label htmlFor="signoff" className="text-[11px] text-slate-500 leading-snug">
                  I agree to standard university IP sign-off, confirming commercial consulting terms.
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setActiveProposalStatement(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm">Submit &amp; Sign-off</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Discovery Call Modal ── */}
      {activeDiscoveryStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-2xl"/>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Book Discovery Call</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">With {activeDiscoveryStatement.company}</p>
              </div>
              <button onClick={()=>setActiveDiscoveryStatement(null)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>

            {discoveryStep === 'form' ? (
              <form onSubmit={handleBookDiscovery} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Availability Slot</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Monday, 10:00 AM','Wednesday, 2:00 PM','Friday, 4:00 PM'].map(slot=>(
                      <button key={slot} type="button" onClick={()=>setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                          selectedSlot===slot ? 'bg-sky-50 border-sky-400 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={()=>setActiveDiscoveryStatement(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5">
                    <Video className="w-3.5 h-3.5"/> Book Call
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2"/>
                  <p className="text-sm font-bold text-emerald-800">Call Booked!</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">{activeDiscoveryStatement.company} · {selectedSlot}</p>
                </div>
                {/* Google Meet link */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-sky-500"/> Google Meet Link</p>
                  <a href={meetLink} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1.5 break-all">
                    <Link2 className="w-3.5 h-3.5 shrink-0"/>{meetLink}
                  </a>
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>setActiveDiscoveryStatement(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Close</button>
                  <button onClick={downloadDiscoveryICS} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                    <Download className="w-3.5 h-3.5"/> Download .ics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyConsultancyView;
