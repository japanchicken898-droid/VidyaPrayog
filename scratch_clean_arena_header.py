path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove close button
text = re.sub(r'<button onClick=\{onClose\}[^>]*>\s*<X className="w-5 h-5" />\s*</button>', '', text)

# Change Title to Code Arena
text = text.replace("Coding Practice Portal", "Code Arena")

# Replace header background to match tab style
old_header = """<div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">"""
new_header = """<div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">"""
text = text.replace(old_header, new_header)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Cleaned up CodeArenaView header")