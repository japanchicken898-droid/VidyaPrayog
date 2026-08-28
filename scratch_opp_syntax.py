path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OpportunitiesView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Insert closing brace for activeSubTab ternary before Application Modal
text = re.sub(r'(</div>\s*\{/\* Application Modal \*/\})', r'\n      )}\n\n      \1', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed Opportunities syntax")