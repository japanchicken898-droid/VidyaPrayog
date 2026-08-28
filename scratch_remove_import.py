path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("import CodingSandboxModal from '../components/student/CodingSandboxModal';\n", "")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed CodingSandboxModal import")