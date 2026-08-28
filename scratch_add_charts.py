path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add imports if not there
if "import { BarChart" not in text:
    imports = """import { BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';\n"""
    text = text.replace("import ActivityHeatmap", imports + "import ActivityHeatmap")

# Add Chart Data
if "const projectWorthData =" not in text:
    chart_data = """  // Chart Data
  const projectWorthData = [
    { name: 'Telemetry Processing', complexity: 85, impact: 90 },
    { name: 'Server Infra', complexity: 70, impact: 65 },
    { name: 'UI Components', complexity: 55, impact: 75 },
    { name: 'API Gateway', complexity: 95, impact: 85 }
  ];

  const certStrengthData = [
    { subject: 'Cloud Security', A: 90, fullMark: 100 },
    { subject: 'DevOps Ops', A: 75, fullMark: 100 },
    { subject: 'System Architecture', A: 85, fullMark: 100 },
    { subject: 'Database Admin', A: 60, fullMark: 100 },
    { subject: 'Containers', A: 80, fullMark: 100 }
  ];
"""
    text = text.replace("  const [loading, setLoading] = useState(true);", "  const [loading, setLoading] = useState(true);\n" + chart_data)

# Inject Project Worth Chart
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"""

# Find:
#                 <div className="space-y-4">
#                   {githubRepos.length === 0 ? (
text = text.replace('                <div className="space-y-4">\n                  {githubRepos.length === 0 ? (', projects_chart_jsx + '\n                  {githubRepos.length === 0 ? (')
text = text.replace('                    githubRepos.map(repo => (', '                    githubRepos.map(repo => (')
# Close the grid div replacing the closing tag of space-y-4
text = text.replace('                  )}\n                </div>\n              )}', '                  )}\n                  </div>\n                </div>\n              )}')

# Inject Certifications Radar Chart
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"""

text = text.replace('              ) : (\n                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n                  {verifiedCredentials.map(cert => (', '              ) : (\n' + cert_chart_jsx + '\n                  {verifiedCredentials.map(cert => (')
# Close the grid div wrapper
text = text.replace('                  ))}\n                </div>\n              )}', '                  ))}\n                  </div>\n                </div>\n              )}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added charts to ShowcaseView")