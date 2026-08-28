path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\PerformanceCharts.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# 1. Add tech topics logic
tech_logic = """  // Dynamic Tech Topics based on role
  const techTopics = useMemo(() => {
    const roleLower = activeRole.toLowerCase();
    if (roleLower.includes('front') || roleLower.includes('ui')) {
      return ['HTML/CSS', 'JavaScript', 'React', 'Tailwind', 'Next.js', 'Redux', 'Jest'];
    } else if (roleLower.includes('back') || roleLower.includes('cloud')) {
      return ['Node.js', 'Express', 'Python', 'SQL', 'MongoDB', 'Docker', 'AWS'];
    } else if (roleLower.includes('ai') || roleLower.includes('data')) {
      return ['Python', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'SQL', 'Spark'];
    }
    return ['C++', 'Java', 'Python', 'SQL', 'Git', 'Linux', 'AWS'];
  }, [activeRole]);

  // Generate dynamic data based on techTopics
  const languageData = techTopics.map((tech, i) => {
    const scores = [20, 45, 35, 65, 50, 85, 70];
    return { name: tech, score: scores[i] || 50 };
  });"""

text = re.sub(r"  // Generate dynamic data based on domains.*?\];", tech_logic, text, flags=re.DOTALL)

# 2. Reorganize layout to remove RadarChart
layout_replacement = """      {/* 2 & 3. Grid for QOD and Categorization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <CustomHeader title="QOD Performance" />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={qodData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis domain={[0, 6]} tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Area type="linear" dataKey="performance" name="Performance" stroke="#f59e0b" fill="#fcd34d" fillOpacity={0.5} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <CustomHeader title="Performance Categorization" />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={categoryData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} width={80} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="veryGood" name="Very Good" stackId="a" fill="#4f46e5" barSize={12} />
                <Bar dataKey="good" name="Good" stackId="a" fill="#6366f1" />
                <Bar dataKey="average" name="Average" stackId="a" fill="#818cf8" />
                <Bar dataKey="belowAverage" name="Below Average" stackId="a" fill="#a5b4fc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Comparative Analysis (Image 5) */}"""

# Remove old layout from "{/* 2 & 3. Grid for QOD and Radar (Image 3) */}" down to "{/* 5. Comparative Analysis (Image 5) */}"
text = re.sub(r"\{\/\* 2 & 3\. Grid for QOD and Radar \(Image 3\) \*\/\}.*?\{\/\* 5\. Comparative Analysis \(Image 5\) \*\/\}", layout_replacement, text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated charts")