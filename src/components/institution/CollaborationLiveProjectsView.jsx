import React, { useState, useRef, useCallback } from 'react';
import { Cpu, Users, Award, ExternalLink, Plus, X, UploadCloud, CheckCircle, FileText, ChevronDown } from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Clean Energy Smart-Grid IoT Node Framework",
    sponsor: "TCS Green Labs",
    faculty: "Dr. R. Sundaram",
    cohort: "B.Tech IT (Batch A)",
    tech: ["IoT", "MQTT", "ESP32", "Docker"],
    status: "Ongoing - Phase 2"
  },
  {
    id: 2,
    title: "Edge Gateway Multi-tenant Ingress Controller",
    sponsor: "Acme Tech Labs",
    faculty: "Prof. P. Selvam",
    cohort: "B.Tech CSE (Batch C)",
    tech: ["Kubernetes", "Go", "gRPC", "Observability"],
    status: "Under Evaluation"
  },
  {
    id: 3,
    title: "Micro-Syllabus AI Mapping Graph Database",
    sponsor: "VidyaPrayog R&D",
    faculty: "Dr. K. Priya",
    cohort: "M.Tech CSE (Batch A)",
    tech: ["Neo4j", "React", "Python", "FastAPI"],
    status: "Completed"
  }
];

const MILESTONES = [
  "Phase 1 Design Doc",
  "Phase 2 Source Code & Architecture",
  "Final IEEE Paper & Report"
];

const DEPARTMENTS = ["B.Tech IT", "B.Tech CSE", "M.Tech AI & DS", "B.E. ECE"];
const BATCHES = ["Batch A", "Batch B", "Batch C"];
const MENTORS = [
  "Dr. R. Sundaram",
  "Prof. P. Selvam",
  "Dr. K. Priya",
  "Dr. A. Krishnaswamy",
  "Prof. S. Ramachandran"
];

