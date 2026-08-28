path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\LearnView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Pass studentProfile
text = text.replace("const LearnView = ({ activeSubTab = 'Courses', onSubTabChange, onAction }) => {", "const LearnView = ({ activeSubTab = 'Courses', onSubTabChange, onAction, studentProfile }) => {")
text = text.replace("<CodeArenaView />", "<CodeArenaView studentProfile={studentProfile} />")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Passed studentProfile to CodeArenaView")