path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Update props
text = text.replace("const DashboardView = ({ onTabChange, onAction, overallMatch, hasActivity }) => {", "const DashboardView = ({ onTabChange, onAction, overallMatch, roleMatch, hasActivity, diagnosticBars, targetRole }) => {")

# Right after `const currentRole = rolesData[activeRole];`, we can override it!
new_override = """  const currentRole = rolesData[activeRole] || fallbackRolesData['Cloud & Full-Stack'];
  
  // OVERRIDE WITH REAL DIAGNOSTIC DATA IF AVAILABLE
  const displayRoleMatch = overallMatch || currentRole.match;
  const displayBars = diagnosticBars || currentRole.bars;
  const displayTitle = targetRole || currentRole.title;"""

text = re.sub(r'const currentRole = rolesData\[activeRole\];', new_override, text)

# Replace currentRole.match with displayRoleMatch
text = text.replace("const displayRoleMatch = currentRole.match;", "") # delete old definition
text = text.replace("{currentRole.match}%", "{displayRoleMatch}%")

# Replace currentRole.bars with displayBars
text = text.replace("currentRole.bars.map", "displayBars.map")

# Replace currentRole.title with displayTitle
text = text.replace("<p className=\"text-body-sm text-on-surface-variant mt-0.5 text-xs font-semibold\">{currentRole.title}</p>", "<p className=\"text-body-sm text-on-surface-variant mt-0.5 text-xs font-semibold\">{displayTitle}</p>")


with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated DashboardView to use real diagnostic scores")