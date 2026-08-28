path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("setActiveSubTab('Code Arena ?');", "setActiveSubTab('Code Arena ?');")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed emoji encoding in StudentPortal")