path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("export default function CodingSandboxModal({ isOpen, onClose }) {", "export default function CodeArenaView({ studentProfile }) {")
# But wait, earlier I also injected `const role = studentProfile?.targetRole || 'Full-Stack';` but where?
# Let's just fix it properly.