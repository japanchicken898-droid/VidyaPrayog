import React, { useState, useEffect } from 'react';
import { getStudentProfile } from '../../services/api';
import SkillDomainChart from './SkillDomainChart';


const DashboardView = ({ onTabChange, onAction, overallMatch }) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('Cloud & Full-Stack');

  // Pathway progresses
  const [awsProgress, setAwsProgress] = useState(60);
  const [reactProgress, setReactProgress] = useState(25);

  // Toggle syllabus views
  const [awsSyllabusOpen, setAwsSyllabusOpen] = useState(false);
  const [reactSyllabusOpen, setReactSyllabusOpen] = useState(false);

  // Lesson & event modal states
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeSyllabus, setActiveSyllabus] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

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

  // Animation states
  const [isMounted, setIsMounted] = useState(false);
  const [displayMatch, setDisplayMatch] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!profileLoading) {
      let start = 0;
      const duration = 1000; // 1 second
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = kpiMatch / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= kpiMatch) {
          setDisplayMatch(kpiMatch);
          clearInterval(timer);
        } else {
          setDisplayMatch(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [kpiMatch, profileLoading]);

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

  const [displayRoleMatch, setDisplayRoleMatch] = useState(0);

  useEffect(() => {
    if (isMounted) {
      let start = 0;
      const duration = 1000; 
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = currentRole.match / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= currentRole.match) {
          setDisplayRoleMatch(currentRole.match);
          clearInterval(timer);
        } else {
          setDisplayRoleMatch(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [currentRole.match, isMounted]);

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
          onClick={() => onTabChange('portfolio')}
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
              : <span className="text-headline-md font-headline-md text-on-background font-bold text-[18px]">{displayMatch}% Average</span>
            }
          </div>
          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{"width": isMounted && !profileLoading ? `${kpiMatch}%` : '0%'}}></div>
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
                        onClick={() => { setActiveRole(roleKey); setRoleMenuOpen(false); }}
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
                <span className="text-4xl font-bold text-on-background tracking-tight">{displayRoleMatch}%</span>
                <span className="text-body-sm text-on-surface-variant font-semibold pb-1 text-xs">Overall Match Score</span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden relative group cursor-help shadow-inner border border-slate-100">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out" style={{"width": isMounted ? `${currentRole.match}%` : '0%'}}></div>
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
                      className={`h-full ${bar.color} rounded-full transition-all duration-1000 ease-out group-hover/bar:brightness-110`} 
                      style={{"width": isMounted ? `${bar.score}%` : '0%'}}
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
                      <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{"width": isMounted ? `${awsProgress}%` : '0%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setActiveLesson('AWS')}
                    className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                  >
                    Resume Lesson
                  </button>
                  <button 
                    onClick={() => setActiveSyllabus('AWS')}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-medium transition-all cursor-pointer"
                  >
                    Syllabus
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
                      <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{"width": isMounted ? `${reactProgress}%` : '0%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setActiveLesson('React')}
                    className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                  >
                    Resume Lesson
                  </button>
                  <button 
                    onClick={() => setActiveSyllabus('React')}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-medium transition-all cursor-pointer"
                  >
                    Syllabus
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full">
            <SkillDomainChart />
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
                
                <div 
                  onClick={() => setActiveEvent('interview')}
                  className="relative pl-6 cursor-pointer hover:bg-slate-50/80 p-2 -ml-2 rounded-xl transition-all"
                >
                  <div className="absolute w-3.5 h-3.5 bg-secondary rounded-full left-1.5 top-3 ring-4 ring-white"></div>
                  <p className="text-label-caps text-secondary font-bold mb-1 text-[10px] uppercase">Today, 2:00 PM</p>
                  <h4 className="text-body-md font-bold text-on-background text-[14px]">Mock Technical Interview</h4>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-1.5 text-xs">
                    <span className="material-symbols-outlined text-[16px]">videocam</span> Google Meet
                  </p>
                </div>

                <div 
                  onClick={() => setActiveEvent('talk')}
                  className="relative pl-6 cursor-pointer hover:bg-slate-50/80 p-2 -ml-2 rounded-xl transition-all"
                >
                  <div className="absolute w-3.5 h-3.5 bg-slate-400 rounded-full left-1.5 top-3 ring-4 ring-white"></div>
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

      {/* Lesson Reader Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 flex flex-col h-[550px] animate-scale-in">
            
            {/* Top Bar */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="text-left flex-1">
                <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block">
                  {activeLesson === 'AWS' ? 'AWS Cloud Developer' : 'React State Mastery'}
                </span>
                <h3 className="text-sm font-extrabold text-slate-800 mt-1">
                  Module 3: Serverless Microservices & Lambda
                </h3>
              </div>
              <button 
                onClick={() => setActiveLesson(null)} 
                className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 shrink-0 overflow-hidden relative">
              <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: activeLesson === 'AWS' ? `${awsProgress}%` : `${reactProgress}%` }}></div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 text-left space-y-4 font-sans scrollbar">
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="text-sm leading-relaxed font-semibold mb-4 text-slate-800">
                  In this lesson, we will focus on deploying microservices using AWS Lambda and API Gateway. Serverless computing allows you to build and run applications and services without thinking about servers.
                </p>

                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-4">Interactive Workbench Code Snippet</h4>
                <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 mt-2 overflow-x-auto">
                  <pre>{`// AWS Lambda handler snippet (Node.js)
export const handler = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Hello from VidyaPrayog Serverless Lab!",
      timestamp: new Date().toISOString()
    })
  };
  return response;
};`}</pre>
                </div>

                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-5 mb-2">Reference Documentation & Notes</h4>
                <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1.5 leading-relaxed">
                  <li><strong>AWS Lambda:</strong> Runs your code only when needed and scales automatically.</li>
                  <li><strong>API Gateway:</strong> A fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
              <button className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 active:scale-95 transition-all cursor-pointer">
                ← Previous Lesson
              </button>
              <button 
                onClick={() => {
                  const setProg = activeLesson === 'AWS' ? setAwsProgress : setReactProgress;
                  setProg(prev => Math.min(prev + 5, 100));
                  window.dispatchEvent(new CustomEvent('ACTIVITY_LOGGED', { detail: { type: `Advanced in ${activeLesson === 'AWS' ? 'AWS Cloud Developer' : 'React State Mastery'}` } }));
                  setActiveLesson(null);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
              >
                Mark Complete & Next (+5% DNA) →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Slide-out Syllabus Drawer */}
      {activeSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setActiveSyllabus(null)}></div>
          
          <div className="bg-white h-full w-full max-w-md shadow-2xl border-l border-slate-200 relative z-10 flex flex-col justify-between animate-slide-in">
            
            <div>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-slate-900">{activeSyllabus === 'AWS' ? 'AWS Cloud Developer' : 'React State Mastery'}</h3>
                  <p className="text-xs text-slate-500 mt-1">Full Curriculum Breakdown & Progress</p>
                </div>
                <button 
                  onClick={() => setActiveSyllabus(null)} 
                  className="text-slate-400 hover:bg-slate-100 hover:text-slate-650 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <div className="p-6 space-y-5 text-left overflow-y-auto max-h-[calc(100vh-160px)] scrollbar">
                
                <div className="border border-slate-250 rounded-xl p-4 bg-emerald-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                      Module 1: Foundations & Architecture
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold">Completed ✓</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Duration: 4.5 hrs • 2 Quizzes Required</p>
                </div>

                <div className="border border-slate-250 rounded-xl p-4 bg-emerald-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                      Module 2: Core Implementation & Hands-on Sandbox
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold">Completed ✓</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Duration: 6 hrs • 1 Lab Required</p>
                </div>

                <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50/20 ring-2 ring-indigo-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-950 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-indigo-500">play_circle</span>
                      Module 3: Advanced Optimization & Scaling
                    </span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-850 px-2 py-0.5 rounded font-extrabold">In Progress</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">Duration: 5 hrs • 1 Assessment Required</p>
                  <button 
                    onClick={() => {
                      const temp = activeSyllabus;
                      setActiveSyllabus(null);
                      setActiveLesson(temp);
                    }}
                    className="text-[11px] text-indigo-600 font-bold hover:underline cursor-pointer"
                  >
                    Start Topic →
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-slate-400">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      Module 4: Final Certification Capstone
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-extrabold">Locked 🔒</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Duration: 8 hrs • 1 Capstone Project</p>
                </div>

              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={() => setActiveSyllabus(null)} 
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Breakdown
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Schedule Dialogs */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 flex flex-col text-left animate-scale-in">
            
            {activeEvent === 'interview' ? (
              <>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Mock Technical Interview</h3>
                    <p className="text-xs text-slate-500 mt-1">Google Meet Call Schedule Details</p>
                  </div>
                  <button 
                    onClick={() => setActiveEvent(null)} 
                    className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Interviewer / Mentor</span>
                    <span className="text-sm font-bold text-slate-850">Technical Lead / Placement Mentor</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Topic</span>
                    <span className="text-sm font-bold text-slate-850">System Design & Data Structures</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Time</span>
                    <span className="text-sm font-bold text-indigo-600">Today, 2:00 PM (IST)</span>
                  </div>
                </div>
                
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
                  <button 
                    onClick={() => setActiveEvent(null)}
                    className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setActiveEvent(null);
                      window.open('https://meet.google.com/new', '_blank');
                    }}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Join Google Meet 🎥
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Industry Placement Talk</h3>
                    <p className="text-xs text-slate-500 mt-1">TechCorp Inc. Recruitment Drive</p>
                  </div>
                  <button 
                    onClick={() => setActiveEvent(null)} 
                    className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Speaker / Presenter</span>
                    <span className="text-sm font-bold text-slate-850">HR Director & Engineering Head (TechCorp)</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Speaker Bio</span>
                    <span className="text-xs text-slate-500 leading-relaxed">Experienced recruitment specialist aligning student tech tracks to active full-stack vacancies at TechCorp.</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Drive Details</span>
                    <span className="text-xs text-slate-500 leading-relaxed">Learn about active profiles, compensation brackets (8-14 LPA), and immediate hiring pipelines.</span>
                  </div>
                </div>
                
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
                  <button 
                    onClick={() => setActiveEvent(null)}
                    className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setActiveEvent(null);
                      alert("Registered successfully! A Google Calendar reminder has been set.");
                    }}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    Register & Set Reminder
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardView;
