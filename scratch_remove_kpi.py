import re

path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Locate the block to remove
match = re.search(r"(\s*\{/\* KPI Cards Grid \*/\}.*?)(?=\s*<div className=\"grid grid-cols-12 gap-6\">)", text, flags=re.DOTALL)

if match:
    block = match.group(1)
    new_text = text.replace(block, "")
    with open(path, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(new_text)
    print("KPI Cards Grid removed")
else:
    # Alternative match if the class name is just 'col-span-12' now since I modified it earlier
    match2 = re.search(r"(\s*\{/\* KPI Cards Grid \*/\}.*?)(?=\s*<div className=\"col-span-12 space-y-7\">|\s*<div className=\"col-span-12)", text, flags=re.DOTALL)
    if match2:
        block = match2.group(1)
        new_text = text.replace(block, "")
        with open(path, 'w', encoding='utf-8', errors='ignore') as f:
            f.write(new_text)
        print("KPI Cards Grid removed (alternative match)")
    else:
        print("Could not find KPI Cards Grid")