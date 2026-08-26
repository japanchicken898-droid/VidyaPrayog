import React from 'react';
import { Calendar, Users, Award, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CollaborationWorkshopsView = ({ onAction }) => {
  const { fdps } = useApp();

  // Merge static workshops + FDPs posted by Institution/ATAL from global context
  const staticWorkshops = [
    { id: 's1', title: "Full-Stack Cloud Deployments on AWS", partner: "AWS Academy", date: "September 05, 2026", duration: "1 Day (Hands-on)", registered: 180, completionRate: 94 },
    { id: 's2', title: "Embedded IoT Mesh Networks & Protocols", partner: "Cisco IoT Hub", date: "September 12, 2026", duration: "2 Days (Lab-driven)", registered: 120, completionRate: 88 },
    { id: 's3', title: "Microservices Container Deployment Sprint", partner: "VidyaPrayog Accreditation Lab", date: "August 22, 2026", duration: "1 Day", registered: 240, completionRate: 98 }
  ];

  // Normalize fdps into the same shape as workshops
  const fdpWorkshops = fdps.map(f => ({
    id: `fdp-${f.id}`,
    title: f.title,
    partner: f.org,
    date: f.dates,
    duration: f.type,
    registered: f.credits * 12,   // estimate
    completionRate: null           // not yet completed
  }));

  const workshops = [...fdpWorkshops, ...staticWorkshops];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Technical Bootcamps &amp; Practical Workshops <Calendar className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate hands-on corporate bootcamps, monitor student attendance, and evaluate practical sandbox completion rates.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {workshops.map((work) => (
          <div 
            key={work.id}
            className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs leading-snug">{work.title}</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sponsor: {work.partner} • {work.duration}</p>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500 font-semibold">
                  <span className="text-slate-400">Date: {work.date}</span>
                  <span className="text-indigo-600 font-bold">{work.registered} Students Registered</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
              <div className="text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Practical Completion</span>
                {work.completionRate !== null ? (
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded block mt-0.5 text-center">
                    {work.completionRate}% Done
                  </span>
                ) : (
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded block mt-0.5 text-center">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationWorkshopsView;
