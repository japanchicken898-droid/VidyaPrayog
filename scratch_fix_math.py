path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\pages\StudentPortal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

new_onComplete = """onComplete={(result) => {
              const qR = result.qResults || [false, false, false, false, false];
              
              // Perfect mathematical distribution:
              // Overall score = (correctCount / 5) * 100
              // For 4 bars to average exactly to the overall score, their sum must be correctCount * 80.
              let b1 = 0, b2 = 0, b3 = 0, b4 = 0;
              
              if (qR[0]) b1 += 80;
              if (qR[1]) b2 += 80;
              if (qR[2]) b3 += 80;
              if (qR[3]) b4 += 80;
              
              if (qR[4]) {
                b1 += 20; b2 += 20; b3 += 20; b4 += 20;
              }

              const bars = [
                { label: 'Core Language & Syntax', score: b1, color: 'bg-emerald-500' },
                { label: 'Frameworks & Architecture', score: b2, color: 'bg-emerald-500' },
                { label: 'Systems & Performance', score: b3, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
                { label: 'Advanced Optimization', score: b4, color: 'bg-gradient-to-r from-rose-500 to-red-500' }
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

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated StudentPortal.jsx with perfect mathematical distribution")