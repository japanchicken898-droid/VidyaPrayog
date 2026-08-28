path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add import back
if 'CodingSandboxModal' not in text:
    text = text.replace("import AptitudeAssessmentModal", "import CodingSandboxModal from '../components/student/CodingSandboxModal';\nimport AptitudeAssessmentModal")

# Change onOpenCoding to set the modal state, and create a NEW handler for onOpenCodeArena
text = text.replace("onOpenCoding: () => { setActiveTab('Learn'); setActiveSubTab('Code Arena'); },", 
                    "onOpenCoding: () => setActiveModal('coding'),\n        onOpenCodeArena: () => { setActiveTab('Learn'); setActiveSubTab('Code Arena ?'); },")

# Re-insert Modal render
if '<CodingSandboxModal' not in text:
    modal_render = """
      {/* 5-Question Coding Sandbox Modal */}
      <CodingSandboxModal 
        isOpen={activeModal === 'coding'} 
        onClose={() => setActiveModal(null)} 
        onSubmitScore={handleCodingSubmit} 
      />
    </div>
  );"""
    text = text.replace("    </div>\n  );\n", modal_render)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Restored CodingSandboxModal integration")