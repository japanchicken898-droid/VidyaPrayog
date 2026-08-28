path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Update imports
text = text.replace('import { FULLSTACK_ROADMAP, BACKEND_ROADMAP } from "../../data/roadmapData";', 'import { FULLSTACK_ROADMAP, BACKEND_ROADMAP, UX_ROADMAP, FLUTTER_ROADMAP, ML_ROADMAP } from "../../data/roadmapData";')

# Completely replace the roadmap selection logic inside RoadmapTree
new_logic = """const RoadmapTree = ({ studentProfile, onOpenCoding }) => {
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

  const [completedNodes, setCompletedNodes] = useState([]);"""

text = re.sub(r'const RoadmapTree = \(\{ studentProfile, onOpenCoding \}\) => \{.*?(?=const \[completedNodes)', new_logic, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated RoadmapTree.jsx to dynamically select UX, ML, and Flutter roadmaps")