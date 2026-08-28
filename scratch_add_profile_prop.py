path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("    const commonProps = {\n      activeSubTab,", "    const commonProps = {\n      studentProfile,\n      activeSubTab,")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added studentProfile to commonProps")