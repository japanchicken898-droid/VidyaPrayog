path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ActivityHeatmap.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

new_data_gen = """  useEffect(() => {
    const dummy = {};
    const now = new Date();
    
    // Explicitly add data only for 2 days ago
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const dateStr = twoDaysAgo.toISOString().split('T')[0];
    
    dummy[dateStr] = { 
      count: 4, 
      details: ['Completed Core Foundations Module', 'Solved 3 Coding Sandbox Problems'] 
    };
    
    const todayStr = now.toISOString().split('T')[0];
    if (!dummy[todayStr]) dummy[todayStr] = { count: 0, details: [] };

    setActivities(dummy);"""

# Replace from `useEffect(() => {` to `setActivities(dummy);`
text = re.sub(r'  useEffect\(\(\) => \{.*?(?=    const handleActivity = \(e\) => \{)', new_data_gen + '\n\n', text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated ActivityHeatmap.jsx to only show activity 2 days ago.")