path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove 'career-roadmap' from navigation list
nav_items = r"""    { id: 'Learn', label: 'Learn', icon: GraduationCap },
    { id: 'career-roadmap', label: 'Skill Roadmap', icon: Map }
  ];"""
new_nav = r"""    { id: 'Learn', label: 'Learn', icon: GraduationCap }
  ];"""
text = text.replace(nav_items, new_nav)

# We might also need to find where the tabs are rendered, but if they loop over navItems, changing the array is enough.
# Let's check if the array is named something else.
nav_def = re.search(r'const navItems = \[.*?\];', text, flags=re.DOTALL)
if nav_def:
    new_nav_def = re.sub(r',\s*\{\s*id:\s*\'career-roadmap\'.*?\}', '', nav_def.group(0), flags=re.DOTALL)
    text = text.replace(nav_def.group(0), new_nav_def)

# Update Switch case in renderMainContent
old_case = """        case 'career-roadmap':
          return (
            <div className="w-full h-full flex flex-col py-10 px-6 overflow-y-auto">
              <h2 className="text-3xl font-black text-slate-800 mb-8 text-left max-w-4xl mx-auto w-full">Skill Roadmap</h2>
              <RoadmapTree studentProfile={studentProfile} />
            </div>
          );"""
# Just remove it, as it's no longer a main tab.
text = text.replace(old_case, "")

# Add the new subtab routing for Roadmap
routing_replace = """        case 'Skills':
          if (activeSubTab === 'Profile & Matrix') {
            return <SkillsProfileMatrixView {...commonProps} />;
          } else if (activeSubTab === 'Gap Analysis') {
            return <SkillsGapAnalysisView {...commonProps} />;
          } else {"""

new_routing = """        case 'Skills':
          if (activeSubTab === 'Profile & Matrix') {
            return <SkillsProfileMatrixView {...commonProps} />;
          } else if (activeSubTab === 'Gap Analysis') {
            return <SkillsGapAnalysisView {...commonProps} />;
          } else if (activeSubTab === 'Roadmap') {
            return <SkillsRoadmapView {...commonProps} studentProfile={studentProfile} />;
          } else {"""
text = text.replace(routing_replace, new_routing)

# Add import for SkillsRoadmapView
text = text.replace("import SkillsGapAnalysisView from '../components/student/SkillsGapAnalysisView';", "import SkillsGapAnalysisView from '../components/student/SkillsGapAnalysisView';\nimport SkillsRoadmapView from '../components/student/SkillsRoadmapView';")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated StudentPortal.jsx")