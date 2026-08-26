import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  User, 
  Video, 
  Plus, 
  Check, 
  X, 
  Sparkles,
  BookOpen
} from 'lucide-react';

const IndustryMentorshipView = ({ onAction }) => {
  // Slots hosted by Acme Tech Labs mentors
  const [mentorSlots, setMentorSlots] = useState([
    { id: 1, mentor: "Arvind Swaminathan (CTO)", topic: "System Design Review", date: "August 28, 2026", time: "10:00 AM - 11:00 AM", status: "Booked" },
    { id: 2, mentor: "Nisha Patel (Lead Architect)", topic: "Mock Technical Interview", date: "August 28, 2026", time: "02:00 PM - 03:00 PM", status: "Available" },
    { id: 3, mentor: "David Miller (Principal PM)", topic: "Resume Roast & Profile Audit", date: "August 31, 2026", time: "11:00 AM - 12:00 PM", status: "Available" }
  ]);

  // Student requests
  const [requests, setRequests] = useState([
    { id: 1, student: "Deepak B.", topic: "System Design Review (AWS Microservices)", slotId: 1, date: "August 28, 10:00 AM", note: "Preparing for full-stack interview at TCS. Need feedback on load-balancer design.", status: "Pending" },
    { id: 2, student: "Priya Sharma", topic: "Mock Technical Interview (Python/PyTorch)", slotId: null, date: "August 29, 04:00 PM", note: "Working on model hosting pipelines. Need a mock assessment on ML scaling.", status: "Pending" }
  ]);

  const [newMentor, setNewMentor] = useState("");
  const [newTopic, setNewTopic] = useState("Mock Technical Interview");
  const [newDate, setNewDate] = useState("August 30, 2026");
  const [newTime, setNewTime] = useState("10:00 AM - 11:00 AM");

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newMentor) return;
    const newSlot = {
      id: mentorSlots.length + 1,
      mentor: newMentor,
      topic: newTopic,
      date: newDate,
      time: newTime,
      status: "Available"
    };
    setMentorSlots([...mentorSlots, newSlot]);
    onAction('TOAST', `New slot successfully created for ${newMentor}!`);
    setNewMentor("");
  };

  const handleConfirmRequest = (id, student) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Confirmed" } : r));
    onAction('TOAST', `Mentorship slot confirmed for ${student}. Notification sent!`);
  };

  const handleRejectRequest = (id, student) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    onAction('TOAST', `Declined mentorship request from ${student}.`);
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 animate-fade-in text-slate-800">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Mentorship &amp; Mock Interview Center <BookOpen className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Schedule proctored mock tech rounds, host resume reviews, and manage matching mentoring sessions.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Slot Scheduler & Booked Sessions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Calendar List */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 px-1">
              <Calendar className="w-4 h-4 text-indigo-600" /> Active Slots &amp; Appointments
            </h3>

            <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 divide-y divide-slate-100">
              {mentorSlots.map((slot) => (
                <div key={slot.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{slot.mentor}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{slot.topic}</p>
                      
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {slot.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {slot.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      slot.status === 'Booked' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {slot.status}
                    </span>

                    {slot.status === 'Booked' && (
                      <button 
                        onClick={() => onAction('TOAST', "Launching VidyaPrayog Video Workspace Sandbox...")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md shadow-indigo-500/10 flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Video className="w-3.5 h-3.5" /> Launch Meet
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Mentor Slot Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 px-1">
              <Plus className="w-4 h-4 text-indigo-600" /> Host a New Slot
            </h3>

            <form onSubmit={handleAddSlot} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Mentor Name</label>
                <input 
                  type="text" 
                  value={newMentor}
                  onChange={(e) => setNewMentor(e.target.value)}
                  placeholder="e.g. Nisha Patel (Lead Architect)" 
                  required
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Mentoring Topic</label>
                <select 
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-700 focus:outline-none"
                >
                  <option>Mock Technical Interview</option>
                  <option>Resume Roast & Profile Audit</option>
                  <option>System Design Review</option>
                  <option>Cloud Infrastructure Q&amp;A</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Date</label>
                <input 
                  type="text" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. August 30, 2026" 
                  required
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Time Interval</label>
                <input 
                  type="text" 
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="e.g. 10:00 AM - 11:00 AM" 
                  required
                  className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button 
                type="submit"
                className="sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-indigo-500/10 active:scale-95 transition-all text-center"
              >
                Create Slot Invitation
              </button>
            </form>
          </div>

        </div>

        {/* Right Column (1/3): Active Student Requests */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 px-1">
            <MessageSquare className="w-4 h-4 text-indigo-600" /> Pending Student Requests
          </h3>

          <div className="space-y-4">
            {requests.map((req) => (
              <div 
                key={req.id} 
                className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      {req.topic}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs mt-2">{req.student}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{req.date}</p>
                  </div>

                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                    req.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  &ldquo;{req.note}&rdquo;
                </p>

                {req.status === 'Pending' && (
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleConfirmRequest(req.id, req.student)}
                      className="flex-1 py-1.5 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1 transition-all active:scale-95"
                    >
                      <Check className="w-3 h-3" /> Approve Slot
                    </button>
                    <button 
                      onClick={() => handleRejectRequest(req.id, req.student)}
                      className="py-1.5 px-3 text-[10px] font-bold border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-all active:scale-95"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndustryMentorshipView;
