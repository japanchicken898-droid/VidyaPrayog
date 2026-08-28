path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Add Activity Heatmap
text = text.replace("</section>\n\n                </>", "</section>\n\n                <div className=\"mt-8\"><ActivityHeatmap /></div>\n                </>")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added Heatmap to ShowcaseView")