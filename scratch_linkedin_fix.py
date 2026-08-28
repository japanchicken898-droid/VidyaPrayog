path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

new_button = """                        {profileData.portfolioVisibility.linkedin && profileData.linkedinUrl && (
                          <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                            <LinkIcon className="w-3.5 h-3.5" />
                            LinkedIn <ExternalLink className="w-3 h-3" />
                          </a>
                        )}"""

# Replace the block
text = re.sub(r'\{profileData\.portfolioVisibility\.linkedin && \(\s*<button onClick=\{handleConnectLinkedin\}.*?</button>\s*\)\}', new_button, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed stray LinkedIn button")