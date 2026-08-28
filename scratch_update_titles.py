path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsAssessmentView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Title for Aptitude
text = text.replace('<h3 className="text-sm font-extrabold text-slate-800">Comprehensive Aptitude Diagnostic</h3>', 
                    '<h3 className="text-sm font-extrabold text-slate-800">Aptitude</h3>')

# 2. Button for Aptitude
text = text.replace('Launch Aptitude Test\n                  </button>', 
                    'Solve Aptitude\n                  </button>')

# 3. Title for Coding Sandbox
text = text.replace('<h3 className="text-sm font-extrabold text-slate-800">Core Problem Solving &amp; DSA Sprint</h3>', 
                    '<h3 className="text-sm font-extrabold text-slate-800">Code Arena</h3>')

# 4. Button for Coding Sandbox
text = text.replace('Launch Coding Sandbox\n                  </button>', 
                    'Solve Code Arena\n                  </button>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated text in SkillsAssessmentView")