path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Add diagnosticBars state to StudentPortal
text = text.replace("const [roleMatch, setRoleMatch] = useState(82);", "const [roleMatch, setRoleMatch] = useState(82);\n  const [diagnosticBars, setDiagnosticBars] = useState(null);")

# Update onComplete handler
new_onComplete = """onComplete={(result) => {
              // Map the 5 question results (true/false) to 4 category bars
              // If qResults is [true, false, true, true, false] (60%)
              const qR = result.qResults || [false, false, false, false, false];
              const bars = [
                { label: 'Core Language & Syntax', score: qR[0] ? 100 : Math.floor(Math.random() * 40), color: 'bg-emerald-500' },
                { label: 'Frameworks & Architecture', score: qR[1] || qR[2] ? (qR[1] && qR[2] ? 100 : 50) : Math.floor(Math.random() * 30), color: 'bg-emerald-500' },
                { label: 'Systems & Performance', score: qR[3] ? 100 : Math.floor(Math.random() * 40), color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
                { label: 'Advanced Optimization', score: qR[4] ? 100 : Math.floor(Math.random() * 30), color: 'bg-gradient-to-r from-rose-500 to-red-500' }
              ];
              setDiagnosticBars(bars);
              
              setStudentProfile({
                targetRole: result.role,
                currentTier: result.tier,
                onboardingCompleted: true,
                startingReadinessScore: result.score,
                roadmapStartNode: result.roadmapStartNode
              });
              setRoleMatch(result.score);
              setOverallMatch(result.score);
            }}"""

text = re.sub(r'onComplete=\{\(result\) => \{.*?(?=\}\})\}\}', new_onComplete + '}}', text, flags=re.DOTALL)

# Pass diagnosticBars to DashboardView
text = text.replace("<DashboardView onTabChange={handleTabChange} onAction={handleAction} roleMatch={roleMatch} overallMatch={overallMatch} hasActivity={verifiedCredentials.length > 0} />", "<DashboardView onTabChange={handleTabChange} onAction={handleAction} roleMatch={roleMatch} overallMatch={overallMatch} hasActivity={verifiedCredentials.length > 0} diagnosticBars={diagnosticBars} targetRole={studentProfile.targetRole} />")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated StudentPortal.jsx to pass diagnostic bars")