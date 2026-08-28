path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsProfileMatrixView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add studentProfile to props
text = text.replace("const SkillsProfileMatrixView = ({ \n  activeSubTab = 'Profile & Matrix', \n  onSubTabChange, \n  onOpenUpload \n}) => {", 
                    "const SkillsProfileMatrixView = ({ \n  studentProfile, \n  activeSubTab = 'Profile & Matrix', \n  onSubTabChange, \n  onOpenUpload \n}) => {")


# Replace static categories and skillsList
dynamic_logic = """  const role = studentProfile?.targetRole || 'Full-Stack Developer';
  const isFrontend = role.toLowerCase().includes('front') || role.toLowerCase().includes('ui');
  const isDataAI = role.toLowerCase().includes('ai') || role.toLowerCase().includes('data');

  const categories = isFrontend ? [
    { id: 'All', name: 'Role Skills' },
    { id: 'UI', name: 'UI & Styling' },
    { id: 'JS', name: 'JavaScript Ecosystem' },
    { id: 'CoreCS', name: 'Core CS' }
  ] : isDataAI ? [
    { id: 'All', name: 'Role Skills' },
    { id: 'ML', name: 'Machine Learning' },
    { id: 'Data', name: 'Data Engineering' },
    { id: 'CoreCS', name: 'Core CS' }
  ] : [
    { id: 'All', name: 'Role Skills' },
    { id: 'Frontend', name: 'Frontend' },
    { id: 'Backend', name: 'Backend & APIs' },
    { id: 'DevOps', name: 'DevOps & Cloud' },
    { id: 'Databases', name: 'Databases' },
    { id: 'CoreCS', name: 'Core CS' }
  ];

  const skillsList = isFrontend ? [
    { name: "React.js", category: "JS", level: "Expert", score: 94, status: "Verified", statusText: "Verified via Diagnostic", color: "bg-emerald-500" },
    { name: "CSS/Tailwind", category: "UI", level: "Advanced", score: 85, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" },
    { name: "JavaScript", category: "JS", level: "Advanced", score: 88, status: "Verified", statusText: "Verified via Lab", color: "bg-emerald-500" },
    { name: "System Design", category: "CoreCS", level: "Intermediate", score: 62, status: "Pending", statusText: "Assessment Pending", color: "bg-amber-500" }
  ] : isDataAI ? [
    { name: "Python", category: "Data", level: "Expert", score: 92, status: "Verified", statusText: "Verified via Diagnostic", color: "bg-emerald-500" },
    { name: "PyTorch", category: "ML", level: "Developing", score: 45, status: "Pending", statusText: "Assessment Pending", color: "bg-rose-500" },
    { name: "SQL", category: "Data", level: "Advanced", score: 84, status: "Verified", statusText: "Verified via Lab", color: "bg-emerald-500" },
    { name: "Algorithms", category: "CoreCS", level: "Advanced", score: 80, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" }
  ] : [
    { name: "Python", category: "Backend", level: "Intermediate", score: 56, status: "Verified", statusText: "Verified via Hackathon", color: "bg-emerald-500" },
    { name: "SQL", category: "Databases", level: "Advanced", score: 64, status: "Verified", statusText: "Verified via Lab Exam", color: "bg-emerald-500" },
    { name: "FastAPI", category: "Backend", level: "Expert", score: 85, status: "Verified", statusText: "Verified via Assessment", color: "bg-emerald-500" },
    { name: "Kubernetes", category: "DevOps", level: "Developing", score: 35, status: "Pending", statusText: "Assessment Pending", color: "bg-rose-500" },
    { name: "React.js", category: "Frontend", level: "Expert", score: 94, status: "Verified", statusText: "Verified via Proctored Diagnostic", color: "bg-emerald-500" },
    { name: "Node.js", category: "Backend", level: "Advanced", score: 88, status: "Verified", statusText: "Verified via Assessment", color: "bg-emerald-500" },
    { name: "Docker", category: "DevOps", level: "Intermediate", score: 62, status: "Pending", statusText: "Self-Assessed + Lab in progress", color: "bg-amber-500" }
  ];"""

text = re.sub(r'  const categories = \[.*?\];', '', text, flags=re.DOTALL)
text = re.sub(r'  const skillsList = \[.*?\];', dynamic_logic, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Matrix Logic")