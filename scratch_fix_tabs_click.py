path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Fix the TABS button onClick
text = text.replace("onClick={() => { setActiveTab(t.id); onNodeClick(null); }}", "onClick={() => { setActiveTab(t.id); setActivePopup(null); }}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed onNodeClick in TABS")