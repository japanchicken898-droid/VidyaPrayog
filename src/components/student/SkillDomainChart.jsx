import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Backend & Cloud Engineering', value: 29, color: '#2563EB', modules: 4 },
  { name: 'Data & SQL Systems', value: 26, color: '#10B981', modules: 3 },
  { name: 'System Design & Concurrency', value: 24, color: '#F59E0B', modules: 2 },
  { name: 'Core Algorithms & OOP', value: 21, color: '#6366F1', modules: 3 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-slate-800">
        <p className="font-bold">{item.name}</p>
        <p className="text-emerald-400 mt-0.5">{item.value}% • {item.modules} Verified Modules</p>
      </div>
    );
  }
  return null;
};

const SkillDomainChart = () => {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between h-full">
      <div>
        <h3 className="font-extrabold text-slate-800 text-base">Skill Domain Distribution</h3>
        <p className="text-xs text-slate-500 mt-1">Verified competency weightage breakdown</p>
      </div>

      <div className="h-48 my-4 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 4-column horizontal pill strip legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full shrink-0" 
              style={{ backgroundColor: item.color }} 
            />
            <div className="text-left min-w-0">
              <p className="text-[10px] font-bold text-slate-700 truncate" title={item.name}>
                {item.name}
              </p>
              <p className="text-[10px] text-slate-400 font-extrabold mt-0.5">
                {item.value}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDomainChart;

