path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

new_camera_html = """                          <label className="absolute bottom-0 right-0 bg-white shadow-md border border-slate-200 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
                            <Camera className="w-4 h-4 text-slate-600" />
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                          </label>"""

text = re.sub(r'<button className="absolute bottom-0 right-0 bg-white shadow-md border border-slate-200\s*p-1\.5 rounded-full hover:bg-slate-50">\s*<Camera className="w-4 h-4 text-slate-600" />\s*</button>', new_camera_html, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Wired up Camera button with regex")