path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Fix Component Definition
text = re.sub(r'export default function CodingSandboxModal\([^)]*\)\s*\{', 'export default function CodeArenaView({ studentProfile }) {\n  const role = studentProfile?.targetRole || "Full-Stack";\n\n  const TRACKS = role.toLowerCase().includes("front") || role.toLowerCase().includes("ui") ? [\n    { id: 1, title: "DOM Manipulation Basics", solvedCount: 15, progress: 20 },\n    { id: 2, title: "React Hooks Patterns", solvedCount: 4, progress: 5 }\n  ] : role.toLowerCase().includes("data") || role.toLowerCase().includes("ai") ? [\n    { id: 1, title: "SQL Query Optimization", solvedCount: 12, progress: 13 },\n    { id: 2, title: "Pandas Data Wrangling", solvedCount: 0, progress: 0 }\n  ] : [\n    { id: 1, title: "Arrays & Hashing", solvedCount: 12, progress: 13 },\n    { id: 2, title: "Tree Traversals", solvedCount: 0, progress: 0 },\n    { id: 3, title: "REST API Integration", solvedCount: 2, progress: 10 }\n  ];\n', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed CodeArenaView.jsx")