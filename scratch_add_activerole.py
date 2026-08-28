path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("<PerformanceCharts hasActivity={true} />", "<PerformanceCharts hasActivity={true} activeRole={activeRole} />")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added activeRole to PerformanceCharts")