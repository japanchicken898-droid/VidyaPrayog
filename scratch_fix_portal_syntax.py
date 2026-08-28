path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("setOverallMatch(result.score);\n            }}}}", "setOverallMatch(result.score);\n            }}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed syntax error in StudentPortal.jsx")