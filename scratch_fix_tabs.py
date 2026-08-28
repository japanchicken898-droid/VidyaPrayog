path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Add TABS definition right after TRACK_TITLES
track_titles_block = """const TRACK_TITLES = {
  fullstack: "Full-Stack Roadmap",
  backend: "Backend Architecture",
  python: "Python & AI",
  c: "C Programming",
  postgres: "PostgreSQL Database",
  java: "Java Backend"
};"""

tabs_def = "\n\nconst TABS = Object.entries(TRACK_TITLES).map(([id, label]) => ({ id, label }));\n"

text = text.replace(track_titles_block, track_titles_block + tabs_def)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added TABS definition")