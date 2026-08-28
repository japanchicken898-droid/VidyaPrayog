import React, { useState, useMemo } from "react";
import { FULLSTACK_ROADMAP, BACKEND_ROADMAP, UX_ROADMAP, FLUTTER_ROADMAP, ML_ROADMAP } from "../../data/roadmapData";
import { BookOpen, Check, X, CheckCircle } from "lucide-react";

const ROLE_TO_TRACK = {
  "Backend & Distributed Systems Engineer": "backend",
  "Cloud & AI Systems Engineer": "backend",
  "DevOps & Site Reliability Engineer (SRE)": "backend",
  "Network & Infrastructure Security Engineer": "backend",
  "Database Administrator & SQL Architect": "backend"
};

const RoadmapTree = ({ studentProfile, onOpenCoding }) => {
  const role = (studentProfile?.targetRole || "").toLowerCase();
  
  let roadmapData = FULLSTACK_ROADMAP;
  let trackName = "Full-Stack Web Roadmap";

  if (role.includes("ux") || role.includes("ui")) {
    roadmapData = UX_ROADMAP;
    trackName = "UX Design Roadmap";
  } else if (role.includes("mobile") || role.includes("flutter")) {
    roadmapData = FLUTTER_ROADMAP;
    trackName = "Flutter Mobile Roadmap";
  } else if (role.includes("data") || role.includes("ml") || role.includes("ai")) {
    roadmapData = ML_ROADMAP;
    trackName = "Machine Learning Roadmap";
  } else if (role.includes("backend") || role.includes("cloud") || role.includes("system")) {
    roadmapData = BACKEND_ROADMAP;
    trackName = "Backend & Systems Roadmap";
  }

  const [completedNodes, setCompletedNodes] = useState([]);
  const [learningNodes, setLearningNodes] = useState([]);
  const [skippedNodes, setSkippedNodes] = useState([]);
  
  const [activePopover, setActivePopover] = useState(null);

  const allTopicNodes = useMemo(() => {
    let nodes = [];
    roadmapData.forEach(item => {
      if (item.type === "node") {
        nodes.push(item);
        if (item.left) nodes.push(...item.left);
        if (item.right) nodes.push(...item.right);
      }
    });
    return nodes;
  }, [roadmapData]);

  const totalNodes = allTopicNodes.length;
  const progressPercent = totalNodes === 0 ? 0 : Math.round((completedNodes.length / totalNodes) * 100);

  const handleAction = (action, nodeId) => {
    if (action === "learning") {
      setLearningNodes(prev => [...new Set([...prev, nodeId])]);
      setCompletedNodes(prev => prev.filter(id => id !== nodeId));
      setSkippedNodes(prev => prev.filter(id => id !== nodeId));
    } else if (action === "done") {
      setCompletedNodes(prev => [...new Set([...prev, nodeId])]);
      setLearningNodes(prev => prev.filter(id => id !== nodeId));
      setSkippedNodes(prev => prev.filter(id => id !== nodeId));
    } else if (action === "skip") {
      setSkippedNodes(prev => [...new Set([...prev, nodeId])]);
      setCompletedNodes(prev => prev.filter(id => id !== nodeId));
      setLearningNodes(prev => prev.filter(id => id !== nodeId));
    }
    setActivePopover(null);
  };

  const getNodeStyles = (id, isCenter = false) => {
    if (completedNodes.includes(id)) {
      return "bg-[#FACC15] text-slate-900 border-2 border-slate-900 line-through decoration-2";
    }
    if (learningNodes.includes(id)) {
      return "bg-blue-50 text-blue-700 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
    }
    if (skippedNodes.includes(id)) {
      return "bg-slate-100 text-slate-400 border-2 border-slate-200";
    }
    return isCenter ? "bg-white text-slate-900 border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)]" : "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-400";
  };

  const renderPopover = (id) => {
    if (activePopover !== id) return null;
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border-2 border-slate-900 p-1.5 rounded-xl shadow-[4px_4px_0px_rgba(15,23,42,1)] flex flex-col gap-1 w-36">
        <button onClick={(e) => { e.stopPropagation(); handleAction("learning", id); }} className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg">
          <BookOpen className="w-3.5 h-3.5" /> Learning
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleAction("done", id); }} className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg">
          <Check className="w-3.5 h-3.5" /> Done / Finish
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleAction("skip", id); }} className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">
          <X className="w-3.5 h-3.5" /> Skip
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center pb-20 relative">
      
      {/* Neo-brutalist Progress Bar */}
      <div className="w-full max-w-3xl mb-12 bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_rgba(15,23,42,1)] sticky top-0 z-40">
        <div className="flex justify-between items-center mb-2">
          <span className="font-black text-slate-800 tracking-wide uppercase text-sm">{trackName} Progress</span>
          <span className="font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md text-sm">{completedNodes.length} / {totalNodes} Done</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full border-2 border-slate-900 overflow-hidden relative">
          <div className="h-full bg-[#FACC15] transition-all duration-700 ease-out border-r-2 border-slate-900" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="relative flex flex-col items-center w-full max-w-4xl pt-6">
        {/* Continuous Vertical Trunk */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-slate-900 z-0" />

        {roadmapData.map((section, index) => {
          if (section.type === "label") {
            return (
              <div key={section.id} className="relative z-10 my-10 bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-widest shadow-md">
                {section.label}
              </div>
            );
          }

          if (section.type === "node") {
            return (
              <div key={section.id} className="relative z-10 w-full flex flex-col items-center my-8">
                
                {/* Center Node */}
                <div className="relative">
                  <button 
                    onClick={() => setActivePopover(activePopover === section.id ? null : section.id)}
                    className={`relative px-6 py-3 rounded-xl font-black text-sm transition-all duration-200 z-20 ${getNodeStyles(section.id, true)}`}
                  >
                    {section.label}
                    {completedNodes.includes(section.id) && <CheckCircle className="absolute -top-2 -right-2 w-5 h-5 text-emerald-500 bg-white rounded-full border-2 border-slate-900" />}
                    {learningNodes.includes(section.id) && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-blue-500 text-white text-[9px] rounded-md border border-slate-900 font-black">LEARNING</span>}
                  </button>
                  {renderPopover(section.id)}
                </div>

                {/* Branches Container */}
                <div className="w-full flex justify-between mt-8 relative">
                  
                  {/* Left Branches */}
                  <div className="w-1/2 flex flex-col items-end pr-8 gap-4 relative">
                    {section.left?.map((node, i) => (
                      <div key={node.id} className="relative w-full flex justify-end items-center">
                        {/* Dotted Branch Path to Trunk */}
                        <div className="absolute right-[-2rem] top-1/2 w-16 border-t-2 border-dashed border-blue-500 -z-10" />
                        
                        <div className="relative">
                          <button 
                            onClick={() => setActivePopover(activePopover === node.id ? null : node.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all z-20 ${getNodeStyles(node.id)}`}
                          >
                            {node.label}
                            {completedNodes.includes(node.id) && <CheckCircle className="absolute -top-1.5 -right-1.5 w-4 h-4 text-emerald-500 bg-white rounded-full border-2 border-slate-900" />}
                            {learningNodes.includes(node.id) && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-blue-500 text-white text-[9px] rounded-md border border-slate-900 font-black">LEARNING</span>}
                          </button>
                          {renderPopover(node.id)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Branches */}
                  <div className="w-1/2 flex flex-col items-start pl-8 gap-4 relative">
                    {section.right?.map((node, i) => (
                      <div key={node.id} className="relative w-full flex justify-start items-center">
                        {/* Dotted Branch Path to Trunk */}
                        <div className="absolute left-[-2rem] top-1/2 w-16 border-t-2 border-dashed border-blue-500 -z-10" />
                        
                        <div className="relative">
                          <button 
                            onClick={() => setActivePopover(activePopover === node.id ? null : node.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all z-20 ${getNodeStyles(node.id)}`}
                          >
                            {node.label}
                            {completedNodes.includes(node.id) && <CheckCircle className="absolute -top-1.5 -right-1.5 w-4 h-4 text-emerald-500 bg-white rounded-full border-2 border-slate-900" />}
                            {learningNodes.includes(node.id) && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-blue-500 text-white text-[9px] rounded-md border border-slate-900 font-black">LEARNING</span>}
                          </button>
                          {renderPopover(node.id)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      
      {/* Code Sandbox Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button onClick={onOpenCoding} className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-black text-sm shadow-[4px_4px_0px_rgba(99,102,241,1)] transition-all active:translate-y-1 active:shadow-[0px_0px_0px_rgba(99,102,241,1)]">
          Launch Code Sandbox
        </button>
      </div>

    </div>
  );
};

export default RoadmapTree;
