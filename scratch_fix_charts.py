path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\PerformanceCharts.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove animateIn hooks
text = re.sub(r'const \[animateIn, setAnimateIn\].*?\}, \[\]\);\s*', '', text, flags=re.DOTALL)

# Replace (hasActivity && animateIn) ? with just True for the ternary
text = text.replace("(hasActivity && animateIn)", "true")
text = text.replace("hasActivity = false", "hasActivity = true")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated PerformanceCharts")