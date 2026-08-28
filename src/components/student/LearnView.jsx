import React, { useState, useEffect, useRef } from 'react';
import CodeArenaView from './CodeArenaView';
import { PlayCircle, Clock, CheckCircle, Send, Sparkles, Milestone, BrainCircuit, CheckCircle2, Loader2, Lock, ChevronDown, ChevronRight, Play } from 'lucide-react';

const LearnView = ({ activeSubTab = 'Courses', onSubTabChange, onAction, studentProfile }) => {
  const [courses, setCourses] = useState([
    {
      id: "course-1",
      title: "Ultimate AWS Certified Solutions Architect Associate",
      description: "Full Practice Exam | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Associate Certification SAA-C03!",
      progress: 0,
      duration: "27 Hours",
      lessons: "390 Lessons",
      tag: "UDEMY",
      tagBg: "bg-purple-50 text-purple-600 border-purple-200",
      url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/?couponCode=CP260817G1",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-2",
      title: "Become a Java Full Stack Developer with React & Spring Boot",
      description: "Master Java Full Stack: React, Spring Boot, REST APIs, JPA, Security, JWT, Redux, Stripe, Tailwind CSS & More",
      progress: 0,
      duration: "38 Hours",
      lessons: "320 Lessons",
      tag: "UDEMY",
      tagBg: "bg-purple-50 text-purple-600 border-purple-200",
      url: "https://www.udemy.com/course/become-a-java-full-stack-developer-with-react-spring-boot/?couponCode=CP260817G1",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-3",
      title: "Full Stack: React and Java Spring Boot - The Developer Guide",
      description: "Build a Full Stack App - React and Java Spring Boot, Spring Security, JWT, Spring Data JPA",
      progress: 0,
      duration: "40 Hours",
      lessons: "400 Lessons",
      tag: "UDEMY",
      tagBg: "bg-purple-50 text-purple-600 border-purple-200",
      url: "https://www.udemy.com/course/full-stack-react-and-java-spring-boot-the-developer-guide/?couponCode=CP260817G1",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-4",
      title: "Google Data Analytics Professional Certificate",
      description: "Get on the fast track to a career in Data Analytics. Learn in-demand skills, and get AI training from Google experts.",
      progress: 0,
      duration: "6 Months",
      lessons: "Professional Certificate",
      tag: "COURSERA",
      tagBg: "bg-blue-50 text-blue-600 border-blue-200",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-5",
      title: "Prompt Engineering Specialization",
      description: "Master the art of Prompt Engineering and optimize your interactions with AI models.",
      progress: 0,
      duration: "1 Month",
      lessons: "Specialization",
      tag: "COURSERA",
      tagBg: "bg-blue-50 text-blue-600 border-blue-200",
      url: "https://www.coursera.org/specializations/prompt-engineering",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-6",
      title: "FastAPI & Python Microservices Architecture",
      description: "Python Microservices: Build, Scale, and Deploy like a Pro!",
      progress: 85,
      duration: "12 Hours",
      lessons: "120 Lessons",
      tag: "UDEMY",
      tagBg: "bg-purple-50 text-purple-600 border-purple-200",
      url: "https://www.udemy.com/course/python-microservices-build-scale-and-deploy-like-a-pro-z/",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-7",
      title: "Advanced React State Management & Performance",
      description: "Redux, State Management, and Advanced React Concepts",
      progress: 25,
      duration: "4 Weeks",
      lessons: "Advanced Concepts",
      tag: "COURSERA",
      tagBg: "bg-blue-50 text-blue-600 border-blue-200",
      url: "https://www.coursera.org/learn/packt-redux-state-management-and-advanced-react-concepts-fohbl",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "course-8",
      title: "PostgreSQL Query Optimization & Indexing",
      description: "PostgreSQL: Index Tuning and Performance Optimization",
      progress: 0,
      duration: "4 Hours",
      lessons: "Performance Tuning",
      tag: "PLURALSIGHT",
      tagBg: "bg-orange-50 text-orange-600 border-orange-200",
      url: "https://www.pluralsight.com/courses/postgresql-index-tuning-performance-optimization",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop"
    }
  ]);

  const roadmapSteps = [
    { sem: "Sem 3", title: "Web Basics & Core Databases", desc: "Express.js APIs, SQL schemas, data structures.", status: "Verified & Completed" },
    { sem: "Sem 4 (Current)", title: "Containers & Cloud Development", desc: "Dockerizing microservices, deploying configurations on AWS ECS.", status: "In Progress" },
    { sem: "Sem 5", title: "Orchestration & DevOps Pipelines", desc: "Kubernetes scaling namespaces, CI/CD automated test integrations.", status: "Upcoming Syllabus" },
    { sem: "Sem 6", title: "System Resilience & Industry Lab", desc: "Multi-region configurations, real-time telemetry pipelines.", status: "Upcoming Syllabus" }
  ];

  const [chatLog, setChatLog] = useState([
    { role: 'model', text: "Hello Deepak! I am your AI Career Advisor. I have analyzed your curriculum and verified GitHub projects. You currently have a 92% match in React/Node.js, but need to bridge gaps in Docker/AWS and System Design to align with TCS's Cloud & Full-Stack Engineer target role. How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput;
    const newChatLog = [...chatLog, { role: 'user', text: userText }];
    setChatLog(newChatLog);
    setUserInput("");
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY";
      
      const systemInstruction = "You are VidyaPrayog AI, an intelligent career advisor for students. You have full context of the student's profile (Current Skills: React 92%, Node.js, Python, SQL; Target Role: Cloud & Full-Stack Engineer; Skill Gaps: Docker 62%, AWS/System Design 45%). Provide actionable, encouraging, and highly technical roadmaps, project suggestions, and syllabus recommendations.";

      const contents = newChatLog.map(msg => ({
        role: msg.role === 'ai' ? 'model' : msg.role,
        parts: [{ text: msg.text }]
      }));

      // Add system prompt as the first message if needed by the simple API, or use the systemInstruction field.
      // For REST API:
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: systemInstruction }
          },
          contents: contents
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request right now.";
      
      setChatLog(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setChatLog(prev => [...prev, { role: 'model', text: "Error: Could not connect to Gemini API. Please check your API key." }]);
    } finally {
      setIsTyping(false);
    }
  };



  return (
    <div className="max-w-container-max mx-auto space-y-6 text-left animate-fade-in">
      
      {/* Top Sub-Navigation Tabs */}
      <div className="flex gap-8 border-b border-slate-200/60 px-4 mb-6 relative bg-white/80 backdrop-blur-sm border border-slate-200/60 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-6">
                      <button 
              onClick={() => onSubTabChange('Courses')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
                activeSubTab === 'Courses' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Courses & Micro-Lessons
            </button>
            <button 
              onClick={() => onSubTabChange('Code Arena')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
                activeSubTab === 'Code Arena' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Code Arena
            </button>
            <button 
              onClick={() => onSubTabChange('AI Advisor')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                activeSubTab === 'AI Advisor' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              <BrainCircuit className="w-4 h-4 text-indigo-500" />
              AI Career Advisor ??
            </button>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Tab 1: Courses */}
        {activeSubTab === 'Courses' && (
          <div className="space-y-6">
            <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-indigo-950 text-xs uppercase mb-1">AI Recommendation Insight</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Complete the container and orchestration modules to unlock 4 additional matched internship positions at TCS.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden h-full">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="block h-36 relative group shrink-0 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </a>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className={`text-[8px] font-extrabold px-2 py-0.5 border rounded uppercase ${c.tagBg}`}>{c.tag}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-800 leading-tight mb-2 line-clamp-2" title={c.title}>{c.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{c.description}</p>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                        <span>Progress</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4 border">
                        <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3.5 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-bold text-slate-400"><Clock className="w-3.5 h-3.5" /> {c.duration}</span>
                        <a 
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-1.5 font-bold rounded-xl text-xs active:scale-95 transition-all text-center inline-block ${
                            c.progress > 0 
                              ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700' 
                              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                          }`}
                        >
                          {c.progress > 0 ? 'Continue' : 'Enroll'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        

                {/* Tab 2: Code Arena */}
        {activeSubTab === 'Code Arena' && (
          <div className="h-[700px] w-full">
            <CodeArenaView studentProfile={studentProfile} />
          </div>
        )}

        {/* Tab 3: AI Career Advisor */}
        {activeSubTab === 'AI Advisor' && (
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-sm p-6 flex flex-col h-[500px]">
            <div className="border-b pb-4 mb-4 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">Conversational Career Assistant</h3>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 border rounded-xl mb-4 scrollbar">
              {chatLog.map((chat, idx) => (
                <div key={idx} className={`flex flex-col ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    {chat.role === 'user' ? 'Deepak B.' : 'VidyaPrayog AI'}
                  </span>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line border ${
                    chat.role === 'user'
                      ? 'bg-indigo-600 border-indigo-700 text-white rounded-tr-none'
                      : 'bg-white border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">VidyaPrayog AI</span>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              
              <div ref={chatBottomRef}></div>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask me how to resolve Docker gaps or target AWS pathways..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button type="submit" className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md active:scale-95 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

const InteractiveCareerRoadmap = () => {
  const [targetRole, setTargetRole] = useState('Cloud & AI Engineer');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [readinessScore, setReadinessScore] = useState(84);
  const [m3Progress, setM3Progress] = useState(45);
  const [m3Completed, setM3Completed] = useState(false);
  const [activeNode, setActiveNode] = useState(3);

  const roles = [
    { name: "Cloud & AI Engineer", ctc: "₹12–18 LPA" },
    { name: "Full-Stack Software Engineer", ctc: "₹8–14 LPA" },
    { name: "Data Scientist / ML Engineer", ctc: "₹10–16 LPA" }
  ];

  const handleCompleteSandbox = () => {
    setM3Progress(100);
    setM3Completed(true);
    window.dispatchEvent(new CustomEvent('ACTIVITY_LOGGED', { detail: { type: 'Cleared Roadmap Sandbox Checkpoint' } }));
    let start = 84;
    const interval = setInterval(() => {
      start++;
      setReadinessScore(start);
      if (start >= 96) clearInterval(interval);
    }, 50);
  };

  const [checklist, setChecklist] = useState({
    docker: false,
    k8s: false,
    cicd: false,
    microservices: false
  });

  const handleChecklistChange = (key) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (next.docker && next.k8s && next.cicd && next.microservices && !m3Completed) {
        handleCompleteSandbox();
      }
      return next;
    });
  };

  const milestones = [
    {
      id: 1,
      title: "Core Foundations",
      desc: "OOPs, Data Structures, Git, OS Internals",
      statusText: "100% Verified ✅",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      completed: true,
      locked: false
    },
    {
      id: 2,
      title: "Backend & Data Layer",
      desc: "Python/FastAPI, SQL, REST APIs, Auth",
      statusText: "92% Verified ✅",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      completed: true,
      locked: false
    },
    {
      id: 3,
      title: "Cloud & Containerization",
      desc: "Docker, Kubernetes, Microservices, CI/CD",
      statusText: m3Completed ? "100% Verified ✅" : "45% In Progress ⏳",
      statusClass: m3Completed ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200 ring-2 ring-blue-500/20",
      completed: m3Completed,
      locked: false,
      progress: m3Progress
    },
    {
      id: 4,
      title: "Capstone & Placement Drive",
      desc: "Enterprise System Design, Mock Interviews",
      statusText: m3Completed ? "Unlocked 🔓" : "Locked 🔒",
      statusClass: m3Completed ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-slate-100 text-slate-500 border-slate-200",
      completed: false,
      locked: !m3Completed
    }
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden box-border space-y-6 animate-fade-in text-left">
      {/* 1. Target Role Selector & Live Readiness Gauge */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="relative z-50 shrink-0">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white w-full sm:w-auto">
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Role</span>
              <span className="text-sm font-extrabold text-slate-800">{targetRole}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
              {roles.map(r => (
                <div key={r.name} onClick={() => { setTargetRole(r.name); setDropdownOpen(false); }} className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0">
                  <h5 className="text-sm font-bold text-slate-800">{r.name}</h5>
                  <span className="text-[10px] text-emerald-600 font-bold">Target CTC: {r.ctc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 whitespace-nowrap hidden md:block">
            4 Milestones • {m3Completed ? '0' : '1'} Active Sprint • {m3Completed ? '3' : '2'} Verified
          </div>
          
          <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-indigo-200" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-600 transition-all duration-1000 ease-out" strokeDasharray={`${readinessScore}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[10px] font-black text-indigo-700">{readinessScore}%</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block">Live Readiness</span>
              <span className="text-sm font-black text-indigo-900 leading-none">Score ⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Node Progression Graph */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full box-border">
        <h3 className="text-sm font-extrabold text-slate-800 mb-8 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Milestone className="w-4 h-4 text-indigo-500" /> Career Roadmap Timeline
        </h3>
        
        <div className="relative w-full pb-6 pt-2 box-border">
          {/* Background Line */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-1 bg-slate-200 z-0">
            {/* Active Line Progress */}
            <div className="h-full bg-indigo-600 transition-all duration-700 ease-out" style={{ width: m3Completed ? '100%' : '66%' }}></div>
          </div>
          
          <div className="grid grid-cols-4 w-full relative gap-2">
            {milestones.map((m) => (
              <div 
                key={m.id} 
                className="flex flex-col items-center text-center relative z-10 px-2 cursor-pointer group" 
                onClick={() => setActiveNode(m.id)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 bg-white shrink-0 transition-all duration-300 ${activeNode === m.id ? 'ring-4 ring-indigo-500/10 scale-110 shadow-md' : 'group-hover:scale-105'} ${m.completed ? 'border-emerald-500 text-emerald-500 bg-emerald-50' : m.locked ? 'border-slate-300 text-slate-400 bg-slate-50' : 'border-indigo-500 text-indigo-600'}`}>
                  {m.completed ? <CheckCircle2 className="w-5 h-5" /> : m.locked ? <Lock className="w-4 h-4" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                </div>
                
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-3 line-clamp-1 w-full">{m.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight max-w-[160px] hidden sm:block">{m.desc}</p>
                
                <div className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap inline-flex items-center justify-center ${m.statusClass}`}>
                  {m.statusText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Interactive Checkpoint Details Drawer */}
      {activeNode === 3 && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in w-full box-border">
          <div className="p-5 sm:p-6 w-full flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4 bg-slate-50">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Milestone 3: Cloud & Containerization</h3>
              <p className="text-sm text-slate-500 font-semibold mt-1">Master containerization and orchestration to unlock placement drive.</p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 font-bold text-xs shadow-sm m-0">
              +16% Projected Boost to Placement Readiness
            </div>
          </div>
          
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full box-border">
            {/* Left Side Tasks */}
            <div className="space-y-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Competency Checklist</h4>
                  <div className="space-y-4">
                     <label className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer group">
                       <input type="checkbox" checked={m3Completed || checklist.docker} onChange={() => handleChecklistChange('docker')} className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors" />
                       <span className="group-hover:text-indigo-700 transition-colors">Docker & Container Runtime</span>
                     </label>
                     <label className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer group">
                       <input type="checkbox" checked={m3Completed || checklist.k8s} onChange={() => handleChecklistChange('k8s')} className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors" />
                       <span className="group-hover:text-indigo-700 transition-colors">Kubernetes Cluster Management</span>
                     </label>
                     <label className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer group">
                       <input type="checkbox" checked={m3Completed || checklist.cicd} onChange={() => handleChecklistChange('cicd')} className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors" />
                       <span className="group-hover:text-indigo-700 transition-colors">CI/CD Pipelines (Jenkins/GitHub Actions)</span>
                     </label>
                     <label className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer group">
                       <input type="checkbox" checked={m3Completed || checklist.microservices} onChange={() => handleChecklistChange('microservices')} className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors" />
                       <span className="group-hover:text-indigo-700 transition-colors">Microservice Routing & API Gateways</span>
                     </label>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Hands-On Labs</h4>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex justify-between items-center shadow-sm flex-wrap gap-3">
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">2 Proctored Sandboxes</span>
                      <span className="text-xs text-indigo-600 font-semibold mt-1 block">{m3Completed ? '2/2 Completed' : '1/2 Completed'}</span>
                    </div>
                    {!m3Completed ? (
                      <button onClick={handleCompleteSandbox} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2 active:scale-95 whitespace-nowrap">
                        <Play className="w-3.5 h-3.5 fill-white" /> Launch Sandbox
                      </button>
                    ) : (
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 whitespace-nowrap"><CheckCircle2 className="w-4 h-4" /> Passed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Remedial */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 flex flex-col h-full">
               <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Curated Remedial Course</h4>
               <div className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex-1 flex flex-col">
                 <div className="relative h-36 shrink-0 overflow-hidden bg-slate-100">
                   <img src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Course" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   <span className="absolute bottom-3 left-3 text-[10px] font-extrabold bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-slate-200 uppercase shadow-sm">Coursera / Google Cloud</span>
                 </div>
                 <div className="p-5 bg-white flex flex-col flex-1">
                   <h5 className="font-extrabold text-sm text-slate-900 mb-2 line-clamp-2">Architecting with Google Kubernetes Engine: Workloads</h5>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5 line-clamp-3 flex-1">Learn how to perform Kubernetes operations, create and manage deployments, use GKE networking, and set up persistent storage for workloads.</p>
                   <button 
                     onClick={() => window.open('https://www.coursera.org/learn/deploying-workloads-google-kubernetes-engine-gke', '_blank', 'noopener,noreferrer')}
                     className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-md flex justify-center items-center gap-1.5 active:scale-95 shrink-0 mt-auto"
                   >
                     Go to Course <ChevronRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* For other milestones, show placeholder */}
      {activeNode !== 3 && (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center animate-fade-in w-full box-border">
           <Lock className="w-8 h-8 text-slate-300 mb-3" />
           <h3 className="text-sm font-extrabold text-slate-700">Details locked or completed</h3>
           <p className="text-xs text-slate-500 mt-1 max-w-sm">Select an active node to view your competency checklist, labs, and projected placement boost.</p>
        </div>
      )}

    </div>
  );
};

export default LearnView;
