path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsProfileMatrixView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We want to add an upload button next to the Competency Matrix header
new_header = """      <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-slate-800 text-lg text-left">Competency Matrix</h3>
        <button 
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Upload Certificate / Badges
        </button>
      </div>"""

text = text.replace('<h3 className="font-extrabold text-slate-800 text-lg text-left mb-4">Competency Matrix</h3>', new_header)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added upload button to SkillsProfileMatrixView.jsx")