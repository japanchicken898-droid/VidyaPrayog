path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace <div className="w-full mt-4"> with <div className="lg:col-span-12 w-full mt-4">
text = text.replace('<div className="w-full mt-4">', '<div className="lg:col-span-12 w-full mt-4">')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed grid column span")