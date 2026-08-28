import React, { useState } from 'react';
import { Download, CheckCircle2, Calendar, FileText, Award, X, Eye, Loader2, Link2, ExternalLink, Users, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


const FacultyFDPView = ({ triggerToast }) => {
  const { fdps } = useApp();
  const [ceuCredits, setCeuCredits] = useState(32);
  const [downloadingTranscript, setDownloadingTranscript] = useState(false);
  const [enrolledFdps, setEnrolledFdps] = useState({}); // { fdpId: boolean }
  const [activeEnrollments, setActiveEnrollments] = useState([]);
  const [seatCounts, setSeatCounts] = useState(() =>
    Object.fromEntries((fdps || []).map(f => [f.id, f.seats || 20]))
  );
  
  // Modal states
  const [activeSyllabus, setActiveSyllabus] = useState(null); // fdp course object
  const [activeCertificate, setActiveCertificate] = useState(null); // cert object
  const [activeCryptoCert, setActiveCryptoCert] = useState(null); // cryptographically detailed cert object

  // fdps comes from global context — any new FDP posted by Institution syncs here
  const fdpsList = fdps;

  const certificates = [
    { 
      title: "Cloud AI Developer Certification", 
      date: "Aug 12, 2026", 
      hash: "0x892a...c4b2", 
      org: "Google Cloud", 
      color: "emerald",
      network: "Polygon PoS Testnet (Amoy)",
      blockHeight: "14,892,104",
      contractAddress: "0x7F92a1C54F102B41364F34A9Db361B8c7407c4b2",
      ipfsHash: "QmYwAPJzv5CZ1Aea3r3F4bXb7N2bXb7N2bXb7N2bXb7N",
      issuerKey: "0x3017a421bF126bE2E40176D0aE70bc4892c90f23",
      explorerUrl: "https://amoy.polygonscan.com/address/0x7F92a1C54F102B41364F34A9Db361B8c7407c4b2"
    },
    { 
      title: "Quantum Computing Foundations", 
      date: "Jul 28, 2026", 
      hash: "0x3f1e...90d1", 
      org: "IBM Research", 
      color: "blue",
      network: "Ethereum Sepolia Testnet",
      blockHeight: "6,728,901",
      contractAddress: "0x3f1e9B64Fa34a9b36214B8c7407c4b24892c40d1",
      ipfsHash: "QmZ3K9A3X9A3X9A3X9A3X9A3X9A3X9A3X9A3X9A3X9A3X",
      issuerKey: "0x7c4b23f1e90d17a2c11f8fd6e82a90d17a2c11",
      explorerUrl: "https://sepolia.etherscan.io/address/0x3f1e9B64Fa34a9b36214B8c7407c4b24892c40d1"
    },
    { 
      title: "Data Science for Educators", 
      date: "May 10, 2026", 
      hash: "0x7a2c...11f8", 
      org: "NPTEL", 
      color: "purple",
      network: "Polygon PoS Testnet (Amoy)",
      blockHeight: "14,510,802",
      contractAddress: "0x7a2c11f8fd6e82a90d17a2c11f8fd6e82a9b2c40",
      ipfsHash: "QmX8B7C2B7C2B7C2B7C2B7C2B7C2B7C2B7C2B7C2B7C2B",
      issuerKey: "0x11f8fd6e82a90d17a2c11f8fd6e82a90d17a2c11",
      explorerUrl: "https://amoy.polygonscan.com/address/0x7a2c11f8fd6e82a90d17a2c11f8fd6e82a9b2c40"
    }
  ];

  const handleDownloadTranscript = () => {
    setDownloadingTranscript(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // Top Accent Color Bar
        doc.setFillColor(79, 70, 229); // Indigo
        doc.rect(0, 0, 210, 8, 'F');

        // Header Title
        doc.setTextColor(30, 41, 59); // Slate 800
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("VidyaPrayog", 20, 22);

        doc.setFontSize(8);
        doc.setTextColor(79, 70, 229); // Indigo
        doc.text("AI-DRIVEN INDUSTRY READINESS & ACCREDITATION PLATFORM", 20, 27);

        doc.setDrawColor(226, 232, 240); // Slate 200
        doc.setLineWidth(0.5);
        doc.line(20, 32, 190, 32);

        // Document Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        doc.text("Official CEU Transcript & Faculty Certification Report", 20, 42);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text("Academic Year: 2026-2027", 20, 47);

        // Faculty Details Section (styled box)
        doc.setFillColor(248, 250, 252); // slate 50
        doc.rect(20, 53, 170, 30, 'F');
        doc.setDrawColor(226, 232, 240); // slate 200
        doc.rect(20, 53, 170, 30, 'S');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(79, 70, 229); // Indigo
        doc.text("FACULTY DETAILS", 25, 60);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text("Name:", 25, 68);
        doc.setFont("helvetica", "normal");
        doc.text("Ms. Renugadevi R", 55, 68);

        doc.setFont("helvetica", "bold");
        doc.text("Designation:", 25, 75);
        doc.setFont("helvetica", "normal");
        doc.text("Assistant Professor", 55, 75);

        doc.setFont("helvetica", "bold");
        doc.text("Department:", 110, 68);
        doc.setFont("helvetica", "normal");
        doc.text("Information Technology", 135, 68);

        doc.setFont("helvetica", "bold");
        doc.text("Institution:", 110, 75);
        doc.setFont("helvetica", "normal");
        doc.text("VidyaPrayog Institute of Tech", 135, 75);

        // Progress Summary (styled box)
        doc.setFillColor(239, 246, 255); // blue 50
        doc.rect(20, 90, 170, 18, 'F');
        doc.setDrawColor(191, 219, 254); // blue 200
        doc.rect(20, 90, 170, 18, 'S');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(29, 78, 216); // blue 700
        doc.text("CONTINUING EDUCATION UNIT (CEU) SUMMARY", 25, 96);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(`Completed Credits: `, 25, 103);
        doc.setFont("helvetica", "bold");
        doc.text(`${ceuCredits} / 40 CEU Credits`, 57, 103);

        doc.setFont("helvetica", "normal");
        doc.text("Accreditation Status:", 110, 103);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(16, 185, 129); // emerald 500
        doc.text(`${Math.round((ceuCredits / 40) * 100)}% NIRF Alignment`, 143, 103);

        // Table Section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text("VERIFIED CERTIFICATIONS & ACCREDITED PROGRAMS", 20, 118);

        const tableHeaders = [["Course / Certification", "Issuing Authority", "Date Issued", "Verification Hash", "Status"]];
        const tableData = certificates.map(cert => [
          cert.title,
          cert.org,
          cert.date,
          cert.hash,
          "Verified"
        ]);

        autoTable(doc, {
          startY: 122,
          head: tableHeaders,
          body: tableData,
          theme: 'grid',
          headStyles: {
            fillColor: [79, 70, 229], // Indigo
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 9,
            halign: 'left'
          },
          bodyStyles: {
            fontSize: 8.5,
            textColor: [51, 65, 85] // slate 700
          },
          columnStyles: {
            0: { cellWidth: 55 },
            1: { cellWidth: 32 },
            2: { cellWidth: 25 },
            3: { cellWidth: 30, fontStyle: 'italic' },
            4: { cellWidth: 28, fontStyle: 'bold', textColor: [16, 185, 129] } // Emerald Verified
          },
          margin: { left: 20, right: 20 },
          styles: {
            overflow: 'linebreak',
            cellPadding: 4
          }
        });

        const finalY = doc.lastAutoTable.finalY || 180;

        // Footer Section
        const footerY = Math.max(finalY + 15, 200);

        doc.setDrawColor(226, 232, 240); // slate 200
        doc.setLineWidth(0.5);
        doc.line(20, footerY, 190, footerY);

        // Cryptographic Badge Representation
        doc.setFillColor(240, 253, 250); // teal 50
        doc.rect(20, footerY + 5, 80, 22, 'F');
        doc.setDrawColor(153, 246, 228); // teal 200
        doc.rect(20, footerY + 5, 80, 22, 'S');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(13, 148, 136); // teal 600
        doc.text("SECURE BLOCKCHAIN LEDGER VERIFIED", 25, footerY + 11);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(71, 85, 105); // slate 600
        doc.text(`Hash: 0x892ac4b23f1e90d17a2c11f8fd6e82a9`, 25, footerY + 17);
        doc.text(`System ID: VP-ACAD-2026-FDP`, 25, footerY + 22);

        // Generation Info & Date
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text("DIGITALLY SIGNED & SIGNATURE VERIFIED", 115, footerY + 11);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 115, footerY + 17);
        doc.text("VidyaPrayog Institutional Academic Office", 115, footerY + 22);

        // Bottom decorative bar
        doc.setFillColor(15, 23, 42); // Dark slate
        doc.rect(0, 289, 210, 8, 'F');

        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Verified_CEU_Transcript_Renugadevi_R.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        triggerToast("Verified CEU Transcript (AY 2026-27) downloaded successfully.");
      } catch (error) {
        console.error("Error generating PDF:", error);
        triggerToast("Failed to generate PDF Transcript.");
      } finally {
        setDownloadingTranscript(false);
      }
    }, 800);
  };


  const handleRegisterFdp = (fdp) => {
    if (enrolledFdps[fdp.id]) return;
    setEnrolledFdps(prev => ({ ...prev, [fdp.id]: true }));
    setCeuCredits(prev => Math.min(prev + fdp.credits, 40));
    setActiveEnrollments(prev => [...prev, fdp]);
    setSeatCounts(prev => ({ ...prev, [fdp.id]: Math.max((prev[fdp.id] || 1) - 1, 0) }));
    triggerToast(`✓ Registered for "${fdp.title}" — +${fdp.credits} CEU credits projected!`);
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
                const seats = seatCounts[fdp.id] ?? (fdp.seats || 20);
                return (
                  <div key={fdp.id} className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded tracking-wide inline-block">
                        {fdp.type}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600">+{fdp.credits} CEUs</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{fdp.title}</h4>
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">{fdp.org}</span>
                      <span>{fdp.dates}</span>
                    </div>
                    {/* Seat count indicator */}
                    <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-slate-500">
                      <Users className="w-3 h-3" />
                      <span className={seats <= 5 ? 'text-red-500' : 'text-slate-500'}>
                        {seats} seat{seats !== 1 ? 's' : ''} remaining
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {isRegistered ? (
                        <button
                          disabled
                          className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg py-2 cursor-not-allowed flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Registered ✓ (+{fdp.credits} CEU projected)
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegisterFdp(fdp)}
                          disabled={seats === 0}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2 text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          {seats === 0 ? 'Seats Full' : '1-Click Registration'}
                        </button>
                      )}
                      <button
                        onClick={() => setActiveSyllabus(fdp)}
                        className="flex items-center justify-center w-9 h-9 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors relative group/syl"
                        title="View Syllabus"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="pointer-events-none absolute bottom-full mb-1.5 right-0 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded opacity-0 group-hover/syl:opacity-100 transition-opacity whitespace-nowrap z-20">View Syllabus</span>
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
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCryptoCert(cert);
                    }}
                    className="text-[9px] font-bold text-slate-500 hover:text-indigo-600 uppercase block mb-1 hover:underline cursor-pointer"
                  >
                    Hash Verified ↗
                  </span>
                  <code 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCryptoCert(cert);
                    }}
                    className="text-[10px] bg-slate-200 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 px-1.5 py-0.5 rounded transition-all cursor-pointer"
                  >
                    {cert.hash}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Syllabus / Brochure Preview Modal ── */}
      {activeSyllabus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl shadow-2xl relative animate-fade-in flex flex-col max-h-[88vh]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl" />
            <div className="flex justify-between items-start p-6 pb-4 shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-800">Syllabus & Speaker Preview</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{activeSyllabus.org} · {activeSyllabus.dates}</p>
              </div>
              <button onClick={() => setActiveSyllabus(null)} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4" /></button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 pb-4 space-y-5">
              {/* Module List */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" /> Course Modules
                </h4>
                <div className="space-y-2">
                  {(activeSyllabus.syllabusContent?.modules || []).map((mod, i) => (
                    <div key={i} className="flex gap-3 bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                      <div className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-1 whitespace-nowrap h-fit mt-0.5">{mod.week}</div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 mb-0.5">{mod.topic}</p>
                        <p className="text-[11px] text-slate-500 leading-snug">{mod.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              {activeSyllabus.syllabusContent?.speakers?.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-500" /> Expert Speakers
                  </h4>
                  <div className="space-y-2">
                    {activeSyllabus.syllabusContent.speakers.map((sp, i) => (
                      <div key={i} className="flex items-start gap-3 bg-purple-50/40 border border-purple-100 rounded-xl p-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                          {sp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{sp.name}</p>
                          <p className="text-[10px] text-purple-700 font-semibold">{sp.role}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{sp.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-slate-100 shrink-0">
              <button onClick={() => setActiveSyllabus(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Close</button>
              <button
                onClick={() => { triggerToast(`Syllabus brochure for "${activeSyllabus.title}" downloaded.`); setActiveSyllabus(null); }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download Brochure PDF
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

      {/* ── Sleek Cryptographic Blockchain Verification Modal ── */}
      {activeCryptoCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in text-left">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700/60 text-slate-200 rounded-2xl p-6 shadow-2xl relative">
            {/* Futuristic accent header */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 rounded-t-2xl" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight">On-Chain Cryptographic Proof</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{activeCryptoCert.title}</p>
                </div>
              </div>
              <button onClick={() => setActiveCryptoCert(null)} className="text-slate-400 hover:text-white p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cryptographic Grid */}
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Network</span>
                  <span className="text-cyan-400 font-bold">{activeCryptoCert.network}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Block Height</span>
                  <span className="text-indigo-400 font-bold">{activeCryptoCert.blockHeight}</span>
                </div>
              </div>

              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Contract Address</span>
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 mt-1">
                    <code className="text-emerald-400 break-all text-[10px]">{activeCryptoCert.contractAddress}</code>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Decentralized IPFS Hash</span>
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 mt-1">
                    <code className="text-teal-400 break-all text-[10px]">{activeCryptoCert.ipfsHash}</code>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Issuer Public Key</span>
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 mt-1">
                    <code className="text-slate-300 break-all text-[10px]">{activeCryptoCert.issuerKey}</code>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-800/30 p-3.5 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-[10px] text-emerald-400 leading-normal">
                  This credential was cryptographically signed by the issuing authority and verified on the public ledger. The integrity of this block is maintained by independent validators.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setActiveCryptoCert(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  triggerToast("Redirecting to Blockchain Explorer sandbox...");
                  window.open(activeCryptoCert.explorerUrl, "_blank");
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-xs font-bold text-white shadow-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Verify on Explorer <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyFDPView;
