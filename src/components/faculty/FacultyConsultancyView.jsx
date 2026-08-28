import React, { useState } from 'react';
import { Layers, Briefcase, FileCheck, CheckCircle2, Building, Send, Video, X } from 'lucide-react';

const FacultyConsultancyView = ({ triggerToast }) => {
  const [activeProjects, setActiveProjects] = useState([
    { id: 1, client: "Tech Corp", title: "Mobile Edge ML Optimization", value: "₹8.5L", progress: 70, statusText: "Phase 3 Milestone Due in 12 days" },
    { id: 2, client: "AgroTech Labs", title: "Multi-Spectral Crop Disease Detector", value: "₹6.0L", progress: 45, statusText: "In Progress" }
  ]);

  const [queue, setQueue] = useState([
    { id: 3, company: "FinServe Analytics", title: "Fraud Detection Engine Hardening", desc: "Need academic review and architectural hardening of our real-time ML pipeline." },
    { id: 4, company: "AutoDrive Systems", title: "Lidar Point Cloud Segmentation", desc: "Consultancy requested for implementing novel CNN approaches on edge hardware." }
  ]);

  // Modal states
  const [activeProposalStatement, setActiveProposalStatement] = useState(null); // statement object
  const [activeDiscoveryStatement, setActiveDiscoveryStatement] = useState(null); // statement object

  // Form states
  const [proposalDeliverables, setProposalDeliverables] = useState('');
  const [contractSigned, setContractSigned] = useState(false);
  
  // Discovery call states
  const [selectedSlot, setSelectedSlot] = useState('Monday, 10:00 AM');

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!contractSigned) {
      triggerToast("You must agree to the contract sign-off terms.");
      return;
    }
    
    // Add to active projects
    const newProj = {
      id: activeProposalStatement.id,
      client: activeProposalStatement.company,
      title: activeProposalStatement.title,
      value: "₹5.0L (Proposed)",
      progress: 0,
      statusText: "Proposal Submitted (Awaiting Client Sign-Off)"
    };
    
    setActiveProjects(prev => [...prev, newProj]);
    setQueue(prev => prev.filter(item => item.id !== activeProposalStatement.id));
    triggerToast(`Technical proposal for "${activeProposalStatement.title}" submitted successfully!`);
    setActiveProposalStatement(null);
    setProposalDeliverables('');
    setContractSigned(false);
  };

  const handleBookDiscovery = (e) => {
    e.preventDefault();
    triggerToast(`Discovery Call booked with ${activeDiscoveryStatement.company} for ${selectedSlot}!`);
    setActiveDiscoveryStatement(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Ongoing Consultancies', value: activeProjects.length, icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
          { label: 'Commercial Value', value: '₹18.5L', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          { label: 'Completed Deployments', value: '7', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color} mt-1`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Projects */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Active Projects Workspace
          </h3>
          <div className="space-y-4">
            {activeProjects.map(proj => (
              <div key={proj.id} className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded tracking-wide">{proj.client}</span>
                  <span className="text-xs font-bold text-emerald-600">{proj.value}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">{proj.title}</h4>
                <div className="w-full bg-slate-200 h-2 rounded-full mb-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }}></div>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 text-right">{proj.statusText}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Requests */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Building className="w-4 h-4 text-indigo-500" />
            Corporate Problem Statements Queue
          </h3>
          <div className="space-y-4">
            {queue.map((req) => (
              <div key={req.id} className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 flex flex-col h-full hover:border-slate-300 transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{req.company}</span>
                <h4 className="font-bold text-slate-800 text-sm mb-2">{req.title}</h4>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">{req.desc}</p>
                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200/60">
                  <button 
                    onClick={() => setActiveProposalStatement(req)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3 h-3" /> Technical Proposal
                  </button>
                  <button 
                    onClick={() => setActiveDiscoveryStatement(req)}
                    className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl px-2 py-2 text-[11px] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3 h-3" /> Discovery Call
                  </button>
                </div>
              </div>
            ))}
            {queue.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                You have addressed all active requests in the queue.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Submit Technical Proposal & Contract Sign-off Modal ── */}
      {activeProposalStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Submit Technical Proposal</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeProposalStatement.company} • {activeProposalStatement.title}</p>
              </div>
              <button onClick={() => setActiveProposalStatement(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Proposed Deliverables</label>
                <textarea
                  required
                  rows="3"
                  value={proposalDeliverables}
                  onChange={(e) => setProposalDeliverables(e.target.value)}
                  placeholder="Summarize structural milestones, test scripts, and edge deployments..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 transition-all resize-none animate-none"
                />
              </div>

              <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <input 
                  type="checkbox"
                  id="signoff"
                  checked={contractSigned}
                  onChange={(e) => setContractSigned(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="signoff" className="text-[11px] text-slate-500 leading-snug">
                  I agree to standard university intellectual property sign-off, confirming commercial consulting terms.
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveProposalStatement(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm"
                >
                  Submit &amp; Sign-off
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Book Discovery Call Modal ── */}
      {activeDiscoveryStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Book Discovery Call</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">With {activeDiscoveryStatement.company}</p>
              </div>
              <button onClick={() => setActiveDiscoveryStatement(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBookDiscovery} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Simulated Availability Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="Monday, 10:00 AM">Monday, 10:00 AM</option>
                  <option value="Wednesday, 2:00 PM">Wednesday, 2:00 PM</option>
                  <option value="Friday, 4:00 PM">Friday, 4:00 PM</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveDiscoveryStatement(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm"
                >
                  Schedule Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyConsultancyView;
