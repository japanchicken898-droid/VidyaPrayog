path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsRoadmapView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('<div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden p-6 relative">',
                    '<div className="w-full min-h-[1200px] overflow-y-auto overflow-x-auto p-8 relative bg-slate-50/50 rounded-2xl border border-slate-200/70 shadow-inner">')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated wrapper in SkillsRoadmapView")