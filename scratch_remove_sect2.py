path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

start_idx = text.find("Target Job Role Preparation Benchmarks")
end_idx = text.find("Foundational & Aptitude Assessments")

print(f"start: {start_idx}, end: {end_idx}")