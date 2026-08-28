import re

filepath = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"

content = """import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
import { ROADMAP_DATA } from "../../data/roadmapData";
import { BookOpen, Check, X, Maximize2, Minimize2 } from "lucide-react";

// TABS FOR SWITCHER
const TABS = [
  { id: "c", label: "🟡 C Programming" },
  { id: "java", label: "☕ Java Backend" },
  { id: "python", label: "🐍 Python & AI" },
  { id: "fullstack", label: "🌐 Full-Stack" },
  { id: "postgres", label: "🐘 PostgreSQL" }
];

// ----------------------------------------------------
// LOCAL STORAGE
// ----------------------------------------------------
function loadProgress() {
  try {
    const raw = localStorage.getItem("careerRoadmapProgress_v2");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveProgress(progress) {
  try {
    localStorage.setItem("careerRoadmapProgress_v2", JSON.stringify(progress));
  } catch {}
}

// ----------------------------------------------------
// SVG OVERLAY ENGINE (Dynamically connects nodes)
// ----------------------------------------------------
const SVGOverlay = ({ edges, containerRef, triggerDraw }) => {
  const [paths, setPaths] = useState([]);

  useLayoutEffect(() => {
    const draw = () => {
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const newPaths = [];

      // Find the spine backbone element to compute the exact center line X
      const spineEl = document.getElementById("spine-backbone");
      const spineX = spineEl ? (spineEl.getBoundingClientRect().left - cRect.left + spineEl.getBoundingClientRect().width / 2) : cRect.width / 2;

      edges.forEach(edge => {
        const fromEl = document.getElementById(`node-${edge.from}`);
        const toEl = document.getElementById(`node-${edge.to}`);
        if (!fromEl || !toEl) return;

        const r1 = fromEl.getBoundingClientRect();
        const r2 = toEl.getBoundingClientRect();

        // Start from center of the spine element
        const x1 = spineX; 
        const y1 = (r1.top + r1.height / 2) - cRect.top;

        // End at the inner edge of the branch element
        let x2 = (r2.left + (edge.side === "left" ? r2.width : 0)) - cRect.left;
        const y2 = (r2.top + r2.height / 2) - cRect.top;

        // Cubic Bezier: control points pull horizontally to create a smooth fan curve
        const cpX1 = x1 + (edge.side === "left" ? -40 : 40);
        const cpX2 = x2 + (edge.side === "left" ? 40 : -40);

        newPaths.push(
          <path
            key={`${edge.from}-${edge.to}`}
            d={`M ${x1} ${y1} C ${cpX1} ${y1}, ${cpX2} ${y2}, ${x2} ${y2}`}
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
          />
        );
      });
      setPaths(newPaths);
    };

    draw();
    window.addEventListener("resize", draw);
    // Observe DOM changes in case of font loading or layout shifts
    const observer = new MutationObserver(draw);
    observer.observe(containerRef.current, { childList: true, subtree: true, attributes: true });
    
    // Add a small delay draw to catch late layout shifts
    const timer = setTimeout(draw, 100);

    return () => {
      window.removeEventListener("resize", draw);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [edges, containerRef, triggerDraw]);

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      {paths}
    </svg>
  );
};

// ----------------------------------------------------
// INTERACTIVE NODE COMPONENT
// ----------------------------------------------------
function NodeBox({ id, label, status, isPopupOpen, onNodeClick, onSetStatus, variant, isPill }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!isPopupOpen) return;
    const handleClickOutside = (e) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        onNodeClick(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopupOpen, onNodeClick]);

  const isMain = variant === "main";
  const isDone = status === "done";
  const isLearning = status === "learning";
  const isSkip = status === "skip";

  // Classic retro neo-brutalist styling
  let bg = isMain ? "#fef08a" : "#ffffff"; // yellow for main, white for branches
  if (isPill) bg = "#f8fafc";
  
  let border = "2px solid #000";
  let color = "#000";
  let textDeco = "none";
  let opacity = 1;
  let shadow = isDone ? "0px 0px 0px #000" : "3px 3px 0px rgba(0,0,0,1)";
  
  if (isPill) shadow = isDone ? "none" : "2px 2px 0px rgba(0,0,0,1)";

  if (isDone) {
    bg = "#cbd5e1"; // slate-300
    color = "#475569"; // slate-600
    textDeco = "line-through";
  } else if (isLearning) {
    border = "2px solid #a855f7"; // purple-500
    color = "#7e22ce"; // purple-700
  } else if (isSkip) {
    opacity = 0.5;
  }

  return (
    <div ref={nodeRef} style={{ position: "relative", opacity, width: isMain ? 220 : "auto" }}>
      <button
        id={`node-${id}`}
        onClick={() => onNodeClick(isPopupOpen ? null : id)}
        className="text-left font-sans font-semibold transition-transform active:scale-95"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMain ? "center" : "flex-start",
          width: "100%",
          padding: isPill ? "4px 10px" : (isMain ? "12px 20px" : "8px 16px"),
          borderRadius: 6,
          fontSize: isPill ? 12 : (isMain ? 15 : 13),
          background: bg,
          border: border,
          color: color,
          textDecoration: textDeco,
          boxShadow: shadow,
          position: "relative",
          zIndex: 2,
        }}
      >
        {label}
      </button>

      {/* Done Badge */}
      {isDone && (
        <div style={{
          position: "absolute",
          top: -8,
          right: -8,
          background: "#a855f7",
          color: "white",
          borderRadius: "50%",
          width: 22,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          border: "2px solid #000"
        }}>
          <Check size={14} strokeWidth={4} />
        </div>
      )}

      {/* Action Popover */}
      {isPopupOpen && (
        <div style={{
          position: 'absolute',
          top: -50,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          border: '2px solid #000',
          borderRadius: 8,
          boxShadow: '4px 4px 0px rgba(0,0,0,1)',
          display: 'flex',
          padding: 6,
          gap: 6,
          zIndex: 100,
          animation: 'roadmapFadeIn 0.15s ease-out'
        }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onSetStatus(id, status === 'learning' ? 'not-started' : 'learning'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 12, fontWeight: 'bold', background: status === 'learning' ? '#f3e8ff' : 'transparent', color: '#7c3aed', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            <BookOpen size={14} /> Learning
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onSetStatus(id, status === 'done' ? 'not-started' : 'done'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 12, fontWeight: 'bold', background: status === 'done' ? '#dcfce7' : 'transparent', color: '#16a34a', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            <Check size={14} /> Done
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onSetStatus(id, status === 'skip' ? 'not-started' : 'skip'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 12, fontWeight: 'bold', background: status === 'skip' ? '#f1f5f9' : 'transparent', color: '#64748b', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            <X size={14} /> Skip
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// MAIN TREE RENDERER
// ----------------------------------------------------
function TrackTree({ trackData, progress, activePopup, onNodeClick, onSetStatus }) {
  const containerRef = useRef(null);
  
  // Extract all SVG edges
  const edges = useMemo(() => {
    const e = [];
    trackData.forEach(spine => {
      if (spine.type !== 'label') {
        (spine.left || []).forEach(child => e.push({ from: spine.id, to: child.id, side: "left" }));
        (spine.right || []).forEach(child => e.push({ from: spine.id, to: child.id, side: "right" }));
      }
    });
    return e;
  }, [trackData]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", padding: "40px 0" }}>
      {/* Dynamic SVG Connectors */}
      <SVGOverlay edges={edges} containerRef={containerRef} triggerDraw={trackData} />
      
      {/* Solid Backbone Spine */}
      <div 
        id="spine-backbone"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 4,
          background: "#000",
          transform: "translateX(-50%)",
          zIndex: 1
        }}
      />

      {/* Render the hierarchical rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "60px", position: "relative", zIndex: 2 }}>
        {trackData.map((spineItem, idx) => {
          
          if (spineItem.type === "label") {
            return (
              <div key={idx} style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ background: "white", padding: "8px 24px", border: "2px solid #000", borderRadius: 999, fontWeight: 900, fontSize: 18, zIndex: 2, boxShadow: "3px 3px 0px #000" }}>
                  {spineItem.label}
                </div>
              </div>
            );
          }

          // Render a Spine Node with Left/Right Branches
          return (
            <div key={spineItem.id} style={{ display: "flex", width: "100%", minHeight: 40 }}>
              
              {/* Left Branches */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: 16, paddingRight: 60 }}>
                {(spineItem.left || []).map(child => (
                  <div key={child.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: 220 }}>
                    <NodeBox id={child.id} label={child.label} status={progress[child.id]} isPopupOpen={activePopup === child.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant="branch" />
                    {/* Tertiary Pills */}
                    {child.pills && (
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8, marginTop: 12, width: "100%" }}>
                        {child.pills.map(p => (
                          <NodeBox key={p} id={p} label={p} status={progress[p]} isPopupOpen={activePopup === p} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant="branch" isPill />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Spine Node */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 240, flexShrink: 0 }}>
                <NodeBox id={spineItem.id} label={spineItem.label} status={progress[spineItem.id]} isPopupOpen={activePopup === spineItem.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant="main" />
              </div>

              {/* Right Branches */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 16, paddingLeft: 60 }}>
                {(spineItem.right || []).map(child => (
                  <div key={child.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 220 }}>
                    <NodeBox id={child.id} label={child.label} status={progress[child.id]} isPopupOpen={activePopup === child.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant="branch" />
                    {/* Tertiary Pills */}
                    {child.pills && (
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 8, marginTop: 12, width: "100%" }}>
                        {child.pills.map(p => (
                          <NodeBox key={p} id={p} label={p} status={progress[p]} isPopupOpen={activePopup === p} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant="branch" isPill />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN CONTAINER
// ----------------------------------------------------
export default function RoadmapTree() {
  const [activeTab, setActiveTab] = useState("c");
  const [progress, setProgress] = useState({});
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const trackData = useMemo(() => ROADMAP_DATA[activeTab] || [], [activeTab]);

  // Compute Total vs Done (including spine, branches, and pills)
  const { total, done } = useMemo(() => {
    let t = 0, d = 0;
    trackData.forEach(spine => {
      if (spine.type !== 'label') {
        t++; if (progress[spine.id] === 'done') d++;
        (spine.left || []).forEach(child => {
          t++; if (progress[child.id] === 'done') d++;
          (child.pills || []).forEach(p => { t++; if (progress[p] === 'done') d++; });
        });
        (spine.right || []).forEach(child => {
          t++; if (progress[child.id] === 'done') d++;
          (child.pills || []).forEach(p => { t++; if (progress[p] === 'done') d++; });
        });
      }
    });
    return { total, done };
  }, [trackData, progress]);

  function handleSetStatus(id, newStatus) {
    setProgress((prev) => {
      const updated = { ...prev, [id]: newStatus };
      saveProgress(updated);
      return updated;
    });
    setActivePopup(null);
  }

  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f8fafc", padding: "20px 0" }}>
      <style>{`
        @keyframes roadmapFadeIn {
          from { opacity: 0; transform: translateY(10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
      `}</style>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, justifyContent: "center", flexWrap: "wrap", padding: "0 20px" }}>
        {TABS.map((t) => {
          const isActive = t.id === activeTab;
          return (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setActivePopup(null); }}
              style={{
                padding: "10px 24px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 900,
                cursor: "pointer",
                border: "2px solid #000",
                background: isActive ? "#000" : "#fff",
                color: isActive ? "#fff" : "#000",
                boxShadow: isActive ? "none" : "4px 4px 0px #000",
                transform: isActive ? "translate(4px, 4px)" : "none",
                transition: "all 0.1s"
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px", padding: "0 20px" }}>
        <div style={{ flex: 1, height: 16, borderRadius: 999, background: "#fff", border: "2px solid #000", overflow: "hidden", boxShadow: "2px 2px 0px #000" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#3b82f6", transition: "width .4s ease" }} />
        </div>
        <span style={{ fontSize: 16, fontWeight: 900, color: "#000", minWidth: 100 }}>
          {done} / {total} Done
        </span>
      </div>

      {/* Map Pan/Zoom Container wrapper */}
      <div style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: 100, width: "100%" }}>
        <div style={{ minWidth: 1000, maxWidth: 1200, margin: "0 auto" }}>
          <TrackTree 
            trackData={trackData} 
            progress={progress} 
            activePopup={activePopup} 
            onNodeClick={setActivePopup} 
            onSetStatus={handleSetStatus} 
          />
        </div>
      </div>
    </div>
  );
}
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated RoadmapTree v3")
