import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Map, 
  ShieldCheck, 
  Briefcase, 
  FileCode, 
  GraduationCap, 
  Search, 
  Flame, 
  Bell, 
  ArrowLeft,
  X,
  Upload,
  CheckCircle,
  FileText,
  AlertCircle,
  FolderGit2
} from 'lucide-react';

// Import our subviews
import DashboardView from '../components/student/DashboardView';
import SkillsAssessmentView from '../components/student/SkillsAssessmentView';
import SkillsProfileMatrixView from '../components/student/SkillsProfileMatrixView';
import SkillsGapAnalysisView from '../components/student/SkillsGapAnalysisView';
import SkillsRoadmapView from '../components/student/SkillsRoadmapView';
import OpportunitiesView from '../components/student/OpportunitiesView';
import PortfolioView from '../components/student/ShowcaseView';
import LearnView from '../components/student/LearnView';
import RoadmapTree from '../components/CareerRoadmap/RoadmapTree';
import AmbientBackground from '../components/common/AmbientBackground';
import CodingSandboxModal from '../components/student/CodingSandboxModal';
import AptitudeAssessmentModal from '../components/student/AptitudeAssessmentModal';
import OnboardingFlow from '../components/student/OnboardingFlow';

const StudentPortal = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Onboarding Profile State
  const [studentProfile, setStudentProfile] = useState({
    targetRole: null,
    currentTier: null,
    onboardingCompleted: false,
    startingReadinessScore: 0,
    roadmapStartNode: ''
  });

  // Match score states
  const [overallMatch, setOverallMatch] = useState(84);
  const [roleMatch, setRoleMatch] = useState(82);
  const [diagnosticBars, setDiagnosticBars] = useState(null);

  // Modal control states
  const [activeModal, setActiveModal] = useState(null); // 'mcq' | 'upload' | 'cert'
  const [modalPayload, setModalPayload] = useState(null);

  // Header interaction states
  const [searchQuery, setSearchQuery] = useState('');
  const [streakMenuOpen, setStreakMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  // Custom Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Timer state for MCQ Modal
  const [timerText, setTimerText] = useState('14:59');
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  // MCQ selected answers and verification
  const [answers, setAnswers] = useState({});

  // File Upload states
  const [uploadedFile, setUploadedFile] = useState(null);
  const [customSkillName, setCustomSkillName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Lifted global states
  const [verifiedCredentials, setVerifiedCredentials] = useState([]);
  const [githubUser, setGithubUser] = useState(null);

  // Aptitude score submit handler
  const handleAptitudeSubmit = (report) => {
    // Boost overallMatch
    setOverallMatch(prev => Math.min(100, prev + 5));
    // Add to verifiedCredentials log
    setVerifiedCredentials(prev => [
      {
        id: `h-apt-${Date.now()}`,
        title: "General Aptitude Diagnostic",
        date: "TODAY",
        score: report.accuracy,
        badge: report.accuracy >= 80 ? "Emerald Badge" : "Amber Badge",
        status: "cert",
        details: "Quantitative & Logical Aptitude Proctored Transcript"
      },
      ...prev
    ]);
    window.dispatchEvent(new CustomEvent('ACTIVITY_LOGGED', { detail: { type: 'Completed Aptitude Diagnostic' } }));
    triggerToast(`Aptitude graded: ${report.accuracy}% Accuracy. verified percentiles calculated!`);
  };

  // Coding score submit handler
  const handleCodingSubmit = (report) => {
    // Boost overallMatch and roleMatch
    setOverallMatch(prev => Math.min(100, prev + 8));
    setRoleMatch(prev => Math.min(100, prev + 6));
    // Add to verifiedCredentials log
    setVerifiedCredentials(prev => [
      {
        id: `h-code-${Date.now()}`,
        title: "Core Problem Solving & Coding Sprint",
        date: "TODAY",
        score: report.accuracy,
        badge: report.accuracy >= 80 ? "Emerald Badge" : "Amber Badge",
        status: "solutions",
        details: "Inspect verified LeetCode solution traces."
      },
      ...prev
    ]);
    window.dispatchEvent(new CustomEvent('ACTIVITY_LOGGED', { detail: { type: 'Completed Coding Sandbox' } }));
    triggerToast(`Coding Sprint Graded: ${report.accuracy}% test cases passed. Code profile updated!`);
  };

  // Helper to trigger toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  // Toast Timer Hook
  useEffect(() => {
    const handleRetake = () => {
      setStudentProfile(prev => ({ ...prev, onboardingCompleted: false }));
    };
    window.addEventListener('RETAKE_ONBOARDING', handleRetake);
    return () => window.removeEventListener('RETAKE_ONBOARDING', handleRetake);
  }, []);

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // MCQ Timer Hook
  useEffect(() => {
    let interval = null;
    if (activeModal === 'mcq' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const next = prev - 1;
          const mins = Math.floor(next / 60);
          const secs = next % 60;
          setTimerText(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
          return next;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      triggerToast("Time is up! Diagnostic auto-submitted.");
      handleMCQSubmit();
    }
    return () => clearInterval(interval);
  }, [activeModal, timeLeft]);

  // Profile data state matching screen.png
  const profile = {
    name: "Deepak B.",
    degree: "B.Tech IT",
    tagline: "B.Tech IT | 84% Industry Ready",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv-iWr_NKpTBqpC8WFD2DRIMfgfsZQzE-dIN_FRP8uwPkLdnmwHkH_2WJ6b-K7BgSovNeX6Co9-UvGCiTljBOZt4SNUdO8OhcE_1d_IBhInRgB33_cGb6UTJVr5--r1YhfO8S7pbHvPnekO_CbgHc27xB8pTdg9XMg0YJx3-gOjX0Pt-fzYuIVOUIsKsAISPjUFNH_vq7l3imRLxn7BimGdMXAsNNNqf3Xjw2_dxD-ZJkwpcQ-uszg"
  };

  // Switch hub selection from left sidebar
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);

    if (tabId === 'Skills') {
      setActiveSubTab('Assessment');
    } else if (tabId === 'Opportunities') {
      setActiveSubTab('Internships');
    } else if (tabId === 'portfolio') {
      setActiveSubTab('Portfolio');
    } else if (tabId === 'Learn') {
      setActiveSubTab('Courses');
    } else {
      setActiveSubTab('');
    }
  };

  // Inner sub-tab selector with callback
  const handleSubTabChange = (subTabId) => {
    setActiveSubTab(subTabId);
  };

  // Handle global action hooks (from dashboard/subviews)
  const handleAction = (actionType, payload) => {
    if (actionType === 'DOCKER_ASSESSMENT') {
      setActiveTab('Skills');
      setActiveSubTab('Assessment');
      triggerToast("Navigated to Skills Assessment queue!");
      setTimeout(() => {
        handleOpenMCQModal("Docker & Microservices Diagnostic");
      }, 300);
    } else if (actionType === 'RESUME_SYNC') {
      triggerToast("Resume Synced with 3 New Badges!");
    } else if (actionType === 'TOAST') {
      triggerToast(payload || "Action successful!");
    }
  };

  // Switch active modals
  const handleOpenMCQModal = (title) => {
    setAnswers({});
    setTimeLeft(900);
    setTimerText('14:59');
    setModalPayload({
      title,
      questions: [
        {
          id: 1,
          q: "What is the primary instruction in a Dockerfile used to set the base runtime execution layer?",
          options: ["FROM", "RUN", "ENV", "ADD"],
          correct: 0
        },
        {
          id: 2,
          q: "Which Kubernetes resource manages scaling, updates, and rollout templates of active container instances?",
          options: ["Service", "Deployment", "Pod", "ConfigMap"],
          correct: 1
        },
        {
          id: 3,
          q: "Under minimal power budgets, what protocol is most commonly deployed to stream edge sensor telemetry packets?",
          options: ["HTTP/2", "gRPC", "MQTT", "WebSockets"],
          correct: 2
        }
      ]
    });
    setActiveModal('mcq');
  };

  const handleOpenUploadModal = () => {
    setUploadedFile(null);
    setCustomSkillName('');
    setUploadProgress(0);
    setUploading(false);
    setActiveModal('upload');
  };

  const handleOpenCertModal = (certTitle) => {
    setModalPayload({
      title: certTitle,
      hash: "ipfs://QmXoypGzW2yJ9L1XwPzZgH1vNqS4jB4cK3fU7d8e9rA2bC",
      recipient: "Deepak B.",
      date: "August 25, 2026",
      issuer: "VidyaPrayog AI Accreditation Hub"
    });
    setActiveModal('cert');
  };

  // Submit modal handlers
  const handleMCQSubmit = () => {
    setActiveModal(null);
    setOverallMatch(prev => Math.min(prev + 2, 100));
    setRoleMatch(prev => Math.min(prev + 5, 100));
    window.dispatchEvent(new CustomEvent('ACTIVITY_LOGGED', { detail: { type: 'Completed Diagnostic Assessment' } }));
    triggerToast("Diagnostic submitted! Match score boosted by +5%!");
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!customSkillName || !uploadedFile) {
      alert("Please enter a skill name and select a file.");
      return;
    }
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setActiveModal(null);
        triggerToast("Certificate submitted! Dean approval pending.");
        
        setVerifiedCredentials(prev => [{
          id: `c-${Date.now()}`,
          title: customSkillName,
          type: 'certification',
          source: 'Faculty-approved upload', status: 'verified', fileUrl: uploadedFile.fileUrl, fileType: uploadedFile.fileType, dateEarned: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
        }, ...prev]);
        setCustomSkillName('');
        setUploadedFile(null);
      }
    }, 200);
  };

  // Render correct active content inside scrollable main canvas
  const renderMainContent = () => {
    const commonProps = {
      studentProfile,
      activeSubTab,
      onSubTabChange: handleSubTabChange,
      onTabChange: handleTabChange,
      overallMatch,
      roleMatch,
      onOpenMCQ: handleOpenMCQModal,
      onOpenUpload: handleOpenUploadModal,
      onOpenCert: handleOpenCertModal,
      onOpenAptitude: () => setActiveModal('aptitude'),
      onOpenCoding: () => setActiveModal('coding'),
        onOpenCodeArena: () => { setActiveTab('Learn'); setActiveSubTab('Code Arena'); },
      verifiedCredentials,
      githubUser,
      setGithubUser
    };

    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView onTabChange={handleTabChange} onAction={handleAction} roleMatch={roleMatch} overallMatch={overallMatch} hasActivity={verifiedCredentials.length > 0} diagnosticBars={diagnosticBars} targetRole={studentProfile.targetRole} />;
      case 'Skills':
        if (activeSubTab === 'Profile & Matrix') {
          return <SkillsProfileMatrixView {...commonProps} />;
                  } else if (activeSubTab === 'Gap Analysis') {
            return <SkillsGapAnalysisView {...commonProps} />;
          } else if (activeSubTab === 'Roadmap') {
            return <SkillsRoadmapView {...commonProps} studentProfile={studentProfile} />;
          } else {
          return <SkillsAssessmentView {...commonProps} />;
        }
      case 'Opportunities':
        return <OpportunitiesView activeSubTab={activeSubTab} onSubTabChange={handleSubTabChange} triggerToast={triggerToast} />;
      case 'portfolio':
        return <PortfolioView {...commonProps} />;
      case 'Learn':
          return <LearnView {...commonProps} />;

      default:
        return <DashboardView onTabChange={handleTabChange} onAction={handleAction} roleMatch={roleMatch} overallMatch={overallMatch} hasActivity={verifiedCredentials.length > 0} diagnosticBars={diagnosticBars} targetRole={studentProfile.targetRole} />;
    }
  };

  // Get search placeholder text based on active tab
  const getSearchPlaceholder = () => {
    if (activeTab === 'Learn') return "Search courses, roadmaps, tutorials...";
    if (activeTab === 'Opportunities') return "Search internships, jobs, campus drives...";
    if (activeTab === 'portfolio') return "Search digital portfolio, projects, badges...";
    if (activeTab === 'Skills') return "Search assessments, skills, certifications...";
    return "Search courses, jobs, or skills...";
  };

  // Navigation array
  const navigationItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Skills', label: 'Skills', icon: ShieldCheck },
    { id: 'Opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'portfolio', label: 'Digital Portfolio', icon: FolderGit2 },
    { id: 'Learn', label: 'Learn', icon: GraduationCap },
  ];

  return (
    <div className="student-portal-theme text-slate-800 min-h-screen flex overflow-hidden font-body-sm text-body-sm relative antialiased">
      
      {/* Sidebar Navigation */}
      <aside className={`h-screen w-72 flex flex-col fixed left-0 top-0 bg-white/95 backdrop-blur-md border-r border-slate-200/80 z-40 md:flex transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col h-full py-6 px-5 justify-between">
          <div>
            {/* Header Brand Logo */}
            <div className="mb-9 px-2 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <GraduationCap className="text-white w-5 h-5" />
                </div>
                <div className="text-left">
                  <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">VidyaPrayog</h1>
                  <p className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider leading-none mt-1.5">AI-Driven Industry Readiness &amp; Upskilling Platform</p>
                </div>
              </div>
              {mobileMenuOpen && (
                <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-slate-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Navigation Options */}
            <nav className="flex flex-col gap-2">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-xl font-bold transition-all duration-200 relative ${
                      isActive 
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 scale-[0.98]' 
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User details at bottom of sidebar */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3 bg-slate-50/50 border p-3 rounded-2xl">
              <img alt="Deepak Avatar" className="w-9 h-9 rounded-full object-cover border border-slate-200" src={profile.avatar}/>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">{profile.name}</p>
                <p className="text-[9px] text-indigo-600 font-bold mt-0.5 truncate">{studentProfile.targetRole || "No Role Set"}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">Target Match: {roleMatch}%</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Canvas */}
      <div className="flex-1 flex flex-col md:ml-72 h-screen w-full relative">
        {!studentProfile.onboardingCompleted ? (
          <OnboardingFlow 
            onComplete={(result) => {
              const qR = result.qResults || [false, false, false, false, false];
              
              // Perfect mathematical distribution:
              // Overall score = (correctCount / 5) * 100
              // For 4 bars to average exactly to the overall score, their sum must be correctCount * 80.
              let b1 = 0, b2 = 0, b3 = 0, b4 = 0;
              
              if (qR[0]) b1 += 80;
              if (qR[1]) b2 += 80;
              if (qR[2]) b3 += 80;
              if (qR[3]) b4 += 80;
              
              if (qR[4]) {
                b1 += 20; b2 += 20; b3 += 20; b4 += 20;
              }

              const bars = [
                { label: 'Core Language & Syntax', score: b1, color: 'bg-emerald-500' },
                { label: 'Frameworks & Architecture', score: b2, color: 'bg-emerald-500' },
                { label: 'Systems & Performance', score: b3, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
                { label: 'Advanced Optimization', score: b4, color: 'bg-gradient-to-r from-rose-500 to-red-500' }
              ];
              setDiagnosticBars(bars);
              
              setStudentProfile({
                targetRole: result.role,
                currentTier: result.tier,
                onboardingCompleted: true,
                startingReadinessScore: result.score,
                roadmapStartNode: result.roadmapStartNode
              });
              setRoleMatch(result.score);
              setOverallMatch(result.score);
            }}
            onSkip={() => {
              setStudentProfile({
                ...studentProfile,
                onboardingCompleted: true,
                targetRole: "Undecided"
              });
            }}
          />
        ) : (
          <>
            {/* Top Header navbar */}
            <header className="docked full-width top-0 h-20 bg-white/80 border-b border-slate-200/60 fixed top-0 right-0 left-0 md:left-72 z-30 flex justify-between items-center px-6 md:px-10 backdrop-blur-md">

          <div className="flex items-center gap-4 flex-1 relative">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-slate-500 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            
            {/* Search Input Bar */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-800" 
                placeholder={getSearchPlaceholder()} 
                type="text"
              />

              {/* Filtering suggestions chip dropdown */}
              {searchQuery && (
                <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-fade-in text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 px-1">Interactive Search Recommendations</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "Docker Containerization Test", tab: "Skills", sub: "Assessment" },
                      { text: "Full-Stack Senior Diagnostic", tab: "Skills", sub: "Assessment" },
                      { text: "AWS Backend Internship TCS", tab: "Opportunities", sub: "Internships" },
                      { text: "System Design for Microservices", tab: "Learn", sub: "Courses" }
                    ].filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
                     .map((rec, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab(rec.tab);
                          setActiveSubTab(rec.sub);
                          setSearchQuery('');
                          triggerToast(`Navigated to ${rec.tab} Hub`);
                        }}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 transition-all active:scale-95"
                      >
                        {rec.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Streak Pill & Check-ins popover */}
            <div className="relative">
              <button 
                onClick={() => { setStreakMenuOpen(!streakMenuOpen); setNotifMenuOpen(false); }}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full border border-emerald-200/80 hover:bg-emerald-100/70 transition-all active:scale-95 text-xs font-extrabold"
              >
                <Flame className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                <span>12 Day Streak</span>
              </button>
              {streakMenuOpen && (
                <div className="absolute right-0 top-11 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-fade-in text-left">
                  <h4 className="font-extrabold text-xs text-slate-900 mb-2.5 pb-2 border-b">Check-In Roadmaps</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                      <span>✓ Day 1-5</span>
                      <span>Verified Test Setup</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                      <span>✓ Day 6-10</span>
                      <span>React Hooks Diagnostic</span>
                    </div>
                    <div className="flex justify-between items-center text-indigo-600 font-bold">
                      <span>⚡ Day 11-12</span>
                      <span>Docker Lab Active</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Notification Bell popover */}
            <div className="relative">
              <button 
                onClick={() => { setNotifMenuOpen(!notifMenuOpen); setStreakMenuOpen(false); }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative active:scale-95"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
              </button>
              {notifMenuOpen && (
                <div className="absolute right-0 top-11 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-fade-in text-left">
                  <h4 className="font-extrabold text-xs text-slate-900 mb-3 pb-2 border-b">Accreditation Alerts</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">verified_user</span>
                      <p className="text-slate-600 leading-tight"><strong>TCS</strong> verified your profile for AWS Backend Internship interview.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-indigo-600 text-sm">school</span>
                      <p className="text-slate-600 leading-tight">Dean <strong>Dr. R. Sundaram</strong> endorsed your MongoDB credential.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2"></div>
            
            {/* Gateway back navigation */}
            <Link to="/" className="text-xs font-bold bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Gateway
            </Link>
          </div>
        </header>

        {/* Scrollable Main content */}
        <main className="flex-1 overflow-y-auto pt-24 pb-12 px-6 md:px-10 bg-transparent">
          {renderMainContent()}
        </main>
          </>
        )}
      </div>

      {/* Global Backdrop for menu */}
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />
      )}

      {/* Custom Alert Toast Notification */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-300/20 animate-slide-in font-bold text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal 1: Interactive 3-Question MCQ Quiz Modal */}
      {activeModal === 'mcq' && modalPayload && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-slate-950 text-white flex justify-between items-center">
              <div className="text-left">
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">LIVE ACCREDITATION DIAGNOSTIC</span>
                <h3 className="font-extrabold text-sm">{modalPayload.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg text-xs font-bold text-amber-400">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  {timerText}
                </div>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {modalPayload.questions.map((qObj, index) => (
                <div key={qObj.id} className="text-left border-b pb-5 last:border-0 last:pb-0">
                  <h4 className="font-extrabold text-xs text-slate-800 mb-3 flex gap-1.5">
                    <span>{index + 1}.</span> <span>{qObj.q}</span>
                  </h4>
                  <div className="space-y-2">
                    {qObj.options.map((opt, oIdx) => {
                      const answered = answers[qObj.id] !== undefined;
                      const isSelected = answers[qObj.id] === oIdx;
                      const isCorrect = oIdx === qObj.correct;

                      let optClass = "flex items-center justify-between p-3 border rounded-xl cursor-pointer text-xs transition-all ";
                      if (isSelected) {
                        if (isCorrect) {
                          optClass += "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                        } else {
                          optClass += "bg-rose-50 border-rose-300 text-rose-800 font-semibold";
                        }
                      } else if (answered && isCorrect) {
                        optClass += "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                      } else {
                        optClass += "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50";
                      }

                      return (
                        <div 
                          key={oIdx}
                          onClick={() => {
                            if (answered) return; // Allow single answer selection
                            setAnswers(prev => ({ ...prev, [qObj.id]: oIdx }));
                          }}
                          className={optClass}
                        >
                          <span>{opt}</span>
                          {isSelected && (
                            <span className={`material-symbols-outlined text-[16px] ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {isCorrect ? 'check_circle' : 'cancel'}
                            </span>
                          )}
                          {!isSelected && answered && isCorrect && (
                            <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                disabled={Object.keys(answers).length < modalPayload.questions.length}
                onClick={handleMCQSubmit}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold disabled:bg-slate-200 disabled:text-slate-400 shadow-lg shadow-indigo-600/10 active:scale-95 transition-all"
              >
                Submit Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Certificate Upload Modal */}
      {activeModal === 'upload' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800">Upload Certificate for Endorsement</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Skill / Course Name</label>
                <input 
                  type="text"
                  required
                  value={customSkillName}
                  onChange={(e) => setCustomSkillName(e.target.value)}
                  placeholder="e.g. MongoDB Developer Path, AWS DevOps"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Real File Input */}
              <div>
                <input 
                  type="file" 
                  id="cert-upload" 
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setUploadedFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + " MB", fileUrl: URL.createObjectURL(file), fileType: file.type });
                    }
                  }} 
                />
                <label 
                  htmlFor="cert-upload"
                  className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-slate-50 hover:bg-indigo-50/10 group"
                >
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  <span className="text-xs font-bold text-slate-600 mt-1 text-center truncate max-w-[250px]">
                    {uploadedFile ? uploadedFile.name : "Click to select certificate file"}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    {uploadedFile ? uploadedFile.size : "PDF, PNG or JPG max 5MB"}
                  </span>
                </label>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>Uploading credentials...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="flex gap-2.5 pt-2 justify-end">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !uploadedFile}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold disabled:bg-slate-200 disabled:text-slate-400 shadow-md active:scale-95"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Verified Badge Viewer Modal */}
      {activeModal === 'cert' && modalPayload && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden text-center relative p-6">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
            
            {/* Holographic certification preview */}
            <div className="border-4 border-double border-indigo-600/30 rounded-xl p-6 bg-slate-50 relative overflow-hidden mt-6">
              
              {/* Holographic Verification Stamp */}
              <div className="absolute -bottom-5 -right-5 w-28 h-28 border-4 border-dashed border-indigo-600/10 rounded-full flex items-center justify-center rotate-12 select-none pointer-events-none">
                <span className="text-[7px] font-extrabold text-indigo-600/20 uppercase tracking-widest text-center">VERIFIED GRADUATE CREDENTIAL</span>
              </div>

              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-4 border border-indigo-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">VidyaPrayog Verified Industry Credential</span>
              <h3 className="font-extrabold text-slate-800 text-base leading-tight mt-1 mb-4">{modalPayload.title}</h3>
              
              <div className="space-y-2.5 text-xs text-left max-w-[240px] mx-auto border-t pt-4 border-slate-200/60">
                <div className="flex justify-between"><span className="text-slate-400">ISSUED TO</span> <span className="font-bold text-slate-800">{modalPayload.recipient}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">ISSUE DATE</span> <span className="font-bold text-slate-800">{modalPayload.date}</span></div>
                <div className="flex justify-between flex-col mt-2">
                  <span className="text-slate-400 text-[10px] mb-1">LEDGER BLOCK ADDRESS</span> 
                  <span className="font-mono text-[9px] bg-white border px-2 py-1 rounded text-indigo-600 overflow-x-auto select-all">{modalPayload.hash}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-6 justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close View
              </button>
              <button 
                onClick={() => {
                  alert("Downloading cryptographically signed credential PDF file with IPFS registry record...");
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-95"
              >
                Download Credential
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10-Question Aptitude Test Modal */}
      <AptitudeAssessmentModal 
        isOpen={activeModal === 'aptitude'} 
        onClose={() => setActiveModal(null)} 
        onSubmitScore={handleAptitudeSubmit} 
      />

      


      {/* 5-Question Coding Sandbox Modal */}
      <CodingSandboxModal 
        isOpen={activeModal === 'coding'} 
        onClose={() => setActiveModal(null)} 
        onSubmitScore={handleCodingSubmit} 
      />
    </div>
  );};

export default StudentPortal;
