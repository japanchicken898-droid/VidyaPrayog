path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\LearnView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("'Enroll Free'", "'Enroll'")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated 'Enroll Free' to 'Enroll'")