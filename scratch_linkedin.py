# -*- coding: utf-8 -*-
path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add linkedinUrl to default state
text = text.replace("bio: 'Aspiring Cloud & Full-Stack Engineer | Active Developer of telemetry processing and server infrastructure.',\n    language: 'English',", "bio: 'Aspiring Cloud & Full-Stack Engineer | Active Developer of telemetry processing and server infrastructure.',\n    language: 'English',\n    linkedinUrl: 'https://linkedin.com/in/deepak-b',")

# Remove handleConnectLinkedin
text = re.sub(r'  const handleConnectLinkedin = \(\) => \{\n    prompt\("Enter LinkedIn vanity profile handle \(e.g\. your-name\):"\);\n  \};\n', '', text)

# Update public portfolio view to use <a> tag instead of Connect button
old_button = """                        {profileData.portfolioVisibility.linkedin && (
                          <button onClick={handleConnectLinkedin} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                            <LinkIcon className="w-3.5 h-3.5" />
                            Connect LinkedIn
                          </button>
                        )}"""
new_button = """                        {profileData.portfolioVisibility.linkedin && profileData.linkedinUrl && (
                          <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                            <LinkIcon className="w-3.5 h-3.5" />
                            LinkedIn <ExternalLink className="w-3 h-3" />
                          </a>
                        )}"""
text = text.replace(old_button, new_button)

# Add linkedin URL input field to Edit Profile form
# Find the CGPA input and add LinkedIn after it
cgpa_input = """                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Year of Study *</label>
                          <select value={editForm.year} onChange={e => setEditForm({...editForm, year: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">CGPA</label>
                          <input type="text" value={editForm.cgpa} onChange={e => setEditForm({...editForm, cgpa: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                        </div>
                      </div>"""
new_cgpa_input = cgpa_input + """\n
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">LinkedIn Profile URL</label>
                        <input type="url" value={editForm.linkedinUrl || ''} onChange={e => setEditForm({...editForm, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/in/your-profile" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                      </div>"""
text = text.replace(cgpa_input, new_cgpa_input)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated LinkedIn field")