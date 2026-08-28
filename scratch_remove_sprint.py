path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsGapAnalysisView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Match the AI Sprint block inside the Right Column
match = re.search(r'(\s*\{/\* AI Sprint \*/\}\s*<div className="bg-indigo-950.*?</div>\s*</div>\s*</div>)', text, flags=re.DOTALL)
if match:
    block = match.group(1)
    new_text = text.replace(block, "")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Removed AI Sprint")
else:
    print("Could not find AI Sprint")