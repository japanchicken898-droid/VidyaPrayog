import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, X, ExternalLink, Edit3, LogOut, ChevronRight, BookOpen, Briefcase, GraduationCap, Users, AlertTriangle, Clock, CheckCircle, Sparkles } from 'lucide-react';

// ─── Search corpus ──────────────────────────────────────────────────────────
const SEARCH_CORPUS = [
  { id: 's1', category: 'Opportunities', label: 'Visiting AI Research Fellow – IIT Madras R&D Park',    tab: 'Faculty Opportunities' },
  { id: 's2', category: 'Opportunities', label: 'Smart India Hackathon 2026 – Senior Evaluation Jury',   tab: 'Faculty Opportunities' },
  { id: 's3', category: 'Opportunities', label: 'Industry Immersion: Cloud-Native Microservices',         tab: 'Faculty Opportunities' },
  { id: 's4', category: 'FDPs',          label: 'Advanced IoT and Edge Computing Applications',           tab: 'FDP' },
  { id: 's5', category: 'FDPs',          label: 'Blockchain Architectures for E-Governance',             tab: 'FDP' },
  { id: 's6', category: 'Research',      label: 'SERB Core Research Grant — Active Proposal',            tab: 'Research' },
  { id: 's7', category: 'Research',      label: 'DST Seed Grant — IoT Telemetry Platform',              tab: 'Research' },
  { id: 's8', category: 'Research',      label: 'IEEE Paper: IoT + Cloud Computing (Published)',         tab: 'Research' },
  { id: 's9', category: 'Students',      label: 'Deepak B. — Cloud Backend Intern',                     tab: 'Faculty Opportunities' },
  { id: 's10',category: 'Students',      label: 'Priya Sharma — AI/ML Shortlisted Candidate',           tab: 'Faculty Opportunities' },
  { id: 's11',category: 'Consultancy',   label: 'Mobile Edge ML Optimization — Tech Corp',              tab: 'Consultancy' },
  { id: 's12',category: 'Collaboration', label: 'High-Performance GPU Cluster Booking',                 tab: 'Collaboration' },
];

const CATEGORY_ICONS = {
  Opportunities: Briefcase,
  FDPs:          GraduationCap,
  Research:      BookOpen,
  Students:      Users,
  Consultancy:   Briefcase,
  Collaboration: Users,
};

const CATEGORY_COLORS = {
  Opportunities: 'text-indigo-600 bg-indigo-50',
  FDPs:          'text-purple-600 bg-purple-50',
  Research:      'text-emerald-600 bg-emerald-50',
  Students:      'text-amber-600 bg-amber-50',
  Consultancy:   'text-sky-600 bg-sky-50',
  Collaboration: 'text-teal-600 bg-teal-50',
};

// ─── Notification data ───────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1', read: false, type: 'alert', priority: 'red',
    icon: AlertTriangle,
    title: 'Remedial Alert: IT3401',
    body: '2 students scored below threshold on MQTT Protocol Lab. Immediate attention required.',
    time: '8 mins ago',
    action: 'Send Remedial Material',
    actionTab: 'Dashboard',
  },
  {
    id: 'n2', read: false, type: 'grant', priority: 'blue',
    icon: Clock,
    title: 'Grant Deadline in 4 days',
    body: 'SERB Core Research Grant proposal submission closes on Sep 1, 2026.',
    time: '1 hour ago',
    action: 'Open Draft',
    actionTab: 'Research',
  },
  {
    id: 'n3', read: false, type: 'fdp', priority: 'green',
    icon: CheckCircle,
    title: 'FDP Certification Verified',
    body: '"Cloud AI Developer Certification" hash verified on Polygon PoS testnet.',
    time: '3 hours ago',
    action: 'View Certificate',
    actionTab: 'FDP',
  },
];

const PRIORITY_STYLES = {
  red:   { dot: 'bg-red-500',   badge: 'bg-red-50 border-red-200 text-red-700',   icon: 'text-red-500'   },
  blue:  { dot: 'bg-blue-500',  badge: 'bg-blue-50 border-blue-200 text-blue-700',  icon: 'text-blue-500'  },
  green: { dot: 'bg-emerald-500',badge: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: 'text-emerald-500'},
};

