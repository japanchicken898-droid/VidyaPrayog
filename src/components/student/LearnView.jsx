import React, { useState } from 'react';
import { PlayCircle, Clock, CheckCircle, Send, Sparkles, Milestone, BrainCircuit } from 'lucide-react';

const LearnView = ({ activeSubTab = 'Courses', onSubTabChange, onAction }) => {
  const [courses, setCourses] = useState([
    {
      id: "course-1",
      title: "Mastering Docker & Container Orchestration",
      description: "Learn container basics, Dockerfiles, multi-container compose orchestration, and scaling namespaces.",
      progress: 60,
      duration: "12 Hours",
      lessons: "24 Lessons",
      tag: "CRITICAL GAP",
      tagBg: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
      id: "course-2",
      title: "System Design for High-Throughput Microservices",
      description: "Architect distributed systems: dynamic load balancers, caching partitions, and pub/sub message queues.",
      progress: 0,
      duration: "18 Hours",
      lessons: "35 Lessons",
      tag: "RECOMMENDED",
      tagBg: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      id: "course-3",
      title: "FastAPI & Python Microservices Architecture",
      description: "Build asynchronous backend APIs, define schemas, and compile database execution gates.",
      progress: 40,
      duration: "8 Hours",
      lessons: "15 Lessons",
      tag: "RECOMMENDED",
      tagBg: "bg-indigo-50 text-indigo-600 border-indigo-200"
    }
  ]);

  const roadmapSteps = [
    { sem: "Sem 3", title: "Web Basics & Core Databases", desc: "Express.js APIs, SQL schemas, data structures.", status: "Verified & Completed" },
    { sem: "Sem 4 (Current)", title: "Containers & Cloud Development", desc: "Dockerizing microservices, deploying configurations on AWS ECS.", status: "In Progress" },
    { sem: "Sem 5", title: "Orchestration & DevOps Pipelines", desc: "Kubernetes scaling namespaces, CI/CD automated test integrations.", status: "Upcoming Syllabus" },
    { sem: "Sem 6", title: "System Resilience & Industry Lab", desc: "Multi-region configurations, real-time telemetry pipelines.", status: "Upcoming Syllabus" }
  ];

  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: "Hello Deepak! I am your AI Career Advisor. I have analyzed your curriculum and verified GitHub projects. You currently have a 92% match in React/Node.js, but need to bridge gaps in Docker/AWS and System Design to align with TCS's Cloud & Full-Stack Engineer target role. How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput) return;

    const userText = userInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userText }]);
    setUserInput("");

    setTimeout(() => {
      let aiText = "I have scanned your verified profile. To progress faster, I recommend launching the 'Mastering Docker' lab. This will bridge 60% of your container deployment gap.";
      if (userText.toLowerCase().includes("resume")) {
        aiText = "Resume Summary Suggestion:\n\n'B.Tech IT student with a verified 92% proficiency in React/Node.js backend systems. Actively developing container deployment credentials on AWS.'";
      } else if (userText.toLowerCase().includes("design") || userText.toLowerCase().includes("system")) {
        aiText = "For System Design: Focus on horizontal scaling structures. I recommend reading module 3 of the Dean's approved curriculum recommendations.";
      }
      setChatLog(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 450);
  };

  const handleResumeCourse = (title) => {
    alert(`Launching Docker/Compiler sandbox workspace for "${title}"...`);
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
            Courses &amp; Micro-Lessons
          </button>
          <button 
            onClick={() => onSubTabChange('Roadmap')}
            className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
              activeSubTab === 'Roadmap' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Career Roadmap
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
            AI Career Advisor
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
                <div key={c.id} className="bg-white/80 backdrop-blur-sm border border-slate-200/70 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between h-72">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className={`text-[8px] font-extrabold px-2 py-0.5 border rounded uppercase ${c.tagBg}`}>{c.tag}</span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-tight mb-2">{c.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{c.description}</p>
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
                      <button 
                        onClick={() => handleResumeCourse(c.title)}
                        className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-600/10 transition-all"
                      >
                        {c.progress > 0 ? "Resume" : "Start Lab"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Roadmap */}
        {activeSubTab === 'Roadmap' && (
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/70 p-6 rounded-2xl shadow-sm text-left">
            <h3 className="text-sm font-extrabold text-slate-800 mb-6 border-b pb-2 flex items-center gap-1.5">
              <Milestone className="w-4 h-4 text-indigo-500" /> Learning Roadmap Milestone Path
            </h3>
            
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
              {roadmapSteps.map((step, idx) => (
                <div key={idx} className="relative pl-6 text-left">
                  <div className={`absolute left-[-21px] top-1 w-4 h-4 rounded-full border-4 border-white ${
                    step.status.includes('Completed') ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                    step.status.includes('Progress') ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]' : 'bg-slate-300'
                  }`} />
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{step.sem}</span>
                  <h4 className="font-extrabold text-sm text-slate-850 mt-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{step.desc}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded mt-2.5 inline-block border ${
                    step.status.includes('Completed') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    step.status.includes('Progress') ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
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
                <div key={idx} className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    {chat.sender === 'user' ? 'Deepak B.' : 'VidyaPrayog AI'}
                  </span>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line border ${
                    chat.sender === 'user'
                      ? 'bg-indigo-600 border-indigo-700 text-white rounded-tr-none'
                      : 'bg-white border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
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

export default LearnView;
