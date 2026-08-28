import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Code, Link as LinkIcon, ExternalLink, Download, Share2, Edit2, Save, X, Settings2, ShieldCheck, Camera } from 'lucide-react';
import { getStudentProfile, getSubmissions } from '../../services/api';
import { BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import ActivityHeatmap from './ActivityHeatmap';

const ShowcaseView = ({ activeSubTab = 'Portfolio', onSubTabChange, onTabChange, onOpenCert, verifiedCredentials = [], githubUser, setGithubUser }) => {
  const [loading, setLoading] = useState(true);
  // Chart Data
  const projectWorthData = [
    { name: 'Telemetry Processing', complexity: 85, impact: 90 },
    { name: 'Server Infra', complexity: 70, impact: 65 },
    { name: 'UI Components', complexity: 55, impact: 75 },
    { name: 'API Gateway', complexity: 95, impact: 85 }
  ];

  const certStrengthData = [
    { subject: 'Cloud Security', A: 90, fullMark: 100 },
    { subject: 'DevOps Ops', A: 75, fullMark: 100 },
    { subject: 'System Architecture', A: 85, fullMark: 100 },
    { subject: 'Database Admin', A: 60, fullMark: 100 },
    { subject: 'Containers', A: 80, fullMark: 100 }
  ];

  
  
  
  // Profile State
  const [profileData, setProfileData] = useState({
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTAF_5qLzDIkJteeMmAl4_oIrbTRKOkkfmu4zHnFDOA_Cjo4yuSxsQv9wwRYZKlCqI6AeaX3zE8lLTEBF-dazfp3_ALpmFskNudEax0B5CqToZDHdGCwLus0nXXecwVlgQZiDAIeO8JWknmAhI0Xb1NbJu20jY3xfY1Z7cUhsSkq2DbMnot0M0S9j7eEoNvwvJcqA687FWOegVCtpEi8-4uN2Osau2V5QrfxfQ4gNyPpTZodl-I6xk',
    firstName: 'Deepak',
    lastName: 'B.',
    email: 'deepak.b@vidyaprayog.edu',
    institution: 'VidyaPrayog Institute of Technology',
    course: 'B.Tech Information Technology',
    year: '2nd Year',
    cgpa: '8.4',
    bio: 'Aspiring Cloud & Full-Stack Engineer | Active Developer of telemetry processing and server infrastructure.',
    language: 'English',
    linkedinUrl: 'https://linkedin.com/in/deepak-b',
    portfolioVisibility: {
      cgpa: false,
      email: false,
      institution: true,
      github: true,
      linkedin: true,
      skills: true,
      projects: true,
      certifications: true
    }
  });

  const [viewCert, setViewCert] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(profileData);
  const [githubRepos, setGithubRepos] = useState([]);

  useEffect(() => {
    if (githubUser) {
      fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setGithubRepos(data.filter(r => !r.fork));
        })
        .catch(console.error);
    }
  }, [githubUser]);

  
  useEffect(() => {
    // simulate loading
    setTimeout(() => setLoading(false), 400);
  }, []);

  const handleConnectGithub = () => {
    const input = prompt("Enter GitHub Username or Profile URL to Fetch Repositories:");
    if (input) {
      let user = input.trim();
      if (user.includes('github.com/')) {
        const parts = user.split('github.com/');
        user = parts[1].split('/')[0];
      }
      user = user.replace(/^@/, '').replace(/\/$/, '');
      setGithubUser(user);
    }
  };



  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditForm({...editForm, photoUrl: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {

    setProfileData(editForm);
    setEditMode(false);
  };

  const toggleVisibility = (field) => {
    setEditForm({
      ...editForm,
      portfolioVisibility: {
        ...editForm.portfolioVisibility,
        [field]: !editForm.portfolioVisibility[field]
      }
    });
  };

  // Check if at least one real verification source exists (GitHub connected OR verified credential)
  const isProfileVerified = githubUser || verifiedCredentials.filter(c => c.status === 'verified').length > 0;

  return (
    <div className="max-w-container-max mx-auto space-y-6 text-left animate-fade-in">
      
      {/* Top Sub-Navigation Tabs */}
      <div className="flex justify-between items-center border-b border-slate-200/60 px-4 mb-6 print:hidden">
        <div className="flex gap-8 relative">
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
            Projects
          </button>
          <button 
            onClick={() => onSubTabChange('Certifications')}
            className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
              activeSubTab === 'Certifications' 
                ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`}
          >
            Certifications & Badges
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeSubTab === 'Portfolio' && (
          <>
            {editMode ? (
              // EDIT PROFILE FORM
              <section className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden p-6 lg:p-10">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Edit2 className="w-5 h-5" /> Edit My Profile</h2>
                  <div className="flex gap-3">
                    <button onClick={() => { setEditForm(profileData); setEditMode(false); }} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                    <button onClick={handleSaveProfile} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <img src={editForm.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border border-slate-200" />
                                                  <label className="absolute bottom-0 right-0 bg-white shadow-md border border-slate-200 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
                            <Camera className="w-4 h-4 text-slate-600" />
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                          </label>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-800">Profile Photo</h3>
                        <p className="text-xs text-slate-500 mt-1">Recommended size 400x400px</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">First Name *</label>
                        <input type="text" value={editForm.firstName} onChange={e => setEditForm({...editForm, firstName: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Last Name *</label>
                        <input type="text" value={editForm.lastName} onChange={e => setEditForm({...editForm, lastName: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address</label>
                      <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50" readOnly />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Institution Name *</label>
                        <input type="text" value={editForm.institution} onChange={e => setEditForm({...editForm, institution: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Course / Degree *</label>
                        <input type="text" value={editForm.course} onChange={e => setEditForm({...editForm, course: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Year of Study *</label>
                        <select value={editForm.year} onChange={e => setEditForm({...editForm, year: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                          <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">CGPA</label>
                        <input type="text" value={editForm.cgpa} onChange={e => setEditForm({...editForm, cgpa: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Short Bio / Tagline</label>
                      <input type="text" value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                    </div>

                                        <div className="space-y-1.5 mt-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-2">LinkedIn URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LinkIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          value={editForm.linkedinUrl || ''} 
                          onChange={e => setEditForm({...editForm, linkedinUrl: e.target.value})} 
                          placeholder="https://linkedin.com/in/your-profile" 
                          className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* PRIVACY TOGGLES SIDEBAR */}
                  <div className="lg:col-span-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
                        <Settings2 className="w-4 h-4 text-indigo-500" />
                        <h3 className="font-bold text-sm text-slate-800">Portfolio Visibility</h3>
                      </div>
                      <p className="text-xs text-slate-500 mb-5 leading-relaxed">Select which fields should be visible to recruiters and peers on your public portfolio link.</p>
                      
                      <div className="space-y-4">
                        {[
                          { key: 'institution', label: 'Institution' },
                          { key: 'cgpa', label: 'CGPA & Grades' },
                          { key: 'email', label: 'Email Address' },
                          { key: 'github', label: 'GitHub Stats' },
                          { key: 'linkedin', label: 'LinkedIn Link' },
                          { key: 'certifications', label: 'Certifications' },
                          { key: 'skills', label: 'Skills & Assessments' },
                          { key: 'projects', label: 'Projects' }
                        ].map(item => (
                          <div key={item.key} className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-700">{item.label}</span>
                            <button 
                              onClick={() => toggleVisibility(item.key)}
                              className={`w-9 h-5 rounded-full relative transition-colors ${editForm.portfolioVisibility[item.key] ? 'bg-indigo-500' : 'bg-slate-300'}`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${editForm.portfolioVisibility[item.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              // PUBLIC PORTFOLIO VIEW
              <>
                <section className="bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden relative">
                  <div 
                    className="bg-cover bg-center w-full h-36 md:h-48 relative" 
                    style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcrNoh4g4vVlpy-Fq9VcPTlWDeCci8alnfkiDF2p_sr19Ufa6GL8xAPp2wt4Mdz8ryhC2HzRTFImtXXXayMps5OpoX2ZCx66BUBqZpQ3AiTf_gHvfXTd6zDoywT43XlGpU-EDIBUXQcBQwJjAZCflLh0JNnPwiiswbgfvP4Yp9HE-Ry9yHQGc1gH-ZsTOAG6NprWR2m6ipIlM3HchCGX7SBYekowL0_Ry_f6QucB25SEWdgElGVigs')"}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-40"></div>
                  </div>
                  
                  <div className="px-6 md:px-10 pb-8 relative z-10">
                    <div className="absolute top-4 right-6 md:right-10 flex gap-3 print:hidden">
                      <button onClick={() => setEditMode(true)} className="print:hidden bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95">
                        <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                        Edit Profile
                      </button>
                      <button onClick={() => alert("Public share link copied to clipboard!")} className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95">
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        Public Share
                      </button>
                      <button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
                        <Download className="w-3.5 h-3.5" />
                        Download Verified PDF
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
                      <div className="relative p-1 bg-white rounded-full shrink-0 border shadow-md">
                        <img alt={profileData.firstName} className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border" src={profileData.photoUrl} />
                        {isProfileVerified && (
                          <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Verified Profile">
                            <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 pb-1 text-left">
                        <h2 className="text-2xl font-black text-slate-900 leading-none">{profileData.firstName} {profileData.lastName}</h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">
                            <span>{profileData.course} ({profileData.year})</span>
                            {profileData.portfolioVisibility.institution && (
                              <>
                                <span className="text-slate-300">&#8226;</span>
                                <span>{profileData.institution}</span>
                              </>
                            )}
                          </div>
                        <p className="text-xs text-slate-500 mt-2 font-medium max-w-2xl leading-relaxed">
                          {profileData.bio}
                        </p>
                        <div className="flex gap-4 mt-2">
                          {profileData.portfolioVisibility.cgpa && <span className="text-xs font-bold text-emerald-600">CGPA: {profileData.cgpa}</span>}
                          {profileData.portfolioVisibility.email && <span className="text-xs text-slate-500">{profileData.email}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                      {profileData.portfolioVisibility.github && (
                        <button onClick={() => {
                          if (githubUser) window.open(`https://github.com/${githubUser}`, '_blank');
                          else handleConnectGithub();
                        }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                          <Code className="w-3.5 h-3.5" />
                          {githubUser ? `github.com/${githubUser}` : "Connect GitHub"}
                        </button>
                      )}
                      
                                              {profileData.portfolioVisibility.linkedin && profileData.linkedinUrl && (
                          <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                            <LinkIcon className="w-3.5 h-3.5" />
                            LinkedIn <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                    </div>
                  </div>
                </section>

                <div className="mt-8"><ActivityHeatmap /></div>
                </>
            )}
          </>
        )}

        {/* Tab 2: Projects */}
        {activeSubTab === 'Projects' && (
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 lg:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-800">Projects Developed</h3>
              <Code className="w-5 h-5 text-indigo-500" />
            </div>
            {(!githubUser) ? (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">No Projects</p>
                <p className="text-sm text-slate-500">Connect GitHub in your Digital Portfolio to display your repositories.</p>
              </div>
            ) : (
                              <div className="space-y-6">
                  {/* Projects Worth Chart */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
                    <h4 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">Overall Project Performance & Worth</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectWorthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="complexity" fill="#6366f1" radius={[4, 4, 0, 0]} name="Technical Complexity" />
                          <Bar dataKey="impact" fill="#34d399" radius={[4, 4, 0, 0]} name="Business Impact" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {githubRepos.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">No Public Repositories</p>
                  </div>
                ) : (
                  githubRepos.map(repo => (
                    <div key={repo.id} onClick={() => window.open(repo.html_url, '_blank')} className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-200">
                      <p className="text-base font-bold text-indigo-700 hover:underline">{repo.name}</p>
                      <span className="inline-flex items-center gap-1 mt-3 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-xs font-bold uppercase"><ShieldCheck className="w-3.5 h-3.5"/> Verified via GitHub sync</span>
                    </div>
                  ))
                  )}
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Tab 3: Certifications & Badges */}
        {activeSubTab === 'Certifications' && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 lg:p-10">
            <h3 className="font-black text-xl text-slate-800 mb-8 border-b border-slate-100 pb-4 flex items-center justify-between">
              Skills & Certifications
              <Award className="w-5 h-5 text-indigo-500"/>
            </h3>
            {verifiedCredentials.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">No Credentials Yet</p>
                <p className="text-sm text-slate-500">Upload certificates or complete assessments to earn verified badges.</p>
              </div>
            ) : (
                              <div className="space-y-6">
                  {/* Certifications Radar Chart */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
                    <h4 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">Certification Strength Base</h4>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={certStrengthData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                          <Radar name="Strength" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                          <RechartsTooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verifiedCredentials.map(cert => (
                  <div key={cert.id} className="border border-slate-100 rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{cert.title}</h4>
                      {cert.score ? (
                        <p className="text-xs text-slate-500 mt-1">Verified via Assessment - <span className="text-emerald-600 font-bold">{cert.score}%</span></p>
                      ) : (
                        <p className="text-xs text-slate-500 mt-1">Verified via {cert.source}</p>
                      )}
                      {cert.dateEarned && <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{cert.dateEarned}</p>}
                      {cert.fileUrl && (
                        <button onClick={() => setViewCert(cert)} className="mt-2 text-xs font-bold text-indigo-600 hover:underline">
                          View Certificate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
      {viewCert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800">{viewCert.title}</h3>
              <button onClick={() => setViewCert(null)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-slate-100 w-full min-h-[500px]">
              {(viewCert.fileType && viewCert.fileType.startsWith('image/')) || (!viewCert.fileType && viewCert.fileUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) ? (
                <img src={viewCert.fileUrl} alt={viewCert.title} className="max-w-full max-h-[75vh] object-contain rounded shadow-sm mx-auto" />
              ) : (
                <iframe src={viewCert.fileUrl} title={viewCert.title} className="w-full h-[75vh] rounded shadow-sm bg-white border-0" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowcaseView;
