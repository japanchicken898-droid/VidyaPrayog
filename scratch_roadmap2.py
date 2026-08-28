path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"

content = """import React, { useState } from 'react';
import { Layers, Database, FlaskConical, Cloud, Brain, Lock, CheckCircle2 } from 'lucide-react';

const SKILL_TRACKS = {
  "Mobile App Developer (Flutter / React Native)": ["Flutter Framework", "Dart Language", "React Native", "Mobile UI Patterns", "App Store Deployment"],
  "Full-Stack Web Developer (MERN / Next.js)": ["React/Next.js", "Node/Express", "MongoDB", "UI/UX Foundations", "System Architecture"],
  "Backend & Distributed Systems Engineer": ["Go/Rust", "Microservices", "Kafka/RabbitMQ", "PostgreSQL", "Kubernetes"],
  "Data Scientist & ML Engineer": ["Python", "Pandas & Numpy", "Scikit-Learn", "TensorFlow/PyTorch", "Model Deployment"],
  "Cybersecurity & Ethical Hacking Analyst": ["Network Security", "Penetration Testing", "Cryptography", "OWASP Top 10", "Incident Response"],
  "Default": ["Core Programming", "Data Structures", "Algorithms", "Version Control", "Basic Databases"]
};

const ASSESSMENT_CARDS = [
  {
    role: "Full-Stack Web Developer (MERN / Next.js)",
    title: "Full-Stack Web Architect Diagnostic",
    level: "Advanced",
    quizzes: [
      { name: "React Rendering Patterns", type: "Multiple Choice", time: "15m", icon: Layers, color: "indigo", score: "88%" },
      { name: "Node.js Internals Quiz", type: "Multiple Choice", time: "20m", icon: Database, color: "indigo", score: "--" }
    ]
  },
  {
    role: "Backend & Distributed Systems Engineer",
    title: "Backend & Systems Diagnostic",
    level: "Level 4",
    quizzes: [
      { name: "PostgreSQL Advanced", type: "Multiple Choice", time: "25m", icon: Database, color: "emerald", score: "94%" },
      { name: "Docker Essentials", type: "Multiple Choice", time: "15m", icon: FlaskConical, color: "sky", score: "62%" }
    ]
  },
  {
    role: "Cloud & AI Systems Engineer",
    title: "Cloud Infrastructure Diagnostic",
    level: "Intermediate",
    quizzes: [
      { name: "AWS Core Services", type: "Multiple Choice", time: "20m", icon: Cloud, color: "amber", score: "75%" },
      { name: "Kubernetes Pods", type: "Multiple Choice", time: "15m", icon: Layers, color: "sky", score: "--" }
    ]
  },
  {
    role: "Data Scientist & ML Engineer",
    title: "Data Science & ML Diagnostic",
    level: "Advanced",
    quizzes: [
      { name: "Pandas Data Wrangling", type: "Multiple Choice", time: "20m", icon: Database, color: "rose", score: "90%" },
      { name: "ML Algorithms Overview", type: "Multiple Choice", time: "30m", icon: Brain, color: "purple", score: "85%" }
    ]
  }
];

export default function RoadmapTree({ studentProfile }) {
  const targetRole = studentProfile?.targetRole || "Default";
  const tracks = SKILL_TRACKS[targetRole] || SKILL_TRACKS["Default"];
  
  // Find specific assessments for this role, or fallback to the first one with a 'Suggested' tag
  let assessments = ASSESSMENT_CARDS.filter(c => c.role === targetRole);
  let isSuggested = false;
  if (assessments.length === 0) {
    assessments = [ASSESSMENT_CARDS[0]]; // Fallback to full-stack
    isSuggested = true;
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12 animate-fade-in text-left">
      
      {/* Retake Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('RETAKE_ONBOARDING'))}
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#64748b",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Retake Diagnostic / Change Target Role
        </button>
      </div>

      <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-2">{targetRole !== 'Default' ? targetRole : 'General Engineering'} Roadmap</h3>
        <p className="text-sm text-slate-500 font-medium mb-8">Personalized milestone tracks based on your initial diagnostic.</p>
        
        <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8 pb-4">
          {tracks.map((track, i) => (
            <div key={i} className="relative pl-8">
              <div className={`absolute w-5 h-5 rounded-full left-[-11px] top-1 ring-4 ring-white flex items-center justify-center ${i === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                {i === 0 && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <h4 className={`text-base font-bold ${i === 0 ? 'text-indigo-900' : 'text-slate-700'}`}>{track}</h4>
              <p className="text-xs text-slate-400 font-medium mt-1">Milestone {i+1} requirements & learning resources.</p>
              
              {i === 0 && (
                <div className="mt-4 bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500 block mb-2">Current Active Focus</span>
                  <div className="flex gap-2 text-xs font-bold text-slate-600">
                    <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-300">Start Course</button>
                    <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-300">View Sandbox Labs</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Target Job Role Preparation Section */}
      <section className="bg-white/80 border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-start justify-between mb-1 text-left">
          <div>
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="text-xl">??</span> Target Job Role Preparation
              {isSuggested ? (
                <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded text-[9px] font-black uppercase tracking-wider">Suggested Match</span>
              ) : (
                <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded text-[9px] font-black uppercase tracking-wider">Domain Technical Benchmarks</span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-medium">In-depth technical evaluations aligned with {isSuggested ? 'a related' : 'your'} engineering job profile.</p>
          </div>
        </div>
        <div className="border-t border-slate-100 mt-6 mb-6" />

        <div className="grid grid-cols-1 gap-6">
          {assessments.map((assessment, aIdx) => (
            <div key={aIdx} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800">{assessment.title}</h3>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">Aligned to: {assessment.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Overall Match</span>
                  <span className="text-2xl font-black text-slate-800">42<span className="text-base text-slate-400">%</span></span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessment.quizzes.map((quiz, qIdx) => {
                  const QIcon = quiz.icon;
                  const colorMap = {
                    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200 border-indigo-300',
                    emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200 border-emerald-300',
                    sky: 'bg-sky-100 text-sky-600 border-sky-200 border-sky-300',
                    amber: 'bg-amber-100 text-amber-600 border-amber-200 border-amber-300',
                    rose: 'bg-rose-100 text-rose-600 border-rose-200 border-rose-300',
                    purple: 'bg-purple-100 text-purple-600 border-purple-200 border-purple-300',
                  };
                  const colors = colorMap[quiz.color] || colorMap.indigo;
                  const [bg, text, border, hover] = colors.split(' ');

                  return (
                    <div key={qIdx} className={`bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between`}>
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                              <QIcon className={`w-4 h-4 ${text}`} />
                            </div>
                            <h4 className="font-extrabold text-sm text-slate-800">{quiz.name}</h4>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-3">
                          <div className={`h-1.5 w-full rounded-full ${quiz.score !== '--' ? bg.replace('100', '400') : 'bg-slate-200'}`} />
                          <div className={`h-1.5 w-full rounded-full ${quiz.score !== '--' ? bg.replace('100', '400') : 'bg-slate-200'}`} />
                          <div className={`h-1.5 w-full rounded-full bg-slate-200`} />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Best: <strong className={`${text} font-extrabold`}>{quiz.score}</strong></span>
                        <button className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                          {quiz.score === '--' ? 'Start ?' : 'Retake ?'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
"""

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated RoadmapTree content")