import os

# 1. Update CodeArenaView.jsx
arena_path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodeArenaView.jsx"
with open(arena_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Pass tracks prop
text = text.replace("<ExplorerView key=\"explorer\" onSolve={handleSolve} />", "<ExplorerView key=\"explorer\" tracks={TRACKS} onSolve={handleSolve} />")
text = text.replace("function ExplorerView({ onSolve }) {", "function ExplorerView({ tracks, onSolve }) {")
text = text.replace("TRACKS.map", "tracks.map")

with open(arena_path, 'w', encoding='utf-8') as f:
    f.write(text)

# 2. Fix encoding in LearnView.jsx
learn_path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\LearnView.jsx"
with open(learn_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("Code Arena ?", "Code Arena")
text = text.replace("Code Arena ?", "Code Arena")

with open(learn_path, 'w', encoding='utf-8') as f:
    f.write(text)

# 3. Fix encoding in StudentPortal.jsx
portal_path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(portal_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("Code Arena ?", "Code Arena")
text = text.replace("Code Arena ?", "Code Arena")

with open(portal_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed ExplorerView tracks and LearnView/StudentPortal encoding")