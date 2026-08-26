import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const initialOpportunities = [
  {
    id: "int-1",
    company: "Tata Consultancy Services (TCS)",
    title: "Cloud Backend Engineer Intern",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 96,
    match: "96% Match",
    stipendText: "₹25,000/mo",
    stipendNum: 25000,
    location: "Remote",
    duration: "6 Months",
    deadline: "2 Days Left",
    skills: ["React", "Node.js", "REST APIs", "Python"],
    overview: "Join our core cloud infrastructure team to build scalable microservices that power enterprise applications. You will work closely with senior engineers to design, implement, and deploy cloud-native backend systems using Node.js and Python stacks on AWS.",
    responsibilities: [
      "Develop and maintain RESTful APIs and microservices.",
      "Collaborate with frontend teams to integrate user-facing elements.",
      "Write clean, testable, and efficient code.",
      "Participate in code reviews and agile sprint planning."
    ],
    whyFit: [
      { label: "Verified Skill: React", details: "Advanced" },
      { label: "Project: REST APIs", details: "Evidenced" },
      { label: "Verified Skill: Node.js", details: "Intermediate" },
      { label: "Verified Skill: Python", details: "Intermediate" }
    ],
    type: "Internship"
  },
  {
    id: "int-2",
    company: "Infosys Springboard",
    title: "Full-Stack Trainee (React/Node)",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 91,
    match: "91% Match",
    stipendText: "₹20,000/mo",
    stipendNum: 20000,
    location: "Bangalore",
    duration: "3 Months",
    deadline: "5 Days Left",
    skills: ["React", "JavaScript", "HTML/CSS"],
    overview: "A hands-on training and internship program focusing on modern frontend systems. You will build user-facing modules and collaborate on active campus-connected full-stack projects.",
    responsibilities: [
      "Develop web modules using React.js and Tailwind CSS.",
      "Create responsive page templates for desktop and mobile.",
      "Optimize web assets for maximum speed and scalability."
    ],
    whyFit: [
      { label: "Verified Skill: React", details: "Advanced" },
      { label: "Verified Skill: Node.js", details: "Intermediate" }
    ],
    type: "Internship"
  },
  {
    id: "int-3",
    company: "DeepTech Labs",
    title: "Edge AI & IoT Systems Intern",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 88,
    match: "88% Match",
    stipendText: "₹30,000/mo",
    stipendNum: 30000,
    location: "Chennai",
    duration: "6 Months",
    deadline: "1 Week Left",
    skills: ["Python", "FastAPI", "C++", "Docker"],
    overview: "Explore the intersection of micro-sensors and AI. Build edge processing nodes that filter and stream telemetry data to AWS gateways under minimal power budgets.",
    responsibilities: [
      "Write edge scripts using lightweight Python libraries.",
      "Deploy Docker container instances on Raspberry Pi systems.",
      "Audit data packet transmission latency over MQTT."
    ],
    whyFit: [
      { label: "Verified Skill: Python", details: "Advanced" },
      { label: "Project: Sensor Gateway", details: "Evidenced" },
      { label: "Verified Skill: Docker", details: "Intermediate" }
    ],
    type: "Internship"
  },
  {
    id: "job-1",
    company: "Tech Corp Solutions",
    title: "Associate Cloud Engineer",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 85,
    match: "85% Match",
    stipendText: "₹40,000/mo",
    stipendNum: 40000,
    location: "Chennai",
    duration: "Full-Time",
    deadline: "Apply Now",
    skills: ["Docker", "Kubernetes", "AWS Developer Path"],
    overview: "Responsible for managing and maintaining cloud infrastructure deployments. You will configure auto-scaling rules, load balancers, and container execution templates.",
    responsibilities: [
      "Maintain high availability of cloud-native systems.",
      "Build secure CI/CD pipelines using GitHub Actions.",
      "Debug container startup failures in microservice namespaces."
    ],
    whyFit: [
      { label: "Verified Skill: Docker", details: "Intermediate" },
      { label: "Verified Skill: Node.js", details: "Intermediate" }
    ],
    type: "Job"
  },
  {
    id: "job-2",
    company: "Cognizant Technology",
    title: "Junior Backend Developer",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 78,
    match: "78% Match",
    stipendText: "₹35,000/mo",
    stipendNum: 35000,
    location: "Pune",
    duration: "Full-Time",
    deadline: "Apply Now",
    skills: ["Node.js", "Express", "SQL"],
    overview: "Develop business logic modules and configure relational schema queries. Support database maintenance, indexing optimizations, and query performance audits.",
    responsibilities: [
      "Write Node.js controllers and service layers.",
      "Create database migration scripts for SQL schemas.",
      "Perform unit testing on backend service classes."
    ],
    whyFit: [
      { label: "Verified Skill: Node.js", details: "Intermediate" },
      { label: "Verified Skill: Python", details: "Intermediate" }
    ],
    type: "Job"
  },
  {
    id: "job-3",
    company: "TCS / Tech Corp",
    title: "AI/ML Associate",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd" ,
    matchScore: 84,
    match: "84% Match",
    stipendText: "₹100,000/mo",
    stipendNum: 100000,
    location: "Bangalore",
    duration: "Full-Time",
    deadline: "Apply Now",
    skills: ["Python", "PyTorch", "NLP"],
    overview: "Develop deep learning algorithms, optimize model hyperparameters, and fine-tune large language models for production deployments.",
    responsibilities: ["Implement neural network architectures.", "Write efficient Python algorithms.", "Optimize API token consumption."],
    whyFit: [{ label: "Verified Skill: Python", details: "Intermediate" }],
    type: "Job"
  },
  {
    id: "job-4",
    company: "Tech Corp Solutions",
    title: "Data Engineer",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 81,
    match: "81% Match",
    stipendText: "₹75,000/mo",
    stipendNum: 75000,
    location: "Hyderabad",
    duration: "Full-Time",
    deadline: "Apply Now",
    skills: ["SQL", "Spark", "Python"],
    overview: "Build real-time streaming data pipelines and design relational database query structures.",
    responsibilities: ["Develop ETL pipelines.", "Optimize SQL views and query structures."],
    whyFit: [{ label: "Verified Skill: SQL", details: "Intermediate" }],
    type: "Job"
  },
  {
    id: "int-4",
    company: "Cognizant Technology",
    title: "Frontend Dev Intern",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 90,
    match: "90% Match",
    stipendText: "₹18,000/mo",
    stipendNum: 18000,
    location: "Remote",
    duration: "6 Months",
    deadline: "Apply Now",
    skills: ["React", "CSS", "HTML"],
    overview: "Work on web application frontends using Tailwind CSS and React.",
    responsibilities: ["Build responsive web pages.", "Translate design system tokens to Tailwind."],
    whyFit: [{ label: "Verified Skill: React", details: "Expert" }],
    type: "Internship"
  },
  {
    id: "job-5",
    company: "Infosys",
    title: "System Administrator",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 70,
    match: "70% Match",
    stipendText: "₹50,000/mo",
    stipendNum: 50000,
    location: "Bangalore",
    duration: "Full-Time",
    deadline: "Apply Now",
    skills: ["Linux", "Bash", "Networking"],
    overview: "Manage system infrastructure, user directories, and perform backups.",
    responsibilities: ["Automate recurring cron scripts.", "Deploy security patches."],
    whyFit: [],
    type: "Job"
  },
  {
    id: "int-5",
    company: "DeepTech Labs",
    title: "QA Engineer Intern",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 82,
    match: "82% Match",
    stipendText: "₹15,000/mo",
    stipendNum: 15000,
    location: "Pune",
    duration: "3 Months",
    deadline: "Apply Now",
    skills: ["Selenium", "Jest", "Cypress"],
    overview: "Run automation scripts and trace API integration boundaries.",
    responsibilities: ["Develop test scripts.", "Draft test reports."],
    whyFit: [],
    type: "Internship"
  },
  {
    id: "job-6",
    company: "Tech Corp Solutions",
    title: "DevOps Architect",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 92,
    match: "92% Match",
    stipendText: "₹120,000/mo",
    stipendNum: 120000,
    location: "Bangalore",
    duration: "Full-Time",
    deadline: "Apply Now",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    overview: "Design deployment architecture, scaling policies, and secure ingress controllers.",
    responsibilities: ["Build secure container runtimes.", "Optimize cluster sizing."],
    whyFit: [{ label: "Verified Skill: Docker", details: "Intermediate" }],
    type: "Job"
  },
  {
    id: "int-6",
    company: "Tata Consultancy Services (TCS)",
    title: "Database Administrator Intern",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
    matchScore: 80,
    match: "80% Match",
    stipendText: "₹22,000/mo",
    stipendNum: 22000,
    location: "Chennai",
    duration: "6 Months",
    deadline: "Apply Now",
    skills: ["PostgreSQL", "NoSQL", "Redis"],
    overview: "Design schema indexing and caching policies to scale database reads.",
    responsibilities: ["Perform read/write index audits.", "Deploy redis memory instances."],
    whyFit: [{ label: "Verified Skill: SQL & Relational DBs", details: "Intermediate" }],
    type: "Internship"
  }
];

