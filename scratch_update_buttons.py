path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = re.sub(r'Launch Aptitude Test', 'Solve Aptitude', text)
text = re.sub(r'Launch Coding Sandbox', 'Solve Code Arena', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated button text")