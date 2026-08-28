path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

banner_regex = r'\{\/\*\s*HackerRank Orchestrate Banner\s*\*\/\}.*?<div className="w-2\.5 h-6 bg-\[\#10c493\]"><\/div>\s*<\/div>\s*<\/div>\s*<\/div>'
text = re.sub(banner_regex, '', text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed HackerRank banner")