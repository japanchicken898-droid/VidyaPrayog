path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("onOpenCoding: () => setActiveModal('coding'),", "onOpenCoding: () => { setActiveTab('Learn'); setActiveSubTab('Code Arena'); },")

# Remove the Modal Render
text = text.replace("<CodingSandboxModal isOpen={activeModal === 'coding'} onClose={() => setActiveModal(null)} />", "")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated routing for onOpenCoding")