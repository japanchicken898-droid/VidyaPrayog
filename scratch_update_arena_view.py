path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add studentProfile prop to generate dynamic categories
text = text.replace("const CodeArenaView = () => {", "const CodeArenaView = ({ studentProfile }) => {\n  const role = studentProfile?.targetRole || 'Full-Stack';")

# Update header block
header_old = """      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 leading-none mb-1">Code Arena</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> 5 Challenges</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Proctored Environment</span>
            </div>
          </div>
        </div>
      </div>"""

header_new = """      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 leading-none mb-1">Code Arena &mdash; Interactive Practice Sandbox</h2>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              Hands-on coding challenges and sandbox environment tailored to your selected career role.
            </div>
          </div>
        </div>
      </div>"""

text = text.replace(header_old, header_new)

# Dynamic tracks/categories logic
# Instead of hardcoded TRACKS, we make it dynamic based on role
dynamic_tracks = """
  const TRACKS = role.toLowerCase().includes('front') || role.toLowerCase().includes('ui') ? [
    { id: 1, title: 'DOM Manipulation Basics', solvedCount: 15, progress: 20 },
    { id: 2, title: 'React Hooks Patterns', solvedCount: 4, progress: 5 }
  ] : role.toLowerCase().includes('data') || role.toLowerCase().includes('ai') ? [
    { id: 1, title: 'SQL Query Optimization', solvedCount: 12, progress: 13 },
    { id: 2, title: 'Pandas Data Wrangling', solvedCount: 0, progress: 0 }
  ] : [
    { id: 1, title: 'Arrays & Hashing', solvedCount: 12, progress: 13 },
    { id: 2, title: 'Tree Traversals', solvedCount: 0, progress: 0 },
    { id: 3, title: 'REST API Integration', solvedCount: 2, progress: 10 }
  ];
"""
# Strip old TRACKS constant which was outside the component
text = re.sub(r'const TRACKS = \[.*?\];', '', text, flags=re.DOTALL)
# Inject new TRACKS inside the component
text = text.replace("const CodeArenaView = ({ studentProfile }) => {\n  const role = studentProfile?.targetRole || 'Full-Stack';", "const CodeArenaView = ({ studentProfile }) => {\n  const role = studentProfile?.targetRole || 'Full-Stack';\n" + dynamic_tracks)


with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated CodeArenaView")