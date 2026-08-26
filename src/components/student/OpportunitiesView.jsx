import React, { useState, useCallback } from 'react';
import { Briefcase, Landmark, CheckCircle, Search, SlidersHorizontal, MapPin, BadgePercent } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const OpportunitiesView = ({ activeSubTab = 'Internships', onSubTabChange }) => {
  const { opportunities, studentSubmissions, submitStudentApplication } = useApp();
  const [selectedJobId, setSelectedJobId] = useState("int-1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [minStipend, setMinStipend] = useState(15000);
  const [aiMatchToggle, setAiMatchToggle] = useState(false);

  const appliedJobs = studentSubmissions
    .filter(s => s.studentName === "Deepak B.")
    .map(s => s.jobId);

  const internshipsList = opportunities.filter(o => o.type === 'Internship');
  const jobsList = opportunities.filter(o => o.type === 'Job');

  const getActiveList = () => {
    if (activeSubTab === 'Jobs') return jobsList;
    if (activeSubTab === 'Applications') {
      return opportunities.filter(job => appliedJobs.includes(job.id));
    }
    return internshipsList;
  };

  // Perform functional filters
  const filteredList = getActiveList().filter(job => {
    // 1. Text Search matching title or company
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Location matching
    const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;

    // 3. Stipend range
    const matchesStipend = (job.stipendNum || 0) >= minStipend;

    // 4. AI Match threshold (>80%)
    const matchesAi = !aiMatchToggle || (job.matchScore || 0) >= 80;

    return matchesSearch && matchesLocation && matchesStipend && matchesAi;
  });

  const selectedJob = filteredList.find(j => j.id === selectedJobId) || filteredList[0];

  const [applyToast, setApplyToast] = useState(false);

  const handleApply = useCallback((id) => {
    if (appliedJobs.includes(id)) return;
    submitStudentApplication(id, { name: "Deepak B.", score: 92 });
    setApplyToast(true);
    setTimeout(() => setApplyToast(false), 3500);
  }, [appliedJobs, submitStudentApplication]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in text-left">
      
      {/* Tab Navigation header */}
      <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-3">
          <button 
            onClick={() => { onSubTabChange('Internships'); setSelectedJobId('int-1'); }}
            className={`pb-3 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Internships' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Internships
          </button>
          <button 
            onClick={() => { onSubTabChange('Jobs'); setSelectedJobId('job-1'); }}
            className={`pb-3 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Jobs' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Full-Time Jobs
          </button>
          <button 
            onClick={() => { onSubTabChange('Applications'); }}
            className={`pb-3 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Applications' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            My Applications &amp; Status
          </button>
        </div>

        {/* Filter Controls (Matching the layout layout) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-1.5">
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Location selector dropdown */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none outline-none cursor-pointer focus:bg-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">Location: All</option>
                <option value="Remote">Remote</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            {/* Min stipend range slider */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Min Stipend:</span>
              <span className="text-xs font-extrabold text-indigo-600">₹{minStipend.toLocaleString()}/mo</span>
              <input 
                type="range"
                min="15000"
                max="40000"
                step="5000"
                value={minStipend}
                onChange={(e) => setMinStipend(Number(e.target.value))}
                className="w-24 accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
            </div>

            {/* AI Match Toggle Switch */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none bg-slate-50 border px-4 py-2 rounded-xl">
              <input 
                type="checkbox" 
                checked={aiMatchToggle}
                onChange={(e) => setAiMatchToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <BadgePercent className="w-3.5 h-3.5 text-indigo-500" />
                AI Match &gt; 80%
              </span>
            </label>
          </div>

          {/* Search box filters */}
          <div className="relative w-full max-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter list..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>

        </div>
      </div>

      {/* Toast notification */}
      {applyToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in text-sm font-bold">
          <span>✓</span> Application submitted via your verified Skill Ledger!
        </div>
      )}

      {/* Main split dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px] items-start">
        
        {/* Left List Pane (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 overflow-y-auto max-h-[calc(100vh-260px)] pr-1.5 pb-4">
          {filteredList.map((job) => (
            <div 
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer border relative ${
                selectedJobId === job.id 
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20' 
                  : 'bg-white/85 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Selected accent bar */}
              {selectedJobId === job.id && (
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 rounded-l-2xl" />
              )}

              {/* Company & Match Score */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                  {job.company}
                </span>
                {job.matchScore && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                    {job.matchScore}% Match
                  </span>
                )}
              </div>

              {/* Role Title */}
              <h3 className="font-bold text-sm text-slate-800 leading-tight mb-2.5 line-clamp-1">
                {job.title}
              </h3>

              {/* Meta Tags Row — wraps naturally, never clipped */}
              <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
                <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
                  📍 {job.location || 'Remote'}
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-emerald-700 border border-emerald-100">
                  💰 {job.stipendText || '₹25,000/mo'}
                </span>
                <span className="inline-flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md font-medium text-indigo-700 border border-indigo-100">
                  ⏱️ {job.duration || '6 Months'}
                </span>
                {appliedJobs.includes(job.id) && (
                  <span className="inline-flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md font-bold text-white text-[9px]">
                    ✓ Applied
                  </span>
                )}
              </div>

              {/* Deadline */}
              {!appliedJobs.includes(job.id) && job.deadline && (
                <p className="text-[10px] text-rose-500 font-bold mt-2.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  {job.deadline}
                </p>
              )}
            </div>
          ))}
          
          {filteredList.length === 0 && (
            <div className="p-8 text-center text-slate-400 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-2xl shadow-sm">
              No matching postings or applications found.
            </div>
          )}
        </div>

        {/* Right Details Panel (7 Cols) */}
        {selectedJob ? (
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-260px)] relative">
            <div className="p-6 border-b border-slate-100 flex-shrink-0 bg-white/90 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200 rounded-xl flex items-center justify-center font-extrabold text-slate-800 text-lg shadow-inner shrink-0">
                    {selectedJob.company[0]}
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 leading-tight">{selectedJob.title}</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-5 text-left">
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">STIPEND</div>
                    <div className="text-sm font-extrabold text-slate-800">{selectedJob.stipendText}</div>
                  </div>
                  <div className="w-px bg-slate-200 self-stretch" />
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">DURATION</div>
                    <div className="text-sm font-extrabold text-slate-800">{selectedJob.duration}</div>
                  </div>
                  <div className="w-px bg-slate-200 self-stretch" />
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">MATCH</div>
                    <div className="text-sm font-extrabold text-emerald-600">{selectedJob.matchScore}%</div>
                  </div>
                </div>
                
                {appliedJobs.includes(selectedJob.id) ? (
                  <button
                    disabled
                    className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-not-allowed text-xs"
                  >
                    ✓ Applied — Scorecard Forwarded
                  </button>
                ) : (
                  <button 
                    onClick={() => handleApply(selectedJob.id)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all duration-150 shadow-lg shadow-indigo-600/20 active:scale-95 text-xs whitespace-nowrap"
                  >
                    ⚡ 1-Click Apply via Skill Profile
                  </button>
                )}
              </div>
            </div>

            {/* Why you match section */}
            <div className="p-8 overflow-y-auto flex-1 space-y-8 bg-slate-50/50">
              
              <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-5 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-indigo-600">psychology</span>
                  <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">Why you're a {selectedJob.matchScore}% fit</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {selectedJob.whyFit ? (
                    selectedJob.whyFit.map((fit, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="text-emerald-500 w-4 h-4" />
                        <span>{fit.label} (<strong>{fit.details}</strong>)</span>
                      </div>
                    ))
                  ) : (
                    selectedJob.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="text-emerald-500 w-4 h-4" />
                        <span>Verified skill: <strong>{skill}</strong></span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-2 text-left">Role Overview</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-left">{selectedJob.overview}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-2 text-left">Key Responsibilities</h3>
                <ul className="space-y-2 text-xs text-slate-600 text-left">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-center p-8 text-slate-400">
            Select a job or internship from the list to view full descriptions.
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesView;
