import React from 'react';
import { Cpu, Users, Award, ExternalLink, Plus } from 'lucide-react';

const CollaborationLiveProjectsView = ({ onAction }) => {
  const projects = [
    {
      id: 1,
      title: "Clean Energy Smart-Grid IoT Node Framework",
      sponsor: "TCS Green Labs",
      faculty: "Dr. R. Sundaram",
      cohort: "B.Tech IT (Batch A)",
      tech: ["IoT", "MQTT", "ESP32", "Docker"],
      status: "Ongoing - Phase 2"
    },
    {
      id: 2,
      title: "Edge Gateway Multi-tenant Ingress Controller",
      sponsor: "Acme Tech Labs",
      faculty: "Prof. P. Selvam",
      cohort: "B.Tech CSE (Batch C)",
      tech: ["Kubernetes", "Go", "gRPC", "Observability"],
      status: "Under Evaluation"
    },
    {
      id: 3,
      title: "Micro-Syllabus AI Mapping Graph Database",
      sponsor: "VidyaPrayog R&D",
      faculty: "Dr. K. Priya",
      cohort: "M.Tech CSE (Batch A)",
      tech: ["Neo4j", "React", "Python", "FastAPI"],
      status: "Completed"
    }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Industry-Sponsored Capstones &amp; R&amp;D Projects <Cpu className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor active capstone project phases, sponsoring corporate entities, and student-faculty assignments.
        </p>
      </div>

      {/* Grid of project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div 
            key={proj.id}
            className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  proj.status.includes('Ongoing') ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                  proj.status.includes('Evaluation') ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {proj.status}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">{proj.sponsor}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-xs leading-normal mb-1">{proj.title}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">Faculty Lead: {proj.faculty}</p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {proj.tech.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 text-[8.5px] font-extrabold text-slate-500 bg-slate-50 border border-slate-200/80 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
                Cohort: <strong className="text-slate-800 font-bold">{proj.cohort}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-slate-100">
              <button 
                onClick={() => onAction('TOAST', `Opening deliverable sandbox for: ${proj.title}`)}
                className="py-2 text-[10px] font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                Submit File <ExternalLink className="w-3 h-3" />
              </button>

              <button 
                onClick={() => onAction('COHORT', proj)}
                className="py-2 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center gap-1 shadow-md shadow-indigo-500/10 transition-all active:scale-95"
              >
                Assign Cohort <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationLiveProjectsView;
