path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

projects_chart_jsx = """                <div className="space-y-6">
                  {/* Projects Worth Chart */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
                    <h4 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">Overall Project Performance & Worth</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectWorthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="complexity" fill="#6366f1" radius={[4, 4, 0, 0]} name="Technical Complexity" />
                          <Bar dataKey="impact" fill="#34d399" radius={[4, 4, 0, 0]} name="Business Impact" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {githubRepos.length === 0 ? ("""

cert_chart_jsx = """                <div className="space-y-6">
                  {/* Certifications Radar Chart */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
                    <h4 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">Certification Strength Base</h4>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={certStrengthData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                          <Radar name="Strength" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                          <RechartsTooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verifiedCredentials.map(cert => ("""

# Replace for Projects
target_proj = re.search(r'<div className="space-y-4">\s*\{githubRepos\.length === 0 \? \(', text)
if target_proj:
    text = text[:target_proj.start()] + projects_chart_jsx + text[target_proj.end():]
    # Now we need to close the grid
    end_proj = re.search(r'\)\)\s*\)\}\s*</div>\s*\)\}\s*</div>\s*\)\}', text)
    if end_proj:
        text = text[:end_proj.start()] + "))\n                  )}\n                  </div>\n                </div>\n              )}\n            </div>\n          )}" + text[end_proj.end():]

# Replace for Certifications
target_cert = re.search(r'<div className="grid grid-cols-1 md:grid-cols-2 gap-4">\s*\{verifiedCredentials\.map\(cert => \(', text)
if target_cert:
    text = text[:target_cert.start()] + cert_chart_jsx + text[target_cert.end():]
    # Close it properly
    end_cert = re.search(r'\)\)\}\s*</div>\s*\)\}\s*</div>\s*\)\}', text)
    if end_cert:
        text = text[:end_cert.start()] + "))}\n                  </div>\n                </div>\n              )}\n            </div>\n          )}" + text[end_cert.end():]

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated charts")