import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  X, 
  Calendar, 
  CheckCircle, 
  Send 
} from 'lucide-react';

import FacultySidebar from '../components/faculty/FacultySidebar';
import FacultyHeader from '../components/faculty/FacultyHeader';
import FacultyDashboardView from '../components/faculty/FacultyDashboardView';
import FacultyOpportunitiesView from '../components/faculty/FacultyOpportunitiesView';
import FacultyFDPView from '../components/faculty/FacultyFDPView';
import FacultyResearchView from '../components/faculty/FacultyResearchView';
import FacultyConsultancyView from '../components/faculty/FacultyConsultancyView';
import FacultyCollaborationView from '../components/faculty/FacultyCollaborationView';

const FacultyPortal = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalDraftCall, setProposalDraftCall] = useState(null);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "DST Sanction Order issued for Hybrid Grid IoT proposal.", time: "15 mins ago", type: "grant" },
    { id: 2, title: "Your ATAL FDP session request has been accredited.", time: "3 hours ago", type: "fdp" }
  ]);

  // Form states for Research Proposal Modal
  const [newTitle, setNewTitle] = useState('');
  const [newAgency, setNewAgency] = useState('DST Science Schemes');
  const [newBudget, setNewBudget] = useState('₹25.0 Lakhs');

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
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleQuickAction = () => {
    setProposalDraftCall(null);
    setNewTitle('');
    setShowProposalModal(true);
  };

  const handleDraftProposal = (call) => {
    setProposalDraftCall(call);
    setNewTitle(`Proposal for: ${call.title}`);
    setNewBudget(call.budget !== 'N/A' && call.budget !== 'Fully Funded' ? call.budget : '₹10.0 Lakhs');
    setNewAgency(call.agency);
    setShowProposalModal(true);
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    triggerToast(`Research Proposal "${newTitle}" successfully submitted to ${newAgency}!`);
    
    // Add new notification
    const newNotif = {
      id: Date.now(),
      title: `Submitted: "${newTitle}" to ${newAgency}`,
      time: "Just Now",
      type: "grant"
    };
    setNotifications(prev => [newNotif, ...prev]);

    setShowProposalModal(false);
    setNewTitle('');
  };

  const handleNotificationClick = (notif) => {
    triggerToast(`Alert details: ${notif.title}`);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <FacultyDashboardView 
            onTabChange={handleTabChange} 
            onApplyProposal={handleDraftProposal}
          />
        );
      case 'Faculty Opportunities':
        return (
          <FacultyOpportunitiesView 
            onAction={handleAction} 
          />
        );
      case 'FDP':
        return (
          <FacultyFDPView 
            onAction={handleAction} 
          />
        );
      case 'Research':
        return (
          <FacultyResearchView 
            onAction={handleAction} 
          />
        );
      case 'Consultancy':
        return (
          <FacultyConsultancyView 
            onAction={handleAction} 
          />
        );
      case 'Collaboration':
        return (
          <FacultyCollaborationView 
            onAction={handleAction} 
          />
        );
      default:
        return (
          <FacultyDashboardView 
            onTabChange={handleTabChange} 
            onApplyProposal={handleDraftProposal}
          />
        );
    }
  };

  return (
    <div className="student-portal-theme text-slate-800 min-h-screen flex overflow-hidden font-body-sm text-body-sm relative antialiased">
      
      {/* Sidebar navigation */}
      <FacultySidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-72 h-screen w-full relative">
        
        {/* Header */}
        <FacultyHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onQuickAction={handleQuickAction}
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

      {/* Modal: Submit Research Proposal */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-4.5 h-4.5 text-indigo-600" /> Draft Research Proposal
              </h3>
              <button onClick={() => setShowProposalModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Proposal Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Clean Energy Sensor Telemetry Platform" 
                  required
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Funding Agency Scheme</label>
                <select 
                  value={newAgency}
                  onChange={(e) => setNewAgency(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-700 focus:outline-none"
                >
                  <option>DST Science Schemes</option>
                  <option>SERB Core Research Grant (CRG)</option>
                  <option>MSME Hackathon Incubation Fund</option>
                  <option>AICTE ATAL Academy Schemes</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Requested Budget</label>
                <input 
                  type="text" 
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/10 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyPortal;
