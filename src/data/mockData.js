// Rich mock data store for the VidyaPrayog SIH 2026 Demo Portal

export const studentData = {
  name: "Deepak B.",
  tagline: "2nd Year B.Tech IT Student",
  institution: "St. Joseph's College of Engineering",
  cgpa: "8.75 / 10",
  verifiedSkills: [
    { name: "React / Frontend Dev", level: "Expert", score: 92, verifiedBy: "AI Hackathon & GitHub Evaluation" },
    { name: "Node.js / Express", level: "Intermediate", score: 78, verifiedBy: "Assessment Test" },
    { name: "JavaScript (ES6+)", level: "Expert", score: 88, verifiedBy: "Certified Core Dev" },
    { name: "Python / DSA", level: "Intermediate", score: 80, verifiedBy: "University Lab Evaluation" },
    { name: "SQL & Relational DBs", level: "Intermediate", score: 75, verifiedBy: "Assessment Test" }
  ],
  targetRole: "Cloud / Full-Stack Engineer",
  gapAnalysis: [
    { name: "Docker & Containerization", current: 10, required: 85, status: "Missing Skill", resource: "Docker Core Essentials Course" },
    { name: "Kubernetes & Orchestration", current: 0, required: 80, status: "Missing Skill", resource: "Intro to Kubernetes on GCP" },
    { name: "AWS Cloud Services (S3, EC2)", current: 30, required: 90, status: "Critical Gap", resource: "AWS Certified Developer Learning Path" },
    { name: "CI/CD & DevOps Pipelines", current: 20, required: 75, status: "Gap", resource: "GitHub Actions for Beginners" },
    { name: "System Design & Scalability", current: 40, required: 80, status: "Gap", resource: "Pragmatic System Design Course" }
  ],
  roadmapMilestones: [
    { semester: "Semester 3", title: "Backend Core", description: "Acquire intermediate Node.js skills, build 3 full-stack projects, and study AWS core services.", completed: true, progress: 100 },
    { semester: "Semester 4 (Current)", title: "Cloud & Containers", description: "Learn Docker & Containerization, complete AWS Certified Cloud Practitioner, and contribute to 1 open-source project.", completed: false, progress: 45 },
    { semester: "Semester 5", title: "Orchestration & DevOps", description: "Master Kubernetes orchestration, implement CI/CD pipelines in all projects, and start industrial internship.", completed: false, progress: 0 },
    { semester: "Semester 6", title: "Industry Collaboration", description: "Work on a live industry-academia consultancy project, complete System Design prep, and participate in placements.", completed: false, progress: 0 }
  ],
  matchedJobs: [
    { jobTitle: "Junior Full-Stack Developer", company: "TCS", matchScore: 84, location: "Chennai (Hybrid)", stipend: "₹35,000 / month", logo: "💻" },
    { jobTitle: "DevOps Engineer Intern", company: "Tech Corp", matchScore: 78, location: "Bangalore (Remote)", stipend: "₹40,000 / month", logo: "☁️" },
    { jobTitle: "Cloud Associate", company: "Cognizant", matchScore: 71, location: "Pune (On-site)", stipend: "₹30,000 / month", logo: "🚀" }
  ]
};

export const industryData = {
  companyName: "TCS / Tech Corp",
  activeOpenings: [
    { id: "job-1", title: "Junior Full-Stack Developer", dept: "Digital Enterprise", locations: ["Chennai", "Bangalore"], openings: 12, salary: "₹8.5 LPA", type: "Full Time" },
    { id: "job-2", title: "DevOps Engineer Intern", dept: "Cloud Infrastructure", locations: ["Remote"], openings: 5, salary: "₹40k/month", type: "Internship" },
    { id: "job-3", title: "AI/ML Associate", dept: "Cognitive Business", locations: ["Bangalore"], openings: 3, salary: "₹12 LPA", type: "Full Time" },
    { id: "job-4", title: "Data Engineer", dept: "Data Systems", locations: ["Hyderabad"], openings: 8, salary: "₹9 LPA", type: "Full Time" }
  ],
  candidateMatches: [
    { name: "Deepak B.", role: "Cloud / Full-Stack Engineer", matchScore: 84, skills: ["React", "Node.js", "JavaScript"], college: "St. Joseph's College of Engineering" },
    { name: "Priya Sharma", role: "AI/ML Associate", matchScore: 92, skills: ["Python", "PyTorch", "NLP"], college: "National Institute of Technology" },
    { name: "Aditya Verma", role: "DevOps Engineer Intern", matchScore: 87, skills: ["Docker", "AWS", "Linux"], college: "VIT University" },
    { name: "Ananya Iyer", role: "Data Engineer", matchScore: 81, skills: ["SQL", "Apache Spark", "Python"], college: "SSN College of Engineering" }
  ],
  talentHeatmap: [
    { skill: "React/Next.js", supply: 75, demand: 90, gap: -15 },
    { skill: "Docker/K8s", supply: 30, demand: 85, gap: -55 },
    { skill: "AWS/Azure", supply: 45, demand: 80, gap: -35 },
    { skill: "Python (AI/ML)", supply: 80, demand: 95, gap: -15 },
    { skill: "SQL/NoSQL", supply: 90, demand: 75, gap: 15 }
  ]
};

