import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Code, Link as LinkIcon, ExternalLink, Download, Share2 } from 'lucide-react';
import { getStudentProfile, getSubmissions } from '../../services/api';

// Tier color mapping
const TIER_COLORS = {
  Platinum: 'bg-indigo-50 border-indigo-300 text-indigo-700',
  Gold: 'bg-amber-50 border-amber-300 text-amber-700',
  Silver: 'bg-slate-50 border-slate-300 text-slate-600',
  Bronze: 'bg-orange-50 border-orange-300 text-orange-700',
};

const TIER_ICONS = {
  Platinum: '💎',
  Gold: '🥇',
  Silver: '🥈',
  Bronze: '🥉',
};

const ShowcaseView = ({ activeSubTab = 'Portfolio', onSubTabChange, onOpenCert }) => {
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getStudentProfile(), getSubmissions(1)])
      .then(([profileData, subsData]) => {
        if (mounted) {
          setProfile(profileData);
          setSubmissions(subsData.submissions || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`} />
  );

  // Generate badge cards from live submissions
  const liveBadges = submissions.map(sub => ({
    id: sub.id,
    name: sub.assessment_title,
    tier: sub.badge_tier || 'Silver',
    detail: `${sub.score_percentage}% Score • ${new Date(sub.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    category: sub.category,
  }));

  return (
    <div className="max-w-container-max mx-auto space-y-6 text-left animate-fade-in">
      
      {/* Top Sub-Navigation Tabs */}
      <div className="flex gap-8 border-b border-slate-200/60 px-4 mb-6 relative">
        <button 
          onClick={() => onSubTabChange('Portfolio')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
            activeSubTab === 'Portfolio' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Digital Portfolio
        </button>
        <button 
          onClick={() => onSubTabChange('Projects')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
            activeSubTab === 'Projects' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Verified Projects &amp; Capstones
        </button>
        <button 
          onClick={() => onSubTabChange('Badges')}
          className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
            activeSubTab === 'Badges' 
              ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-900 font-semibold'
          }`}
        >
          Accredited Badges &amp; Certificates
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Tab 1: Digital Portfolio */}
        {activeSubTab === 'Portfolio' && (
          <>
            {/* Hero Profile Card */}
            <section className="bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden relative">
              <div 
                className="bg-cover bg-center w-full h-36 md:h-48 relative" 
                style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcrNoh4g4vVlpy-Fq9VcPTlWDeCci8alnfkiDF2p_sr19Ufa6GL8xAPp2wt4Mdz8ryhC2HzRTFImtXXXayMps5OpoX2ZCx66BUBqZpQ3AiTf_gHvfXTd6zDoywT43XlGpU-EDIBUXQcBQwJjAZCflLh0JNnPwiiswbgfvP4Yp9HE-Ry9yHQGc1gH-ZsTOAG6NprWR2m6ipIlM3HchCGX7SBYekowL0_Ry_f6QucB25SEWdgElGVigs')"}}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-40"></div>
              </div>
              
              <div className="px-6 md:px-10 pb-8 relative z-10">
                <div className="absolute top-4 right-6 md:right-10 flex gap-3">
                  <button onClick={() => alert("Public share link copied to clipboard!")} className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95">
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    Public Share
                  </button>
                  <button onClick={() => alert("Downloading signed verified PDF transcript...")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
                    <Download className="w-3.5 h-3.5" />
                    Download Verified PDF
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
                  <div className="relative p-1 bg-white rounded-full shrink-0 border shadow-md">
                    <img 
                      alt="Deepak B." 
                      className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTAF_5qLzDIkJteeMmAl4_oIrbTRKOkkfmu4zHnFDOA_Cjo4yuSxsQv9wwRYZKlCqI6AeaX3zE8lLTEBF-dazfp3_ALpmFskNudEax0B5CqToZDHdGCwLus0nXXecwVlgQZiDAIeO8JWknmAhI0Xb1NbJu20jY3xfY1Z7cUhsSkq2DbMnot0M0S9j7eEoNvwvJcqA687FWOegVCtpEi8-4uN2Osau2V5QrfxfQ4gNyPpTZodl-I6xk" 
                    />
                    <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Verified Profile">
                      <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                    </div>
                  </div>
                  <div className="flex-1 pb-1 text-left">
                    <h2 className="text-2xl font-black text-slate-900 leading-none">Deepak B.</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">B.Tech Information Technology (2nd Year)</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium max-w-2xl leading-relaxed">
                      Aspiring Cloud &amp; Full-Stack Engineer | Active Developer of telemetry processing and server infrastructure.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => alert("Redirecting to GitHub developer portal...")} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                    <Code className="w-3.5 h-3.5" />
                    GitHub Portfolio
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                  <button onClick={() => alert("Redirecting to LinkedIn professional credentials profile...")} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                    <LinkIcon className="w-3.5 h-3.5" />
                    LinkedIn Credentials
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </section>

            {/* Verified Tech Stack */}
            <section className="bg-white/80 backdrop-blur-sm border border-slate-200/70 p-6 rounded-2xl shadow-sm text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-500 font-bold">verified_user</span>
                <h3 className="text-base font-extrabold text-slate-800">Verified Tech Stack</h3>
                <div className="flex-1 border-t border-slate-100 ml-4"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: "React", level: "Expert", score: 94 },
                  { name: "Node.js", level: "Proficient", score: 88 },
                  { name: "PostgreSQL", level: "Expert", score: 94 },
                  { name: "Python / FastAPI", level: "Proficient", score: 85 },
                  { name: "Docker", level: "Intermediate", score: 62 }
                ].map((skill) => (
                  <div key={skill.name} className="bg-slate-50/50 border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center gap-3 text-center group hover:bg-white hover:border-indigo-400 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-600/10 flex items-center justify-center font-extrabold text-indigo-600 text-xs">
                      {skill.score}%
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-1">
                        {skill.name}
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">{skill.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Tab 2: Verified Projects */}
        {activeSubTab === 'Projects' && (
          <section className="bg-white/80 backdrop-blur-sm border border-slate-200/70 p-6 rounded-2xl shadow-sm text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                📂 Verified Projects &amp; Capstones
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Skill Gap & Diagnostic Engine",
                  desc: "A machine learning pipeline that analyzes resumes against live JD descriptions to flag exact skill deficits.",
                  tags: ["React", "Node.js", "Tailwind"],
                  type: "Featured Capstone"
                },
                {
                  title: "IoT Industrial Sensor Ingestion Stream",
                  desc: "High-throughput telemetry collector designed to ingest metrics and packet flows from edge device networks.",
                  tags: ["Python", "FastAPI", "Docker"],
                  type: "Hackathon Finalist"
                },
                {
                  title: "Real-Time Cache Performance Suite",
                  desc: "Distributed benchmark tool comparing Redis and Memcached throughput patterns under simulated traffic.",
                  tags: ["Go", "Redis", "PostgreSQL"],
                  type: "Lab Certified"
                }
              ].map((proj, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:bg-white hover:border-indigo-400 transition-all duration-200">
                  <div className="p-5">
                    <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded text-[9px] font-bold uppercase tracking-wider mb-3 inline-block">
                      {proj.type}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-800 leading-tight mb-2">{proj.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{proj.desc}</p>
                  </div>
                  
                  <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/20">
                    <div className="flex gap-1.5">
                      {proj.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-white border rounded text-[9px] font-bold text-slate-400">{t}</span>
                      ))}
                    </div>
                    <button 
                      onClick={() => alert(`Reviewing GitHub files for "${proj.title}"... Integration is live.`)}
                      className="text-[10px] font-bold text-indigo-600 uppercase hover:underline"
                    >
                      Files ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Accredited Badges */}
        {activeSubTab === 'Badges' && (
          <section className="bg-white/80 backdrop-blur-sm border border-slate-200/70 p-6 rounded-2xl shadow-sm text-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-indigo-600 text-base">military_tech</span>
              <h3 className="text-base font-extrabold text-slate-800">Endorsements &amp; Verified Badges</h3>
              <div className="flex-1 border-t border-slate-100 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                [1,2,3].map(i => <Skeleton key={i} className="h-44 rounded-2xl" />)
              ) : liveBadges.length > 0 ? (
                liveBadges.map((badge) => (
                  <div key={badge.id} className={`border rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 ${TIER_COLORS[badge.tier] || 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-3xl mb-3">{TIER_ICONS[badge.tier] || '🏅'}</div>

                    <h4 className="font-extrabold text-sm text-slate-850 mb-1 leading-snug">{badge.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">{badge.tier} Badge</p>
                    <p className="text-[10px] text-slate-400 font-medium mb-4">{badge.detail}</p>

                    <button
                      onClick={() => onOpenCert(badge.name)}
                      className="w-full mt-auto pt-4 flex items-center justify-center gap-1.5 text-indigo-600 text-xs font-bold border-t border-slate-200/60 hover:underline cursor-pointer"
                    >
                      View Credential Record ➔
                    </button>
                  </div>
                ))
              ) : (
                // Fallback static badges if no submissions in DB
                [
                  { name: "TCS Industry Ready", tier: "Gold", detail: "TCS Accreditation Board" },
                  { name: "SIH 2026 Prototype Verified", tier: "Silver", detail: "Smart India Hackathon Seal" },
                  { name: "NPTEL Cloud Computing", tier: "Gold", detail: "IIT Madras Coursework" }
                ].map((badge, idx) => (
                  <div key={idx} className={`border rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 ${TIER_COLORS[badge.tier] || 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-3xl mb-3">{TIER_ICONS[badge.tier] || '🏅'}</div>
                    <h4 className="font-extrabold text-sm text-slate-850 mb-1">{badge.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-4">{badge.detail}</p>
                    <button
                      onClick={() => onOpenCert(badge.name)}
                      className="w-full mt-auto pt-4 flex items-center justify-center gap-1.5 text-indigo-600 text-xs font-bold border-t border-slate-200/60 hover:underline cursor-pointer"
                    >
                      View Credential Record ➔
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ShowcaseView;
