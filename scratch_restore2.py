path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\scratch_restore_tree.py"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Find the start of the content string
start_idx = text.find('content = """') + len('content = """')
end_idx = text.rfind('"""\n\nwith open(')

react_code = text[start_idx:end_idx]

# Now modify react_code:
# 1. Change TABS out
react_code = re.sub(r'// TABS FOR SWITCHER\nconst TABS = \[.*?\];\n', '', react_code, flags=re.DOTALL)

# 2. Add ROLE_MAP
role_map = """// TARGET ROLE TO TRACK MAPPING
const ROLE_TO_TRACK = {
  "Full-Stack Web Developer (MERN / Next.js)": "fullstack",
  "Backend & Distributed Systems Engineer": "backend",
  "Mobile App Developer (Flutter / React Native)": "fullstack",
  "System Software & C++ Programmer": "c",
  "Frontend UI/UX Systems Engineer": "fullstack",
  "Data Scientist & ML Engineer": "python",
  "NLP & Generative AI Specialist": "python",
  "Computer Vision & Robotics Engineer": "python",
  "Business Intelligence & Telemetry Analyst": "postgres",
  "Cloud & AI Systems Engineer": "backend",
  "DevOps & Site Reliability Engineer (SRE)": "backend",
  "Database Administrator & SQL Architect": "postgres",
  "Network & Infrastructure Security Engineer": "backend",
  "Cybersecurity & Ethical Hacking Analyst": "c",
  "Embedded Systems & IoT Developer": "c",
  "Blockchain & Web3 Developer": "fullstack",
  "Autonomous Systems & Drone Software Engineer": "c",
  "Enterprise SAP & ERP Cloud Specialist": "java",
  "QA & Automated Testing Engineer": "java",
  "Game Developer (Unity / Unreal Engine)": "c"
};

const TRACK_TITLES = {
  fullstack: "Full-Stack Roadmap",
  backend: "Backend Architecture",
  python: "Python & AI",
  c: "C Programming",
  postgres: "PostgreSQL Database",
  java: "Java Backend"
};

import { Layers, Database, FlaskConical, Cloud, Brain, Lock, CheckCircle2 } from 'lucide-react';
"""
react_code = react_code.replace("// ----------------------------------------------------\n// LOCAL STORAGE", role_map + "\n// ----------------------------------------------------\n// LOCAL STORAGE")

# 3. Modify RoadmapTree component
old_comp = "export default function RoadmapTree() {"
new_comp = "export default function RoadmapTree({ studentProfile }) {"
react_code = react_code.replace(old_comp, new_comp)

# 4. Modify activeTab
old_state = 'const [activeTab, setActiveTab] = useState("c");'
new_state = """  const targetRole = studentProfile?.targetRole || "Default";
  const mappedTrack = ROLE_TO_TRACK[targetRole] || "fullstack";
  const [activeTab, setActiveTab] = useState(mappedTrack);

  useEffect(() => {
    setActiveTab(mappedTrack);
  }, [mappedTrack]);"""
react_code = react_code.replace(old_state, new_state)

# 5. Remove TABS rendering
tabs_render = """      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, justifyContent: "center", flexWrap: "wrap", padding: "0 20px" }}>
        {TABS.map(tab => {
          let iconUrl = "";
          if (tab.id === 'c') iconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg";
          if (tab.id === 'java') iconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
          if (tab.id === 'python') iconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
          if (tab.id === 'fullstack') iconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
          if (tab.id === 'postgres') iconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: activeTab === tab.id ? "2px solid #000" : "2px solid transparent",
                background: activeTab === tab.id ? "#fef08a" : "transparent",
                fontWeight: "bold",
                boxShadow: activeTab === tab.id ? "2px 2px 0px rgba(0,0,0,1)" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14
              }}
            >
              {iconUrl ? <img src={iconUrl} alt={tab.id} width={18} height={18} /> : null}
              {tab.label.replace(/^.*? /, '')}
            </button>
          );
        })}
      </div>"""
new_header = """      {/* Track Header & Retake */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h3 className="text-2xl font-black text-slate-800">{TRACK_TITLES[activeTab]}</h3>
          <p className="text-sm text-slate-500 font-medium">Mapped to: {targetRole !== 'Default' ? targetRole : 'General Engineering'}</p>
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('RETAKE_ONBOARDING'))}
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#64748b",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Retake Diagnostic / Change Target Role
        </button>
      </div>"""
react_code = react_code.replace(tabs_render, new_header)

# Remove Retake Button at the top if it was added there previously
# Actually it wasn't in scratch_restore_tree.py

# 6. Append Assessment Cards at the bottom of the RoadmapTree component
old_end = """      <TrackTree 
        key={activeTab}
        trackData={ROADMAP_DATA[activeTab]} 
        progress={progress}
        activePopup={activePopup}
        onNodeClick={setActivePopup}
        onSetStatus={handleSetStatus}
      />
    </div>
  );
}"""

assessments_code = """      <TrackTree 
        key={activeTab}
        trackData={ROADMAP_DATA[activeTab]} 
        progress={progress}
        activePopup={activePopup}
        onNodeClick={setActivePopup}
        onSetStatus={handleSetStatus}
      />

      {/* Target Job Role Preparation Section */}
      <section className="bg-white/80 border border-slate-200 rounded-3xl p-8 shadow-sm mt-16 text-left mx-5">
        <div className="flex items-start justify-between mb-1 text-left">
          <div>
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="text-xl">??</span> Target Job Role Preparation
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-medium">In-depth technical evaluations aligned with your {targetRole} profile.</p>
          </div>
        </div>
        <div className="border-t border-slate-100 mt-6 mb-6" />

        <div className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">{TRACK_TITLES[activeTab]} Diagnostic</h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Aligned to: {targetRole}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Overall Match</span>
              <span className="text-2xl font-black text-slate-800">88<span className="text-base text-slate-400">%</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className={`bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between`}>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center`}>
                      <Layers className={`w-4 h-4 text-indigo-600`} />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">Core Foundations Quiz</h4>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  <div className={`h-1.5 w-full rounded-full bg-indigo-400`} />
                  <div className={`h-1.5 w-full rounded-full bg-indigo-400`} />
                  <div className={`h-1.5 w-full rounded-full bg-slate-200`} />
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Best: <strong className={`text-indigo-600 font-extrabold`}>88%</strong></span>
                <button className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                  Retake ?
                </button>
              </div>
            </div>

            <div className={`bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between`}>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center`}>
                      <Database className={`w-4 h-4 text-emerald-600`} />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">Advanced Architecture</h4>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  <div className={`h-1.5 w-full rounded-full bg-slate-200`} />
                  <div className={`h-1.5 w-full rounded-full bg-slate-200`} />
                  <div className={`h-1.5 w-full rounded-full bg-slate-200`} />
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Best: <strong className={`text-slate-400 font-extrabold`}>--</strong></span>
                <button className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-0.5">
                  Start ?
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}"""
react_code = react_code.replace(old_end, assessments_code)

target_path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(react_code)
print("Restored RoadmapTree with Target Role mapping!")