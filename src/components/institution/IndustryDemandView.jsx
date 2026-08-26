import React from 'react';
import { Target, AlertTriangle, ArrowRight, Cpu, Sparkles } from 'lucide-react';

const IndustryDemandView = () => {
  // Trending skills vs Curriculum coverage
  const marketGaps = [
    { skill: "Docker & Containerization", demand: 92, coverage: 40, status: "Critical Gap" },
    { skill: "Kubernetes & Orchestration", demand: 85, coverage: 15, status: "Critical Gap" },
    { skill: "FastAPI Backend Design", demand: 75, coverage: 65, status: "Minor Gap" },
    { skill: "LLM Fine-Tuning & Prompt Tuning", demand: 68, coverage: 10, status: "Critical Gap" }
  ];

  // AI recommendations
  const recommendations = [
    { title: "Integrate Container Labs in B.Tech IT 3rd Year System Ops", desc: "Introduce multi-stage Docker builds and docker-compose configurations to align with AWS/TCS recruiter expectations." },
    { title: "Launch 4-week Micro-Credential for Kubernetes Orchestration", desc: "Partner with regional partners to offer accredited pod auto-scaling and ingress-controller labs." },
    { title: "Expand Python ML Electives with LLM Sandbox Training", desc: "Integrate token-budgeting and LoRA fine-tuning labs inside the 7th-semester Advanced AI curriculum." }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Industry Demand &amp; Curriculum Gap Matrix <Target className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Study real-time recruiter demand categories, audit syllabus overlaps, and review AI-generated curriculum enhancements.
        </p>
      </div>

      {/* Matrix Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Market Gap Matrix */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-indigo-600" /> Syllabus Coverage vs. Direct Market Demand
          </h3>

          <div className="space-y-4 pt-2">
            {marketGaps.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900">{item.skill}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full ${
                    item.status === 'Critical Gap' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>{item.status}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400">
                    <span>Recruiter Demand Intensity</span>
                    <span>{item.demand}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.demand}%` }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400">
                    <span>Syllabus Coverage</span>
                    <span>{item.coverage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.coverage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): AI Recommendations */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 px-1">
            <Sparkles className="w-4 h-4 text-indigo-600" /> AI Syllabus Advisory
          </h3>

          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-2 text-left">
                <h4 className="font-extrabold text-slate-950 text-xs flex gap-1 items-start leading-normal">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  {rec.title}
                </h4>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  {rec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndustryDemandView;
