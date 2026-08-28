path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

match = re.search(r"(\s*\{/\* [^\n]*SECTION 2: Target Job Role Preparation.*?</section>)(?=\s*</div>\s*\{/\* [^\n]*Right Column)", text, flags=re.DOTALL)
if match:
    section2 = match.group(1)
    with open('section2.txt', 'w', encoding='utf-8') as f:
        f.write(section2)
    print("Section 2 extracted")
    
    new_text = text.replace(section2, "")
    with open(path, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(new_text)
    print("Section 2 removed from SkillsAssessmentView")
else:
    print("Not found")