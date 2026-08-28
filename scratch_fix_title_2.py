path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

new_title_logic = """  const displayTitle = problem.title.replace(/^(C\\+\\+|C|Java|Python|JavaScript|JS)\\s+/i, '');

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] text-slate-300 flex flex-col font-sans animate-fade-in">"""

text = text.replace('  return (\n    <div className="fixed inset-0 z-50 bg-[#0f172a] text-slate-300 flex flex-col font-sans animate-fade-in">', new_title_logic)

text = text.replace('<h1 className="text-2xl font-black text-white">{problem.title}</h1>', '<h1 className="text-2xl font-black text-white">{displayTitle}</h1>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated CodingSandboxModal.jsx to strip language from title")