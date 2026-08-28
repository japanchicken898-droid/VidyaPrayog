path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = re.sub(r'\{/\*\s*5-Question Coding Sandbox Modal\s*\*/\}\s*<CodingSandboxModal[^>]*/>', '', text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed modal render")