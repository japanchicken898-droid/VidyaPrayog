path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add imports for Code, FileText
text = text.replace("import { Layers, Database, FlaskConical, Cloud, Brain, Lock, CheckCircle2 } from 'lucide-react';", "import { Layers, Database, FlaskConical, Cloud, Brain, Lock, CheckCircle2, Code2, ExternalLink } from 'lucide-react';")

# Find the popup block
popup_code = """          <div style={{
            position: "absolute", left: isMain ? 230 : "50%", top: isMain ? 0 : "110%", transform: isMain ? "none" : "translateX(-50%)",
            background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 8, zIndex: 100, display: "flex", gap: 8, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
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
          </div>"""

# Replace it with a block that includes "Code Sandbox" and "Resources"
new_popup = """          <div style={{
            position: "absolute", left: isMain ? 230 : "50%", top: isMain ? 0 : "110%", transform: isMain ? "none" : "translateX(-50%)",
            background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px", zIndex: 100, display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
          }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <button 
                onClick={(e) => { e.stopPropagation(); onSetStatus(id, status === 'learning' ? 'not-started' : 'learning'); }}
                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', fontSize: 12, fontWeight: 'bold', background: status === 'learning' ? '#f3e8ff' : '#f8fafc', color: status === 'learning' ? '#7c3aed' : '#64748b', border: '1px solid', borderColor: status === 'learning' ? '#d8b4fe' : '#e2e8f0', borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <BookOpen size={14} /> Learning
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onSetStatus(id, status === 'done' ? 'not-started' : 'done'); }}
                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', fontSize: 12, fontWeight: 'bold', background: status === 'done' ? '#dcfce7' : '#f8fafc', color: status === 'done' ? '#16a34a' : '#64748b', border: '1px solid', borderColor: status === 'done' ? '#bbf7d0' : '#e2e8f0', borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Check size={14} /> Finish
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('OPEN_CODING_SANDBOX')); setActivePopup(null); }}
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 12, fontWeight: 'bold', background: '#4f46e5', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)' }}
              >
                <Code2 size={14} /> Code Sandbox
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); window.open('https://roadmap.sh', '_blank'); setActivePopup(null); }}
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 12, fontWeight: 'bold', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 8, cursor: 'pointer' }}
              >
                <ExternalLink size={14} /> Connect
              </button>
            </div>
          </div>"""

# Ensure it actually replaces correctly by escaping correctly or just using regex.
text = re.sub(r'<div style=\{\{\s*position: "absolute", left: isMain \? 230 : "50%".*?</button>\s*</div>', new_popup, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated RoadmapTree popup")