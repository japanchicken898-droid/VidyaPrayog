path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OnboardingFlow.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove the duplicate colorClasses
text = re.sub(r'const color = correctCount === 5 \? \'emerald\' : correctCount >= 3 \? \'amber\' : \'slate\';\s*const colorClasses = \{\s*slate: "bg-slate-100 text-slate-700 border-slate-300",\s*amber: "bg-amber-100 text-amber-700 border-amber-300",\s*emerald: "bg-emerald-100 text-emerald-700 border-emerald-300",\s*\};', 'const color = correctCount === 5 ? \'emerald\' : correctCount >= 3 ? \'amber\' : \'slate\';', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed duplicate colorClasses in OnboardingFlow.jsx")