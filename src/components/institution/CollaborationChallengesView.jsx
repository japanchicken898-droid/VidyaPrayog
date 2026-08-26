import React from 'react';
import { Trophy, Award, CheckCircle, ExternalLink } from 'lucide-react';

const CollaborationChallengesView = ({ onAction }) => {
  const teams = [
    { id: 1, name: "NullPointer Hawks", lead: "Deepak B.", challenge: "SIH Internal Selection", score: "92/100", status: "Nominated" },
    { id: 2, name: "Bit Wizards", lead: "Priya Sharma", challenge: "SIH Internal Selection", score: "88/100", status: "Nominated" },
    { id: 3, name: "Team Devopsify", lead: "Aditya Verma", challenge: "MSME Idea Hackathon", score: "78/100", status: "In Review" }
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Hackathons Selection &amp; Management Desk <Trophy className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate internal selections for Smart India Hackathon (SIH) and regional MSME challenges, audit score cards, and log feedback.
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Submission Evaluations */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-indigo-600" /> SIH Selection Evaluation Board
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase bg-slate-50/50">
                  <th className="p-3 pl-4">Team Name &amp; Lead</th>
                  <th className="p-3">Challenge category</th>
                  <th className="p-3 text-center">Jury score</th>
                  <th className="p-3 text-right pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {teams.map((team) => (
                  <tr key={team.id} className="hover:bg-slate-50/50">
                    <td className="p-3 pl-4">
                      <div className="font-bold text-slate-900">{team.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">Lead: {team.lead}</div>
                    </td>
                    <td className="p-3">{team.challenge}</td>
                    <td className="p-3 text-center text-indigo-600 font-extrabold">{team.score}</td>
                    <td className="p-3 text-right pr-4">
                      <span className={`inline-block text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        team.status === 'Nominated' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {team.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1/3): Jury feedbacks log */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 px-1">
            <Award className="w-4 h-4 text-indigo-600" /> Jury Feedbacks &amp; Audit Logs
          </h3>

          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-3 text-left">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-[9px] font-bold text-indigo-600 uppercase">Team: NullPointer Hawks</span>
              <p className="text-[10px] text-slate-700 font-semibold leading-relaxed">
                &ldquo;Exceptional container telemetry dashboard. Proposal validated and nominated to National SIH portal.&rdquo;
              </p>
              <span className="text-[8px] text-slate-400 block pt-1">- Dr. R. Sundaram (Dean)</span>
            </div>

            <button 
              onClick={() => onAction('TOAST', "Accessing jury feedback console...")}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1 transition-all active:scale-95"
            >
              Jury Admin Console <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollaborationChallengesView;
