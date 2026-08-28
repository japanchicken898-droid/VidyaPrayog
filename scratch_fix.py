import re
path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    "useLayoutEffect(() => {\n    const draw = () => {",
    "useLayoutEffect(() => {\n    if (!containerRef.current) return;\n    const draw = () => {"
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed")