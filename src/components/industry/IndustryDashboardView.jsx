import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Calendar, 
  Zap, 
  Activity, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const IndustryDashboardView = ({ onTabChange, onFastTrackInterview, candidates = [] }) => {
  const defaultCandidates = [
    { id: 1, name: "Deepak B.", degree: "B.Tech IT", match: 94, skills: ["React", "Node.js", "Docker", "AWS"], avatar: null },
    { id: 2, name: "Priya Sharma", degree: "B.Tech CSE", match: 92, skills: ["Python", "PyTorch", "NLP", "FastAPI"], avatar: null },
    { id: 3, name: "Aditya Verma", degree: "B.Tech IT", match: 88, skills: ["Docker", "Kubernetes", "AWS", "Go"], avatar: null },
    { id: 4, name: "Ananya Iyer", degree: "B.Tech CSE", match: 86, skills: ["React Native", "Firebase", "SQL"], avatar: null }
  ];

  const pipelineCandidates = candidates.length > 0 ? candidates : defaultCandidates;

  const mockDrives = [
    { id: 1, title: "Edge AI Observability Sprint", date: "August 30, 2026", type: "Hackathon", registered: 42 },
    { id: 2, title: "Acme Senior Developer Drive", date: "September 02, 2026", type: "Placement Drive", registered: 118 },
    { id: 3, title: "Zero-Trust Security Hackathon", date: "September 15, 2026", type: "Hackathon", registered: 28 }
  ];

  const skillGaps = [
    { skill: "DevOps & Docker", demand: "High", matchingStudents: 14, gapPercent: 78, color: "from-rose-500 to-orange-500" },
    { skill: "AI/ML (NLP)", demand: "Medium", matchingStudents: 32, gapPercent: 42, color: "from-amber-500 to-yellow-500" },
    { skill: "React Frontend", demand: "Critical", matchingStudents: 85, gapPercent: 12, color: "from-emerald-500 to-teal-500" }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 animate-fade-in text-slate-800">
      {/* Title block */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Recruiter Command Center <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review real-time student competencies, publish placements, and evaluate matching indices.
        </p>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div 
          onClick={() => onTabChange('Post Job')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Postings</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">12 Roles Active</span>
          </div>
          <p className="text-[10px] text-indigo-600 font-semibold mt-1">Internships & Jobs</p>
        </div>

        {/* KPI 2 */}
        <div 
          onClick={() => onTabChange('Candidate Matching')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shortlisted Candidates</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">48 Profiles</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">Pending Interview Scheduling</p>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => onTabChange('Talent Analytics')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">76% Conversion</span>
          </div>
          <p className="text-[10px] text-indigo-600 font-semibold mt-1">+4% this academic cycle</p>
        </div>

        {/* KPI 4 */}
        <div 
          onClick={() => onTabChange('Candidate Matching')}
          className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Skill Match</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">88% Competency</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      {/* Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Real-Time AI Candidate Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600 animate-pulse" /> Real-Time AI Candidate Pipeline
            </h3>
            <button 
              onClick={() => onTabChange('Candidate Matching')}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 transition-colors"
            >
              See All Profiles <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {pipelineCandidates.map((candidate) => (
              <div 
                key={candidate.id}
                className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{candidate.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{candidate.degree}</p>
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {candidate.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" /> {candidate.match}% Match
                  </span>
                  <button 
                    onClick={() => onFastTrackInterview(candidate)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md shadow-indigo-500/10 active:scale-95 transition-all"
                  >
                    Fast-Track Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Scheduled drives & Role Gaps */}
        <div className="space-y-6">
          {/* Scheduled Assessment Drives & Hackathons */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 px-1">
              <Calendar className="w-4 h-4 text-indigo-600" /> Scheduled Drives & Hackathons
            </h3>

            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-3">
              {mockDrives.map((drive) => (
                <div key={drive.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-extrabold text-slate-900 text-xs leading-tight">{drive.title}</h4>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      drive.type === 'Hackathon' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    }`}>
                      {drive.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-[10px] text-slate-400 font-semibold">
                    <span>{drive.date}</span>
                    <span className="text-indigo-600 font-bold">{drive.registered} Registered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Role Gap AI Radar */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 px-1">
              <Activity className="w-4 h-4 text-rose-500" /> Instant Role Gap AI Radar
            </h3>

            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-4">
              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                Talent availability radar shows structural mismatches between your active vacancies and verified campus credentials.
              </p>

              <div className="space-y-3">
                {skillGaps.map((gap, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-semibold">
                      <span className="text-slate-800 font-bold">{gap.skill}</span>
                      <span className="text-slate-400">{gap.matchingStudents} available candidates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${gap.color} rounded-full`} style={{ width: `${gap.gapPercent}%` }}></div>
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-700 shrink-0 w-8 text-right">{gap.gapPercent}% gap</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[9px] text-slate-500 font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Shortage Warning:</strong> High vacancy count for DevOps roles. Recommend scheduling a Sandbox Challenge to boost talent onboarding.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndustryDashboardView;
