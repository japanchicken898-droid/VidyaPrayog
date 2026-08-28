import re

path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Remove displayMatch interval
text = re.sub(
    r"  const \[displayMatch, setDisplayMatch\] = useState\(0\);\n\n  useEffect\(\(\) => \{\n    setIsMounted\(true\);\n  \}, \[\]\);\n\n  useEffect\(\(\) => \{.*?\}, \[kpiMatch, profileLoading\]\);",
    "  const displayMatch = kpiMatch;\n\n  useEffect(() => {\n    setIsMounted(true);\n  }, []);",
    text,
    flags=re.DOTALL
)

# Remove displayRoleMatch interval
text = re.sub(
    r"  const \[displayRoleMatch, setDisplayRoleMatch\] = useState\(0\);\n\n  useEffect\(\(\) => \{.*?\}, \[currentRole\.match, isMounted\]\);",
    "  const displayRoleMatch = currentRole.match;",
    text,
    flags=re.DOTALL
)

# Update transition duration on progress bars to duration-500
text = text.replace('transition-all duration-1000 ease-out', 'transition-all duration-500 ease-out')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated DashboardView animations")