const initialHackathons = [
  { id: 1, title: "Edge AI Compressed Air Monitoring Hackathon", teams: 18, status: "Ongoing", daysLeft: 4 },
  { id: 2, title: "Zero-Trust Agent Observability Sprint", teams: 12, status: "Ongoing", daysLeft: 9 },
  { id: 3, title: "Optimized Container Orchestration Challenge", teams: 25, status: "Reviewing", daysLeft: 0 }
];

const initialGrants = [
  { id: "grant-1", title: "AI-Based Smart Crop Disease Detection System", fundingAgency: "DST (Dept of Science & Tech)", amount: "₹8.5 Lakhs", status: "Ongoing (Year 2)", collaborators: "Tech Corp" },
  { id: "grant-2", title: "Edge Computing for Traffic Management in Smart Cities", fundingAgency: "AICTE R&D Scheme", amount: "₹6.0 Lakhs", status: "Approved (Kick-off)", collaborators: "TCS" },
  { id: "grant-3", title: "Distributed Ledger Tech for Secure Health Records", fundingAgency: "TNSCST Consultancy Grant", amount: "₹4.0 Lakhs", status: "Completed", collaborators: "Local Government" }
];

const initialFdps = [
  {
    id: 1,
    title: "Advanced IoT and Edge Computing Applications",
    org: "ATAL Academy",
    dates: "Oct 15 - Oct 20, 2026",
    type: "AICTE Sponsored",
    credits: 4,
    syllabus: "Weeks 1-2: Micro-controllers & sensor interfacing. Weeks 3-4: Edge computation & TensorFlow Lite. Week 5: Real-time telemetry systems over LoRaWAN."
  },
  {
    id: 2,
    title: "Blockchain Architectures for E-Governance",
    org: "IEEE & NPTEL",
    dates: "Nov 01 - Nov 05, 2026",
    type: "NPTEL Certified",
    credits: 4,
    syllabus: "Introduction to distributed ledger technology. Smart contracts development. Practical consensus protocol verification using Hyperledger."
  }
];

