src = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
dest = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"

with open(src, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Change component name
text = text.replace("const CodingSandboxModal = ({ isOpen, onClose }) => {", "const CodeArenaView = () => {")
text = text.replace("export default CodingSandboxModal;", "export default CodeArenaView;")

# Remove the early return for isOpen
text = text.replace("  if (!isOpen) return null;", "")

# Replace the outer modal wrapper with a normal div
# The modal wrapper is:
# <AnimatePresence>
#   <motion.div ... className="fixed inset-0 z-50 flex items-center justify-center p-4">
#     <motion.div ... className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
#     <motion.div ... className="relative w-full max-w-6xl h-[90vh] bg-slate-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

wrapper_replacement = """
  return (
    <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
"""

text = re.sub(r'<AnimatePresence>\s*<motion\.div[^>]*className="fixed inset-0[^>]*>.*?<motion\.div[^>]*className="absolute inset-0[^>]*>.*?<motion\.div[^>]*className="relative w-full max-w-6xl[^>]*>', wrapper_replacement, text, flags=re.DOTALL)

# Close tags replacement at the bottom
text = re.sub(r'</motion\.div>\s*</motion\.div>\s*</AnimatePresence>', '</div>', text, flags=re.DOTALL)

# Remove the X close button from header since it's no longer a modal
# <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
#   <X className="w-5 h-5" />
# </button>
text = re.sub(r'<button onClick=\{onClose\}[^>]*>\s*<X className="w-5 h-5" />\s*</button>', '', text, flags=re.DOTALL)

with open(dest, 'w', encoding='utf-8') as f:
    f.write(text)
print("Created CodeArenaView")