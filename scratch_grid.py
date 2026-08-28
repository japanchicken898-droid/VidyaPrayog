path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsGapAnalysisView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('className="col-span-12 lg:col-span-7 space-y-6"', 'className="col-span-12 space-y-6"')
text = text.replace('className="col-span-12 lg:col-span-5 space-y-6"', 'className="hidden"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated grid")