const initialStudentSubmissions = [
  { id: 1, studentName: "Deepak B.", jobId: "job-2", score: 85, status: "Applied" },
  { id: 2, studentName: "Priya Sharma", jobId: "job-3", score: 92, status: "Shortlisted" },
  { id: 3, studentName: "Aditya Verma", jobId: "job-1", score: 87, status: "Interviewing" }
];

export const AppProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem('vidyaprayog_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.opportunities) return parsed.opportunities;
      } catch (e) {}
    }
    return initialOpportunities;
  });

  const [hackathons, setHackathons] = useState(() => {
    const saved = localStorage.getItem('vidyaprayog_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.hackathons) return parsed.hackathons;
      } catch (e) {}
    }
    return initialHackathons;
  });

  const [grants, setGrants] = useState(() => {
    const saved = localStorage.getItem('vidyaprayog_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.grants) return parsed.grants;
      } catch (e) {}
    }
    return initialGrants;
  });

  const [fdps, setFdps] = useState(() => {
    const saved = localStorage.getItem('vidyaprayog_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fdps) return parsed.fdps;
      } catch (e) {}
    }
    return initialFdps;
  });

  const [studentSubmissions, setStudentSubmissions] = useState(() => {
    const saved = localStorage.getItem('vidyaprayog_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.studentSubmissions) return parsed.studentSubmissions;
      } catch (e) {}
    }
    return initialStudentSubmissions;
  });

  const [liveIndustryDemand, setLiveIndustryDemand] = useState(() => {
    const saved = localStorage.getItem('vidyaprayog_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.liveIndustryDemand !== undefined) return parsed.liveIndustryDemand;
      } catch (e) {}
    }
    return 92; // Starts at 92%
  });

  // Sync to localstorage on change
  useEffect(() => {
    const stateToSave = {
      opportunities,
      hackathons,
      grants,
      fdps,
      studentSubmissions,
      liveIndustryDemand
    };
    localStorage.setItem('vidyaprayog_state', JSON.stringify(stateToSave));
  }, [opportunities, hackathons, grants, fdps, studentSubmissions, liveIndustryDemand]);

  // Global actions
  const addJobOpportunity = (jobData) => {
    const newRole = {
      id: jobData.id || `job-${Date.now()}`,
      company: jobData.company || "TCS / Tech Corp",
      title: jobData.title,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCHw5VTpNbYv2GFsxSKxrnrD6RMLoF2yQrHDQA83xbhh-XRx_tyMquNqOBe8uDE3iG0fRj_xu24XjccEbnVU9gUGrwTf_difxsknNKWHqcXs3pIRMx-iGJOOByaxeyQXf3DmJd39yeZECNlYnz1_wXXlHYobnXMPiAlvhLfyF1ElHuppvZrWrs333ApF8rxxeQuApSNbug0_aPKon_OnHKEvi8M4gR1Esh20KFccsjKohP1XusdRd",
      matchScore: Math.floor(Math.random() * 20) + 75,
      match: "85% Match",
      stipendText: jobData.compensation || "₹45k/month",
      stipendNum: parseInt(jobData.compensation?.replace(/[^0-9]/g, '')) || 45000,
      location: jobData.workMode || "Remote",
      duration: jobData.type === 'Internship' ? "6 Months" : "Full-Time",
      deadline: "Apply Now",
      skills: Object.keys(jobData.skillWeights || {}),
      overview: `Exciting opportunity for ${jobData.title} in our ${jobData.department || 'Engineering'} team. Work using state-of-the-art developer diagnostics.`,
      responsibilities: [
        "Collaborate in cross-functional agile development sprints.",
        "Implement secure logic containers and APIs.",
        "Evaluate code compliance metrics dynamically."
      ],
      whyFit: [
        { label: "Verified Core Skills", details: "Matching" }
      ],
      type: jobData.type || "Job"
    };

    setOpportunities(prev => [newRole, ...prev]);
    setLiveIndustryDemand(prev => Math.min(prev + 2, 100)); // Increments demand metric
  };

  const addChallenge = (challengeData) => {
    const newChallenge = {
      id: challengeData.id || Date.now(),
      title: challengeData.title,
      teams: challengeData.teams || 0,
      status: challengeData.status || "Just Launched",
      daysLeft: challengeData.daysLeft || 14
    };
    setHackathons(prev => [newChallenge, ...prev]);
  };

  const addFDP = (fdpData) => {
    const newFDP = {
      id: fdpData.id || Date.now(),
      title: fdpData.title,
      org: fdpData.org || "ATAL Academy & Industry Hub",
      dates: fdpData.dates || "Oct 25 - Oct 28, 2026",
      type: fdpData.type || "AICTE Sponsored",
      credits: fdpData.credits || 4,
      syllabus: fdpData.syllabus || "Advanced workshops & interactive virtual labs."
    };
    setFdps(prev => [newFDP, ...prev]);
  };

  const submitStudentApplication = (jobId, studentInfo) => {
    const newSubmission = {
      id: Date.now(),
      studentName: studentInfo.name || "Deepak B.",
      jobId: jobId,
      score: studentInfo.score || 92,
      status: "Applied"
    };
    setStudentSubmissions(prev => [newSubmission, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      opportunities,
      hackathons,
      grants,
      fdps,
      studentSubmissions,
      liveIndustryDemand,
      addJobOpportunity,
      addChallenge,
      addFDP,
      submitStudentApplication
    }}>
      {children}
    </AppContext.Provider>
  );
};
