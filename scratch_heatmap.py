path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ActivityHeatmap.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Change from Dark to Light theme
text = text.replace("bg-[#0B1120]", "bg-white")
text = text.replace("border-slate-800", "border-slate-200")
text = text.replace("text-white", "text-slate-800")
text = text.replace("text-slate-400", "text-slate-500")
# bg-[#161E2E] (empty) -> bg-slate-100 border-slate-200
text = text.replace("bg-[#161E2E] border-[#161E2E]", "bg-slate-100 border-slate-200")
text = text.replace("bg-[#161E2E]", "bg-slate-100")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Heatmap Theme")