path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re
text = re.sub(r'\{/\*\s*5-Question Coding Sandbox Modal\s*\*/\}\s*<CodingSandboxModal[^>]*/>', '', text, flags=re.DOTALL)

if '<CodingSandboxModal' in text:
    print("Regex failed, trying manual slice")
    start = text.find('{/* 5-Question Coding Sandbox Modal */}')
    end = text.find('/>', start) + 2
    if start != -1 and end != 1:
        text = text[:start] + text[end:]
        print("Manual slice successful")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed CodingSandboxModal from StudentPortal")