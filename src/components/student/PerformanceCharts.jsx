import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, ComposedChart, Line, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';
import { Info } from 'lucide-react';

const PerformanceCharts = ({ hasActivity = true, activeRole = 'Cloud & Full-Stack' }) => {

  // Dynamic Domains based on role
  const domains = useMemo(() => {
    const roleLower = activeRole.toLowerCase();
    if (roleLower.includes('front') || roleLower.includes('ui')) {
      return ['React/Vue', 'CSS/UI', 'DOM & APIs', 'Web Security', 'Performance'];
    } else if (roleLower.includes('back') || roleLower.includes('cloud')) {
      return ['Backend APIs', 'Data Systems', 'System Design', 'Core CS & Algo', 'DevOps'];
    } else if (roleLower.includes('ai') || roleLower.includes('data')) {
      return ['Python/Pandas', 'Machine Learning', 'Data Vis', 'SQL', 'Math/Stats'];
    }
    return ['Logic', 'Algorithms', 'System Design', 'Databases', 'Web Tech'];
  }, [activeRole]);

  // Dynamic Tech Topics based on role
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
  });

  const donutData = domains.map((domain, i) => {
    const values = [29, 26, 24, 21, 15];
    return { name: domain, value: values[i] || 10 };
  }).slice(0, 4); // Pie chart in image has 4 slices

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#f97316'];

  const comparativeData = [
    { time: 'UNIT 1', topScore: 90, yourScore: 85 },
    { time: 'UNIT 2', topScore: 95, yourScore: 100 },
    { time: 'UNIT 3', topScore: 100, yourScore: 80 },
    { time: 'UNIT 4', topScore: 92, yourScore: 92 },
    { time: 'UNIT 5', topScore: 98, yourScore: 95 }
  ];

  const categoryData = domains.map(domain => ({
    name: domain.length > 15 ? domain.substring(0, 15) + '...' : domain,
    veryGood: Math.floor(Math.random() * 5) + 1,
    good: Math.floor(Math.random() * 4),
    average: Math.floor(Math.random() * 3),
    belowAverage: 0
  }));

  const qodData = [
    { date: '2026-08-04', performance: 0 },
    { date: '2026-08-10', performance: 0 },
    { date: '2026-08-15', performance: 0 },
    { date: '2026-08-21', performance: 3 },
    { date: '2026-08-25', performance: 3 }
  ];

  const radarData = domains.map((domain, i) => ({
    subject: domain.length > 12 ? domain.substring(0, 12) + '...' : domain,
    score: 60 + (i * 8) % 40,
    fullMark: 100
  }));

  const CustomHeader = ({ title }) => (
    <div className="flex items-center gap-2 mb-4">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Language Topics (Area Chart from Image 1) & Donut Chart (Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <CustomHeader title="Language Topics" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={languageData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <CustomHeader title="Domain Distribution Matrix" />
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({percent}) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', backgroundColor: '#1e293b', color: '#fff' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

            {/* 2 & 3. Grid for QOD and Categorization */}
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

      {/* 4. Comparative Analysis (Image 5) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
        <CustomHeader title="Comparative Analysis" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={comparativeData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="yourScore" name="Your score" barSize={8} fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              <Line type="stepAfter" dataKey="topScore" name="Top Score" stroke="#f59e0b" strokeWidth={2} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
};

export default PerformanceCharts;