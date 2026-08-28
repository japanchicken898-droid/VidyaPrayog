path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'const [A-Z_]+_TABS = \[.*?\];', text, flags=re.DOTALL)
for m in matches:
    print(m)

nav_match = re.search(r'<nav className="space-y-2">.*?</nav>', text, flags=re.DOTALL)
if nav_match:
    print("\nNAV BAR:")
    print(nav_match.group(0)[:500])