path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\LearnView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add the Code Arena tab navigation
nav_replacement = """            <button 
              onClick={() => onSubTabChange('Courses')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
                activeSubTab === 'Courses' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Courses & Paths
            </button>
            <button 
              onClick={() => onSubTabChange('Code Arena')}
              className={`pb-2.5 px-1 text-sm font-bold transition-all relative ${
                activeSubTab === 'Code Arena' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold' 
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Code Arena
            </button>
            <button 
              onClick={() => onSubTabChange('AI Advisor')}"""

text = re.sub(r'            <button \s*onClick=\{\(\) => onSubTabChange\(\'Courses\'\)\}.*?</button>\s*<button \s*onClick=\{\(\) => onSubTabChange\(\'AI Advisor\'\)\}', nav_replacement, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated nav tabs in LearnView")