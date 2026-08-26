import React, { useState } from 'react';
import { Briefcase, TrendingUp, Award, Building2, X, FileText, Clock, HelpCircle } from 'lucide-react';

const FacultyOpportunitiesView = ({ triggerToast }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  
  // App states
  const [appliedStatus, setAppliedStatus] = useState({}); // { cardId: boolean }
  const [juryAccepted, setJuryAccepted] = useState(false);
  
  // Modal states
  const [activeApplyCard, setActiveApplyCard] = useState(null); // card object
  const [activeDetailsCard, setActiveDetailsCard] = useState(null); // card object
  
  // Form states
  const [sop, setSop] = useState('');
  const [hours, setHours] = useState('8');

  const opportunitiesList = [
    {
      id: 1,
      title: "Visiting AI Research Fellow - IIT Madras R&D Park",
      org: "Center for Industrial AI",
      category: "Research Fellowships",
      domain: "AI/ML",
      stipend: "₹1.2L / mo",
      duration: "6 Months",
      tags: ["Generative AI", "Edge Compute", "Funded"],
      eligibility: "PhD in CSE/ECE with 3+ years research experience in Deep Learning. Minimum 2 IEEE/ACM publications required.",
      scope: "Lead edge deployment models for automated robotics diagnostics.",
      timeline: "Applications close Sept 15, 2026. Commences Oct 1, 2026.",
      ctaType: "Submit Application"
    },
    {
      id: 2,
      title: "Smart India Hackathon 2026 - Senior Evaluation Jury",
      org: "AICTE & Ministry of Education",
      category: "Hackathon Mentorship",
      domain: "Cyber Security",
      stipend: "Provided (Honorarium)",
      duration: "Hybrid",
      tags: ["National Hackathon", "Mentorship", "SIH 2026"],
      eligibility: "Assistant Professor grade or above with experience guiding student hackathon teams.",
      scope: "Evaluate top-tier software prototypes submitted under Cyber Security & Smart Infrastructure themes.",
      timeline: "Invites open until Sept 30, 2026. Evaluation rounds start Oct 2026.",
      ctaType: "Accept Invitation"
    },
    {
      id: 3,
      title: "Industry Immersion: Cloud-Native Microservices",
      org: "AWS Academic Alliance",
      category: "Sabbaticals",
      domain: "Cloud",
      stipend: "4-Week Sabbatical",
      duration: "Advanced",
      tags: ["Kubernetes", "Cloud Architecture", "Industry Cert"],
      eligibility: "Faculty members teaching cloud systems or distributed computing. AWS Solutions Architect Associate preferred.",
      scope: "Hands-on immersion with AWS Core Services teams, designing auto-scaling pipelines.",
      timeline: "Nomination deadline Oct 5, 2026.",
      ctaType: "Register Nomination"
    }
  ];

  // Dynamic filter logic
  const filteredOpportunities = opportunitiesList.filter(opp => {
    const categoryMatch = selectedCategory === 'All' || opp.category === selectedCategory;
    const domainMatch = selectedDomain === 'All' || opp.domain === selectedDomain;
    return categoryMatch && domainMatch;
  });

  const handleApplyClick = (opp) => {
    setActiveApplyCard(opp);
    setSop('');
    setHours('8');
  };

  const handleConfirmApply = (e) => {
    e.preventDefault();
    if (!sop.trim()) {
      triggerToast("Please provide a brief Statement of Purpose.");
      return;
    }
    setAppliedStatus(prev => ({ ...prev, [activeApplyCard.id]: true }));
    triggerToast(`Application for "${activeApplyCard.title}" submitted successfully!`);
    setActiveApplyCard(null);
  };

  const handleAcceptJury = () => {
    setJuryAccepted(true);
    triggerToast("SIH 2026 Senior Evaluation Jury invitation accepted!");
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Active Calls', value: '24', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
          { label: 'Industry Sabbaticals', value: '6', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          { label: 'Hackathon Jury Invites', value: juryAccepted ? '9' : '8', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
          { label: 'Govt Grant Schemes', value: '10', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
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

      {/* Filter Bar */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-slate-700">Category:</span>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 outline-none focus:border-indigo-400"
          >
            <option value="All">All Categories</option>
            <option value="Sabbaticals">Sabbaticals</option>
            <option value="Research Fellowships">Research Fellowships</option>
            <option value="Hackathon Mentorship">Hackathon Mentorship</option>
          </select>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-slate-700">Domain:</span>
          <div className="flex gap-2 flex-wrap">
            {['All', 'AI/ML', 'IoT', 'Cloud', 'Cyber Security'].map(d => {
              const isActive = selectedDomain === d;
              return (
                <button
                  key={d} 
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3.5 py-1.5 border rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map(opp => {
          const isApplied = appliedStatus[opp.id];
          const isJuryCard = opp.id === 2;
          
          return (
            <div key={opp.id} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-2">{opp.title}</h3>
                <p className="text-xs text-slate-600 font-semibold mb-1">{opp.org}</p>
                <div className="flex flex-col gap-1 text-xs text-slate-500 mb-4">
                  <span>Compensation: <strong className="text-emerald-600">{opp.stipend}</strong></span>
                  <span>Duration/Format: <strong className="text-slate-700">{opp.duration}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {opp.tags.map((tag, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-auto">
                {isJuryCard ? (
                  juryAccepted ? (
                    <button 
                      disabled 
                      className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-xl px-2 py-2 text-[11px] cursor-not-allowed"
                    >
                      ✓ Accepted • Access Dashboard
                    </button>
                  ) : (
                    <button 
                      onClick={handleAcceptJury}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors text-center"
                    >
                      Accept Invitation
                    </button>
                  )
                ) : (
                  isApplied ? (
                    <button 
                      disabled 
                      className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-xl px-2 py-2 text-[11px] cursor-not-allowed"
                    >
                      ✓ Applied
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleApplyClick(opp)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-[11px] shadow-sm transition-colors text-center"
                    >
                      {opp.ctaType}
                    </button>
                  )
                )}
                <button 
                  onClick={() => setActiveDetailsCard(opp)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-2 py-2 text-[11px] transition-colors text-center"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
        {filteredOpportunities.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400">
            No opportunities match your current filters.
          </div>
        )}
      </div>

      {/* ── Express Interest / Application Modal ── */}
      {activeApplyCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Express Interest</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeApplyCard.title}</p>
              </div>
              <button onClick={() => setActiveApplyCard(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleConfirmApply} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Statement of Purpose (SOP)</label>
                <textarea
                  required
                  rows="3"
                  value={sop}
                  onChange={(e) => setSop(e.target.value)}
                  placeholder="Explain why you are interested and your expertise in this field..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Available Hours / Week</label>
                <input 
                  type="number"
                  min="2"
                  max="40"
                  required
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveApplyCard(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm transition-colors"
                >
                  Confirm Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Eligibility & Details Modal ── */}
      {activeDetailsCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-800">Opportunity Eligibility &amp; Scope</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeDetailsCard.org}</p>
              </div>
              <button onClick={() => setActiveDetailsCard(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" /> Grant / Project Scope
                </h4>
                <p className="leading-relaxed">{activeDetailsCard.scope}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-500" /> Eligibility Criteria
                </h4>
                <p className="leading-relaxed bg-purple-50/30 border border-purple-100 p-3 rounded-xl">{activeDetailsCard.eligibility}</p>
              </div>

              <div className="flex items-center justify-between bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 text-[11px]">
                <span className="flex items-center gap-1 font-semibold text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> Timeline:
                </span>
                <span className="font-bold text-slate-700">{activeDetailsCard.timeline}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveDetailsCard(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyOpportunitiesView;
