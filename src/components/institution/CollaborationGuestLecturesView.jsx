import React from 'react';
import { Video, User, Users, Calendar, Download } from 'lucide-react';

const CollaborationGuestLecturesView = ({ onAction }) => {
  const lectures = [
    { id: 1, title: "Serverless Microservices: Best Practices in Production", speaker: "Dr. Arvind Sundar", bio: "Principal Engineer at AWS Cloud Division", date: "August 28, 2026", time: "11:00 AM", registered: 160, status: "Scheduled" },
    { id: 2, title: "Container Orchestration Security Standards", speaker: "Nisha Patel", bio: "Lead Devops at TCS Research Labs", date: "September 02, 2026", time: "03:00 PM", registered: 220, status: "Scheduled" },
    { id: 3, title: "Edge Networks under Low-Duty Telemetry budgets", speaker: "Prof. Wong SUTD", bio: "Dean of Engineering, SUTD Singapore", date: "August 15, 2026", time: "Completed", registered: 95, status: "Archived" }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Industry Expert Guest Lecture Series <Video className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate guest lectures by global enterprise architects and alumni, audit registration indices, and access video logs.
        </p>
      </div>

      {/* Grid of lectures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lectures.map((lec) => (
          <div 
            key={lec.id}
            className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  lec.status === 'Scheduled' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
                }`}>
                  {lec.status}
                </span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {lec.registered} Registered
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-xs leading-normal mb-2">{lec.title}</h3>
              
              {/* Speaker card */}
              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-start gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-[10px] leading-tight">{lec.speaker}</h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{lec.bio}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2 text-[10px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {lec.date} {lec.status === 'Scheduled' ? `at ${lec.time}` : ''}
              </span>
              
              {lec.status === 'Archived' ? (
                <button 
                  onClick={() => onAction('TOAST', "Accessing Zoom/Meet video recording logs...")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                >
                  <Download className="w-3 h-3" /> Watch Recording
                </button>
              ) : (
                <button 
                  onClick={() => onAction('TOAST', `Opening proctored registration details for: ${lec.title}`)}
                  className="text-indigo-600 hover:text-indigo-700 font-bold"
                >
                  Admin Console →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationGuestLecturesView;
