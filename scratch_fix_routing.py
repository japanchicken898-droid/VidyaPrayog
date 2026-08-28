path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We want to replace:
#          } else if (activeSubTab === 'Gap Analysis') {
#            return <SkillsGapAnalysisView {...commonProps} />;
#      } else {
#            return <SkillsAssessmentView {...commonProps} />;
#          }

new_routing = """          } else if (activeSubTab === 'Gap Analysis') {
            return <SkillsGapAnalysisView {...commonProps} />;
          } else if (activeSubTab === 'Roadmap') {
            return <SkillsRoadmapView {...commonProps} studentProfile={studentProfile} />;
          } else {"""

text = re.sub(r'\}\s*else if \(activeSubTab === \'Gap Analysis\'\) \{\s*return <SkillsGapAnalysisView \{\.\.\.commonProps\} />;\s*\} else \{', new_routing, text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed Skills subtab routing")