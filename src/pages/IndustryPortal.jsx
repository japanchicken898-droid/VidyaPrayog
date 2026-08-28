import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  X, 
  Calendar, 
  CheckCircle 
} from 'lucide-react';

import IndustrySidebar from '../components/industry/IndustrySidebar';
import IndustryHeader from '../components/industry/IndustryHeader';
import IndustryDashboardView from '../components/industry/IndustryDashboardView';
import PostListingView from '../components/industry/PostListingView';
import CandidateMatchingView from '../components/industry/CandidateMatchingView';
import IndustryMentorshipView from '../components/industry/IndustryMentorshipView';
import IndustryChallengesView from '../components/industry/IndustryChallengesView';
import TalentAnalyticsView from '../components/industry/TalentAnalyticsView';

const IndustryPortal = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showQuickRoleModal, setShowQuickRoleModal] = useState(false);
  const [fastTrackCandidate, setFastTrackCandidate] = useState(null);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Candidates list state
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Deepak B.", degree: "B.Tech IT", match: 94, skills: ["React", "Node.js", "Docker", "AWS"], avatar: null },
    { id: 2, name: "Priya Sharma", degree: "B.Tech CSE", match: 92, skills: ["Python", "PyTorch", "NLP", "FastAPI"], avatar: null },
    { id: 3, name: "Aditya Verma", degree: "B.Tech IT", match: 88, skills: ["Docker", "Kubernetes", "AWS", "Go"], avatar: null },
    { id: 4, name: "Ananya Iyer", degree: "B.Tech CSE", match: 86, skills: ["React Native", "Firebase", "SQL"], avatar: null }
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Deepak B. accepted your Mentor Meeting invite.", time: "10 mins ago", type: "mentor" },
    { id: 2, title: "Dr. R. Sundaram (Dean) published a new full-stack benchmark.", time: "2 hours ago", type: "bench" }
  ]);

  // Form states for Quick Role Modal
  const [quickTitle, setQuickTitle] = useState('');
  const [quickDept, setQuickDept] = useState('Engineering');
  const [quickComp, setQuickComp] = useState('₹45k/month');

  // Trigger Toast helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // Action hook handler
  const handleAction = (type, payload) => {
    if (type === 'TOAST') {
      triggerToast(payload);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handlePublishRole = (roleData) => {
    triggerToast(`Successfully published "${roleData.title}" and triggered AI Competency Matching!`);
    
    // Add custom candidate mapping to mock activity
    if (roleData.title.toLowerCase().includes("aws") || roleData.title.toLowerCase().includes("cloud")) {
      // simulate matching candidates
      const matching = [
        { id: Date.now() + 1, name: "Siddharth Sen", degree: "B.Tech CSE", match: 89, skills: ["AWS", "Docker", "Python"], avatar: null }
      ];
      setCandidates(prev => [...matching, ...prev]);
    }
    
    setActiveTab('Dashboard');
  };

  const handlePostQuickRole = () => {
    setShowQuickRoleModal(true);
  };

  const handleQuickRoleSubmit = (e) => {
    e.preventDefault();
    if (!quickTitle) return;
    triggerToast(`Quick Role "${quickTitle}" published instantly to Student Job Hub!`);
    setShowQuickRoleModal(false);
    setQuickTitle('');
  };

  const handleOpenFastTrackModal = (candidate) => {
    setFastTrackCandidate(candidate);
  };

  const handleConfirmFastTrack = (dateText) => {
    if (!fastTrackCandidate) return;
    triggerToast(`Fast-Track Interview confirmed for ${fastTrackCandidate.name} on ${dateText}!`);
    
    // Push new notification
    const newNotif = {
      id: Date.now(),
      title: `Interview Invite sent to ${fastTrackCandidate.name} for ${dateText}`,
      time: "Just Now",
      type: "interview"
    };
    setNotifications(prev => [newNotif, ...prev]);
    
    setFastTrackCandidate(null);
  };

  const handleNotificationClick = (notif) => {
    triggerToast(`Viewing details for: ${notif.title}`);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <IndustryDashboardView 
            onTabChange={handleTabChange} 
            onFastTrackInterview={handleOpenFastTrackModal}
            candidates={candidates}
          />
        );
      case 'Post Internship':
        return (
          <PostListingView 
            isInternship={true} 
            onPublish={handlePublishRole} 
          />
        );
      case 'Post Job':
        return (
          <PostListingView 
            isInternship={false} 
            onPublish={handlePublishRole} 
          />
        );
      case 'Candidate Matching':
        return (
          <CandidateMatchingView 
            onAction={handleAction} 
            onInvite={handleOpenFastTrackModal} 
          />
        );
      case 'Mentorship':
        return (
          <IndustryMentorshipView 
            onAction={handleAction} 
          />
        );
      case 'Challenges':
        return (
          <IndustryChallengesView 
            onAction={handleAction} 
          />
        );
      case 'Talent Analytics':
        return (
          <TalentAnalyticsView />
        );
      default:
        return (
          <IndustryDashboardView 
            onTabChange={handleTabChange} 
            onFastTrackInterview={handleOpenFastTrackModal}
            candidates={candidates}
          />
        );
    }
  };

  return (
    <div className="student-portal-theme text-slate-800 min-h-screen flex overflow-hidden font-body-sm text-body-sm relative antialiased">
      
      {/* Sidebar navigation */}
      <IndustrySidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-72 h-screen w-full relative">
        
        {/* Header */}
        <IndustryHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onPostQuickRole={handlePostQuickRole}
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Scrollable workspace canvas */}
        <main className="flex-1 overflow-y-auto pt-24 pb-12 px-6 md:px-10 bg-transparent">
          {renderActiveContent()}
        </main>
      </div>

      {/* Mobile sidebar backdrop overlay */}
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />
      )}

      {/* Global alert toast notification */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-300/20 animate-slide-in font-bold text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal: Fast-Track Interview */}
      {fastTrackCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800">Fast-Track Candidate Interview</h3>
              <button onClick={() => setFastTrackCandidate(null)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  {fastTrackCandidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">{fastTrackCandidate.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{fastTrackCandidate.degree}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                Choose an interview slot to bypass preliminary filters. Deepak will receive a high-priority prompt on their dashboard.
              </p>

              <div className="space-y-2">
                {[
                  "August 28, 10:00 AM (Technical)",
                  "August 28, 02:00 PM (Technical)",
                  "August 31, 11:00 AM (HR/Managerial)"
                ].map((slotOption, i) => (
                  <button
                    key={i}
                    onClick={() => handleConfirmFastTrack(slotOption)}
                    className="w-full p-3 text-left rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-400/80 text-xs font-bold text-slate-700 flex justify-between items-center transition-all hover:bg-indigo-50/20 active:scale-98"
                  >
                    <span>{slotOption}</span>
                    <Calendar className="w-4 h-4 text-indigo-600" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button 
                onClick={() => setFastTrackCandidate(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Post Quick Role */}
      {showQuickRoleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-4.5 h-4.5 text-indigo-600" /> Publish Quick Role
              </h3>
              <button onClick={() => setShowQuickRoleModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickRoleSubmit} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Job Title</label>
                <input 
                  type="text" 
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="e.g. AWS Cloud Associate" 
                  required
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Department</label>
                <select 
                  value={quickDept}
                  onChange={(e) => setQuickDept(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-700 focus:outline-none"
                >
                  <option>Engineering</option>
                  <option>Data &amp; AI</option>
                  <option>DevOps &amp; Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Salary / Stipend</label>
                <input 
                  type="text" 
                  value={quickComp}
                  onChange={(e) => setQuickComp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowQuickRoleModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/10 active:scale-95 transition-all"
                >
                  Post Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default IndustryPortal;
