path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\PerformanceCharts.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("setTimeout(() => setAnimateIn(true), 300)", "setTimeout(() => setAnimateIn(true), 50)")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated PerformanceCharts")