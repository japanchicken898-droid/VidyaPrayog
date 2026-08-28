path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove the duplicated linkedinUrl in initial state just to clean it up
text = text.replace("    linkedinUrl: 'https://linkedin.com/in/deepak-b',\n    linkedinUrl: 'https://linkedin.com/in/deepak-b',", "    linkedinUrl: 'https://linkedin.com/in/deepak-b',")

# Replace Password fields with LinkedIn URL
old_passwords_html = """                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">New Password</label>
                        <input type="password" placeholder="Leave blank to keep current" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Retype Password</label>
                        <input type="password" placeholder="Leave blank to keep current" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>"""

new_linkedin_html = """                    <div className="space-y-1.5 mt-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-2">LinkedIn URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LinkIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          value={editForm.linkedinUrl || ''} 
                          onChange={e => setEditForm({...editForm, linkedinUrl: e.target.value})} 
                          placeholder="https://linkedin.com/in/your-profile" 
                          className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm" 
                        />
                      </div>
                    </div>"""

# Replace it using regex in case of formatting mismatch
text = re.sub(r'<div className="grid grid-cols-2 gap-4">\s*<div className="space-y-1\.5">\s*<label className="text-xs font-bold text-slate-700">New Password</label>.*?</div>\s*</div>', new_linkedin_html, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Profile Form")