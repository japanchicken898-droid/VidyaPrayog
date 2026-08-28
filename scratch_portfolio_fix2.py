# -*- coding: utf-8 -*-
path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = re.sub(
    r'<p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">.*?\{profileData\.course\} \(\{profileData\.year\}\).*?\{profileData\.portfolioVisibility\.institution && `.*?`\}.*?</p>',
    """<div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">
                            <span>{profileData.course} ({profileData.year})</span>
                            {profileData.portfolioVisibility.institution && (
                              <>
                                <span className="text-slate-300">&#8226;</span>
                                <span>{profileData.institution}</span>
                              </>
                            )}
                          </div>""",
    text,
    flags=re.DOTALL
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed portfolio text layout")