path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = text.replace('Solve Aptitude', 'Solve Aptitude &rarr;')

new_coding_card = """              {/* Card 2 - Coding Assessment */}
              <div className="group relative bg-gradient-to-r from-violet-50/60 to-indigo-50/40 border border-violet-200/70 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-violet-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-violet-500 to-indigo-600" />
                <div className="flex-1 pl-3">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h3 className="text-sm font-extrabold text-slate-800">Coding Assessment</h3>
                    <span className="px-2.5 py-0.5 bg-violet-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">5 PROBLEMS * PROCTORED BENCHMARK</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Standard baseline evaluation to test algorithmic problem-solving and role-specific coding logic.</p>
                </div>
                <button
                  onClick={onOpenCoding}
                  className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-violet-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:from-violet-700 hover:to-indigo-800 active:scale-95 shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5"
                >
                  Solve Coding Assessment &rarr;
                </button>
              </div>"""

text = re.sub(r'\{\/\* Card 2 [^\n]+? \*\/\}.*?Solve Code Arena\s*</button>\s*</div>', new_coding_card, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated SkillsAssessmentView")