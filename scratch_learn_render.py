path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\LearnView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# import CodeArenaView
text = text.replace("import { PlayCircle", "import CodeArenaView from './CodeArenaView';\nimport { PlayCircle")

# insert the tab rendering
tab_replacement = """        {/* Tab 2: Code Arena */}
        {activeSubTab === 'Code Arena' && (
          <div className="h-[700px] w-full">
            <CodeArenaView />
          </div>
        )}

        {/* Tab 3: AI Career Advisor */}"""

text = text.replace("{/* Tab 3: AI Career Advisor */}", tab_replacement)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated LearnView rendering")