// ─── Component ────────────────────────────────────────────────────────────────
const FacultyHeader = ({
  searchQuery = '',
  setSearchQuery = () => {},
  onNotificationClick = () => {},
  setMobileMenuOpen = () => {},
  onTabChange = () => {},
}) => {
  // Search
  const [searchFocus, setSearchFocus]     = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef  = useRef();
  const dropdownRef= useRef();

  // Notifications
  const [notifOpen, setNotifOpen]       = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;
  const notifRef = useRef();

  // Profile
  const [profileOpen, setProfileOpen]   = useState(false);
  const profileRef = useRef();

  // ── Search logic ──
  const handleSearch = (val) => {
    setSearchQuery(val);
    if (!val.trim()) { setSearchResults([]); return; }
    const q = val.toLowerCase();
    const hits = SEARCH_CORPUS.filter(item =>
      item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    ).slice(0, 8);
    setSearchResults(hits);
  };

  const handleSearchSelect = (item) => {
    setSearchQuery(item.label);
    setSearchResults([]);
    setSearchFocus(false);
    if (onTabChange) onTabChange(item.tab);
  };

  // ── Click outside to close ──
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !searchRef.current?.contains(e.target))
        setSearchResults([]);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Notification helpers ──
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const handleNotifAction = (notif) => {
    markRead(notif.id);
    if (onTabChange) onTabChange(notif.actionTab);
    setNotifOpen(false);
  };

  // Group search results by category
  const grouped = searchResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <header className="bg-white/60 backdrop-blur-md border-b border-slate-200/50 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">

      {/* ── Search ── */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full hidden sm:block" ref={searchRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-2.5 pl-11 pr-10 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-800"
            placeholder="Search opportunities, FDPs, research calls…"
            type="text"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setSearchResults([]); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Search dropdown */}
          {searchResults.length > 0 && (
            <div ref={dropdownRef}
              className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto">
              {Object.entries(grouped).map(([cat, items]) => {
                const Icon  = CATEGORY_ICONS[cat] || Briefcase;
                const color = CATEGORY_COLORS[cat] || 'text-slate-600 bg-slate-50';
                return (
                  <div key={cat}>
                    <div className="px-4 py-2 flex items-center gap-2 bg-slate-50 border-b border-slate-100">
                      <Icon className={`w-3.5 h-3.5 ${color.split(' ')[0]}`} />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{cat}</span>
                    </div>
                    {items.map(item => (
                      <button key={item.id} onClick={() => handleSearchSelect(item)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-indigo-50 text-left transition-colors group">
                        <span className="text-xs text-slate-700 font-semibold group-hover:text-indigo-700 truncate pr-2">{item.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Right side controls ── */}
      <div className="flex items-center gap-3">

        {/* Faculty Profile Badge */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(p => !p)}
            className="hidden sm:flex items-center gap-2.5 text-xs font-semibold text-slate-600 bg-slate-100/80 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 px-3.5 py-1.5 rounded-full cursor-pointer transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-black shrink-0">R</div>
            Ms. Renugadevi R | Asst. Prof
          </button>

          {/* Profile Drawer */}
          {profileOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
              {/* Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-lg font-black">R</div>
                  <div>
                    <p className="font-extrabold text-sm">Ms. Renugadevi R</p>
                    <p className="text-indigo-200 text-[10px] font-semibold">Assistant Professor, Dept. of IT</p>
                    <p className="text-indigo-300 text-[9px] font-bold mt-0.5">ID: IT-FAC-2024-042</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Details */}
                <div className="space-y-1.5 text-xs">
                  {[
                    ['Email', 'renugadevi.r@institution.edu.in'],
                    ['Specializations', 'Cloud Architecture, IoT & Edge ML, Distributed Systems'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="font-bold text-slate-400 shrink-0 w-24">{k}</span>
                      <span className="text-slate-700 font-semibold leading-snug">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Academic Metrics */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 grid grid-cols-4 gap-2 text-center">
                  {[['14', 'Papers'],['320', 'Citations'],['2', 'Patents'],['32/40', 'CEU']].map(([v,l]) => (
                    <div key={l}>
                      <p className="text-sm font-black text-indigo-600">{v}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{l}</p>
                    </div>
                  ))}
                </div>


              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(p => !p)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {notifOpen && (
            <div className="absolute right-0 top-12 w-96 bg-white border border-slate-200/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-500" />
                  <h4 className="font-extrabold text-sm text-slate-900">Faculty Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full">{unreadCount} new</span>
                  )}
                </div>
                <button onClick={markAllRead}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Mark all as read
                </button>
              </div>

              {/* Notification items */}
              <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                {notifications.map(notif => {
                  const s = PRIORITY_STYLES[notif.priority];
                  const Icon = notif.icon;
                  return (
                    <div key={notif.id}
                      className={`px-5 py-4 transition-colors ${notif.read ? 'bg-white' : 'bg-slate-50/80'}`}>
                      <div className="flex gap-3">
                        {/* Priority dot + icon */}
                        <div className="flex flex-col items-center gap-1 pt-0.5">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${notif.read ? 'bg-slate-300' : s.dot}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className={`text-xs font-extrabold ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>{notif.title}</p>
                            <span className="text-[9px] text-slate-400 font-semibold shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">{notif.body}</p>
                          <button
                            onClick={() => handleNotifAction(notif)}
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${s.badge}`}>
                            <Icon className={`w-3 h-3 ${s.icon}`} />
                            {notif.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 text-center">
                <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                  View All Alerts →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default FacultyHeader;
