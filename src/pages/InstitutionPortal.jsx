import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  X, 
  Calendar, 
  CheckCircle, 
  Send,
  Award,
  Users
} from 'lucide-react';

import InstitutionSidebar from '../components/institution/InstitutionSidebar';
import InstitutionHeader from '../components/institution/InstitutionHeader';
import InstitutionSkillAnalyticsView from '../components/institution/InstitutionSkillAnalyticsView';
import InternshipAnalyticsView from '../components/institution/InternshipAnalyticsView';
import PlacementAnalyticsView from '../components/institution/PlacementAnalyticsView';
import IndustryDemandView from '../components/institution/IndustryDemandView';
import StudentProgressView from '../components/institution/StudentProgressView';
import CollaborationLiveProjectsView from '../components/institution/CollaborationLiveProjectsView';
import CollaborationMentorshipView from '../components/institution/CollaborationMentorshipView';
import CollaborationWorkshopsView from '../components/institution/CollaborationWorkshopsView';
import CollaborationGuestLecturesView from '../components/institution/CollaborationGuestLecturesView';
import CollaborationChallengesView from '../components/institution/CollaborationChallengesView';

const InstitutionPortal = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Modals state
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [cohortProject, setCohortProject] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState('B.Tech IT (Batch A)');

  const [auditStudent, setAuditStudent] = useState(null);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "TCS placement drive final shortlisted candidates log published.", time: "10 mins ago", type: "placement" },
    { id: 2, title: "Acme Tech Labs sponsored a new Edge Computing capstone.", time: "4 hours ago", type: "collab" }
  ]);

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

  const handleAction = (type, payload) => {
    if (type === 'TOAST') {
      triggerToast(payload);
    } else if (type === 'AUDIT') {
      setAuditStudent(payload);
    } else if (type === 'COHORT') {
      setCohortProject(payload);
      setShowCohortModal(true);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleExportReport = () => {
    triggerToast("Exporting NBA Tier-1 Accreditation Audit Report... Saved to local Downloads.");
  };

  const handleConfirmCohortAssign = (e) => {
    e.preventDefault();
    if (!cohortProject) return;
    triggerToast(`Cohort "${selectedCohort}" successfully assigned to: ${cohortProject.title}!`);
    setShowCohortModal(false);
    setCohortProject(null);
  };

  const handleNotificationClick = (notif) => {
    triggerToast(`Alert details: ${notif.title}`);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <InstitutionSkillAnalyticsView 
            deptFilter={deptFilter} 
            onTabChange={handleTabChange}
          />
        );
      case 'Internships':
        return (
          <InternshipAnalyticsView 
            deptFilter={deptFilter} 
          />
        );
      case 'Placements':
        return (
          <PlacementAnalyticsView 
            deptFilter={deptFilter} 
          />
        );
      case 'Demand':
        return (
          <IndustryDemandView />
        );
      case 'Student Progress':
        return (
          <StudentProgressView 
            deptFilter={deptFilter} 
            onAction={handleAction}
          />
        );
      case 'Live Projects':
        return (
          <CollaborationLiveProjectsView 
            onAction={handleAction} 
          />
        );
      case 'Mentorship':
        return (
          <CollaborationMentorshipView 
            onAction={handleAction} 
          />
        );
      case 'Workshops':
        return (
          <CollaborationWorkshopsView 
            onAction={handleAction} 
          />
        );
      case 'Guest Lectures':
        return (
          <CollaborationGuestLecturesView 
            onAction={handleAction} 
          />
        );
      case 'Challenges':
        return (
          <CollaborationChallengesView 
            onAction={handleAction} 
          />
        );
      default:
        return (
          <InstitutionSkillAnalyticsView 
            deptFilter={deptFilter} 
            onTabChange={handleTabChange}
          />
        );
    }
  };

  return (
    <div className="student-portal-theme text-slate-800 min-h-screen flex overflow-hidden font-body-sm text-body-sm relative antialiased">
      
      {/* Sidebar navigation */}
      <InstitutionSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-72 h-screen w-full relative">
        
        {/* Header */}
        <InstitutionHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
          onExportReport={handleExportReport}
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

      {/* Modal: Detailed Student Audit */}
      {auditStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800">Student Placement Readiness Audit</h3>
              <button onClick={() => setAuditStudent(null)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  {auditStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">{auditStudent.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">Roll No: {auditStudent.roll} • {auditStudent.dept}</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Industry Readiness Index</span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                    {auditStudent.match}% Match
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Completed Badges</label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {auditStudent.badges.map((badge, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[9px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded flex items-center gap-0.5">
                        <Award className="w-2.5 h-2.5" /> {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button 
                onClick={() => setAuditStudent(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Assign Student Cohort */}
      {showCohortModal && cohortProject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Users className="w-4.5 h-4.5 text-indigo-600" /> Assign Student Cohort
              </h3>
              <button onClick={() => { setShowCohortModal(false); setCohortProject(null); }} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmCohortAssign} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Project Title</label>
                <p className="text-xs font-bold text-slate-900 leading-normal">{cohortProject.title}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sponsor: {cohortProject.sponsor}</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Select Student Cohort</label>
                <select 
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700 focus:outline-none"
                >
                  <option>B.Tech IT (Batch A)</option>
                  <option>B.Tech CSE (Batch C)</option>
                  <option>M.Tech CSE (Batch A)</option>
                  <option>B.Tech ECE (Batch B)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => { setShowCohortModal(false); setCohortProject(null); }}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/10 active:scale-95 transition-all"
                >
                  Assign Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default InstitutionPortal;
