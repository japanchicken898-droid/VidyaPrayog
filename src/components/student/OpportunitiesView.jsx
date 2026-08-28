import React, { useState, useRef } from 'react';
import { 
  CheckCircle, CheckCircle2, Search, MapPin, BadgePercent, 
  Calendar, Clock, Wallet, Hourglass, ExternalLink, X, FileText, UserCheck, Upload 
} from 'lucide-react';

const OpportunitiesView = ({ activeSubTab = 'Internships', onSubTabChange, triggerToast }) => {
  const [selectedJobId, setSelectedJobId] = useState("intern-python-g3s");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [minStipend, setMinStipend] = useState(0); 
  const [aiMatchToggle, setAiMatchToggle] = useState(false);
  
  // Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyMethod, setApplyMethod] = useState("profile"); // 'profile' | 'upload'
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Simulated student skills for green/amber tag logic
  const studentSkills = [
    "Python", "HTML", "CSS", 
    "English Proficiency (Spoken)", "English Proficiency (Written)", 
    "MERN", "MongoDB", "React.js", "Node.js", "JavaScript"
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const internshipsList = [
    {
      id: "intern-python-g3s",
      title: "Python Development",
      company: "Gateway Software Solutions",
      location: "Chennai, Coimbatore, Erode, Madurai, Sivakasi, Dindigul, Tiruchengode, Namakkal, Theni, Pudukkottai, Chengalpattu, Rasipuram, Salem, Tiruchirappalli, Thanjavur (Hybrid)",
      startDate: "Immediately",
      duration: "6 Months",
      stipendText: "₹ 7,500 - 12,500 /month",
      stipendNum: 7500,
      stipendStructure: "Fixed pay: ₹ 5,000 - 7,500 /month | Incentive pay: ₹ 2,500 - 5,000 /month",
      deadline: "25 Sep' 26",
      matchScore: 91,
      match: "91% Match",
      openings: 20,
      skills: ["CSS", "Django", "HTML", "MySQL", "Python"],
      responsibilities: [
        "Collaborate with the development team to design and implement new features for our software solutions.",
        "Write clean, efficient, and maintainable code using Python and Django frameworks.",
        "Assist in troubleshooting and debugging issues to ensure seamless performance of our applications.",
        "Work closely with senior developers to learn best practices and enhance your skills in software development.",
        "Contribute to the development of user interfaces using HTML and CSS.",
        "Utilize MySQL to manage database systems and optimize data retrieval processes.",
        "Stay updated on the latest trends and technologies in the field of software development to drive innovation within the company."
      ],
      perks: ["Certificate", "Letter of recommendation", "Flexible work hours", "Informal dress code", "5 days a week", "Free snacks & beverages"],
      companyWebsiteUrl: "https://internshala.com/company/gateway-software-solutions-1501846592",
      aboutCompany: "Gateway Software Solutions (G3S) is a Coimbatore-based software development and ISO 9001:2015 certified delivery partner of Hewlett Packard Enterprises that provides various services and solutions to their clients in the area of software development, especially in ERP, CRM, and mobile application development. We have now expanded our services to include search engine optimization and software testing.",
      overview: "As a Python Development intern at Gateway Software Solutions, you will have the opportunity to work on cutting-edge projects and gain hands-on experience in HTML, Python, Django, CSS, and MySQL."
    },
    {
      id: "intern-ai-inamigos",
      title: "AI Prompt Engineering",
      company: "InAmigos Foundation",
      location: "Work from home",
      startDate: "Immediately",
      duration: "2 Weeks",
      stipendText: "Unpaid",
      stipendNum: 0,
      stipendStructure: "Unpaid / Volunteer",
      deadline: "24 Sep' 26",
      matchScore: 96,
      match: "96% Match",
      openings: 165,
      skills: ["English Proficiency (Spoken)", "English Proficiency (Written)", "Web development"],
      responsibilities: [
        "Build and maintain your personal portfolio/profile showcasing projects and skills.",
        "Work on improving the foundation's website (UI, features, performance, updates).",
        "Conduct research on web/AI tools and suggest practical implementations.",
        "Support basic development tasks and assist in technical problem-solving."
      ],
      perks: ["Certificate", "Letter of recommendation", "Flexible work hours"],
      companyWebsiteUrl: "https://internshala.com/company/inamigos-foundation-1597491346",
      aboutCompany: "InAmigos Foundation is a non-profit organization registered under Section 8 and licensed by the central government. It has 200+ volunteers from different parts of India. The purpose of our organization is to promote arts, commerce, sports, protection of the environment, and all. The only religion followed by our organization is 'humanity.'",
      overview: "Selected intern's day-to-day responsibilities include building and maintaining your personal portfolio/profile showcasing projects and skills, improving the foundation's website, conducting research on web/AI tools, and supporting basic development tasks."
    },
    {
      id: "intern-app-sensovision",
      title: "Application Engineer",
      company: "Senso Vision System",
      location: "Bangalore",
      startDate: "Immediately",
      duration: "3 Months",
      stipendText: "₹ 5,000 - 10,000 /month",
      stipendNum: 5000,
      stipendStructure: "₹ 5,000 - 10,000 /month",
      deadline: "20 Sep' 26",
      matchScore: 93,
      match: "93% Match",
      openings: 1,
      skills: ["Troubleshooting"],
      responsibilities: [
        "Evaluate customer requirements and develop solutions for a turnkey machine vision system for manufacturing applications.",
        "Evaluate and select lighting and optics to create the imaging front end.",
        "Work on data collection of samples provided by customers.",
        "Prepare feasibility reports.",
        "Integrate a turnkey machine vision system with robotic and automation equipment, making adjustments, troubleshooting, and debugging systems as needed.",
        "Travel to and work in a factory environment to install and support machine vision systems, ensuring all machines are qualified and ready for production according to schedule.",
        "Provide supervision to other team members at machine builder sites and contract manufacturer (CM) production sites.",
        "Help prepare standard operating procedures for machine vision setup, train team members, and provide support during machine setup and maintenance.",
        "Troubleshoot and analyze on-site issues, and provide failure analysis (FA) reports.",
        "Communicate with internal and external customers to establish good working relationships.",
        "Provide daily status and progress reports, and attend update meetings."
      ],
      perks: ["Certificate"],
      companyWebsiteUrl: "https://sensoviz.com/",
      aboutCompany: "Senso Vision is a technology consulting and development startup. We are a team of highly trained and experienced professionals in the domain of computer vision, drone automation, IoT, and machine learning.",
      overview: "Selected intern's day-to-day responsibilities include evaluating customer requirements, selecting lighting and optics, integrating machine vision systems, and troubleshooting on-site."
    },
    {
      id: "intern-fullstack-colledge",
      title: "Full Stack Development",
      company: "CollEdge Connect",
      location: "Delhi (Hybrid)",
      startDate: "Immediately",
      duration: "2 Months",
      stipendText: "₹ 5,000 - 10,000 /month",
      stipendNum: 5000,
      stipendStructure: "₹ 5,000 - 10,000 /month (Job offer upto ₹ 5LPA post internship)",
      deadline: "25 Sep' 26",
      matchScore: 88,
      match: "88% Match",
      openings: 2,
      skills: ["DevOps", "HTML", "JavaScript", "MERN", "MongoDB", "Node.js", "REST API"],
      responsibilities: [
        "Design, develop, and maintain full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Build scalable RESTful APIs and backend services using Node.js & Express.js.",
        "Develop responsive, user-friendly front-end interfaces using React.js, HTML5, CSS3, and modern JavaScript (ES6+).",
        "Integrate front-end components with backend APIs and ensure seamless data flow.",
        "Design and manage MongoDB databases, schemas, and queries using Mongoose.",
        "Implement authentication and authorization (JWT, role-based access control).",
        "Ensure application performance, security, and scalability.",
        "Write clean, maintainable, and reusable code following best practices.",
        "Handle error handling, logging, and debugging across the stack.",
        "Collaborate with designers, product managers, and other developers to deliver features.",
        "Optimize applications for maximum speed and responsiveness.",
        "Deploy applications on cloud or VPS environments and manage CI/CD pipelines.",
        "Use Git/GitHub for version control and team collaboration.",
        "Perform code reviews, testing, and bug fixes.",
        "Stay updated with the latest trends and technologies in the MERN ecosystem."
      ],
      perks: ["Certificate", "Letter of recommendation", "Flexible work hours", "Job offer"],
      companyWebsiteUrl: "https://internshala.com/company/colledge-connect-1434270439",
      aboutCompany: "Coll-Edge Connect is a next-gen sponsorship management platform that bridges the gap between brands and colleges. We specialize in creating impactful collaborations where students get exposure to leading companies, and brands gain authentic access to the most vibrant youth communities. With a name built on the idea of giving colleges an edge, Coll-Edge Connect transforms campuses into powerful engagement hubs.",
      overview: "Selected intern's day-to-day responsibilities include designing and maintaining MERN applications, building APIs, implementing authentication, and optimizing applications for performance."
    }
  ];

  // Derive jobs list from internships for demo purposes
  const jobsList = internshipsList.map(item => ({ 
    ...item, 
    id: item.id.replace('intern', 'job'), 
    stipendText: item.stipendNum > 0 ? "₹" + (item.stipendNum * 12).toLocaleString() + " /yr" : "Unpaid",
    stipendNum: item.stipendNum * 12, 
    duration: "Full-Time" 
  }));

  const getActiveList = () => {
    if (activeSubTab === 'Jobs') return jobsList;
    if (activeSubTab === 'Applications') {
      return [...internshipsList, ...jobsList].filter(job => appliedJobs.some(a => a.id === job.id));
    }
    return internshipsList;
  };

  const filteredList = getActiveList().filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Simplistic location matching for the demo
    const matchesLocation = selectedLocation === "All" || job.location.includes(selectedLocation);
    
    const matchesStipend = job.stipendNum >= minStipend;
    const matchesAi = !aiMatchToggle || job.matchScore >= 80;
    return matchesSearch && matchesLocation && matchesStipend && matchesAi;
  });

  const selectedJob = filteredList.find(j => j.id === selectedJobId) || filteredList[0];

  const triggerApplication = () => {
    if (!selectedJob) return;

    if (applyMethod === 'upload' && !uploadedFile) {
      return;
    }

    setAppliedJobs(prev => [...prev, {
      id: selectedJob.id,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }]);
    setIsApplyModalOpen(false);

    if (triggerToast) {
      triggerToast(`Application successfully submitted to ${selectedJob.company}!`);
    } else {
      alert(`Application successfully submitted to ${selectedJob.company}!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in text-left">
      
      {/* Top Filter and Tabs */}
      <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-3">
          <button 
            onClick={() => { onSubTabChange('Internships'); setSelectedJobId('intern-python-g3s'); }}
            className={`pb-3 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Internships' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Internships
          </button>
          <button 
            onClick={() => { onSubTabChange('Jobs'); setSelectedJobId('job-python-g3s'); }}
            className={`pb-3 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Jobs' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Full-Time Jobs
          </button>
          <button 
            onClick={() => { onSubTabChange('Applications'); }}
            className={`pb-3 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Applications' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            My Applications &amp; Status
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-1.5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none outline-none cursor-pointer focus:bg-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">Location: All</option>
                <option value="Remote">Remote</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Min Stipend:</span>
              <span className="text-xs font-extrabold text-indigo-600">₹{minStipend.toLocaleString()}/mo</span>
              <input 
                type="range" min="0" max="40000" step="5000"
                value={minStipend}
                onChange={(e) => setMinStipend(Number(e.target.value))}
                className="w-24 accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer select-none bg-slate-50 border px-4 py-2 rounded-xl">
              <input 
                type="checkbox" checked={aiMatchToggle} onChange={(e) => setAiMatchToggle(e.target.checked)} className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <BadgePercent className="w-3.5 h-3.5 text-indigo-500" /> AI Match &gt; 80%
              </span>
            </label>
          </div>
          <div className="relative w-full max-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input 
              type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter list..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Main split dashboard content */}
      {activeSubTab === 'Applications' ? (
        <div className="flex-1 w-full bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-6 overflow-y-auto">
          <h2 className="text-xl font-black text-slate-800 mb-6 text-left">Application Status Pipeline</h2>
          {appliedJobs.length === 0 ? (
             <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-3 block">history</span>
                <p className="text-slate-500 font-bold">You haven't applied to any opportunities yet.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Applied', 'Under Review', 'Accepted', 'Rejected'].map(statusGroup => {
                const groupJobs = appliedJobs.filter(a => a.status === statusGroup);
                const colors = {
                  'Applied': 'bg-slate-100 text-slate-700 border-slate-300',
                  'Under Review': 'bg-amber-100 text-amber-700 border-amber-300',
                  'Accepted': 'bg-emerald-100 text-emerald-700 border-emerald-300',
                  'Rejected': 'bg-rose-100 text-rose-700 border-rose-300'
                };
                return (
                  <div key={statusGroup} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 min-h-[300px]">
                    <h3 className={`text-xs font-black uppercase mb-4 py-1.5 px-3 rounded-lg border inline-block ${colors[statusGroup]}`}>
                      {statusGroup} ({groupJobs.length})
                    </h3>
                    <div className="space-y-3">
                      {groupJobs.map(app => {
                        const jobDetails = [...internshipsList, ...jobsList].find(j => j.id === app.id);
                        if (!jobDetails) return null;
                        return (
                          <div key={app.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-left relative overflow-hidden">
                            {statusGroup === 'Accepted' && <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />}
                            {statusGroup === 'Rejected' && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />}
                            {statusGroup === 'Applied' && <div className="absolute top-0 left-0 w-1 h-full bg-slate-300" />}
                            {statusGroup === 'Under Review' && <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />}
                            <h4 className="text-sm font-bold text-slate-800 truncate mb-1 pl-1">{jobDetails.title}</h4>
                            <p className="text-xs text-slate-500 truncate mb-2 pl-1">{jobDetails.company}</p>
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pl-1">
                              <span>Applied: {app.appliedDate}</span>
                            </div>
                          </div>
                        );
                      })}
                      {groupJobs.length === 0 && (
                        <p className="text-xs text-slate-400 font-medium italic p-4 text-center">Empty</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-6 min-h-[500px] items-stretch">
        
        {/* Left List Pane (~38% width) */}
        <div className="w-full lg:w-[38%] flex flex-col gap-4 overflow-y-auto pr-2 pb-8 h-[650px] scrollbar">
          {filteredList.map((job) => (
            <div 
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`rounded-2xl p-5 border shadow-sm relative cursor-pointer overflow-hidden transition-all duration-200 ${
                selectedJobId === job.id 
                  ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10 shadow-md' 
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-left">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-1">{job.company}</h3>
                  <h2 className="text-[15px] font-extrabold text-slate-900 leading-tight">{job.title}</h2>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold">
                  <CheckCircle className="w-3 h-3" /> {job.match}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                  <Wallet className="w-3 h-3" /> {job.stipendText.length > 15 ? job.stipendText.substring(0, 15) + '...' : job.stipendText}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold" title={job.location}>
                  <MapPin className="w-3 h-3" /> {job.location.split(' ')[0].replace(',', '')}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 uppercase">
                  <Hourglass className="w-3 h-3 text-rose-500" />
                  {appliedJobs.some(a => a.id === job.id) ? "Applied" : job.deadline}
                </span>
                <span className="text-[11px] text-indigo-600 font-extrabold uppercase hover:text-indigo-700">View Details ➔</span>
              </div>
            </div>
          ))}
          
          {filteredList.length === 0 && (
            <div className="p-8 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl shadow-sm">
              No matching postings found.
            </div>
          )}
        </div>

        {/* Right Details Panel (~62% width) */}
        {selectedJob ? (
          <div className="w-full lg:w-[62%] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[650px] relative overflow-hidden">
            
            {/* Detailed Header */}
            <div className="p-8 border-b border-slate-100 flex-shrink-0 bg-white z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-extrabold text-2xl shadow-sm shrink-0">
                    {selectedJob.company[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-tight mb-1">{selectedJob.title}</h2>
                    <p className="text-sm text-slate-500 font-semibold">{selectedJob.company} • {selectedJob.location.split(' ')[0].replace(',', '')}</p>
                  </div>
                </div>
                
                {appliedJobs.some(a => a.id === selectedJob.id) ? (
                  <button disabled className="shrink-0 bg-slate-100 text-slate-400 border border-slate-200 px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-not-allowed text-sm">
                    <CheckCircle className="w-4 h-4" /> Applied
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsApplyModalOpen(true)}
                    className="shrink-0 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 active:scale-95 text-sm"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-4 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider"><Calendar className="w-3.5 h-3.5"/> Start Date</div>
                  <div className="text-sm font-extrabold text-slate-800 truncate" title={selectedJob.startDate}>{selectedJob.startDate}</div>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider"><Clock className="w-3.5 h-3.5"/> Duration</div>
                  <div className="text-sm font-extrabold text-slate-800">{selectedJob.duration}</div>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider"><Wallet className="w-3.5 h-3.5"/> Stipend</div>
                  <div className="text-sm font-extrabold text-slate-800 truncate" title={selectedJob.stipendText}>{selectedJob.stipendText}</div>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider"><Hourglass className="w-3.5 h-3.5"/> Apply By</div>
                  <div className="text-sm font-extrabold text-slate-800">{selectedJob.deadline}</div>
                </div>
              </div>
            </div>

            {/* Scrollable Detailed Content */}
            <div className="p-8 overflow-y-auto flex-1 space-y-8 bg-white pb-12 scrollbar text-left">
              
              {/* Perks (Moved to match the screenshot) */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                {selectedJob.perks?.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" /> {perk}
                  </div>
                ))}
              </div>

              {/* Stipend Structure & Info (Moved to match the screenshot) */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-3 pb-2">Stipend Structure</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedJob.stipendStructure}</p>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-3 pb-2">Number of Openings</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedJob.openings}</p>
                </div>
              </div>

              {/* About Company */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 mb-3 pb-2">About {selectedJob.company}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{selectedJob.aboutCompany}</p>
                {selectedJob.companyWebsiteUrl && (
                  <button 
                    onClick={() => window.open(selectedJob.companyWebsiteUrl, '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-sm font-bold transition-colors"
                  >
                    View Company Website <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Overview */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 mb-3 pb-2">About the Internship</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{selectedJob.overview}</p>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 mb-3 pb-2">Key Responsibilities</h3>
                <ul className="space-y-3 text-sm text-slate-600 list-none ml-1">
                  {selectedJob.responsibilities?.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</span>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Required */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 mb-3 pb-2">Skill(s) Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills?.map((skill, index) => {
                    const isMatched = studentSkills.includes(skill);
                    return (
                     <span key={index} className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${isMatched ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                       {skill} {isMatched && <CheckCircle2 className="w-3 h-3 inline-block ml-1 mb-0.5"/>}
                     </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-[62%] bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center p-8 text-slate-400">
            Select an internship from the list to view full descriptions.
          </div>
        )}
      </div>
      )}

      {/* Application Modal */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 scale-100">
            
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-900 text-left">Application Preference</h3>
              <button onClick={() => { setUploadedFile(null); setIsApplyModalOpen(false); }} className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-left">
              <div>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  You are applying for <strong className="text-slate-800">{selectedJob.title}</strong> at <strong className="text-slate-800">{selectedJob.company}</strong>. How would you like to provide your profile?
                </p>
                
                <div className="space-y-3">
                  <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${applyMethod === 'profile' ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}>
                    <input type="radio" name="applyMethod" value="profile" checked={applyMethod === 'profile'} onChange={() => setApplyMethod('profile')} className="mt-1 accent-indigo-600" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-indigo-600" /> Use VidyaPrayog Profile
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Applies using your verified skills, projects, and assessment scores. Increases match visibility.</p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${applyMethod === 'upload' ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}>
                    <input type="radio" name="applyMethod" value="upload" checked={applyMethod === 'upload'} onChange={() => setApplyMethod('upload')} className="mt-1 accent-indigo-600" />
                    <div className="w-full">
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" /> Upload Custom Resume
                      </div>
                      <p className="text-xs text-slate-500 mt-1 mb-3">Upload a tailored .pdf or .docx resume for this specific role.</p>
                      
                      {applyMethod === 'upload' && (
                        <div className="mt-3" onClick={(e) => e.preventDefault()}>
                          {!uploadedFile ? (
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white hover:border-indigo-500 hover:bg-slate-50'
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              <input 
                                type="file" 
                                ref={fileInputRef}
                                accept=".pdf,.doc,.docx" 
                                className="hidden" 
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setUploadedFile(e.target.files[0]);
                                  }
                                }} 
                              />
                              <Upload className={`w-6 h-6 mb-2 ${isDragging ? 'text-indigo-600' : 'text-indigo-500'}`} />
                              <span className="text-sm font-bold text-indigo-600 mb-1">Click here to upload document or browse files (.pdf, .docx, max 5MB)</span>
                            </div>
                          ) : (
                            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 flex items-center justify-between shadow-sm">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 shrink-0">
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="truncate text-left">
                                  <p className="text-sm font-bold text-slate-800 truncate" title={uploadedFile.name}>{uploadedFile.name}</p>
                                  <p className="text-xs text-slate-500 font-semibold">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setUploadedFile(null); }}
                                className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition-colors shrink-0 flex items-center gap-1"
                                title="Remove file"
                              >
                                <X className="w-3 h-3" /> Remove / Replace
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setUploadedFile(null);
                  setIsApplyModalOpen(false);
                }}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              {applyMethod === 'upload' && !uploadedFile ? (
                <button 
                  disabled
                  className="px-5 py-2.5 text-sm font-bold bg-slate-200 text-slate-400 rounded-xl cursor-not-allowed opacity-50"
                >
                  Please Upload Resume
                </button>
              ) : (
                <button 
                  onClick={triggerApplication}
                  className="px-5 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md active:scale-95 transition-all"
                >
                  Submit Application
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OpportunitiesView;
