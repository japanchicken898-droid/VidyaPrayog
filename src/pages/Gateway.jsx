import React from 'react';
import { useNavigate } from 'react-router-dom';
import AmbientBackground from '../components/common/AmbientBackground';

export default function Gateway() {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Student Login',
      icon: '🎓',
      desc: 'Skill assessments, career roadmaps & verified portfolios',
      path: '/student',
      borderHover: 'hover:border-blue-400 hover:shadow-blue-100',
    },
    {
      title: 'Industry Partner Login',
      icon: '💼',
      desc: 'Post roles, recruit top-tier talent & host challenges',
      path: '/industry',
      borderHover: 'hover:border-purple-400 hover:shadow-purple-100',
    },
    {
      title: 'Academia & Faculty Login',
      icon: '🏛️',
      desc: 'R&D grant proposals, FDP programs & consultancy',
      path: '/academia',
      borderHover: 'hover:border-emerald-400 hover:shadow-emerald-100',
    },
    {
      title: 'Institution & Hub Login',
      icon: '🏢',
      desc: 'Placement analytics, curriculum mapping & live projects',
      path: '/institution',
      borderHover: 'hover:border-amber-400 hover:shadow-amber-100',
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 select-none overflow-hidden bg-white/40">
      {/* Background with spinning pastel geometric shapes */}
      <AmbientBackground />

      {/* Main Glassmorphic Login Card */}
      <div className="w-full max-w-xl bg-[#ebf4fd]/90 backdrop-blur-xl border border-white/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/60 flex flex-col items-center gap-6 z-10 transition-all">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-blue-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 uppercase">
              VidyaPrayog
            </h1>
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mt-0.5">
              Career Ecosystem
            </p>
          </div>
        </div>

        {/* 4 Core Role Navigation Buttons */}
        <div className="w-full flex flex-col gap-3.5 mt-2">
          {roles.map((role) => (
            <button
              key={role.title}
              onClick={() => navigate(role.path)}
              className={`w-full py-4 px-6 bg-white/95 hover:bg-indigo-600 hover:text-white text-slate-800 font-semibold text-base rounded-2xl shadow-sm border border-blue-100/80 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-between group ${role.borderHover}`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-xl">{role.icon}</span>
                <div className="text-left">
                  <div className="font-bold text-sm sm:text-base group-hover:text-white transition-colors">
                    {role.title}
                  </div>
                  <div className="text-[11px] text-slate-500 group-hover:text-indigo-100 font-normal transition-colors">
                    {role.desc}
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Bottom Utility / Language Area */}
        <div className="flex flex-col items-center gap-1.5 pt-2 border-t border-slate-200/60 w-full">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            If Not English
          </span>
          <select className="text-xs bg-white/90 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer shadow-sm">
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
          <span className="text-[10px] text-slate-400 mt-2 font-medium">
            Powered by VidyaPrayog AI Engine
          </span>
        </div>

      </div>

      {/* Footer Tag */}
      <footer className="mt-8 text-center text-xs font-semibold text-slate-400 tracking-wider uppercase z-10">
        VidyaPrayog • AI-Driven Benchmark Engine
      </footer>
    </div>
  );
}
