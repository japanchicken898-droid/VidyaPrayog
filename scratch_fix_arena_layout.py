path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Replace the modal wrapper with a standard full container
old_wrapper = """    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-[#f8fafc] dark:bg-[#090d16] rounded-3xl w-full max-w-[95vw] lg:max-w-7xl shadow-2xl border border-white/20 dark:border-slate-800/80 overflow-hidden flex flex-col h-[95vh] relative text-slate-900 dark:text-slate-200 transition-colors">"""

new_wrapper = """    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-[#f8fafc] dark:bg-[#090d16] rounded-3xl w-full h-full shadow-sm border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col relative text-slate-900 dark:text-slate-200 transition-colors">"""

text = text.replace(old_wrapper, new_wrapper)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Removed modal layout from CodeArenaView")