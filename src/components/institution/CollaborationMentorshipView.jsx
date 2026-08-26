import React, { useState, useCallback } from 'react';
import { Calendar, UserPlus, Building, Mail, X, CheckCircle, ChevronDown, Clock, BookOpen } from 'lucide-react';

const STUDENTS = [
  'Deepak B. (B.Tech IT - 111725203017)',
  'Priya Sharma (B.Tech CSE - 111725203042)',
  'Aditya Verma (B.Tech ECE - 111725203005)',
  'Ananya Iyer (M.Tech AI & DS - 111725208002)'
];

const SESSION_TYPES = [
  '1-on-1 Technical Mock Interview',
  '1-on-1 Portfolio Review',
  'System Design Coaching',
  'Resume Optimization Clinic'
];

const CollaborationMentorshipView = ({ onAction }) => {
  // Required states exactly as specified in the prompt
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Arvind Swaminathan',
      role: 'Principal Cloud Architect at Acme Tech Labs',
      badge: "Alumni Class of '18",
      avatar: 'AS',
      openSlots: 3,
    },
    {
      id: 2,
      name: 'Nisha Patel',
      role: 'Lead DevOps Engineer at TCS Cloud Division',
      badge: 'Corporate Volunteer',
      avatar: 'NP',
      openSlots: 1,
    },
    {
      id: 3,
      name: 'Suresh Pillai',
      role: 'Senior Developer at Google Developers',
      badge: "Alumni Class of '20",
      avatar: 'SP',
      openSlots: 0,
    },
  ]);

  const [sessions, setSessions] = useState([
    {
      id: 101,
      type: '1-on-1 Portfolio Review',
      studentName: 'Deepak B. (B.Tech IT)',
      mentorName: 'Arvind Swaminathan',
      dateTime: 'August 28, 10:00 AM',
      roomLink: '#',
    },
    {
      id: 102,
      type: 'Technical System Mock',
      studentName: 'Priya Sharma (B.Tech CSE)',
      mentorName: 'Nisha Patel',
      dateTime: 'August 29, 02:00 PM',
      roomLink: '#',
    },
  ]);

  const [activePairingMentor, setActivePairingMentor] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('Deepak B. (B.Tech IT - 111725203017)');
  const [sessionType, setSessionType] = useState('1-on-1 Technical Mock Interview');
  const [scheduledDate, setScheduledDate] = useState('2026-08-30');
  const [scheduledTime, setScheduledTime] = useState('11:00 AM');

  // Local Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, color = 'indigo') => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3600);
  }, []);

  const handleOpenPairing = (mentor) => {
    if (mentor.openSlots <= 0) {
      showToast(`${mentor.name} has no open slots available.`, 'rose');
      return;
    }
    setActivePairingMentor(mentor);
    setSelectedStudent(STUDENTS[0]);
    setSessionType(SESSION_TYPES[0]);
    setScheduledDate('2026-08-30');
    setScheduledTime('11:00 AM');
  };

  const handleConfirmPairing = () => {
    if (!activePairingMentor) return;

    // 1. Decrement the mentor's open slots
    setMentors(prevMentors =>
      prevMentors.map(m =>
        m.id === activePairingMentor.id
          ? { ...m, openSlots: Math.max(0, m.openSlots - 1) }
          : m
      )
    );

    // 2. Format the Date and Time representation
    // Convert 2026-08-30 to "August 30"
    const dateObj = new Date(scheduledDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateFormatted = !isNaN(dateObj.getTime())
      ? `${months[dateObj.getMonth()]} ${dateObj.getDate()}`
      : scheduledDate;

    const sessionDateTime = `${dateFormatted}, ${scheduledTime}`;

    // Clean student name for display (strip Roll ID if present)
    const displayStudentName = selectedStudent.split(' - ')[0];

    const newSession = {
      id: Date.now(),
      type: sessionType,
      studentName: displayStudentName,
      mentorName: activePairingMentor.name,
      dateTime: sessionDateTime,
      roomLink: '#',
    };

    // 3. Append the new pairing to scheduled sessions
    setSessions(prevSessions => [...prevSessions, newSession]);

    // 4. Show success toast and close modal
    showToast(`Successfully paired ${displayStudentName} with ${activePairingMentor.name}!`, 'emerald');
    if (onAction) {
      onAction('TOAST', `Paired ${displayStudentName} with ${activePairingMentor.name}`);
    }
    setActivePairingMentor(null);
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 animate-fade-in text-slate-800">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold text-white animate-fade-in ${
          toast.color === 'emerald' ? 'bg-emerald-600' :
          toast.color === 'rose'    ? 'bg-rose-600'    : 'bg-indigo-600'
        }`}>
          <CheckCircle className="w-4 h-4" />
          {toast.msg}
        </div>
      )}

      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Alumni &amp; Industry Mentor Pairing Hub <Calendar className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate mentoring programs, manage active pairing logs, and view scheduled mock slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Mentor Directory */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-indigo-600" /> Mentor Directory
          </h3>

          <div className="divide-y divide-slate-100">
            {mentors.map((men) => (
              <div key={men.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-xs uppercase">
                    {men.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      {men.name}
                      <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">
                        {men.badge}
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{men.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    men.openSlots > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-100'
                  }`}>
                    {men.openSlots > 0 ? `${men.openSlots} Open Slots` : 'Fully Booked'}
                  </span>
                  
                  {men.openSlots > 0 ? (
                    <button 
                      onClick={() => handleOpenPairing(men)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-xl shadow-md shadow-indigo-500/10 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <UserPlus className="w-3 h-3" /> Pair Student
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="bg-slate-100 text-slate-400 text-[9px] font-bold px-3 py-1.5 rounded-xl border border-slate-200 cursor-not-allowed flex items-center gap-1"
                    >
                      <UserPlus className="w-3 h-3 text-slate-300" /> Booked Up
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Active Session Schedule */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 px-1">
            <Calendar className="w-4 h-4 text-indigo-600" /> Active Session Schedule
          </h3>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {sessions.map((ses) => (
              <div 
                key={ses.id}
                className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-4 space-y-2 text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                    {ses.type}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-xs mt-2">{ses.studentName}</h4>
                <p className="text-[10px] text-slate-400 font-semibold">Mentor: {ses.mentorName}</p>
                <div className="flex justify-between items-center pt-2 text-[10px] text-slate-500 font-semibold border-t border-slate-50">
                  <span>{ses.dateTime}</span>
                  <button 
                    onClick={() => {
                      if (onAction) onAction('TOAST', `Opening proctored meeting room...`);
                      showToast(`Opening meeting room for ${ses.studentName}`, 'indigo');
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-bold"
                  >
                    Enter Room →
                  </button>
                </div>
              </div>
            ))}

            {sessions.length === 0 && (
              <div className="p-8 text-center text-slate-400 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-2xl">
                No active mentorship sessions scheduled.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Student Pairing Modal ─────────────────────────────────────── */}
      {activePairingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setActivePairingMentor(null)} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in text-left">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4" /> Pair Student with Mentor
                </h3>
                <p className="text-[10px] text-indigo-200 mt-0.5 leading-snug">
                  Mentor: {activePairingMentor.name} ({activePairingMentor.openSlots} open slots left)
                </p>
              </div>
              <button onClick={() => setActivePairingMentor(null)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Select Student Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Select Student
                </label>
                <div className="relative">
                  <select
                    value={selectedStudent}
                    onChange={e => setSelectedStudent(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Session Topic Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Session Topic / Type
                </label>
                <div className="relative">
                  <select
                    value={sessionType}
                    onChange={e => setSessionType(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {SESSION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> Time
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={e => setScheduledTime(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Pairing Preview */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl px-4 py-3.5 text-xs space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block">Pairing Review</span>
                <p className="font-extrabold text-slate-800 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  {sessionType}
                </p>
                <p className="text-slate-600 font-semibold">
                  Student: <strong className="text-slate-800">{selectedStudent.split(' - ')[0]}</strong>
                </p>
                <p className="text-slate-500">
                  Scheduled for {scheduledDate} at {scheduledTime}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setActivePairingMentor(null)}
                className="flex-1 py-2.5 text-xs font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPairing}
                className="flex-1 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Confirm Pairing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CollaborationMentorshipView;
