path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\LearnView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

nav_replacement = """            <button 
              onClick={() => onSubTabChange('Courses')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
                activeSubTab === 'Courses' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Courses & Micro-Lessons
            </button>
            <button 
              onClick={() => onSubTabChange('Code Arena ?')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
                activeSubTab === 'Code Arena ?' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Code Arena ?
            </button>
            <button 
              onClick={() => onSubTabChange('AI Advisor')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                activeSubTab === 'AI Advisor' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              <BrainCircuit className="w-4 h-4 text-indigo-500" />
              AI Career Advisor ??
            </button>"""

# Find the div containing the nav buttons
text = re.sub(r'<button \s*onClick=\{\(\) => onSubTabChange\(\'Courses\'\)\}.*?AI Career Advisor\s*</button>', nav_replacement, text, flags=re.DOTALL)

# Since I changed the key to 'Code Arena ?', I also need to change the conditional render
text = text.replace("{activeSubTab === 'Code Arena' && (", "{activeSubTab === 'Code Arena ?' && (")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated nav labels in LearnView")