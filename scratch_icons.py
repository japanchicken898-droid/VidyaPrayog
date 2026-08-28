import re
path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

new_tabs = """const TABS = [
  { id: "c", label: "C Programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { id: "java", label: "Java Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { id: "python", label: "Python & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { id: "fullstack", label: "Full-Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { id: "postgres", label: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { id: "backend", label: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" }
];"""

text = re.sub(r'const TABS = \[.*?\];', new_tabs, text, flags=re.DOTALL)

old_render = """              <button
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
              </button>"""

new_render = """              <button
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
                  transition: "all 0.1s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <img src={t.icon} alt={t.id} style={{ width: 18, height: 18, filter: isActive ? "drop-shadow(0px 0px 1px white)" : "none" }} />
                {t.label}
              </button>"""

text = text.replace(old_render, new_render)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Tabs with Icons")