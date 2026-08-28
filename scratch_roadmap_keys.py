path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\data\roadmapData.js"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r"export const [A-Z_]+_ROADMAP", text)
print(matches)