const CollaborationLiveProjectsView = ({ onAction }) => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // Required states exactly as specified in the prompt
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isAssignCohortOpen, setIsAssignCohortOpen] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Other local UI states
  const [selectedMilestone, setSelectedMilestone] = useState(MILESTONES[0]);
  const [demoUrl, setDemoUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);
  const fileInputRef = useRef(null);

  // Cohort form state
  const [cohortDept, setCohortDept] = useState(DEPARTMENTS[0]);
  const [cohortBatch, setCohortBatch] = useState(BATCHES[0]);
  const [cohortMentor, setCohortMentor] = useState(MENTORS[0]);
  const [cohortRollNo, setCohortRollNo] = useState('');

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, color = 'indigo') => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3600);
  }, []);

  // ── Upload Handlers ──────────────────────────────────────────────
  const handleOpenUpload = (proj) => {
    setActiveModalProject(proj);
    setSelectedMilestone(MILESTONES[0]);
    setDemoUrl('');
    setDroppedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadDone(false);
  };

  const handleCloseUpload = () => {
    if (isUploading) return;
    setActiveModalProject(null);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setDroppedFile(file);
  }, []);

  const handleFilePick = (e) => {
    const file = e.target.files[0];
    if (file) setDroppedFile(file);
  };

  const handleUploadSubmit = () => {
    if (!droppedFile && !demoUrl) {
      showToast('Please attach a file or provide a Demo URL.', 'rose');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulated progress bar (0% -> 100% in 1.2s total, interval runs every 120ms)
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        setUploadDone(true);

        // Update card status in state to ✓ Deliverable Submitted (Under Review)
        setProjects(prev => prev.map(p =>
          p.id === activeModalProject.id
            ? { ...p, status: '✓ Deliverable Submitted (Under Review)' }
            : p
        ));

        // Save reference to uploadedFiles state
        setUploadedFiles(prev => ({
          ...prev,
          [activeModalProject.id]: {
            fileName: droppedFile ? droppedFile.name : null,
            demoUrl: demoUrl || null,
            milestone: selectedMilestone,
            submittedAt: new Date().toISOString()
          }
        }));

        // Notification and Close
        showToast(`Deliverable submitted successfully for: ${activeModalProject.title}`, 'emerald');
        if (onAction) {
          onAction('TOAST', `Deliverable submitted for ${activeModalProject.title}`);
        }
        setTimeout(() => setActiveModalProject(null), 1200);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 120);
  };

  // ── Cohort Handlers ──────────────────────────────────────────────
  const handleOpenCohort = (proj) => {
    setIsAssignCohortOpen(proj);
    // Parse current cohort structure if format is e.g. "B.Tech IT (Batch A)"
    const match = proj.cohort.match(/^([^\(]+)\s*\(([^\)]+)\)$/);
    if (match) {
      const deptVal = match[1].trim();
      const batchVal = match[2].trim();
      setCohortDept(DEPARTMENTS.includes(deptVal) ? deptVal : DEPARTMENTS[0]);
      setCohortBatch(BATCHES.includes(batchVal) ? batchVal : BATCHES[0]);
    } else {
      setCohortDept(DEPARTMENTS[0]);
      setCohortBatch(BATCHES[0]);
    }
    setCohortMentor(MENTORS.includes(proj.faculty) ? proj.faculty : MENTORS[0]);
    setCohortRollNo('');
  };

  const handleCloseCohort = () => {
    setIsAssignCohortOpen(null);
  };

  const handleCohortConfirm = () => {
    const newCohortLabel = `${cohortDept} (${cohortBatch})`;
    setProjects(prev => prev.map(p =>
      p.id === isAssignCohortOpen.id
        ? { ...p, cohort: newCohortLabel, faculty: cohortMentor }
        : p
    ));

    showToast(`Cohort successfully assigned to ${isAssignCohortOpen.title}!`, 'emerald');
    if (onAction) {
      onAction('TOAST', `Assigned ${newCohortLabel} to ${isAssignCohortOpen.title}`);
    }
    setIsAssignCohortOpen(null);
  };

  const statusClass = (status) => {
    if (status.includes('✓')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status.includes('Ongoing')) return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
    if (status.includes('Evaluation')) return 'bg-amber-50 text-amber-600 border border-amber-100';
    return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
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

      {/* Header section */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Industry-Sponsored Capstones &amp; R&amp;D Projects <Cpu className="w-5 h-5 text-indigo-600" />
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor active capstone project phases, sponsoring corporate entities, and student-faculty assignments.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${statusClass(project.status)}`}>
                  {project.status}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">{project.sponsor}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-xs leading-normal mb-1">{project.title}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">Faculty Lead: {project.faculty}</p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 text-[8.5px] font-extrabold text-slate-500 bg-slate-50 border border-slate-200/80 rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Cohort information */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
                Cohort: <strong className="text-slate-800 font-bold">{project.cohort}</strong>
                {uploadedFiles[project.id] && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-emerald-600 text-[9px] font-bold">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    <span>Submitted: {uploadedFiles[project.id].fileName || 'Link Submission'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons wired up correctly as specified */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleOpenUpload(project)}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Submit File</span>
                <span className="text-[10px]">↗</span>
              </button>

              <button
                onClick={() => handleOpenCohort(project)}
                className="flex-1 py-2 px-3 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center gap-1 shadow-md shadow-indigo-500/10 transition-all active:scale-95"
              >
                <span>Assign Cohort</span>
                <span className="text-[10px]">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── File Submission Modal ─────────────────────────────────────── */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseUpload} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in text-left">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">Submit Project Deliverable</h3>
                <p className="text-[10px] text-indigo-200 mt-0.5 leading-snug max-w-[340px]">
                  Submit Project Deliverable: {activeModalProject.title}
                </p>
              </div>
              <button onClick={handleCloseUpload} className="text-white/70 hover:text-white transition-colors mt-0.5">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Milestone Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Milestone
                </label>
                <div className="relative">
                  <select
                    value={selectedMilestone}
                    onChange={e => setSelectedMilestone(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  >
                    {MILESTONES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* GitHub / Demo URL */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  GitHub / Live Demo URL
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  placeholder="https://github.com/org/repo or demo link"
                  className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Drag & Drop Area */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Deliverable File (.pdf, .zip, .docx · up to 50 MB)
                </label>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                    dragOver
                      ? 'border-indigo-500 bg-indigo-50'
                      : droppedFile
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.zip,.docx"
                    className="hidden"
                    onChange={handleFilePick}
                  />

                  {droppedFile ? (
                    <>
                      <FileText className="w-7 h-7 text-emerald-500" />
                      <p className="text-xs font-bold text-emerald-700">{droppedFile.name}</p>
                      <p className="text-[10px] text-emerald-500">
                        {(droppedFile.size / 1024 / 1024).toFixed(2)} MB · Click to change
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className={`w-7 h-7 ${dragOver ? 'text-indigo-500' : 'text-slate-300'}`} />
                      <p className="text-xs font-semibold text-slate-500">
                        {dragOver ? 'Drop file here' : 'Drag & drop or click to browse'}
                      </p>
                      <p className="text-[10px] text-slate-400">.pdf, .zip, .docx · max 50 MB</p>
                    </>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {(isUploading || uploadDone) && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>{uploadDone ? '✓ Upload Complete' : 'Uploading…'}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-150 ${uploadDone ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={handleCloseUpload}
                disabled={isUploading}
                className="flex-1 py-2.5 text-xs font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={isUploading || uploadDone}
                className="flex-1 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Uploading…
                  </>
                ) : uploadDone ? (
                  '✓ Submitted'
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload &amp; Submit Deliverable
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cohort Assignment Modal ─────────────────────────────────────── */}
      {isAssignCohortOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseCohort} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in text-left">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-750 to-indigo-500 px-6 py-4 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Users className="w-4 h-4" /> Assign Cohort
                </h3>
                <p className="text-[10px] text-indigo-200 mt-0.5 leading-snug max-w-[300px]">
                  Assign cohort parameters to: {isAssignCohortOpen.title}
                </p>
              </div>
              <button onClick={handleCloseCohort} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Department Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={cohortDept}
                    onChange={e => setCohortDept(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Batch Section */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Batch Section
                </label>
                <div className="flex gap-2">
                  {BATCHES.map(b => (
                    <button
                      key={b}
                      onClick={() => setCohortBatch(b)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        cohortBatch === b
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Faculty Mentor Lead */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Faculty Mentor Lead
                </label>
                <div className="relative">
                  <select
                    value={cohortMentor}
                    onChange={e => setCohortMentor(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {MENTORS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Lead Student Roll No / Register ID */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Lead Student Roll No / Register ID
                </label>
                <input
                  type="text"
                  value={cohortRollNo}
                  onChange={e => setCohortRollNo(e.target.value)}
                  placeholder="e.g. 21IT042 or RA2111003020450"
                  className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Assignment Preview */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl px-4 py-3 text-xs">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-0.5">Assignment Preview</span>
                <span className="font-extrabold text-indigo-800">{cohortDept} ({cohortBatch})</span>
                <span className="text-slate-500 ml-2">· Mentor: {cohortMentor}</span>
                {cohortRollNo && <span className="text-slate-400 ml-2">· Roll: {cohortRollNo}</span>}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={handleCloseCohort}
                className="flex-1 py-2.5 text-xs font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCohortConfirm}
                className="flex-1 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Users className="w-3.5 h-3.5" />
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationLiveProjectsView;
