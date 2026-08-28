import React, { useState } from 'react';
import { BookOpen, FileText, Activity, Coins, FileEdit, Users, UploadCloud, Plus, X, ArrowRight, ArrowLeft, Send } from 'lucide-react';

const FacultyResearchView = ({ triggerToast }) => {
  const [pipelinePapers, setPipelinePapers] = useState([
    { id: 1, title: "Federated Learning for Edge Healthcare", conf: "IEEE ICC 2026", authors: "D. B. Kumar, P. Sharma", status: "Under Review", color: "amber", abstract: "This work proposes a communication-efficient federated learning protocol tailored for resource-constrained edge gateways in digital rural clinics." },
    { id: 2, title: "Blockchain Consensus in Microgrids", conf: "ACM e-Energy", authors: "R. Sundaram, A. Singh", status: "Revision Requested", color: "purple", abstract: "A lightweight consensus protocol utilizing proof of utility is defined, reducing transaction verification power consumption by 45%." },
    { id: 3, title: "Low-Power VLSI Design via ML", conf: "IEEE TVLSI", authors: "M. Patel, S. Gupta", status: "Camera Ready", color: "emerald", abstract: "Synthesizing layout topologies through deep generative models, reducing wire-length routing by 12% in multi-layer dies." }
  ]);

  // Modal states
  const [activeDraft, setActiveDraft] = useState(null); // paper object
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // Form states for proposal wizard
  const [proposalTitle, setProposalTitle] = useState('');
  const [fundingAgency, setFundingAgency] = useState('DST');
  const [coPis, setCoPis] = useState('');
  const [budget, setBudget] = useState('₹15.0 Lakhs');

  const handleCreateProposal = (e) => {
    e.preventDefault();
    if (!proposalTitle.trim()) {
      triggerToast("Please input a valid proposal title.");
      return;
    }
    triggerToast(`Research Proposal for "${proposalTitle}" drafted and sent to ${fundingAgency}!`);
    setShowWizard(false);
    setProposalTitle('');
    setCoPis('');
    setWizardStep(1);
  };

  const handleUploadClick = () => {
    triggerToast("Institutional Clearance uploaded successfully (PDF Verified).");
  };

  const handleAssignClick = () => {
    triggerToast("Student co-authors successfully linked to the active workspace.");
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Papers Published', value: '14', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
          { label: 'Scopus/IEEE Citations', value: '320', icon: Activity, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
          { label: 'Patents Granted', value: '2', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
          { label: 'Seed Grants Active', value: '₹24.5L', icon: Coins, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Span 2) - Pipeline */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <FileEdit className="w-4 h-4 text-indigo-500" />
            Active Research Paper Submissions &amp; Review Pipeline
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-[10px] uppercase text-slate-500 font-bold tracking-wider">
                  <th className="pb-3 pl-2">Title</th>
                  <th className="pb-3">Journal / Conference</th>
                  <th className="pb-3">Co-Authors</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {pipelinePapers.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                    <td className="py-4 pl-2">
                      <p className="font-bold text-slate-800 text-sm max-w-[200px] truncate" title={row.title}>{row.title}</p>
                    </td>
                    <td className="py-4 text-xs text-slate-600 font-semibold">{row.conf}</td>
                    <td className="py-4 text-xs text-slate-500">{row.authors}</td>
                    <td className="py-4">
                      <span className={`bg-${row.color}-50 text-${row.color}-700 border border-${row.color}-200 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide whitespace-nowrap`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <button 
                        onClick={() => setActiveDraft(row)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-opacity"
                      >
                        View Draft
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col - Grant Builder */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Coins className="w-4 h-4 text-emerald-500" />
            RFP &amp; Grant Proposal Builder
          </h3>
          <p className="text-xs text-slate-500 mb-6">Create, collaborate, and submit institutional grant proposals with automated compliance checks.</p>
          
          <div className="space-y-3 flex-1">
            <button 
              onClick={() => { setShowWizard(true); setWizardStep(1); }}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-xl p-4 transition-all text-left group"
            >
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Create New Proposal</p>
                <p className="text-[10px] text-slate-500 font-semibold">DST / SERB / MEITY</p>
              </div>
            </button>

            <button 
              onClick={handleUploadClick}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-white rounded-xl p-4 transition-all text-left group"
            >
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <UploadCloud className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Upload Clearance</p>
                <p className="text-[10px] text-slate-500 font-semibold">Institutional Ethics / Admin Verification</p>
              </div>
            </button>

            <button 
              onClick={handleAssignClick}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-white rounded-xl p-4 transition-all text-left group"
            >
              <div className="bg-purple-100 text-purple-600 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Assign Co-Authors</p>
                <p className="text-[10px] text-slate-500 font-semibold">Invite Students &amp; Peers</p>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* ── Abstract Draft Inspector Modal ── */}
      {activeDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Paper Abstract &amp; Status</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeDraft.conf}</p>
              </div>
              <button onClick={() => setActiveDraft(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-bold text-slate-800 mb-1">Abstract:</h4>
                <p>&ldquo;{activeDraft.abstract}&rdquo;</p>
              </div>
              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <span className="text-slate-500 font-semibold">Current Review Status:</span>
                <span className={`bg-${activeDraft.color}-50 text-${activeDraft.color}-700 border border-${activeDraft.color}-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]`}>
                  {activeDraft.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveDraft(null)}
                className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DST/SERB Grant Proposal Multi-Step Wizard Modal ── */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">DST/SERB Proposal Wizard</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Step {wizardStep} of 2</p>
              </div>
              <button onClick={() => setShowWizard(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4">
              {wizardStep === 1 ? (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Project Title</label>
                    <input
                      type="text"
                      required
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      placeholder="e.g. Distributed Ledger Systems for Smart Grids"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Funding Agency</label>
                    <select
                      value={fundingAgency}
                      onChange={(e) => setFundingAgency(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-all"
                    >
                      <option value="DST">DST (Science &amp; Tech)</option>
                      <option value="SERB">SERB (Core Research Grant)</option>
                      <option value="MEITY">MEITY Startup Hub</option>
                    </select>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-xl px-4 py-2.5 text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Co-Principal Investigators (Co-PIs)</label>
                    <input
                      type="text"
                      value={coPis}
                      onChange={(e) => setCoPis(e.target.value)}
                      placeholder="e.g. Dr. A. Raman, Dr. K. Roy"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Requested Budget</label>
                    <input
                      type="text"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Proposal
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyResearchView;
