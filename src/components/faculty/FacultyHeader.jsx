import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';

const FacultyHeader = ({ searchQuery = "", setSearchQuery = () => {}, notifications = [] }) => {
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  return (
    <header className="bg-white/50 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
       <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-2.5 pl-11 pr-4 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-800" 
              placeholder="Search opportunities, FDPs, research calls..." 
              type="text"
            />
          </div>
       </div>

       <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs font-semibold text-slate-600 bg-slate-100/80 border border-slate-200 px-3.5 py-1.5 rounded-full">
            Dr. R. Sundaram | Head of Research
          </span>
          <div className="relative">
            <button 
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
              )}
            </button>
            {notifMenuOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-4 z-50 text-left">
                <h4 className="font-extrabold text-xs text-slate-900 mb-3 pb-2 border-b border-slate-100">Faculty Alerts</h4>
                <div className="space-y-3 text-xs max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-slate-400 text-center py-4 font-medium">No new notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="flex items-start gap-2.5 p-1 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
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
       </div>
    </header>
  );
};

export default FacultyHeader;
