path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Guard observer
replace = """    const observer = new MutationObserver(draw);
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true, attributes: true });
    }"""
text = text.replace("    const observer = new MutationObserver(draw);\n    observer.observe(containerRef.current, { childList: true, subtree: true, attributes: true });", replace)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Guarded MutationObserver in SVGOverlay")