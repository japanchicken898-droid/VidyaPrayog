path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Remove the existing PerformanceCharts
text = re.sub(r'<div className="w-full">\s*<PerformanceCharts hasActivity=\{hasActivity\} />\s*</div>', '', text)

# Inject it at the end of the Right Column
# Find the exact pattern:
pattern = r'(</div>\s*</div>\s*</div>\s*)(</div>\s*\{/\* Lesson Reader Modal \*/\})'
replacement = r'\1  {/* Performance Charts Moved Here */}\n          <div className="w-full mt-4">\n            <PerformanceCharts hasActivity={true} />\n          </div>\n        \2'
text = re.sub(pattern, replacement, text)

with open(path, 'w', encoding='utf-8', errors='ignore') as f:
    f.write(text)
print("Moved PerformanceCharts")