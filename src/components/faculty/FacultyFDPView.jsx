import React, { useState } from 'react';
import { Download, CheckCircle2, Calendar, FileText, Award, X, Eye, Loader2, Link2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FacultyFDPView = ({ triggerToast }) => {
  const { fdps } = useApp();
  const [ceuCredits, setCeuCredits] = useState(32);
  const [downloadingTranscript, setDownloadingTranscript] = useState(false);
  const [enrolledFdps, setEnrolledFdps] = useState({}); // { fdpId: boolean }
  const [activeEnrollments, setActiveEnrollments] = useState([]);
  
  // Modal states
  const [activeSyllabus, setActiveSyllabus] = useState(null); // fdp course object
  const [activeCertificate, setActiveCertificate] = useState(null); // cert object

  // fdps comes from global context — any new FDP posted by Institution syncs here
  const fdpsList = fdps;

  const certificates = [
    { title: "Cloud AI Developer Certification", date: "Aug 12, 2026", hash: "0x892a...c4b2", org: "Google Cloud", color: "emerald" },
    { title: "Quantum Computing Foundations", date: "Jul 28, 2026", hash: "0x3f1e...90d1", org: "IBM Research", color: "blue" },
    { title: "Data Science for Educators", date: "May 10, 2026", hash: "0x7a2c...11f8", org: "NPTEL", color: "purple" }
  ];

  const handleDownloadTranscript = () => {
    setDownloadingTranscript(true);
    setTimeout(() => {
      setDownloadingTranscript(false);
      triggerToast("Verified CEU Transcript (AY 2026-27) downloaded successfully.");
    }, 1800);
  };

  const handleRegisterFdp = (fdp) => {
    if (enrolledFdps[fdp.id]) return;
    
    setEnrolledFdps(prev => ({ ...prev, [fdp.id]: true }));
    setCeuCredits(prev => Math.min(prev + fdp.credits, 40));
    setActiveEnrollments(prev => [...prev, fdp]);
    triggerToast(`Nomination registered for FDP: ${fdp.title}`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Section */}
      <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Annual FDP &amp; Continuing Education Credits</h2>
          <div className="w-full bg-slate-100 h-3 rounded-full mb-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(ceuCredits / 40) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-600 font-semibold">
            <strong className="text-indigo-600">{ceuCredits} / 40</strong> CEU Credits Completed <span className="text-slate-400 font-normal">({Math.round((ceuCredits / 40) * 100)}% NIRF Alignment)</span>
          </p>
        </div>
        <button 
          onClick={handleDownloadTranscript}
          disabled={downloadingTranscript}
          className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-400 text-white font-semibold rounded-xl px-5 py-3 text-sm shadow-sm transition-colors w-fit shrink-0"
        >
          {downloadingTranscript ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download Verified CEU Transcript
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-indigo-500" />
              Upcoming Accredited FDP Programs
            </h3>
            <div className="space-y-4">
              {fdpsList.map((fdp) => {
                const isRegistered = enrolledFdps[fdp.id];
                return (
                  <div key={fdp.id} className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded tracking-wide mb-2 inline-block">
                        {fdp.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">+{fdp.credits} CEUs</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{fdp.title}</h4>
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                      <span className="font-semibold text-slate-700">{fdp.org}</span>
                      <span>{fdp.dates}</span>
                    </div>
                    <div className="flex gap-2">
                      {isRegistered ? (
                        <button 
                          disabled
                          className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg py-2 cursor-not-allowed"
                        >
                          ✓ Enrolled (Seat Confirmed)
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleRegisterFdp(fdp)}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2 text-xs transition-colors"
                        >
                          1-Click Registration
                        </button>
                      )}
                      <button 
                        onClick={() => setActiveSyllabus(fdp)}
                        className="flex items-center justify-center w-9 h-9 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                        title="Download Syllabus"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Active Enrollments Shelf */}
          {activeEnrollments.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Active Enrollments</h4>
              <div className="space-y-2">
                {activeEnrollments.map(enrol => (
                  <div key={enrol.id} className="flex items-center justify-between text-xs bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-xl">
                    <span className="font-semibold text-emerald-800 truncate">{enrol.title}</span>
                    <span className="text-[10px] text-emerald-600 font-bold shrink-0">{enrol.dates}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Completed FDP Certifications &amp; Badges
          </h3>
          <div className="space-y-4">
            {certificates.map((cert, i) => (
              <div 
                key={i} 
                onClick={() => setActiveCertificate(cert)}
                className="flex items-center gap-4 bg-slate-50 border border-slate-200/60 rounded-xl p-4 hover:border-indigo-300 hover:bg-white cursor-pointer transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    {cert.title}
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">Issued by: <strong className="text-slate-700">{cert.org}</strong> • {cert.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Hash Verified</span>
                  <code className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">{cert.hash}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Syllabus / Brochure Preview Modal ── */}
      {activeSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Syllabus &amp; Brochure Preview</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeSyllabus.org} • {activeSyllabus.title}</p>
              </div>
              <button onClick={() => setActiveSyllabus(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed mb-6">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" /> Syllabus Course Outline
              </h4>
              {activeSyllabus.syllabus}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveSyllabus(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  triggerToast(`Syllabus brochure for "${activeSyllabus.title}" downloaded.`);
                  setActiveSyllabus(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Blockchain Certificate Credential Modal ── */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />
            <div className="flex justify-end">
              <button onClick={() => setActiveCertificate(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-lg font-bold text-slate-800">{activeCertificate.title}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Verified Blockchain Credential</p>

            <div className="my-6 bg-slate-50 rounded-xl p-4 border border-slate-200/50 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Authority:</span>
                <strong className="text-slate-700">{activeCertificate.org}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Issued:</span>
                <strong className="text-slate-700">{activeCertificate.date}</strong>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 block mb-1">Decentralized IPFS Verification Hash:</span>
                <code className="bg-slate-200 text-slate-700 px-2 py-1 rounded block text-center font-bold break-all">{activeCertificate.hash}</code>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveCertificate(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  triggerToast(`Certificate PDF for "${activeCertificate.title}" downloaded.`);
                  setActiveCertificate(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyFDPView;
