import React, { useState } from 'react';
import { Network, Database, Cpu, Globe2, Link as LinkIcon, Mail, X, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';

const FacultyCollaborationView = ({ triggerToast }) => {
  const [labResources, setLabResources] = useState([
    { id: 1, name: "High-Performance GPU Cluster", details: "4x NVIDIA A100 Nodes • Dept of CSE", status: "Available" },
    { id: 2, name: "Industrial IoT Testbed", details: "LoRaWAN & Zigbee • Dept of ECE", status: "In Use (Available 14th)" },
    { id: 3, name: "Nano-Fabrication Cleanroom", details: "Class 100 • Central Facility", status: "Available" }
  ]);

  const [capstones, setCapstones] = useState([
    { id: 1, depts: ["IT Dept", "Mechanical"], title: "IoT Enabled Smart Manufacturing", desc: "Seeking IT faculty co-guide for networking stack of mechanical sensory arrays.", joined: false },
    { id: 2, depts: ["CSE Dept", "BioTech"], title: "AI Crop Diagnostics", desc: "Computer vision models applied to spectral images of cash crops.", joined: false }
  ]);

  // Modal states
  const [bookingLab, setBookingLab] = useState(null); // resource object
  const [joiningCapstone, setJoiningCapstone] = useState(null); // capstone object
  const [expressingInterestNetwork, setExpressingInterestNetwork] = useState(null); // network object

  // Form states
  const [bookingDate, setBookingDate] = useState('2026-09-01');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [capstoneSop, setCapstoneSop] = useState('');
  
  // IPFS network simulation state
  const [joinedNetwork, setJoinedNetwork] = useState({}); // { id: boolean }

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    triggerToast(`Lab booking confirmed for "${bookingLab.name}" on ${bookingDate} at ${bookingTime}.`);
    
    // Update local status to booked/reserved
    setLabResources(prev => prev.map(res => 
      res.id === bookingLab.id ? { ...res, status: `Reserved (${bookingDate})` } : res
    ));
    setBookingLab(null);
  };

  const handleConfirmJoin = (e) => {
    e.preventDefault();
    setCapstones(prev => prev.map(cap => 
      cap.id === joiningCapstone.id ? { ...cap, joined: true } : cap
    ));
    triggerToast(`Request to join "${joiningCapstone.title}" sent successfully!`);
    setJoiningCapstone(null);
    setCapstoneSop('');
  };

  const handleConfirmInterest = (netId, title) => {
    setJoinedNetwork(prev => ({ ...prev, [netId]: true }));
    triggerToast(`Interest expressed for "${title}" joint initiative.`);
    setExpressingInterestNetwork(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Multi-Institution &amp; Department Network</h2>
          <p className="text-indigo-200 text-sm max-w-xl">Break down academic silos. Discover interdisciplinary capstone teams, share high-end lab hardware, and connect with global research networks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Section 1: Interdisciplinary Capstones */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 leading-tight">Cross-Department Interdisciplinary Capstones</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            {capstones.map(cap => (
              <div key={cap.id} className="p-4 border border-slate-200/80 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">{cap.depts[0]}</span>
                  <span className="text-[10px] text-slate-400">+</span>
                  <span className="text-[9px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">{cap.depts[1]}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{cap.title}</h4>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{cap.desc}</p>
                {cap.joined ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Request Sent (Awaiting Approval)
                  </span>
                ) : (
                  <button 
                    onClick={() => setJoiningCapstone(cap)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> Join Capstone Project
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Lab & Hardware Sharing */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 leading-tight">Institutional Lab &amp; Hardware Sharing</h3>
          </div>

          <div className="space-y-4 flex-1">
            {labResources.map(res => (
              <div key={res.id} className="flex items-start justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{res.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{res.details}</p>
                  <div className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded inline-block ${
                    res.status.includes('Available') 
                      ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' 
                      : res.status.includes('Reserved') 
                      ? 'text-indigo-600 bg-indigo-50 border border-indigo-100'
                      : 'text-amber-600 bg-amber-50 border border-amber-100'
                  }`}>
                    {res.status}
                  </div>
                </div>
                <button 
                  onClick={() => setBookingLab(res)}
                  disabled={res.status.includes('Reserved')}
                  className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  Book Slot
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Global Network */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:col-span-2 xl:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 leading-tight">Global Academic Research Network</h3>
          </div>

          <div className="space-y-4 flex-1">
            {[
              { id: 1, title: "Sustainable Grid Consortium", org: "TU Munich", desc: "TU Munich seeking Indian partner institute for joint DAAD proposal in renewable energy integration." },
              { id: 2, title: "Quantum Safe Crypto Lab", org: "University of Waterloo", desc: "University of Waterloo looking to establish a federated testing node." }
            ].map(net => {
              const hasExpressed = joinedNetwork[net.id];
              return (
                <div key={net.id} className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-2 block">{net.org}</span>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{net.title}</h4>
                  <p className="text-xs text-slate-600 mb-3">{net.desc}</p>
                  {hasExpressed ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Expressed Interest
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleConfirmInterest(net.id, net.title)}
                      className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" /> Express Interest
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Interactive Lab Booking Scheduler Modal ── */}
      {bookingLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Book Lab Resource Slot</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{bookingLab.name}</p>
              </div>
              <button onClick={() => setBookingLab(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Reservation Date</label>
                <input 
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Time Window Slot</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                  <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingLab(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm animate-none"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Join Capstone Project Team Modal ── */}
      {joiningCapstone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Join Capstone Team</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{joiningCapstone.title}</p>
              </div>
              <button onClick={() => setJoiningCapstone(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmJoin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Statement of Purpose / Research Alignment</label>
                <textarea
                  required
                  rows="3"
                  value={capstoneSop}
                  onChange={(e) => setCapstoneSop(e.target.value)}
                  placeholder="Describe your research area and how you can support this interdisciplinary team..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setJoiningCapstone(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm"
                >
                  Confirm Joining
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyCollaborationView;
