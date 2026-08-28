path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find the start and end of the 4 metric cards block
start_str = "      {/* 4 Metric Cards */}"
end_str = "      {/* Main Split Content */}"

start_idx = text.find(start_str)
end_idx = text.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_text = text[:start_idx] + text[end_idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Removed 4 Metric Cards")
else:
    print("Could not find the block to remove")