export const academiaData = {
  professorName: "Ms. Renugadevi R",
  designation: "Assistant Professor",
  department: "Department of Information Technology",
  institution: "RMK Engineering College",
  researchFocus: ["IoT Architectures", "Edge Computing", "Cloud Platforms", "Video Analytics"],
  grants: {
    total: "₹18.5 Lakhs",
    projects: [
      { id: "grant-1", title: "AI-Based Smart Crop Disease Detection System", fundingAgency: "DST (Dept of Science & Tech)", amount: "₹8.5 Lakhs", status: "Ongoing (Year 2)", collaborators: "Tech Corp" },
      { id: "grant-2", title: "Edge Computing for Traffic Management in Smart Cities", fundingAgency: "AICTE R&D Scheme", amount: "₹6.0 Lakhs", status: "Approved (Kick-off)", collaborators: "TCS" },
      { id: "grant-3", title: "Distributed Ledger Tech for Secure Health Records", fundingAgency: "TNSCST Consultancy Grant", amount: "₹4.0 Lakhs", status: "Completed", collaborators: "Local Government" }
    ]
  },
  fdpCalendar: [
    { date: "Sept 12-16, 2026", title: "AI/ML Applications in Cyber-Physical Systems", sponsor: "ATAL Academy", registered: 48, status: "Upcoming" },
    { date: "Oct 05-09, 2026", title: "Cloud Native Development using Docker & Kubernetes", sponsor: "IIT Madras NPTEL", registered: 120, status: "Open for Reg" },
    { date: "Nov 15-20, 2026", title: "Recent Trends in Decentralized Applications and Web3", sponsor: "IEEE Computer Society", registered: 35, status: "Planning" }
  ],
  consultancyCalls: [
    { id: "call-1", company: "Tech Corp", query: "Optimization of deep learning models for mobile devices", date: "Aug 28, 2026 at 3:00 PM", status: "Scheduled" },
    { id: "call-2", company: "Local Agro Industry", query: "Sensors setup and IoT dashboard review", date: "Sept 04, 2026 at 11:00 AM", status: "Pending Acceptance" },
    { id: "call-3", company: "TCS Research", query: "Joint proposal writing for MEITY project on blockchain", date: "Sept 10, 2026 at 4:30 PM", status: "Tentative" }
  ]
};

export const institutionData = {
  name: "St. Joseph's College of Engineering",
  placementMetrics: {
    overallPlacementRate: 81,
    industryPlacements: [
      { sector: "IT / Services", rate: 55, count: 220 },
      { sector: "Product / Core Tech", rate: 15, count: 60 },
      { sector: "Core Engineering", rate: 7, count: 28 },
      { sector: "Management & Consultancy", rate: 4, count: 16 }
    ],
    historicalPlacement: [
      { year: "2023", rate: 74 },
      { year: "2024", rate: 78 },
      { year: "2025", rate: 81 }
    ]
  },
  curriculumGaps: [
    { subject: "Web Technologies", gapDescription: "Missing modern frameworks (React/Next.js). Curriculum still focuses on legacy JSP/Servlets.", gapImpact: "High", recommendations: "Introduce an elective in Modern Frontend Stack with hands-on projects." },
    { subject: "Software Engineering", gapDescription: "DevOps practices (Docker, CI/CD, Git workflows) are not part of practical syllabus.", gapImpact: "Critical", recommendations: "Add a 2-credit DevOps lab module in the 5th semester." },
    { subject: "Database Systems", gapDescription: "NoSQL and modern caching strategies (Redis, DynamoDB) are barely covered.", gapImpact: "Medium", recommendations: "Update Unit V of DB course to cover Distributed Databases and NoSQL." }
  ],
  liveProjects: [
    { id: "proj-1", title: "AI-Powered Academic Syllabus Mapper", type: "Joint R&D Project", partner: "Tech Corp & St. Joseph's", duration: "6 Months", status: "Active (2 Students Assigned)" },
    { id: "proj-2", title: "Kubernetes Cloud Sandbox for Student Labs", type: "Infrastructure Setup", partner: "TCS Cloud Division", duration: "3 Months", status: "Active (1 Student Assigned)" },
    { id: "proj-3", title: "FDP on Cloud Native Architectures", type: "Capacity Building Workshop", partner: "AWS Academics", duration: "1 Week", status: "Approved" },
    { id: "proj-4", title: "Industrial IoT Lab Hackathon 2026", type: "National Hackathon Training", partner: "Institution Innovation Council", duration: "3 Days", status: "Upcoming" },
    { id: "proj-5", title: "Smart City Smart Waste Management Hack", type: "Consultancy Workshop", partner: "Chennai Smart City Corp", duration: "1 Month", status: "Active (5 Students Assigned)" }
  ]
};
