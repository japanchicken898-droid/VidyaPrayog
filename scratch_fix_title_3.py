path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("const displayTitle = problem.title.replace", "const displayTitle = (problem?.title || '').replace")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added optional chaining to problem title")