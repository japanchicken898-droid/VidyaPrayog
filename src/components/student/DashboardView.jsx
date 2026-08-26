import React, { useState, useEffect } from 'react';
import { getStudentProfile } from '../../services/api';

const DashboardView = ({ onTabChange, onAction }) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('Cloud & Full-Stack');

  // Pathway progresses
  const [awsProgress, setAwsProgress] = useState(60);
  const [reactProgress, setReactProgress] = useState(25);

  // Toggle syllabus views
  const [awsSyllabusOpen, setAwsSyllabusOpen] = useState(false);
  const [reactSyllabusOpen, setReactSyllabusOpen] = useState(false);

  // Live API profile state
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setProfileLoading(true);
    getStudentProfile()
      .then(data => { if (mounted) { setProfile(data); setProfileLoading(false); } })
      .catch(err => { if (mounted) { console.warn('API offline, using fallback data:', err.message); setProfileError(err.message); setProfileLoading(false); } });
    return () => { mounted = false; };
  }, []);

  // Use live API roles_data if available, else fallback to hardcoded
  const fallbackRolesData = {
    'Cloud & Full-Stack': {
      title: 'Cloud & Full-Stack Engineer',
      match: 82,
      bars: [
        { label: 'Frontend & APIs', score: 94, color: 'bg-emerald-500' },
        { label: 'Backend & Databases', score: 88, color: 'bg-emerald-500' },
        { label: 'Docker & DevOps', score: 62, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
        { label: 'Cloud & System Architecture', score: 45, color: 'bg-gradient-to-r from-rose-500 to-red-500' }
      ],
      insight: 'Focus on Docker & AWS deployments to reach 95% profile alignment.'
    },
    'AI/ML Engineer': {
      title: 'AI/ML Engineer',
      match: 75,
      bars: [
        { label: 'Python & Math Foundations', score: 96, color: 'bg-emerald-500' },
        { label: 'Data Processing Pipelines', score: 90, color: 'bg-emerald-500' },
        { label: 'ML Models & Frameworks', score: 60, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
        { label: 'Deep Learning & NLP', score: 35, color: 'bg-gradient-to-r from-rose-500 to-red-500' }
      ],
      insight: 'Enhance your Deep Learning credentials to unlock enterprise matching.'
    },
    'DevOps Specialist': {
      title: 'DevOps Specialist',
      match: 72,
      bars: [
        { label: 'Scripting & Git Workflow', score: 92, color: 'bg-emerald-500' },
        { label: 'CI/CD Pipelines', score: 85, color: 'bg-emerald-500' },
        { label: 'Containerization & Docker', score: 70, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
        { label: 'Kubernetes & Infrastructure', score: 40, color: 'bg-gradient-to-r from-rose-500 to-red-500' }
      ],
      insight: 'Acquire Kubernetes orchestration skills to clear recruitments.'
    }
  };

  const rolesData = (profile && profile.roles_data) ? profile.roles_data : fallbackRolesData;

  // Live KPI values with fallbacks
  const kpiName = profile ? profile.full_name.split(' ')[0] : 'Deepak';
  const kpiBadges = profile ? profile.badges_count : 14;
  const kpiMatch = profile ? Math.round(profile.match_score) : 84;
  const kpiApplications = profile ? profile.active_applications : 3;
  const kpiStepsDone = profile ? profile.roadmap_steps_done : 6;
  const kpiStepsTotal = profile ? profile.roadmap_steps_total : 8;

  const currentRole = rolesData[activeRole];

  const handleResumeLesson = (pathway) => {
    if (pathway === 'AWS') {
      setAwsProgress(prev => Math.min(prev + 5, 100));
      onAction('TOAST', 'AWS Cloud Developer progress updated by 5%!');
    } else {
      setReactProgress(prev => Math.min(prev + 5, 100));
      onAction('TOAST', 'React State Mastery progress updated by 5%!');
    }
  };

  // Skeleton shimmer helper
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`} />
  );

  return (
    <div className="max-w-container-max mx-auto space-y-8 animate-fade-in">

      {/* Welcome Message Banner */}
      <div>
        <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-background font-bold tracking-tight text-[28px]">
          {profileLoading ? <Skeleton className="h-8 w-64 inline-block" /> : `Welcome back, ${kpiName}!`}
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-1 text-sm">
          Here is your daily learning overview and roadmap progress.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          onClick={() => onTabChange('Showcase')}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant font-semibold text-[10px] uppercase">Verified Skills</span>
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined icon-fill">verified</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            {profileLoading
              ? <Skeleton className="h-5 w-32" />
              : <span className="text-headline-md font-headline-md text-on-background font-bold text-[18px]">{kpiBadges} Active Badges</span>
            }
          </div>
          <p className="text-body-sm font-body-sm text-secondary font-medium mt-1 text-[11px]">(+2 this month)</p>
        </div>

        <div 
          onClick={() => onTabChange('Skills')}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant font-semibold text-[10px] uppercase">Match Index</span>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">track_changes</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            {profileLoading
              ? <Skeleton className="h-5 w-28" />
              : <span className="text-headline-md font-headline-md text-on-background font-bold text-[18px]">{kpiMatch}% Average</span>
            }
          </div>
          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{"width": `${kpiMatch}%`}}></div>
          </div>
        </div>

        <div 
          onClick={() => onTabChange('Opportunities')}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant font-semibold text-[10px] uppercase">Active Applications</span>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined">work</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            {profileLoading
              ? <Skeleton className="h-5 w-28" />
              : <span className="text-headline-md font-headline-md text-on-background font-bold text-[18px]">{kpiApplications} In Review</span>
            }
          </div>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 text-[11px]">Awaiting initial response</p>
        </div>

        <div 
          onClick={() => onTabChange('Learn')}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant font-semibold text-[10px] uppercase">Roadmap Milestones</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined">flag</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            {profileLoading
              ? <Skeleton className="h-5 w-20" />
              : <span className="text-headline-md font-headline-md text-on-background font-bold text-[18px]">{kpiStepsDone}/{kpiStepsTotal} Steps</span>
            }
          </div>
          <div className="flex gap-1 h-2">
            {Array.from({ length: kpiStepsTotal }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 transition-colors ${
                  i === 0 ? 'rounded-l-full' : i === kpiStepsTotal - 1 ? 'rounded-r-full' : ''
                } ${i < kpiStepsDone ? 'bg-secondary' : 'bg-surface-container-high'}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Target Benchmark & Learning Pathways (67%) */}
        <div className="lg:col-span-8 flex flex-col gap-8 h-full">
          
          {/* Target Role Benchmark Card */}
          <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm flex flex-col p-6 hover:shadow-md transition-all duration-200 relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-headline-md font-headline-md font-bold text-on-background text-[18px]">Target Role Benchmark</h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5 text-xs font-semibold">{currentRole.title}</p>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-100 flex items-center justify-center active:scale-95"
                >
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
                {roleMenuOpen && (
                  <div className="absolute right-0 top-10 z-50 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-2 text-left animate-fade-in">
                    <p className="text-[10px] text-slate-400 font-bold uppercase px-3 py-1.5 border-b mb-1">Switch Target Role</p>
                    {Object.keys(rolesData).map(roleKey => (
                      <button 
                        key={roleKey}
                        onClick={() => { handleRoleChange(roleKey); setActiveRole(roleKey); setRoleMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                          activeRole === roleKey 
                            ? 'text-primary bg-primary/10' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {rolesData[roleKey].title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-on-background tracking-tight">{currentRole.match}%</span>
                <span className="text-body-sm text-on-surface-variant font-semibold pb-1 text-xs">Overall Match Score</span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden relative group cursor-help shadow-inner border border-slate-100">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out" style={{"width": `${currentRole.match}%`}}></div>
              </div>
            </div>

            {/* Benchmark Sub-bars (with animated shimmer hover and specific level gradients) */}
            <div className="space-y-4 mb-6">
              {currentRole.bars.map((bar, index) => (
                <div key={index} className="group/bar">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-on-surface">{bar.label}</span>
                    <span className="text-on-surface font-bold">{bar.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden border relative">
                    <div 
                      className={`h-full ${bar.color} rounded-full transition-all duration-500 ease-out group-hover/bar:brightness-110`} 
                      style={{"width": `${bar.score}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI insight nudge at bottom of card */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 items-start mt-auto shadow-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-sm">psychology</span>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-primary mb-0.5 uppercase tracking-wide">AI Recommendation</p>
                <p className="text-xs text-on-surface leading-snug font-medium">{currentRole.insight}</p>
              </div>
            </div>

          </div>

          {/* In Progress Learning Pathways */}
          <div className="flex flex-col flex-1">
            <h3 className="text-headline-md font-headline-md font-bold text-on-background text-[18px] mb-4 text-left">
              In Progress Learning Pathways
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              
              {/* Card 1: AWS */}
              <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors" />
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 border border-orange-100">
                      <span className="material-symbols-outlined text-2xl">cloud</span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-body-lg font-bold text-on-background leading-tight text-[15px]">AWS Cloud Developer</h4>
                      <p className="text-[10px] font-bold text-orange-600/70 uppercase tracking-wider mt-0.5">Cloud Engineering</p>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <div className="flex justify-between text-body-sm font-semibold mb-2 text-xs">
                      <span className="text-on-surface-variant">Module Ingestion</span>
                      <span className="text-primary font-bold">{awsProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{"width": `${awsProgress}%`}}></div>
                    </div>
                  </div>

                  {/* Toggle Syllabus List */}
                  {awsSyllabusOpen && (
                    <div className="mb-4 bg-slate-50 border p-3 rounded-lg text-left animate-fade-in text-[11px] space-y-1.5 text-slate-600">
                      <p className="font-bold text-[10px] text-slate-400 uppercase">COURSE SYLLABUS</p>
                      <p className="flex items-center gap-1.5 font-bold text-secondary">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        1. AWS Identity (IAM) & Roles
                      </p>
                      <p className="flex items-center gap-1.5 font-bold text-secondary">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        2. DynamoDB Query Indexes
                      </p>
                      <p className="flex items-center gap-1.5 font-bold text-primary">
                        <span className="material-symbols-outlined text-sm">play_circle</span>
                        3. API Gateway Ingestion Streams
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-400">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        4. ECS Fargate Container Clusters
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleResumeLesson('AWS')}
                    className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/95 transition-colors shadow-sm shadow-primary/20"
                  >
                    Resume Lesson
                  </button>
                  <button 
                    onClick={() => setAwsSyllabusOpen(!awsSyllabusOpen)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    {awsSyllabusOpen ? "Close" : "Syllabus"}
                  </button>
                </div>
              </div>

              {/* Card 2: React */}
              <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 border border-blue-100">
                      <span className="material-symbols-outlined text-2xl">code</span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-body-lg font-bold text-on-background leading-tight text-[15px]">React State Mastery</h4>
                      <p className="text-[10px] font-bold text-blue-600/70 uppercase tracking-wider mt-0.5">Frontend Web</p>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <div className="flex justify-between text-body-sm font-semibold mb-2 text-xs">
                      <span className="text-on-surface-variant">Module Ingestion</span>
                      <span className="text-primary font-bold">{reactProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{"width": `${reactProgress}%`}}></div>
                    </div>
                  </div>

                  {/* Toggle Syllabus List */}
                  {reactSyllabusOpen && (
                    <div className="mb-4 bg-slate-50 border p-3 rounded-lg text-left animate-fade-in text-[11px] space-y-1.5 text-slate-600">
                      <p className="font-bold text-[10px] text-slate-400 uppercase">COURSE SYLLABUS</p>
                      <p className="flex items-center gap-1.5 font-bold text-secondary">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        1. Advanced Context API & Redux
                      </p>
                      <p className="flex items-center gap-1.5 font-bold text-primary">
                        <span className="material-symbols-outlined text-sm">play_circle</span>
                        2. Render Optimizations & Memo
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-400">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        3. Custom hooks & Side Effects
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleResumeLesson('React')}
                    className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/95 transition-colors shadow-sm shadow-primary/20"
                  >
                    Resume Lesson
                  </button>
                  <button 
                    onClick={() => setReactSyllabusOpen(!reactSyllabusOpen)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    {reactSyllabusOpen ? "Close" : "Syllabus"}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Side: AI Nudges & Schedule (33%) */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
          
          {/* AI Advisor Panel */}
          <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm flex flex-col hover:shadow-md transition-all duration-200">
            <div className="p-5 border-b border-surface-variant flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
              </div>
              <h3 className="text-body-lg font-bold text-on-background text-[15px]">AI Advisor</h3>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              
              {/* Nudge 1: Docker */}
              <div 
                onClick={() => onAction('DOCKER_ASSESSMENT')}
                className="p-4 bg-rose-50 rounded-xl flex items-start gap-3 hover:bg-rose-100/70 transition-all cursor-pointer border border-rose-100 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-rose-500 mt-0.5">warning</span>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-label-caps text-rose-600 font-bold uppercase text-[9px]">URGENT</span>
                    <span className="text-label-caps text-rose-500/70 text-[9px]">Due Today</span>
                  </div>
                  <p className="text-body-sm font-bold text-rose-900 text-[13px]">Complete Docker Assessment</p>
                  <p className="text-[10px] text-rose-600/80 mt-0.5">Clear the gap target and gain a 14% match boost.</p>
                </div>
                <span className="material-symbols-outlined text-rose-400">chevron_right</span>
              </div>

              {/* Nudge 2: Resume */}
              <div 
                onClick={() => onAction('RESUME_SYNC')}
                className="p-4 bg-indigo-50 rounded-xl flex items-start gap-3 hover:bg-indigo-100/70 transition-all cursor-pointer border border-indigo-100 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-indigo-500 mt-0.5">lightbulb</span>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-label-caps text-indigo-600 font-bold uppercase text-[9px]">TIP</span>
                  </div>
                  <p className="text-body-sm font-bold text-indigo-900 text-[13px]">Resume Update Recommended</p>
                  <p className="text-xs text-indigo-700 mt-1 text-[11px]">Sync with 3 new verified skill badges.</p>
                </div>
                <span className="material-symbols-outlined text-indigo-400">chevron_right</span>
              </div>

            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm flex flex-col hover:shadow-md transition-all duration-200 flex-1">
            <div className="p-5 border-b border-surface-variant">
              <h3 className="text-body-lg font-bold text-on-background text-[15px] text-left">Upcoming Schedule</h3>
            </div>
            <div className="p-6 flex-1 text-left">
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-2">
                
                <div className="relative pl-6">
                  <div className="absolute w-3.5 h-3.5 bg-secondary rounded-full -left-[8px] top-1 ring-4 ring-white"></div>
                  <p className="text-label-caps text-secondary font-bold mb-1 text-[10px] uppercase">Today, 2:00 PM</p>
                  <h4 className="text-body-md font-bold text-on-background text-[14px]">Mock Technical Interview</h4>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-1.5 text-xs">
                    <span className="material-symbols-outlined text-[16px]">videocam</span> Google Meet
                  </p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute w-3.5 h-3.5 bg-slate-400 rounded-full -left-[8px] top-1 ring-4 ring-white"></div>
                  <p className="text-label-caps text-on-surface-variant font-semibold mb-1 text-[10px] uppercase">Tomorrow, 10:30 AM</p>
                  <h4 className="text-body-md font-bold text-on-background text-[14px]">Industry Placement Talk</h4>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-1.5 text-xs">
                    <span className="material-symbols-outlined text-[16px]">business</span> TechCorp Inc.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardView;
