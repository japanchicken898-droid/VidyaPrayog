path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

buttons_block = """                      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                        {profileData.portfolioVisibility.github && (
                          <button onClick={() => {
                            if (githubUser) window.open(`https://github.com/${githubUser}`, '_blank');
                            else handleConnectGithub();
                          }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                            <Code className="w-3.5 h-3.5" />
                            {githubUser ? `github.com/${githubUser}` : "Connect GitHub"}
                          </button>
                        )}
                        
                                                {profileData.portfolioVisibility.linkedin && profileData.linkedinUrl && (
                            <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                              <LinkIcon className="w-3.5 h-3.5" />
                              LinkedIn <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                      </div>"""

text = text.replace(buttons_block, "")

# Insert it after cgpa block
target = """                          <div className="flex gap-4 mt-2">
                            {profileData.portfolioVisibility.cgpa && <span className="text-xs font-bold text-emerald-600">CGPA: {profileData.cgpa}</span>}
                            {profileData.portfolioVisibility.email && <span className="text-xs text-slate-500">{profileData.email}</span>}
                          </div>"""

text = text.replace(target, target + "\n" + buttons_block.replace("mt-6", "mt-4"))

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Moved buttons!")