path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsGapAnalysisView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

rc_start = text.find('{/* Right Column */}')
end_iife = text.rfind('        );\n      })()\n\n    </div>')
if end_iife == -1:
    end_iife = text.rfind('        );\n      })()')

if rc_start != -1 and end_iife != -1:
    new_rc = """            {/* Right Column */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
               {/* Content removed */}
            </div>
          </div>"""
    new_text = text[:rc_start] + new_rc + text[end_iife:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Fixed syntax error")
else:
    print(f"Failed to find indices. rc: {rc_start}, end: {end_iife}")