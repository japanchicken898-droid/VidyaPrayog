import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ArrowLeft } from 'lucide-react';

const IndustryHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  onPostQuickRole, 
  notifications = [], 
  onNotificationClick, 
  setMobileMenuOpen 
}) => {
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  return (
    <header className="docked full-width top-0 h-20 bg-white/80 border-b border-slate-200/60 fixed top-0 right-0 left-0 md:left-72 z-30 flex justify-between items-center px-6 md:px-10 backdrop-blur-md">
      <div className="flex items-center gap-4 flex-1 relative">
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-slate-500 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-800" 
            placeholder="Search candidates, diagnostics, job postings..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Post Quick Role CTA Button */}
        <button 
          onClick={onPostQuickRole}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-md shadow-indigo-500/10 active:scale-95 transition-all"
        >
          + Post Quick Role
        </button>

        {/* Company Profile Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-bold text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          Acme Tech Labs
        </div>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative active:scale-95"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
            )}
          </button>
          
          {notifMenuOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-4 z-50 animate-fade-in text-left">
              <h4 className="font-extrabold text-xs text-slate-900 mb-3 pb-2 border-b">Partner Alerts</h4>
              <div className="space-y-3 text-xs max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-slate-400 text-center py-4 font-medium">No new notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className="flex items-start gap-2.5 p-1 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        if (onNotificationClick) onNotificationClick(notif);
                        setNotifMenuOpen(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-indigo-600 text-sm mt-0.5">
                        {notif.type === 'interview' ? 'video_chat' : 'verified_user'}
                      </span>
                      <div>
                        <p className="text-slate-700 font-semibold leading-tight">{notif.title}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        {/* Back Navigation Link */}
        <Link 
          to="/" 
          className="text-xs font-bold bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Gateway
        </Link>
      </div>
    </header>
  );
};

export default IndustryHeader;
