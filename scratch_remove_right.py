path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Change column span so it takes the full width
text = text.replace('col-span-12 lg:col-span-8', 'col-span-12')

# Use regex to remove the entire Right Column div
match = re.search(r"(\s*\{/\* [^\n]*Right Column.*?)(?=\s*</div>\s*</div>\s*\);)", text, flags=re.DOTALL)
if match:
    right_col = match.group(1)
    new_text = text.replace(right_col, "")
    with open(path, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(new_text)
    print("Removed Right Column")
else:
    print("Could not find Right Column")