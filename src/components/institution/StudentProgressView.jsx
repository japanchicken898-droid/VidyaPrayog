import React, { useState } from 'react';
import { Users, Search, Award, ExternalLink } from 'lucide-react';

const StudentProgressView = ({ deptFilter, onAction }) => {
  // Mock student roster
  const allStudents = [
    { id: 1, roll: "22IT014", name: "Deepak B.", dept: "IT", match: 94, badges: ["Frontend Expert", "Docker Capstone", "DSA Adv"] },
    { id: 2, roll: "22CS089", name: "Priya Sharma", dept: "CSE", match: 92, badges: ["Python Core", "SIH Finalist"] },
    { id: 3, roll: "22IT045", name: "Aditya Verma", dept: "IT", match: 87, badges: ["Docker Master", "AWS Cloud"] },
    { id: 4, roll: "22CS102", name: "Ananya Iyer", dept: "CSE", match: 81, badges: ["React Native", "SQL Basics"] },
    { id: 5, roll: "22EC056", name: "Rahul Nair", dept: "ECE", match: 78, badges: ["Embedded C", "IoT Protocols"] }
  ];

  const [search, setSearch] = useState("");

  const filteredStudents = allStudents.filter(student => {
    if (deptFilter !== 'All' && student.dept !== deptFilter) return false;
    if (search && !student.name.toLowerCase().includes(search.toLowerCase()) && !student.roll.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Student Progress &amp; Cohort Tracker <Users className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor individual student competencies, search cohort registry, and run detailed academic readiness audits.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Search student roll no or name..."
            type="text"
          />
        </div>

        <span className="text-[10px] text-slate-400 font-semibold bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
          Showing <strong>{filteredStudents.length}</strong> students
        </span>
      </div>

      {/* Students Table */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase bg-slate-50/50">
                <th className="p-3 pl-4">Roll No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Department</th>
                <th className="p-3 text-center">Industry Readiness Match</th>
                <th className="p-3">Verified Badges</th>
                <th className="p-3 text-right pr-4">Academic Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50">
                  <td className="p-3 pl-4 font-bold text-slate-900">{student.roll}</td>
                  <td className="p-3 font-bold text-slate-800">{student.name}</td>
                  <td className="p-3">{student.dept}</td>
                  <td className="p-3 text-center">
                    <span className="inline-block text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      {student.match}% Match
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {student.badges.map((badge, i) => (
                        <span key={i} className="px-2 py-0.5 text-[8.5px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5" /> {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right pr-4">
                    <button 
                      onClick={() => onAction('AUDIT', student)}
                      className="px-2.5 py-1.5 text-[9px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-0.5 ml-auto shadow-sm active:scale-95 transition-all"
                    >
                      Detailed Audit <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressView;
