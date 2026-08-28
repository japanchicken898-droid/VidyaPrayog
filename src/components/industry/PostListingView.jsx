import React, { useState } from 'react';
import { 
  PlusCircle, 
  Settings, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const PostListingView = ({ isInternship = true, onPublish }) => {
  const [step, setStep] = useState(1);

  // Form states
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [compensation, setCompensation] = useState(isInternship ? '₹45k/month' : '₹12 LPA');
  const [workMode, setWorkMode] = useState('Remote');

  // Sliders states
  const [skillWeights, setSkillWeights] = useState({
    react: 70,
    node: 60,
    docker: 50,
    dsa: 65
  });

  // Diagnostic states
  const [diagnostic, setDiagnostic] = useState('VidyaPrayog Senior Full-Stack Diagnostic');

  const handleSliderChange = (skill, val) => {
    setSkillWeights(prev => ({
      ...prev,
      [skill]: parseInt(val)
    }));
  };

  const handlePublishClick = () => {
    onPublish({
      title,
      department,
      compensation,
      workMode,
      skillWeights,
      diagnostic,
      type: isInternship ? 'Internship' : 'Job'
    });
    // Reset form
    setTitle('');
    setStep(1);
  };

  return (
    <div className="max-w-[800px] mx-auto animate-fade-in text-slate-800">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          {isInternship ? 'Publish New Internship' : 'Publish New Job Role'} <PlusCircle className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Complete the multi-step form to match with candidates holding verified skills.
        </p>
      </div>

      {/* Progress Tracker bar */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>

          {[
            { num: 1, label: 'Metadata' },
            { num: 2, label: 'Skill Weights' },
            { num: 3, label: 'Diagnostic' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-sm ${
                step >= s.num ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-[10px] font-bold ${
                step >= s.num ? 'text-slate-800' : 'text-slate-400'
              }`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content Panel */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-6 mb-6 min-h-[300px] flex flex-col justify-between">
        
        {/* Step 1: Role Metadata */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Step 1: Role Metadata</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Role Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={isInternship ? "e.g. Frontend Engineering Intern" : "e.g. Senior Full-Stack Engineer"} 
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Department</label>
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                >
                  <option>Engineering</option>
                  <option>Data & AI</option>
                  <option>DevOps & Cloud</option>
                  <option>Product Management</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                  {isInternship ? 'Stipend Range' : 'CTC Range'}
                </label>
                <input 
                  type="text" 
                  value={compensation}
                  onChange={(e) => setCompensation(e.target.value)}
                  placeholder={isInternship ? "e.g. ₹35k - ₹50k/month" : "e.g. ₹10 LPA - ₹15 LPA"} 
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Work Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setWorkMode(mode)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        workMode === mode 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm shadow-indigo-100/50' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skill Weights Sliders */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Step 2: Required Skill Weights</h3>
            <p className="text-[11px] text-slate-400 leading-normal mb-2">
              Set priority sliders. The match index will be calculated using weights for these verification categories.
            </p>

            <div className="space-y-4">
              {[
                { key: 'react', name: 'React (Frontend Competency)', desc: 'SPA state, virtual DOM, context, custom hooks' },
                { key: 'node', name: 'Node.js (Backend Foundations)', desc: 'REST API creation, streams, express, security layers' },
                { key: 'docker', name: 'Docker (DevOps & Deployment)', desc: 'Containerization, Multi-stage builds, orchestration thresholds' },
                { key: 'dsa', name: 'DSA / Problem Solving threshold', desc: 'Leetcode medium, algorithms complexity, sorting optimization' }
              ].map((s) => (
                <div key={s.key} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{s.name}</span>
                      <p className="text-[9px] text-slate-400 mt-0.5">{s.desc}</p>
                    </div>
                    <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                      {skillWeights[s.key]}%
                    </span>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="100"
                    value={skillWeights[s.key]}
                    onChange={(e) => handleSliderChange(s.key, e.target.value)}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Automated Diagnostic Trigger Selection */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Step 3: Automated Diagnostic Trigger</h3>
            <p className="text-[11px] text-slate-400 leading-normal mb-2">
              Pick which diagnostic test candidates must clear or hold a verified badge in to trigger an auto-interview.
            </p>

            <div className="space-y-3">
              {[
                { 
                  id: 'VidyaPrayog Senior Full-Stack Diagnostic', 
                  title: 'VidyaPrayog Senior Full-Stack Diagnostic', 
                  desc: 'Evaluates Advanced React, NodeJS API optimization, MongoDB indexing, Docker deployment.' 
                },
                { 
                  id: 'Custom Developer Sandbox Challenge', 
                  title: 'Custom Developer Sandbox Challenge', 
                  desc: 'Evaluates real-time code performance in a container sandbox containing custom unit tests.' 
                },
                { 
                  id: 'Algorithmic DSA Validation Test', 
                  title: 'Algorithmic DSA Validation Test', 
                  desc: 'Evaluates complexity calculations, Graph traversal, Dynamic Programming thresholds.' 
                }
              ].map((diag) => (
                <div 
                  key={diag.id}
                  onClick={() => setDiagnostic(diag.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    diagnostic === diag.id 
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      diagnostic === diag.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'
                    }`}>
                      {diagnostic === diag.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{diag.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{diag.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action button row */}
        <div className="flex justify-between items-center gap-4 mt-8 pt-4 border-t border-slate-100">
          <button 
            type="button"
            disabled={step === 1}
            onClick={() => setStep(prev => prev - 1)}
            className="flex items-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 3 ? (
            <button 
              type="button"
              disabled={step === 1 && !title}
              onClick={() => setStep(prev => prev + 1)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={handlePublishClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
            >
              <Cpu className="w-4.5 h-4.5" /> Publish Role & Trigger AI Match Engine
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default PostListingView;
