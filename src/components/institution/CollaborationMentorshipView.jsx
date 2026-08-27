import React from 'react';
import { Calendar, UserPlus, Building, Mail } from 'lucide-react';

const CollaborationMentorshipView = ({ onAction }) => {
  const mentors = [
    { id: 1, name: "Arvind Swaminathan", role: "Principal Cloud Architect", company: "Acme Tech Labs", slots: "3 Open Slots", type: "Alumni Class of '18" },
    { id: 2, name: "Nisha Patel", role: "Lead Devops Engineer", company: "TCS Cloud Division", slots: "1 Open Slot", type: "Corporate Volunteer" },
    { id: 3, name: "Suresh Pillai", role: "Senior Developer", company: "Google Developers", slots: "Fully Booked", type: "Alumni Class of '20" }
  ];

  const sessions = [
    { id: 1, student: "Deepak B. (B.Tech IT)", mentor: "Arvind Swaminathan", topic: "1-on-1 Portfolio Review", time: "August 28, 10:00 AM" },
    { id: 2, student: "Priya Sharma (B.Tech CSE)", mentor: "Nisha Patel", topic: "Technical System Mock", time: "August 29, 02:00 PM" }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Alumni &amp; Industry Mentor Pairing Hub <Calendar className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate mentoring programs, manage active pairing logs, and view scheduled mock slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Mentor Directory */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-indigo-600" /> Mentor Directory
          </h3>

          <div className="divide-y divide-slate-100">
            {mentors.map((men) => (
              <div key={men.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-xs">
                    {men.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      {men.name}
                      <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">
                        {men.type}
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{men.role} at {men.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    men.slots.includes('Open') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                  }`}>
                    {men.slots}
                  </span>
                  
                  {men.slots.includes('Open') && (
                    <button 
                      onClick={() => onAction('TOAST', `Sent match pairing invitation to Dr. Sundaram for approval`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-xl shadow-md shadow-indigo-500/10 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <UserPlus className="w-3 h-3" /> Pair Student
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Active Session Schedule */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 px-1">
            <Calendar className="w-4 h-4 text-indigo-600" /> Active Session Schedule
          </h3>

          <div className="space-y-4">
            {sessions.map((ses) => (
              <div 
                key={ses.id}
                className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-2 text-left"
              >
                <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                  {ses.topic}
                </span>
                <h4 className="font-extrabold text-slate-900 text-xs mt-2">{ses.student}</h4>
                <p className="text-[10px] text-slate-400 font-semibold">Mentor: {ses.mentor}</p>
                <div className="flex justify-between items-center pt-2 text-[10px] text-slate-500 font-semibold border-t border-slate-50">
                  <span>{ses.time}</span>
                  <button 
                    onClick={() => onAction('TOAST', `Opening proctored meeting room...`)}
                    className="text-indigo-600 hover:text-indigo-700 font-bold"
                  >
                    Enter Room →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollaborationMentorshipView;
