path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove the line containing career-roadmap
text = re.sub(r'\s*\{\s*id:\s*\'career-roadmap\'.*?\}', '', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed career-roadmap from sidebar navigation")