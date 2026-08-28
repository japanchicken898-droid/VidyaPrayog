import React, { useState } from 'react';
import { ROLE_DIAGNOSTIC_QUESTIONS } from '../../data/diagnosticQuestions';
import { 
  MonitorPlay, Server, Smartphone, Cpu, Layout, 
  Brain, Sparkles, Eye, LineChart, 
  Cloud, Infinity, Database, Shield,
  Lock, Zap, Boxes, Plane, Briefcase, 
  Bug, Gamepad2, ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  {
    name: "Software Development",
    roles: [
      { name: "Full-Stack Web Developer (MERN / Next.js)", icon: MonitorPlay },
      { name: "Backend & Distributed Systems Engineer", icon: Server },
      { name: "Mobile App Developer (Flutter / React Native)", icon: Smartphone },
      { name: "System Software & C++ Programmer", icon: Cpu },
      { name: "Frontend UI/UX Systems Engineer", icon: Layout },
    ]
  },
  {
    name: "Data, AI & ML",
    roles: [
      { name: "Data Scientist & ML Engineer", icon: Brain },
      { name: "NLP & Generative AI Specialist", icon: Sparkles },
      { name: "Computer Vision & Robotics Engineer", icon: Eye },
      { name: "Business Intelligence & Telemetry Analyst", icon: LineChart },
    ]
  },
  {
    name: "Cloud, DevOps & Infrastructure",
    roles: [
      { name: "Cloud & AI Systems Engineer", icon: Cloud },
      { name: "DevOps & Site Reliability Engineer (SRE)", icon: Infinity },
      { name: "Database Administrator & SQL Architect", icon: Database },
      { name: "Network & Infrastructure Security Engineer", icon: Shield },
    ]
  },
  {
    name: "Security",
    roles: [
      { name: "Cybersecurity & Ethical Hacking Analyst", icon: Lock },
    ]
  },
  {
    name: "Emerging & Specialized Tech",
    roles: [
      { name: "Embedded Systems & IoT Developer", icon: Zap },
      { name: "Blockchain & Web3 Developer", icon: Boxes },
      { name: "Autonomous Systems & Drone Software Engineer", icon: Plane },
      { name: "Enterprise SAP & ERP Cloud Specialist", icon: Briefcase },
    ]
  },
  {
    name: "Quality & Gaming",
    roles: [
      { name: "QA & Automated Testing Engineer", icon: Bug },
      { name: "Game Developer (Unity / Unreal Engine)", icon: Gamepad2 },
    ]
  }
];

export default function OnboardingFlow({ onComplete, onSkip }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  
  // Diagnostic State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  const handleRoleSelect = (roleName) => {
    setSelectedRole(roleName);
    setQuestions(ROLE_DIAGNOSTIC_QUESTIONS[roleName] || []);
    setTimeout(() => {
      setStep(2);
    }, 400);
  };

  const handleNextQuestion = () => {
    const q = questions[currentQIndex];
    if (selectedOption === q.correct) {
      setCorrectCount(prev => prev + 1);
    }
    
    if (currentQIndex < 4) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Finished all 5 questions
      let finalCorrect = correctCount + (selectedOption === q.correct ? 1 : 0);
      setStep(3); // Result step
      setCorrectCount(finalCorrect);
    }
  };

  const renderStep1 = () => (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">What career path interests you?</h1>
        <p className="text-slate-500 mt-3 text-sm md:text-base font-medium">We'll tailor your roadmap and skill assessments around this selection.</p>
      </div>

      <div className="space-y-10">
        {CATEGORIES.map((cat, i) => (
          <div key={i}>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">{cat.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.roles.map((role, j) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.name;
                return (
                  <button
                    key={j}
                    onClick={() => handleRoleSelect(role.name)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-600/20' 
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold leading-snug ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>{role.name}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button onClick={onSkip} className="text-xs font-bold text-slate-400 hover:text-slate-700 underline underline-offset-4 transition-colors">
          Skip for now (I'll choose later)
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (!questions || questions.length === 0) return <div className="text-center p-10 font-bold">No questions available for this role.</div>;
    const q = questions[currentQIndex];
    const progress = ((currentQIndex + 1) / 5) * 100;

    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in mt-10">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500 mb-2 block">Quick Diagnostic</span>
          <h2 className="text-2xl font-black text-slate-900">{selectedRole}</h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-500">
            <span>Question {currentQIndex + 1} of 5</span>
            <span className="uppercase text-[9px] tracking-widest bg-slate-100 px-2 py-1 rounded">{q.difficulty}</span>
          </div>
          
          <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">{q.text}</h3>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              disabled={selectedOption === null}
              onClick={handleNextQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors active:scale-95"
            >
              {currentQIndex === 4 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    // Rubric Calculation
    let tier = 'Amateur (Beginner)';
    let baseScore = 20 + Math.floor(Math.random() * 10);
    let startNode = 'Milestone 1: Core Foundations';
    let color = 'slate';

    if (correctCount >= 3 && correctCount <= 4) {
      tier = 'Intermediate';
      baseScore = 60 + Math.floor(Math.random() * 10);
      startNode = 'Milestone 2/3: Advanced Applied Track';
      color = 'amber';
    } else if (correctCount === 5) {
      tier = 'Advanced';
      baseScore = 85 + Math.floor(Math.random() * 10);
      startNode = 'Milestone 4: Capstone & Placement Fast-Track';
      color = 'emerald';
    }

    const colorClasses = {
      slate: "bg-slate-100 text-slate-700 border-slate-300",
      amber: "bg-amber-100 text-amber-700 border-amber-300",
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-300",
    };

    return (
      <div className="w-full max-w-xl mx-auto animate-fade-in mt-10 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
          
          <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-indigo-600" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 mb-2">Profile Calibrated</h2>
          <p className="text-slate-500 text-sm font-medium mb-8">We've customized your dashboard for {selectedRole}.</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-slate-200 rounded-2xl p-5">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">Assessed Tier</span>
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg border ${colorClasses[color]}`}>
                {tier}
              </span>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Readiness Score</span>
              <span className="text-3xl font-black text-slate-800">{baseScore}%</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
              <ChevronRight className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">Your Roadmap Starts At</span>
              <span className="text-sm font-bold text-slate-800">{startNode}</span>
            </div>
          </div>

          <button
            onClick={() => onComplete({
              role: selectedRole,
              tier,
              score: baseScore,
              roadmapStartNode: startNode
            })}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95"
          >
            Go to my dashboard &rarr;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50/95 backdrop-blur-md overflow-y-auto pt-16 md:pt-24 px-4 font-body-sm text-body-sm">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
