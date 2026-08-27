import React, { useState, useEffect } from 'react';

const SkillConstellation = ({ onTabChange, overallMatch, onAction }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [simulatedK8s, setSimulatedK8s] = useState(false);
  const [simulatedRedis, setSimulatedRedis] = useState(false);
  const [hubReadiness, setHubReadiness] = useState(84);

  // Smooth count-up effect for Central Hub Readiness Score
  useEffect(() => {
    let target = 84;
    if (simulatedK8s && simulatedRedis) target = 99;
    else if (simulatedK8s) target = 96;
    else if (simulatedRedis) target = 89;

    let start = hubReadiness;
    if (start === target) return;

    const duration = 800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (target - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= target) || (increment < 0 && start <= target)) {
        setHubReadiness(target);
        clearInterval(timer);
      } else {
        setHubReadiness(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [simulatedK8s, simulatedRedis]);

  const nodes = [
    {
      id: 'docker',
      label: 'Docker Runtime',
      proficiency: 85,
      required: 70,
      status: 'Mastered',
      color: '#10B981', // Emerald
      bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      category: 'Containerization',
      x: 90,
      y: 90,
      hoursToClear: 0,
      course: 'Docker and Kubernetes: The Complete Guide',
      link: 'https://www.coursera.org/learn/docker-introduction'
    },
    {
      id: 'k8s',
      label: 'Kubernetes Orchestration',
      proficiency: simulatedK8s ? 90 : 35,
      required: 80,
      status: simulatedK8s ? 'Mastered' : 'Deficit',
      color: simulatedK8s ? '#10B981' : '#EF4444', // Emerald vs Red
      bgLight: simulatedK8s ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200',
      category: 'Cloud Native',
      x: 180,
      y: 40,
      hoursToClear: simulatedK8s ? 0 : 18,
      course: 'Architecting with Google Kubernetes Engine',
      link: 'https://www.coursera.org/learn/google-kubernetes-engine'
    },
    {
      id: 'cicd',
      label: 'CI/CD GitHub Actions',
      proficiency: 65,
      required: 75,
      status: 'In-Progress',
      color: '#F59E0B', // Amber
      bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
      category: 'DevOps Pipelines',
      x: 320,
      y: 40,
      hoursToClear: 6,
      course: 'GitHub Actions: Continuous Integration and Delivery',
      link: 'https://www.coursera.org/learn/github-actions'
    },
    {
      id: 'microservices',
      label: 'Microservices & API Gateway',
      proficiency: 90,
      required: 80,
      status: 'Mastered',
      color: '#10B981', // Emerald
      bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      category: 'System Architecture',
      x: 410,
      y: 90,
      hoursToClear: 0,
      course: 'Microservices with Node JS and React',
      link: 'https://www.coursera.org/learn/microservices-architecture'
    },
    {
      id: 'redis',
      label: 'Distributed Caching (Redis)',
      proficiency: simulatedRedis ? 80 : 40,
      required: 75,
      status: simulatedRedis ? 'Mastered' : 'Deficit',
      color: simulatedRedis ? '#10B981' : '#EF4444', // Emerald vs Red
      bgLight: simulatedRedis ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200',
      category: 'Caching & Scaling',
      x: 250,
      y: 250,
      hoursToClear: simulatedRedis ? 0 : 8,
      course: 'Redis University: Scaling and Performance',
      link: 'https://www.coursera.org/learn/redis-databases'
    }
  ];

  // Radar chart axes definition
  const radarAxes = [
    { label: 'Docker', key: 'docker', angle: 0 },
    { label: 'K8s', key: 'k8s', angle: 72 },
    { label: 'CI/CD', key: 'cicd', angle: 144 },
    { label: 'Microservices', key: 'microservices', angle: 216 },
    { label: 'Redis', key: 'redis', angle: 288 }
  ];

  const getRadarPoint = (axis, value) => {
    const r = (value / 100) * 45; // Max radius is 45
    const angleRad = (axis.angle - 90) * (Math.PI / 180);
    const x = 60 + r * Math.cos(angleRad);
    const y = 60 + r * Math.sin(angleRad);
    return `${x},${y}`;
  };

  const currentPoints = radarAxes.map(axis => {
    const nodeObj = nodes.find(n => n.id === axis.key);
    return getRadarPoint(axis, nodeObj.proficiency);
  }).join(' ');

  const targetPoints = radarAxes.map(axis => {
    const nodeObj = nodes.find(n => n.id === axis.key);
    return getRadarPoint(axis, nodeObj.required);
  }).join(' ');

  const activeNode = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  return (
    <div className="bg-white/75 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden font-sans w-full hover:shadow-md transition-all duration-200">
      {/* Grid Dot-Matrix Background Overlay */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
        backgroundSize: '16px 16px'
      }} />

      <div className="flex flex-col xl:flex-row gap-6 relative z-10">
        
        {/* Left Side: SVG Constellation Graph */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="text-left">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Dependency Constellation</span>
              <h4 className="text-base font-extrabold text-slate-800 mt-0.5">Skill Dependencies & Readiness Flow</h4>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setSimulatedK8s(false); setSimulatedRedis(false); }} 
                className="px-2.5 py-1 text-[10px] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-xl transition-all font-extrabold cursor-pointer active:scale-95 shadow-sm"
              >
                Reset Sim
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-[500px] h-[320px] bg-slate-50/50 border border-slate-200/85 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
            
            <svg width="500" height="320" viewBox="0 0 500 320" className="w-full h-full">
              {/* Dynamic Connecting Edges */}
              
              {/* Edge 1: Docker -> GKE */}
              <path 
                id="edge-docker-k8s" 
                d="M 90,90 Q 135,65 180,40" 
                fill="none" 
                stroke={simulatedK8s ? '#3B82F6' : '#cbd5e1'} 
                strokeWidth={simulatedK8s ? '2.5' : '1.5'} 
                className="transition-colors duration-500"
              />
              <circle r="3" fill={simulatedK8s ? '#3B82F6' : '#10B981'}>
                <animateMotion dur="2.2s" repeatCount="indefinite">
                  <mpath href="#edge-docker-k8s" />
                </animateMotion>
              </circle>

              {/* Edge 2: GKE -> Microservices */}
              <path 
                id="edge-k8s-ms" 
                d="M 180,40 Q 295,65 410,90" 
                fill="none" 
                stroke={simulatedK8s ? '#3B82F6' : '#cbd5e1'} 
                strokeWidth={simulatedK8s ? '2.5' : '1.5'}
                className="transition-colors duration-500"
              />
              <circle r="3" fill={simulatedK8s ? '#3B82F6' : '#EF4444'}>
                <animateMotion dur="2.8s" repeatCount="indefinite">
                  <mpath href="#edge-k8s-ms" />
                </animateMotion>
              </circle>

              {/* Hub connections */}
              <path id="hub-docker" d="M 90,90 Q 170,125 250,160" fill="none" stroke="#cbd5e1" strokeWidth="1" />
              <circle r="2.5" fill="#10B981">
                <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#hub-docker" /></animateMotion>
              </circle>

              <path id="hub-k8s" d="M 180,40 Q 215,100 250,160" fill="none" stroke={simulatedK8s ? '#3B82F6' : '#cbd5e1'} strokeWidth="1" />
              <circle r="2.5" fill={simulatedK8s ? '#3B82F6' : '#EF4444'}>
                <animateMotion dur="3.5s" repeatCount="indefinite"><mpath href="#hub-k8s" /></animateMotion>
              </circle>

              <path id="hub-cicd" d="M 320,40 Q 285,100 250,160" fill="none" stroke="#cbd5e1" strokeWidth="1" />
              <circle r="2.5" fill="#F59E0B">
                <animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#hub-cicd" /></animateMotion>
              </circle>

              <path id="hub-ms" d="M 410,90 Q 330,125 250,160" fill="none" stroke="#cbd5e1" strokeWidth="1" />
              <circle r="2.5" fill="#10B981">
                <animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#hub-ms" /></animateMotion>
              </circle>

              <path id="hub-redis" d="M 250,250 Q 250,205 250,160" fill="none" stroke={simulatedRedis ? '#3B82F6' : '#cbd5e1'} strokeWidth="1" />
              <circle r="2.5" fill={simulatedRedis ? '#3B82F6' : '#EF4444'}>
                <animateMotion dur="4s" repeatCount="indefinite"><mpath href="#hub-redis" /></animateMotion>
              </circle>

              {/* Central Core Hub Node */}
              <g className="cursor-default select-none">
                {/* Glow ring */}
                <circle cx="250" cy="160" r="32" fill="#4f46e5" fillOpacity="0.05" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3,3" className="animate-spin" style={{ transformOrigin: '250px 160px', animationDuration: '20s' }} />
                <circle cx="250" cy="160" r="26" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" className="filter drop-shadow-[0_2px_4px_rgba(99,102,241,0.2)]" />
                <text x="250" y="155" textAnchor="middle" fill="#6366f1" className="text-[8px] font-black tracking-wider">READINESS</text>
                <text x="250" y="171" textAnchor="middle" fill="#1e293b" className="text-sm font-black tracking-tight">{hubReadiness}%</text>
              </g>

              {/* Constellation Nodes */}
              {nodes.map(node => {
                const isSelected = selectedNode === node.id;
                const isDimmed = selectedNode && !isSelected;
                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node.id)}
                    className="cursor-pointer group"
                    style={{ opacity: isDimmed ? 0.35 : 1, transition: 'all 300ms' }}
                  >
                    {/* Node Glow / Indicator Ring */}
                    <circle cx="0" cy="0" r="18" fill="none" stroke={node.color} strokeWidth={isSelected ? '3.5' : '1.5'} strokeDasharray={node.status === 'In-Progress' ? '3,3' : 'none'} className={`${isSelected ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} filter`} style={{ stroke: node.color, filter: `drop-shadow(0 1px 2px ${node.color}33)` }} />
                    <circle cx="0" cy="0" r="14" fill="#ffffff" />
                    
                    {/* Mastery Level Badge */}
                    <text x="0" y="3" textAnchor="middle" fill="#334155" className="text-[9px] font-black">{node.proficiency}%</text>
                    
                    {/* Floating pill label overlay (Rich Tooltip Style on hover) */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
                      <rect x="-65" y="-35" width="130" height="24" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                      <text x="0" y="-23" textAnchor="middle" fill="#ffffff" className="text-[8px] font-extrabold">{node.label}</text>
                      <text x="0" y="-14" textAnchor="middle" fill={node.color} className="text-[7px] font-bold uppercase">{node.status} • {node.hoursToClear}h left</text>
                    </g>
                  </g>
                );
              })}
            </svg>
            
            {/* Overlay description pill */}
            <div className="absolute bottom-3 left-4 bg-white/95 border border-slate-200/80 px-3 py-1.5 rounded-full text-[10px] text-slate-500 font-semibold flex gap-3.5 select-none shadow-sm">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Mastered</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> In-Progress</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Deficit</span>
            </div>

            <div className="absolute top-3 right-4 text-[9px] text-slate-400 font-black tracking-widest uppercase bg-white/90 px-2 py-0.5 rounded-lg border border-slate-200/60 shadow-sm">
              Interactive Hub
            </div>
          </div>
        </div>

        {/* Right Side: Node Diagnostic Inspection Workbench */}
        <div className="w-full xl:w-[220px] flex flex-col justify-between bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 font-sans text-left">
          
          {activeNode ? (
            <div className="flex flex-col justify-between h-full space-y-4 animate-scale-in">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[8px] bg-slate-100 border border-slate-200 text-indigo-600 px-2 py-0.5 rounded-lg font-black tracking-wider uppercase">
                    {activeNode.category}
                  </span>
                  <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
                <h5 className="text-xs font-black text-slate-800 mt-1.5 leading-snug">{activeNode.label}</h5>
                <p className="text-[10px] text-slate-500 mt-1">Status: <span className="font-bold" style={{ color: activeNode.color }}>{activeNode.status}</span></p>

                {/* Live Competency Gauge & Circular Radial Progress */}
                <div className="flex items-center gap-3.5 my-3 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <circle cx="24" cy="24" r="20" fill="none" stroke={activeNode.color} strokeWidth="3" strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset={`${2 * Math.PI * 20 * (1 - activeNode.proficiency / 100)}`} className="transition-all duration-700" />
                    </svg>
                    <span className="absolute text-[9px] font-black text-slate-700">{activeNode.proficiency}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Industry Req</span>
                    <span className="text-[11px] font-bold text-slate-750 mt-0.5">{activeNode.required}% Proficiency</span>
                  </div>
                </div>

                {/* What-If Simulation Trigger for Deficit Nodes */}
                {(activeNode.id === 'k8s' || activeNode.id === 'redis') && activeNode.status === 'Deficit' && (
                  <button 
                    onClick={() => {
                      if (activeNode.id === 'k8s') setSimulatedK8s(true);
                      if (activeNode.id === 'redis') setSimulatedRedis(true);
                      onAction('TOAST', `Simulated mastery on ${activeNode.label}! Readiness boosted.`);
                    }}
                    className="w-full py-1.5 mb-2 bg-indigo-50 hover:bg-indigo-600 border border-indigo-200 text-indigo-600 hover:text-white rounded-lg text-[9px] font-extrabold transition-all duration-250 cursor-pointer text-center"
                  >
                    Simulate Mastery 💡
                  </button>
                )}

                {/* Bridge Deficit Sandbox CTA */}
                {activeNode.status !== 'Mastered' ? (
                  <button 
                    onClick={() => {
                      onAction('TOAST', `Loading terminal sandbox for ${activeNode.label}...`);
                      if (onAction) onAction('DOCKER_ASSESSMENT'); // navigates to sandbox or assessment
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[9px] font-black tracking-wider uppercase shadow-md active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[10px]">terminal</span> Launch Sandbox 🚀
                  </button>
                ) : (
                  <div className="py-2 border border-emerald-500/20 bg-emerald-500/5 rounded-xl text-[9px] font-black text-emerald-600 text-center uppercase tracking-wider">
                    Badge Verified ✓
                  </div>
                )}
              </div>

              {/* Curated Course Card Mapping */}
              <div className="border border-slate-200/80 bg-white/60 rounded-xl p-2.5 shadow-sm">
                <span className="text-[7px] font-black text-indigo-500 uppercase tracking-widest block">Mapped Course</span>
                <span className="text-[10px] font-bold text-slate-700 mt-1 block truncate leading-tight">{activeNode.course}</span>
                <a 
                  href={activeNode.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-0.5 text-[8px] text-indigo-600 hover:text-indigo-700 font-extrabold mt-2 hover:underline cursor-pointer"
                >
                  Go to Coursera <span className="material-symbols-outlined text-[8px]">launch</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest block">Accreditation Radar</span>
                <h5 className="text-xs font-black text-slate-700 mt-0.5">Dual-Layer Skill DNA</h5>
                <p className="text-[9px] text-slate-400 mt-1 leading-normal">Interactive Radar overlay showing verified skill DNA vs Target Placement requirement.</p>

                {/* Dual-Layer Skill DNA Radar Polygon overlay */}
                <div className="flex items-center justify-center my-4 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-sm">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="w-[100px] h-[100px]">
                    {/* Radar concentric rings */}
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" strokeWidth="0.75" />
                    <circle cx="60" cy="60" r="30" fill="none" stroke="#f1f5f9" strokeWidth="0.75" />
                    <circle cx="60" cy="60" r="15" fill="none" stroke="#f1f5f9" strokeWidth="0.75" />
                    
                    {/* Radar spokes */}
                    {radarAxes.map((axis, i) => {
                      const angleRad = (axis.angle - 90) * (Math.PI / 180);
                      return (
                        <line 
                          key={i} 
                          x1="60" 
                          y1="60" 
                          x2={`${60 + 45 * Math.cos(angleRad)}`} 
                          y2={`${60 + 45 * Math.sin(angleRad)}`} 
                          stroke="#f1f5f9" 
                          strokeWidth="0.75" 
                        />
                      );
                    })}

                    {/* Target DNA Poly */}
                    <polygon points={targetPoints} fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                    
                    {/* Current DNA Poly */}
                    <polygon points={currentPoints} fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5" className="transition-all duration-500" />
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[8px] font-bold text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Profile</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> Target</span>
                </div>
              </div>

              <div className="bg-white/90 border border-slate-200/80 rounded-xl p-2.5 text-center text-[10px] text-slate-500 font-semibold select-none shadow-sm">
                👉 Click any node to open Diagnostic Workbench.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SkillConstellation;
