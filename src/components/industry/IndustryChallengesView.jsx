import React, { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Terminal, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileCode,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const IndustryChallengesView = ({ onAction }) => {
  const { hackathons, addChallenge } = useApp();

  // Submission lists
  const [submissions, setSubmissions] = useState([
    { id: 1, team: "NullPointer Hawks", lead: "Deepak B.", challenge: "Edge AI Compressed Air Monitoring", repo: "https://github.com/deepak-b/edge-ai-compressed", testStatus: "Passing 10/10 Tests", coverage: 94, time: "20 mins ago" },
    { id: 2, team: "Bit Wizards", lead: "Priya Sharma", challenge: "Zero-Trust Agent Observability Sprint", repo: "https://github.com/priya-s/zero-trust-observability", testStatus: "Failed Sandbox Unit Test #4", coverage: 78, time: "1 hour ago" },
    { id: 3, team: "Team Devopsify", lead: "Aditya Verma", challenge: "Optimized Container Orchestration", repo: "https://github.com/aditya-v/k8s-opt-scaler", testStatus: "Passing 8/8 Tests", coverage: 87, time: "Yesterday" }
  ]);

  // Input states
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newReward, setNewReward] = useState("₹50k Cash Prize + Interview Fast-Track");

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const newHack = {
      id: Date.now(),
      title: newTitle,
      teams: 0,
      status: "Just Launched",
      daysLeft: 14
    };
    addChallenge(newHack);
    onAction('TOAST', `Innovation challenge "${newTitle}" published successfully to student portal!`);
    setNewTitle("");
    setNewDesc("");
  };

  const handleTriggerEvaluation = (id, team) => {
    onAction('TOAST', `Re-spinning Docker evaluation container for Team ${team}...`);
    setTimeout(() => {
      onAction('TOAST', `Evaluation complete for Team ${team}. 100% assertions satisfied.`);
    }, 1500);
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Innovation Challenges &amp; Hackathons <Trophy className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Sponsor real-world coding problems, monitor live repositories, and evaluate container submissions automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Submissions & Hackathons List */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Hackathons cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Active Hackathons
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hackathons.map((hack) => (
                <div 
                  key={hack.id}
                  className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded-full ${
                        hack.status === 'Ongoing' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 
                        hack.status.includes('Launched') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}>
                        {hack.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {hack.daysLeft > 0 ? `${hack.daysLeft} days left` : 'Finished'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-xs leading-normal mb-2">{hack.title}</h4>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3 text-[10px] text-slate-400 font-semibold">
                    <span>Active Teams: <strong className="text-indigo-600 font-bold">{hack.teams} Teams</strong></span>
                    <button 
                      onClick={() => onAction('TOAST', `Loading console for ${hack.title}`)}
                      className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5"
                    >
                      Admin Panel →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submissions Sandbox Evaluator Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 px-1">
              <Terminal className="w-4 h-4 text-indigo-600" /> Real-Time Team Submissions &amp; Sandbox Evaluator
            </h3>

            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase bg-slate-50/50">
                      <th className="p-3 pl-4">Team &amp; Lead</th>
                      <th className="p-3">Challenge Area</th>
                      <th className="p-3">Repository</th>
                      <th className="p-3">Diagnostic Status</th>
                      <th className="p-3 text-right pr-4">Evaluator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-3 pl-4">
                          <div className="font-bold text-slate-900">{sub.team}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">Lead: {sub.lead}</div>
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] font-bold text-slate-600 leading-normal">{sub.challenge}</span>
                        </td>
                        <td className="p-3">
                          <a 
                            href={sub.repo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-0.5"
                          >
                            Git Repo <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            {sub.testStatus.includes('Passing') ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            )}
                            <span className={`font-bold text-[10px] ${
                              sub.testStatus.includes('Passing') ? 'text-emerald-700' : 'text-rose-700'
                            }`}>{sub.testStatus}</span>
                          </div>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Code Coverage: {sub.coverage}%</span>
                        </td>
                        <td className="p-3 text-right pr-4">
                          <button 
                            onClick={() => handleTriggerEvaluation(sub.id, sub.team)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 ml-auto shadow-sm active:scale-95 transition-all"
                          >
                            <Play className="w-2.5 h-2.5 fill-white" /> Evaluate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1/3): Create Innovation Challenge */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 px-1">
            <Plus className="w-4 h-4 text-indigo-600" /> Create Problem Statement
          </h3>

          <form onSubmit={handleCreateChallenge} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Challenge Title</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Distributed Ledger EHR System" 
                required
                className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Detailed Description</label>
              <textarea 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows="4"
                placeholder="Describe project criteria, API endpoints to mock, and automated unit test expectations..."
                required
                className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Prizes &amp; Incentives</label>
              <input 
                type="text" 
                value={newReward}
                onChange={(e) => setNewReward(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-indigo-500/10 active:scale-95 transition-all text-center"
            >
              Publish Hackathon Challenge
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default IndustryChallengesView;
