import React, { useState } from 'react';
import { BookOpen, FileText, Activity, Coins, FileEdit, Users, UploadCloud, Plus, X, ArrowRight, ArrowLeft, Send, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

const RESEARCH_PAPERS = [
  {
    id: 'IEEE-11621571',
    title: 'Implement the Internet of Things (IoT) and Cloud Computing into Monitoring Platform Design for Scalable Analytics',
    conference: 'IEEE 6th International Conference (2026)',
    publisher: 'IEEE Xplore',
    doiUrl: 'https://ieeexplore.ieee.org/abstract/document/11621571',
    authors: 'S. Sujanthi, Hebatullah Awwad, Akila Venkatraman, Vikas Verma, Renugadevi R, S Aswini',
    status: 'PUBLISHED',
    statusColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    tags: ['IoT', 'Cloud Computing', 'Edge Processing', 'Scalable Analytics'],
    abstract: 'Internet of Things (IoT) and cloud computing have seen increased adoption due to the necessity for real-time monitoring and the fast expansion of linked devices. When it comes to big sensor data sets, traditional monitoring methods fall short in terms of scalability, data processing, and storage. A scalable platform for collecting, processing, and analyzing data is being developed in this project through the use of cloud computing and Internet of Things (IoT) devices. Edge processing filters real-time data from distributed IoT devices to optimize resource consumption and reduce latency.'
  },
  {
    id: 'IEEE-11619955',
    title: 'Enhance Intelligent Video Analytics: Leveraging Deep Learning and Edge Computing for Live Surveillance',
    conference: 'IEEE International Conference (2026)',
    publisher: 'IEEE Xplore',
    doiUrl: 'https://ieeexplore.ieee.org/document/11619955',
    authors: 'V. Pushpa, Abedalhakeem Issa, V. Samuthira Pandi, Bh. Prashanthi, Renugadevi R, Sami Anand',
    status: 'PUBLISHED',
    statusColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    tags: ['Deep Learning', 'Edge Computing', 'Video Analytics', 'Smart Surveillance'],
    abstract: 'The demand for real-time cognitive video analytics to decipher massive volumes of video data is on the rise in surveillance systems installed in smart cities, transportation networks, and critical infrastructures. Cloud processing in older centralized monitoring systems causes delays in reaction to crucial events, problems with bandwidth, and latency. Smart video analytics for real-time monitoring and decision-making are made possible by deep learning and edge computing directly at the data source.'
  }
];

const FacultyResearchView = ({ triggerToast, onAction }) => {
  const [pipelinePapers, setPipelinePapers] = useState(RESEARCH_PAPERS);

  // Helper to trigger toast regardless of portal wrapper type
  const showToast = (msg) => {
    if (triggerToast) {
      triggerToast(msg);
    } else if (onAction) {
      onAction('TOAST', msg);
    } else {
      console.log(msg);
    }
  };

  // Modal states
  const [activeDraft, setActiveDraft] = useState(null); // paper object
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // Form states for proposal wizard
  const [proposalTitle, setProposalTitle] = useState('');
  const [fundingAgency, setFundingAgency] = useState('DST');
  const [coPis, setCoPis] = useState('');
  const [budget, setBudget] = useState('₹15.0 Lakhs');

  const [loadingDraftId, setLoadingDraftId] = useState(null);

  // Upload Clearance dialog
  const [showUploadClearance, setShowUploadClearance] = useState(false);
  const [clearanceFile,       setClearanceFile]       = useState(null);
  const [clearanceProgress,   setClearanceProgress]   = useState(0);
  const [ethicsAgreed,        setEthicsAgreed]        = useState(false);
  const clearanceRef = React.useRef();

  // Assign Co-Authors dialog
  const [showCoAuthorAssign,  setShowCoAuthorAssign]  = useState(false);
  const [assignedAuthors,     setAssignedAuthors]     = useState([]);
  const [authorRoles,         setAuthorRoles]         = useState({});

  const allResearchers = [
    { name: 'Dr. Akila Venkatraman', role: 'IoT Networks Expert',        dept: 'IT Dept' },
    { name: 'Dr. Vikas Verma',       role: 'Distributed Systems Expert', dept: 'IT Dept' },
    { name: 'S Aswini',              role: 'Edge ML Researcher',         dept: 'IT Dept' },
    { name: 'Dr. S. Kumaran',        role: 'HoD, IT Dept',               dept: 'IT Dept' },
  ];

  const toggleAssignAuthor = (name) =>
    setAssignedAuthors(prev => prev.includes(name) ? prev.filter(x=>x!==name) : [...prev, name]);

  const simulateClearanceUpload = (f) => {
    setClearanceFile(f); setClearanceProgress(10);
    [30,55,75,90,100].forEach((v,i) => setTimeout(() => setClearanceProgress(v),(i+1)*280));
  };

  const handleSubmitClearance = () => {
    if (!clearanceFile) { showToast('Please attach a clearance document.'); return; }
    if (!ethicsAgreed)  { showToast('Please confirm the ethics declaration.'); return; }
    showToast('Clearance document submitted for Admin Verification.');
    setShowUploadClearance(false); setClearanceFile(null); setClearanceProgress(0); setEthicsAgreed(false);
  };

  const handleSendInvites = () => {
    if (assignedAuthors.length === 0) { showToast('Select at least one co-author.'); return; }
    showToast(`Collaboration invites sent to: ${assignedAuthors.join(', ')}`);
    setShowCoAuthorAssign(false); setAssignedAuthors([]); setAuthorRoles({});
  };

  const handleViewDraft = (row) => {
    setLoadingDraftId(row.id);
    setTimeout(() => {
      setLoadingDraftId(null);
      setActiveDraft(row);
    }, 600);
  };

  // AI Co-Pilot states
  const [showAiCopilot, setShowAiCopilot] = useState(false);
  const [aiStep, setAiStep] = useState(1); // 1: form, 2: generating, 3: result outline
  const [copilotScheme, setCopilotScheme] = useState('SERB Core Research Grant');
  const [copilotTopic, setCopilotTopic] = useState('');
  const [copilotCoAuthors, setCopilotCoAuthors] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [generatedProposal, setGeneratedProposal] = useState(null);

  const coAuthorOptions = [
    { name: "Dr. Akila Venkatraman", dept: "IT Dept", role: "IoT Networks Expert" },
    { name: "Dr. Vikas Verma", dept: "IT Dept", role: "Distributed Systems Expert" },
    { name: "S Aswini", dept: "IT Dept", role: "Edge ML Researcher" }
  ];

  const handleCoAuthorToggle = (name) => {
    setCopilotCoAuthors(prev => 
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    );
  };

  const handleGenerateOutline = () => {
    if (!copilotTopic.trim()) {
      showToast("Please enter a research topic or keywords.");
      return;
    }
    setAiStep(2);
    setGenerationProgress(10);
    setProgressText("Reading Scheme RFP guidelines & checking compliance...");

    setTimeout(() => {
      setGenerationProgress(40);
      setProgressText("Analyzing publication database of selected co-authors...");
    }, 800);

    setTimeout(() => {
      setGenerationProgress(70);
      setProgressText("Drafting research methodology and milestones...");
    }, 1600);

    setTimeout(() => {
      setGenerationProgress(90);
      setProgressText("Synthesizing budget estimation and equipment lists...");
    }, 2400);

    setTimeout(() => {
      setGenerationProgress(100);
      
      const title = `Edge-Native Intelligent Framework for ${copilotTopic}: Design, Analytics and Deployment`;
      const authorsString = ["Ms. Renugadevi R", ...copilotCoAuthors].join(", ");
      
      const proposal = {
        title,
        scheme: copilotScheme,
        coAuthors: authorsString,
        abstract: `This project proposes a novel edge-native intelligent framework targeting ${copilotTopic} to resolve latency and telemetry issues in distributed systems. By utilizing decentralized processing nodes, the project aims to establish a robust infrastructure aligned with National Development Priorities.`,
        objectives: [
          `Develop a low-latency edge computing architecture optimized for ${copilotTopic}.`,
          `Implement decentralized anomaly detection and stream analytics.`,
          `Validate the model on local hardware testbeds with real-time workloads.`
        ],
        workplan: [
          { phase: "Phase I (Month 1-6)", task: "Literature review, requirements analysis, and co-author specialization alignment." },
          { phase: "Phase II (Month 7-18)", task: "Design and implementation of core decentralized ML model nodes." },
          { phase: "Phase III (Month 19-24)", task: "Pilot deployment on target institutional testbeds and draft validation." }
        ],
        budget: [
          { item: "High-Performance GPU Nodes / Server Host", cost: "₹8.5 Lakhs" },
          { item: "Distributed Telemetry & Sensors", cost: "₹2.0 Lakhs" },
          { item: "Staff Salaries (JRF/SRF)", cost: "₹4.5 Lakhs" }
        ],
        totalBudget: "₹15.0 Lakhs"
      };
      setGeneratedProposal(proposal);
      setAiStep(3);
      showToast("AI Proposal Draft outline generated successfully!");
    }, 3200);
  };

  const handleExportProposalPdf = () => {
    if (!generatedProposal) return;
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Top Indigo Header
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, 210, 8, 'F');

      // Title
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("VidyaPrayog AI Grant Co-Pilot", 20, 20);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("AUTOMATED RESEARCH RFP DRAFT OUTLINE", 20, 25);

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(20, 28, 190, 28);

      // Metadata Box
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 32, 170, 32, 'F');
      doc.rect(20, 32, 170, 32, 'S');

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(79, 70, 229);
      doc.text("PROPOSAL SCHEME METADATA", 25, 38);

      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text("Target Scheme:", 25, 45);
      doc.setFont("helvetica", "normal");
      doc.text(generatedProposal.scheme, 55, 45);

      doc.setFont("helvetica", "bold");
      doc.text("Principal Investigator:", 25, 51);
      doc.setFont("helvetica", "normal");
      doc.text("Ms. Renugadevi R", 55, 51);

      doc.setFont("helvetica", "bold");
      doc.text("Co-Investigators:", 25, 57);
      doc.setFont("helvetica", "normal");
      doc.text(generatedProposal.coAuthors, 55, 57);

      // Proposal Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 70, 229);
      doc.text("Project Title:", 20, 72);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      const titleLines = doc.splitTextToSize(generatedProposal.title, 170);
      doc.text(titleLines, 20, 78);

      // Abstract Section
      let currentY = 78 + (titleLines.length * 5) + 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 70, 229);
      doc.text("1. Project Abstract & Objectives:", 20, currentY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const abstractLines = doc.splitTextToSize(generatedProposal.abstract, 170);
      doc.text(abstractLines, 20, currentY + 6);

      currentY = currentY + 6 + (abstractLines.length * 4.5) + 4;
      doc.setFont("helvetica", "bold");
      doc.text("Core Objectives:", 20, currentY);
      doc.setFont("helvetica", "normal");
      generatedProposal.objectives.forEach((obj, idx) => {
        const objLines = doc.splitTextToSize(`[${idx + 1}] ${obj}`, 165);
        doc.text(objLines, 22, currentY + 5 + (idx * 9));
      });

      currentY = currentY + 5 + (generatedProposal.objectives.length * 9) + 5;
      
      if (currentY > 210) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 70, 229);
      doc.text("2. Phased Project Workplan Timeline:", 20, currentY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      generatedProposal.workplan.forEach((phase, idx) => {
        doc.setFont("helvetica", "bold");
        doc.text(phase.phase, 20, currentY + 6 + (idx * 14));
        doc.setFont("helvetica", "normal");
        const taskLines = doc.splitTextToSize(phase.task, 170);
        doc.text(taskLines, 20, currentY + 11 + (idx * 14));
      });

      currentY = currentY + 11 + (generatedProposal.workplan.length * 14) + 5;
      if (currentY > 230) {
        doc.addPage();
        currentY = 20;
      }

      // Budget Allocation
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 70, 229);
      doc.text("3. Key Budget Allocation Proposal:", 20, currentY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      generatedProposal.budget.forEach((item, idx) => {
        doc.text(`- ${item.item}:`, 22, currentY + 6 + (idx * 5));
        doc.setFont("helvetica", "bold");
        doc.text(item.cost, 110, currentY + 6 + (idx * 5));
        doc.setFont("helvetica", "normal");
      });

      doc.setFont("helvetica", "bold");
      doc.text(`Total Proposed Budget Cost: ${generatedProposal.totalBudget}`, 20, currentY + 6 + (generatedProposal.budget.length * 5) + 4);

      currentY = currentY + 6 + (generatedProposal.budget.length * 5) + 20;
      if (currentY > 260) {
        doc.addPage();
        currentY = 30;
      }

      doc.setDrawColor(226, 232, 240);
      doc.line(20, currentY, 190, currentY);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text("CONFIDENTIAL PRE-SUBMISSION DRAFT - GENERATED BY VIDYAPRAYOG CO-PILOT", 20, currentY + 5);
      doc.text(`Timestamp: ${new Date().toLocaleString()}`, 130, currentY + 5);

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI_Grant_Proposal_Draft_${generatedProposal.scheme.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`AI proposal draft exported as PDF successfully!`);
    } catch (err) {
      console.error(err);
      showToast("Failed to export PDF draft.");
    }
  };

  const handleCreateProposal = (e) => {
    e.preventDefault();
    if (!proposalTitle.trim()) {
      showToast("Please input a valid proposal title.");
      return;
    }
    showToast(`Research Proposal for "${proposalTitle}" drafted and sent to ${fundingAgency}!`);
    setShowWizard(false);
    setProposalTitle('');
    setCoPis('');
    setWizardStep(1);
  };

  const handleUploadClick = () => {
    showToast("Institutional Clearance uploaded successfully (PDF Verified).");
  };

  const handleAssignClick = () => {
    showToast("Student co-authors successfully linked to the active workspace.");
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Papers Published', value: '14', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
          { label: 'Scopus/IEEE Citations', value: '320', icon: Activity, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
          { label: 'Patents Granted', value: '2', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
          { label: 'Seed Grants Active', value: '₹24.5L', icon: Coins, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color} mt-1`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Span 2) - Pipeline */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <FileEdit className="w-4 h-4 text-indigo-500" />
            Active Research Paper Submissions &amp; Review Pipeline
          </h3>
          <div className="overflow-x-auto max-h-72 overflow-y-auto relative rounded-xl border border-slate-200/50">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/80 shadow-sm">
                <tr className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
                  <th className="py-3 pl-3">Title</th>
                  <th className="py-3">Journal / Conference</th>
                  <th className="py-3">Co-Authors</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right pr-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pipelinePapers.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                    <td className="py-4 pl-3">
                      <p className="font-bold text-slate-800 text-sm max-w-[180px] truncate" title={row.title}>{row.title}</p>
                    </td>
                    <td className="py-4 text-xs text-slate-600 font-semibold">{row.conference || row.conf}</td>
                    <td className="py-4 text-xs text-slate-500">{row.authors}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide whitespace-nowrap border ${row.statusColor || `bg-${row.color}-50 text-${row.color}-700 border-${row.color}-200`}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-3">
                      <div className="relative inline-block group/tooltip">
                        <button 
                          onClick={() => handleViewDraft(row)}
                          disabled={loadingDraftId !== null}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-all flex items-center justify-end gap-1.5 ml-auto cursor-pointer min-w-[70px]"
                        >
                          {loadingDraftId === row.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Loading...</span>
                            </>
                          ) : (
                            <span>View Draft</span>
                          )}
                        </button>
                        <span className="pointer-events-none absolute bottom-full right-0 mb-2 bg-slate-950 text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-30">
                          Review manuscript abstract draft
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col - Grant Builder */}
        <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Coins className="w-4 h-4 text-emerald-500" />
            RFP &amp; Grant Proposal Builder
          </h3>
          <p className="text-xs text-slate-500 mb-6">Create, collaborate, and submit institutional grant proposals with automated compliance checks.</p>
          
          <div className="space-y-3 flex-1">
            <button 
              onClick={() => { setShowWizard(true); setWizardStep(1); }}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-xl p-4 transition-all text-left group"
            >
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Create New Proposal</p>
                <p className="text-[10px] text-slate-500 font-semibold">DST / SERB / MEITY</p>
              </div>
            </button>

            <button 
              onClick={() => setShowUploadClearance(true)}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-white rounded-xl p-4 transition-all text-left group"
            >
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <UploadCloud className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Upload Clearance</p>
                <p className="text-[10px] text-slate-500 font-semibold">Institutional Ethics / Admin Verification</p>
              </div>
            </button>

            <button 
              onClick={() => setShowCoAuthorAssign(true)}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-white rounded-xl p-4 transition-all text-left group"
            >
              <div className="bg-purple-100 text-purple-600 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Assign Co-Authors</p>
                <p className="text-[10px] text-slate-500 font-semibold">Invite Students &amp; Peers</p>
              </div>
            </button>

            <button 
              onClick={() => { setShowAiCopilot(true); setAiStep(1); setCopilotTopic(''); setCopilotCoAuthors([]); setGeneratedProposal(null); }}
              className="w-full flex items-center gap-3 bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-white hover:to-white border border-violet-200/80 hover:border-violet-500 rounded-xl p-4 transition-all text-left group shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="bg-violet-600 text-white p-2 rounded-lg group-hover:bg-indigo-600 transition-colors">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-violet-950 flex items-center gap-1.5">
                  AI Proposal Generator 
                  <span className="text-[8px] font-bold bg-violet-600 text-white px-1 rounded-full uppercase tracking-wider">Beta</span>
                </p>
                <p className="text-[10px] text-violet-700/80 font-semibold">AI Outline Builder &amp; Compliance Check</p>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* ── Abstract Draft Inspector Modal ── */}
      {activeDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">{activeDraft.title}</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">{activeDraft.conference || activeDraft.conf}</p>
              </div>
              <button onClick={() => setActiveDraft(null)} className="text-slate-400 hover:text-slate-700 p-1 shrink-0 ml-4">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed max-h-48 overflow-y-auto">
                <h4 className="font-bold text-slate-800 mb-1">Abstract:</h4>
                <p>&ldquo;{activeDraft.abstract}&rdquo;</p>
              </div>
              
              <div className="text-[11px] space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Authors</span>
                  <span className="text-slate-700 font-semibold">{activeDraft.authors}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {activeDraft.publisher && (
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Publisher</span>
                      <span className="text-slate-700 font-semibold">{activeDraft.publisher}</span>
                    </div>
                  )}
                  {activeDraft.doiUrl && (
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">DOI Link</span>
                      <a 
                        href={activeDraft.doiUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-600 hover:text-indigo-800 hover:underline font-bold inline-flex items-center gap-1 mt-0.5"
                      >
                        IEEE Xplore <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {activeDraft.tags && (
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {activeDraft.tags.map(tag => (
                        <span key={tag} className="bg-slate-200/60 text-slate-600 border border-slate-300/30 px-2 py-0.5 rounded text-[9px] font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <span className="text-slate-500 font-semibold">Current Review Status:</span>
                <span className={`px-2.5 py-0.5 rounded border font-extrabold uppercase tracking-wider text-[9px] ${activeDraft.statusColor || `bg-${activeDraft.color}-50 text-${activeDraft.color}-700 border-${activeDraft.color}-200`}`}>
                  {activeDraft.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveDraft(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ── DST/SERB Grant Proposal Multi-Step Wizard Modal ── */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">DST/SERB Proposal Wizard</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Step {wizardStep} of 2</p>
              </div>
              <button onClick={() => setShowWizard(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4">
              {wizardStep === 1 ? (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Project Title</label>
                    <input
                      type="text"
                      required
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      placeholder="e.g. Distributed Ledger Systems for Smart Grids"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Funding Agency</label>
                    <select
                      value={fundingAgency}
                      onChange={(e) => setFundingAgency(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 transition-all"
                    >
                      <option value="DST">DST (Science &amp; Tech)</option>
                      <option value="SERB">SERB (Core Research Grant)</option>
                      <option value="MEITY">MEITY Startup Hub</option>
                    </select>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-xl px-4 py-2.5 text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Co-Principal Investigators (Co-PIs)</label>
                    <input
                      type="text"
                      value={coPis}
                      onChange={(e) => setCoPis(e.target.value)}
                      placeholder="e.g. Dr. A. Raman, Dr. K. Roy"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Requested Budget</label>
                    <input
                      type="text"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Proposal
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ── Research AI Grant Co-Pilot Modal ── */}
      {showAiCopilot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 text-left">
          <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in flex flex-col max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-t-2xl" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-600 animate-pulse" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">AI Grant Proposal Draft Generator</h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">VidyaPrayog Academic RFP Co-Pilot</p>
                </div>
              </div>
              <button onClick={() => setShowAiCopilot(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {aiStep === 1 && (
              <div className="space-y-4 overflow-y-auto pr-1">
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Enter your core research topic and select co-authors. The AI will extract relevant publication records and draft a compliant outline matching agency criteria.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Scheme</label>
                    <select
                      value={copilotScheme}
                      onChange={(e) => setCopilotScheme(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
                    >
                      <option value="SERB Core Research Grant">SERB Core Research Grant (CRG)</option>
                      <option value="DST CSRI - Cognitive Science">DST CSRI - Cognitive Science Initiative</option>
                      <option value="MeitY DeepTech Seed Grant">MeitY DeepTech Seed Grant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Core Proposal Topic / Focus Area</label>
                    <input
                      type="text"
                      required
                      value={copilotTopic}
                      onChange={(e) => setCopilotTopic(e.target.value)}
                      placeholder="e.g., Decentralized IoT Edge Nodes for Agricultural Diagnostics"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Co-Author Profiles (IT Dept Collaboration)</label>
                    <div className="space-y-2 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
                      {coAuthorOptions.map((opt) => {
                        const isChecked = copilotCoAuthors.includes(opt.name);
                        return (
                          <label key={opt.name} className="flex items-start gap-3 cursor-pointer group text-xs text-slate-700">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCoAuthorToggle(opt.name)}
                              className="mt-0.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-slate-800 group-hover:text-violet-700 transition-colors">{opt.name}</span>
                              <span className="text-[10px] text-slate-400 font-semibold ml-2">({opt.role})</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAiCopilot(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateOutline}
                    className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Generate Proposal Outline
                  </button>
                </div>
              </div>
            )}

            {aiStep === 2 && (
              <div className="py-10 text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-violet-100 animate-pulse" />
                  <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-slate-800 animate-pulse">Grant Co-Pilot Synthesizing Draft...</h4>
                  <p className="text-xs text-slate-500 font-semibold">{progressText}</p>
                </div>
                <div className="w-64 bg-slate-100 h-2 rounded-full mx-auto overflow-hidden border border-slate-200">
                  <div 
                    className="bg-violet-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}

            {aiStep === 3 && generatedProposal && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4">
                  
                  {/* Generated Banner */}
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3.5 text-emerald-800 text-xs leading-normal">
                    <strong className="block mb-0.5 text-emerald-950">✓ Compliant Draft Generated</strong>
                    The outline aligns with SERB Core Grant criteria. Co-author publications have been linked for section contributions.
                  </div>

                  <div className="space-y-3 font-sans">
                    {/* Title */}
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Generated Title</span>
                      <h4 className="text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3">{generatedProposal.title}</h4>
                    </div>

                    {/* Abstract */}
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Section 1: Abstract & Objectives</span>
                      <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5 leading-relaxed">
                        <p>{generatedProposal.abstract}</p>
                        <hr className="border-slate-200" />
                        <div>
                          <strong className="text-[10px] text-slate-700 block mb-1">Key Objectives:</strong>
                          <ul className="list-disc pl-4 space-y-1">
                            {generatedProposal.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Workplan */}
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Section 2: Workplan Phases</span>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3 text-xs text-slate-600">
                        {generatedProposal.workplan.map((phase, i) => (
                          <div key={i} className="flex flex-col gap-0.5">
                            <strong className="text-slate-800 text-[11px]">{phase.phase}</strong>
                            <p>{phase.task}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Section 3: Proposed Budget Breakdown</span>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-2">
                        {generatedProposal.budget.map((item, i) => (
                          <div key={i} className="flex justify-between border-b border-slate-200/50 pb-1.5 last:border-0 last:pb-0">
                            <span>{item.item}</span>
                            <strong className="text-slate-800">{item.cost}</strong>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-800 text-[13px]">
                          <span>Total Requested Budget:</span>
                          <span className="text-emerald-600">{generatedProposal.totalBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAiStep(1)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors"
                  >
                    Edit Input
                  </button>
                  <button
                    type="button"
                    onClick={handleExportProposalPdf}
                    className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Proposal Draft PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Wizard modal placeholder ── */}

      {/* ── Upload Clearance Dialog ── */}
      {showUploadClearance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Upload Ethics Clearance</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Institutional Ethics / Admin Verification</p>
              </div>
              <button onClick={()=>{setShowUploadClearance(false);setClearanceFile(null);setClearanceProgress(0);setEthicsAgreed(false);}} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            <div className="space-y-4">
              {/* Drop Zone */}
              <div
                onClick={()=>clearanceRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 text-center cursor-pointer transition-all group"
              >
                <input ref={clearanceRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={e=>{const f=e.target.files?.[0]; if(f) simulateClearanceUpload(f);}}
                />
                {clearanceFile ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-emerald-700">{clearanceFile.name}</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{width:`${clearanceProgress}%`}}/>
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold">{clearanceProgress<100?`Uploading… ${clearanceProgress}%`:'✓ Document Ready'}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-emerald-600 transition-colors">
                    <UploadCloud className="w-8 h-8"/>
                    <p className="text-xs font-semibold">Click to attach clearance document</p>
                    <p className="text-[10px]">PDF, DOC, DOCX — max 10 MB</p>
                  </div>
                )}
              </div>
              {/* Ethics declaration */}
              <label className="flex items-start gap-3 cursor-pointer bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
                <input type="checkbox" checked={ethicsAgreed} onChange={e=>setEthicsAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"/>
                <span>I confirm this research has received <strong>Institutional Ethics Committee (IEC)</strong> clearance and the document is authentic.</span>
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={()=>{setShowUploadClearance(false);setClearanceFile(null);setClearanceProgress(0);setEthicsAgreed(false);}}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Cancel</button>
                <button type="button" onClick={handleSubmitClearance}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                  <UploadCloud className="w-3.5 h-3.5"/> Submit for Admin Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Assign Co-Authors Chip Selector ── */}
      {showCoAuthorAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl relative animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-2xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Assign Co-Authors</h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Select researchers and assign roles</p>
              </div>
              <button onClick={()=>{setShowCoAuthorAssign(false);setAssignedAuthors([]);setAuthorRoles({});}} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-4 h-4"/></button>
            </div>
            {/* Selected chips */}
            {assignedAuthors.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {assignedAuthors.map(name=>(
                  <span key={name} className="flex items-center gap-1.5 bg-purple-100 border border-purple-200 text-purple-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {name}
                    <button onClick={()=>toggleAssignAuthor(name)} className="text-purple-500 hover:text-purple-900">×</button>
                  </span>
                ))}
              </div>
            )}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {allResearchers.map(r=>{
                const isSel = assignedAuthors.includes(r.name);
                return (
                  <div key={r.name}
                    onClick={()=>toggleAssignAuthor(r.name)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isSel ? 'bg-purple-50 border-purple-300' : 'bg-slate-50 border-slate-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isSel?'bg-purple-600 text-white':'bg-slate-200 text-slate-600'}`}>
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{r.name}</p>
                        <p className="text-[10px] text-slate-500">{r.role} · {r.dept}</p>
                      </div>
                    </div>
                    {isSel && (
                      <select value={authorRoles[r.name]||'Co-Author'} onClick={e=>e.stopPropagation()}
                        onChange={e=>setAuthorRoles(prev=>({...prev,[r.name]:e.target.value}))}
                        className="text-[10px] bg-white border border-purple-200 rounded-lg px-2 py-1 text-purple-700 font-bold outline-none">
                        <option>Co-Author</option><option>Co-PI</option><option>Reviewer</option><option>Data Analyst</option>
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={()=>{setShowCoAuthorAssign(false);setAssignedAuthors([]);setAuthorRoles({});}}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors">Cancel</button>
              <button type="button" onClick={handleSendInvites}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                <Send className="w-3.5 h-3.5"/> Send Invites ({assignedAuthors.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyResearchView;
