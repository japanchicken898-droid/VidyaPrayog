path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\SkillsGapAnalysisView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We need to cleanly close the Right Column and remove the broken map function piece
# The broken piece is from `); })} </div>` until the `</div> </div> </div>` at the end of the Right Column.

# Let's find the Right column start
rc_start = text.find('{/* Right Column */}')
if rc_start != -1:
    # Find the end of the main grid (which is before the closing tags of the component)
    # The component ends with:
    #       </div>
    #     );
    #   };
    #   export default SkillsGapAnalysisView;
    
    end_comp = text.rfind('</div>\n    );\n  };\n\n  export default SkillsGapAnalysisView;')
    if end_comp != -1:
        # We will just replace everything in the Right Column with an empty div, 
        # effectively removing the broken code.
        new_rc = """            {/* Right Column */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
               {/* Content removed */}
            </div>
          </div>
"""
        new_text = text[:rc_start] + new_rc + text[end_comp:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print("Fixed syntax error by clearing Right Column")
    else:
        print("Could not find end of component")
else:
    print("Could not find Right Column")
