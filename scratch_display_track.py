path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = text.replace('<span className="font-black text-slate-800 tracking-wide uppercase text-sm">Roadmap Progress</span>', '<span className="font-black text-slate-800 tracking-wide uppercase text-sm">{trackName} Progress</span>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated RoadmapTree track name display")