import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, Award, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

const RoleGateway = () => {
  const cards = [
    {
      title: "Student Portal",
      icon: GraduationCap,
      description: "Your personal AI-driven readiness hub",
      bullets: [
        "Skill Assessments & Gap Analysis",
        "AI Career Advisor & Roadmap",
        "Industry Job Matching",
        "Digital Portfolio & Badges"
      ],
      cta: "Launch Student Dashboard",
      path: "/student",
      accent: "from-sky-500 to-indigo-500",
      iconBg: "bg-sky-50 text-sky-600 border border-sky-200/80",
      border: "hover:border-sky-300/60 hover:shadow-sky-100/60",
    },
    {
      title: "Industry Partner",
      icon: Briefcase,
      description: "Hire, mentor, and co-create with academia",
      bullets: [
        "Post Internships & Jobs",
        "AI Candidate Skill Matching",
        "Hackathons & Challenges",
        "Talent Analytics Dashboard"
      ],
      cta: "Launch Industry Portal",
      path: "/industry",
      accent: "from-violet-500 to-indigo-600",
      iconBg: "bg-violet-50 text-violet-600 border border-violet-200/80",
      border: "hover:border-violet-300/60 hover:shadow-violet-100/60",
    },
    {
      title: "Academia & Faculty",
      icon: Award,
      description: "Research, grants, and industry collaboration",
      bullets: [
        "R&D Grant Ledger & Proposals",
        "FDP Program Calendar",
        "Industry Consultancy Pipeline",
        "Research Collaboration Hub"
      ],
      cta: "Launch Academia Portal",
      path: "/academia",
      accent: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/80",
      border: "hover:border-emerald-300/60 hover:shadow-emerald-100/60",
    },
    {
      title: "Institution & Hub",
      icon: BarChart3,
      description: "Analytics, placements, and collaboration",
      bullets: [
        "Placement & Skill Analytics",
        "Industry Demand Mapping",
        "Live Projects & Mentorship",
        "Guest Lectures & Workshops"
      ],
      cta: "Launch Institution Hub",
      path: "/institution",
      accent: "from-amber-500 to-orange-500",
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200/80",
      border: "hover:border-amber-300/60 hover:shadow-amber-100/60",
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-hidden px-6 py-12 md:py-20">

      {/* Top Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center mb-14">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-700 font-bold mb-7 tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          ✦ SIH 2026 Live Prototype
        </div>

        {/* Brand Name */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Vidya</span>
            <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Prayog</span>
          </h1>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/80">
            Skill &amp; Career Ecosystem
          </span>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium mt-3">
          Bridging Academic Talent with Industry Demand
        </p>
      </div>

      {/* 2×2 Gateway Card Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`group flex flex-col justify-between p-7 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${card.border}`}
            >
              <div>
                {/* Card Icon & Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`p-3 rounded-xl ${card.iconBg} shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{card.description}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-5" />

                {/* Bullet Points */}
                <ul className="space-y-2.5 mb-7">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${card.accent} shrink-0`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                to={card.path}
                className="w-full inline-flex items-center justify-between px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-sm font-semibold text-white transition-colors duration-200 active:scale-[0.98] group/btn"
              >
                <span>{card.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
          Smart India Hackathon 2026 &bull; Prototype Demo
        </p>
      </div>
    </div>
  );
};

export default RoleGateway;
