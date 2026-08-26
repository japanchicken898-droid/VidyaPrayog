import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Code, 
  Award, 
  Briefcase, 
  ArrowRight,
  ExternalLink,
  Download,
  Filter,
  CheckCircle
} from 'lucide-react';

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);


const CandidateMatchingView = ({ onAction, onInvite }) => {
  // Mock data of student candidates
  const allCandidates = [
    { 
      id: 1, 
      name: "Deepak B.", 
      degree: "B.Tech IT", 
      year: "4th Year (2026)",
      matchIndex: 94,
      skills: { frontend: 94, backend: 88, devops: 62 },
      badges: ["Top 5% Diagnostic", "SIH Finalist", "Verified Docker Capstone"],
      github: true,
      leetcode: true,
      credentials: true
    },
    { 
      id: 2, 
      name: "Priya Sharma", 
      degree: "B.Tech CSE", 
      year: "4th Year (2026)",
      matchIndex: 92,
      skills: { frontend: 88, backend: 95, devops: 58 },
      badges: ["Top 2% Python Diagnostic", "SIH Finalist"],
      github: true,
      leetcode: true,
      credentials: true
    },
    { 
      id: 3, 
      name: "Aditya Verma", 
      degree: "B.Tech IT", 
      year: "4th Year (2026)",
      matchIndex: 87,
      skills: { frontend: 65, backend: 80, devops: 92 },
      badges: ["Docker Master Badge", "AWS Certified Cloud Practitioner"],
      github: true,
      leetcode: false,
      credentials: true
    },
    { 
      id: 4, 
      name: "Ananya Iyer", 
      degree: "B.Tech CSE", 
      year: "3rd Year (2027)",
      matchIndex: 81,
      skills: { frontend: 92, backend: 72, devops: 40 },
      badges: ["React Native Expert", "Smart India Hackathon Participant"],
      github: false,
      leetcode: true,
      credentials: false
    },
    { 
      id: 5, 
      name: "Rahul Nair", 
      degree: "B.Tech ECE", 
      year: "4th Year (2026)",
      matchIndex: 78,
      skills: { frontend: 55, backend: 82, devops: 60 },
      badges: ["Embedded C Specialist"],
      github: true,
      leetcode: true,
      credentials: true
    }
  ];

  // Filters State
  const [filterMatch85, setFilterMatch85] = useState(false);
  const [filterYear2026, setFilterYear2026] = useState(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterGitLeet, setFilterGitLeet] = useState(false);

  // Filter logic
  const filteredCandidates = allCandidates.filter(c => {
    if (filterMatch85 && c.matchIndex < 85) return false;
    if (filterYear2026 && !c.year.includes("2026")) return false;
    if (filterVerifiedOnly && !c.credentials) return false;
    if (filterGitLeet && (!c.github || !c.leetcode)) return false;
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Campus Candidate Matching <Users className="w-5 h-5 text-indigo-600" />
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse student profiles automatically calculated for compatibility with your corporate criteria.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
          <Filter className="w-4 h-4 text-slate-400" /> Filters:
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Match Score Filter */}
          <button 
            onClick={() => setFilterMatch85(!filterMatch85)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filterMatch85 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Match Index &gt; 85%
          </button>

          {/* Graduation Year Filter */}
          <button 
            onClick={() => setFilterYear2026(!filterYear2026)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filterYear2026 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Class of 2026
          </button>

          {/* Verified Credentials Filter */}
          <button 
            onClick={() => setFilterVerifiedOnly(!filterVerifiedOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filterVerifiedOnly 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified Credentials Only
          </button>

          {/* GitHub / LeetCode Filter */}
          <button 
            onClick={() => setFilterGitLeet(!filterGitLeet)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filterGitLeet 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            GitHub &amp; LeetCode Connected
          </button>
        </div>

        <div className="text-[10px] text-slate-400 font-semibold bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
          Showing <strong>{filteredCandidates.length}</strong> candidates
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div 
            key={candidate.id}
            className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Profile Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      {candidate.name} 
                      {candidate.credentials && (
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100" />
                      )}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{candidate.degree} • {candidate.year}</p>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                  {candidate.matchIndex}% Match
                </span>
              </div>

              {/* Match Breakdown Gauge */}
              <div className="space-y-2 mb-4 p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Accreditation Category Breakdown</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Frontend', val: candidate.skills.frontend, color: 'bg-indigo-600' },
                    { label: 'Backend', val: candidate.skills.backend, color: 'bg-emerald-600' },
                    { label: 'DevOps', val: candidate.skills.devops, color: 'bg-amber-500' }
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold text-slate-700 w-16">{skill.label}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.val}%` }}></div>
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-600 w-8 text-right">{skill.val}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges Earned */}
              <div className="mb-4">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Badges</p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.badges.map((b, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded-md flex items-center gap-1"
                    >
                      <Award className="w-3 h-3 text-indigo-500" /> {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connected Profiles indicators */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-semibold mb-4">
                <span className="flex items-center gap-1">
                  <Github className={`w-3.5 h-3.5 ${candidate.github ? 'text-indigo-600' : 'text-slate-300'}`} /> 
                  {candidate.github ? 'Connected' : 'N/A'}
                </span>
                <span className="flex items-center gap-1">
                  <Code className={`w-3.5 h-3.5 ${candidate.leetcode ? 'text-indigo-600' : 'text-slate-300'}`} /> 
                  {candidate.leetcode ? 'LeetCode connected' : 'N/A'}
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => onAction('TOAST', `Loading ${candidate.name}'s verified web portfolio...`)}
                className="py-2 text-[10px] font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                Portfolio <ExternalLink className="w-3 h-3" />
              </button>
              
              <button 
                onClick={() => onInvite(candidate)}
                className="py-2 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center gap-1 shadow-md shadow-indigo-500/10 transition-all active:scale-95"
              >
                Invite
              </button>

              <button 
                onClick={() => onAction('TOAST', `Transcript download initiated for ${candidate.name}`)}
                className="py-2 text-[10px] font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                Transcript <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateMatchingView;
