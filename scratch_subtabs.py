import os
import re

files = [
    r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx",
    r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsGapAnalysisView.jsx",
    r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsProfileMatrixView.jsx"
]

roadmap_btn = """          <button 
            onClick={() => onSubTabChange('Roadmap')}
            className={`pb-3.5 px-2 text-sm font-bold transition-all relative ${
              activeSubTab === 'Roadmap' 
                ? 'text-indigo-600 font-extrabold border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`}
          >
            Skill Roadmap
          </button>
        </div>"""

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # We find the end of the tabs wrapper which is `        </div>`
    # Just after the Gap Analysis button
    target = r"Skill Gap Analysis\s*</button>\s*</div>"
    match = re.search(target, text)
    if match:
        new_text = text[:match.start()] + "Skill Gap Analysis\n          </button>\n" + roadmap_btn + text[match.end():]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Updated {os.path.basename(path)}")
    else:
        print(f"Target not found in {os.path.basename(path)}")
