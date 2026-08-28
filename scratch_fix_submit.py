path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("onSubmitScore({ score: 85, badgeUnlocked: true });", "onSubmitScore({ accuracy: 85, badgeUnlocked: true, title: 'VidyaPrayog Verified Algorithmic Benchmark' });")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated handleFinalSubmit to pass accuracy")