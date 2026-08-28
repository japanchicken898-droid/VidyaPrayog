import React, { useState, useEffect } from 'react';

const ActivityHeatmap = () => {
  const [activities, setActivities] = useState({});
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    const dummy = {};
    const now = new Date();
    // Generate last 364 days (52 weeks)
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      // Sparse random historical data
      if (Math.random() > 0.88) {
        dummy[dateStr] = { 
          count: Math.floor(Math.random() * 5) + 1, 
          details: ['Completed Course Module'] 
        };
      }
    }
    
    const todayStr = now.toISOString().split('T')[0];
    if (!dummy[todayStr]) dummy[todayStr] = { count: 0, details: [] };

    setActivities(dummy);

    const handleActivity = (e) => {
      const payload = e.detail || { type: 'Platform Activity' };
      setActivities(prev => {
        const updated = { ...prev };
        if (updated[todayStr]) {
          updated[todayStr] = {
            count: updated[todayStr].count + 1,
            details: [...updated[todayStr].details, payload.type]
          };
        } else {
          updated[todayStr] = { count: 1, details: [payload.type] };
        }
        return updated;
      });
    };

    window.addEventListener('ACTIVITY_LOGGED', handleActivity);
    return () => window.removeEventListener('ACTIVITY_LOGGED', handleActivity);
  }, []);

  // Compute colors
  const getColor = (count) => {
    if (count === 0) return 'bg-slate-100 border-slate-200';
    if (count >= 1 && count <= 2) return 'bg-[#064E3B] border-[#065F46]'; // level 1
    if (count >= 3 && count <= 4) return 'bg-[#059669] border-[#047857]'; // level 2
    if (count >= 5 && count <= 6) return 'bg-[#10B981] border-[#059669]'; // level 3
    return 'bg-[#34D399] border-[#10B981]'; // level 4
  };

  // Generate grid columns (52 weeks * 7 days)
  const weeks = [];
  const today = new Date();
  
  // Start date = 364 days ago
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);
  
  // Shift to previous Sunday to align grid
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  let currentDate = new Date(startDate);
  const months = []; // tracking month labels

  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Track month changes for header
      if (currentDate.getDate() === 1 || (w === 0 && d === 0)) {
        months.push({
          label: currentDate.toLocaleString('default', { month: 'short' }),
          colIndex: w
        });
      }

      week.push({
        date: dateStr,
        dayIndex: d,
        displayDate: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative text-left w-full overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-slate-800 font-extrabold flex items-center gap-2">
          VidyaPrayog Activity & Learning Heatmap
        </h3>
      </div>

      <div className="overflow-x-auto scrollbar pb-4">
        <div className="min-w-max relative flex">
          
          {/* Y-Axis Labels */}
          <div className="flex flex-col gap-1 pr-3 pt-6 text-[10px] text-slate-500 font-medium justify-between h-[104px]">
            <span className="leading-3 mt-[14px]">Mon</span>
            <span className="leading-3 mt-[14px]">Wed</span>
            <span className="leading-3 mt-[14px]">Fri</span>
          </div>

          {/* Heatmap Grid */}
          <div className="flex flex-col flex-1">
            
            {/* Month Header row */}
            <div className="h-6 relative w-full text-[10px] text-slate-500 font-medium mb-1">
              {months.map((m, i) => {
                // Ensure labels don't overlap too much
                if (i > 0 && months[i].colIndex - months[i-1].colIndex < 3) return null;
                return (
                  <div 
                    key={i} 
                    className="absolute bottom-0" 
                    style={{ left: `${m.colIndex * 14}px` }}
                  >
                    {m.label}
                  </div>
                );
              })}
            </div>

            {/* Squares */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dIndex) => {
                    const activity = activities[day.date] || { count: 0, details: [] };
                    const isActive = day.date === (new Date().toISOString().split('T')[0]) && activity.count > 0;
                    
                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredCell({ ...day, activity })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-300 border ${getColor(activity.count)} cursor-pointer relative ${isActive ? 'scale-110 z-10 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'hover:ring-1 hover:ring-white/50'}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex justify-between items-center mt-3 text-[11px] text-slate-500">
        <a href="#" className="hover:text-indigo-400 hover:underline transition-colors">
          Learn how we count platform & code contributions
        </a>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-[11px] h-[11px] rounded-[2px] bg-slate-100"></div>
          <div className="w-[11px] h-[11px] rounded-[2px] bg-[#064E3B]"></div>
          <div className="w-[11px] h-[11px] rounded-[2px] bg-[#059669]"></div>
          <div className="w-[11px] h-[11px] rounded-[2px] bg-[#10B981]"></div>
          <div className="w-[11px] h-[11px] rounded-[2px] bg-[#34D399]"></div>
          <span>More</span>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-lg shadow-2xl z-50 pointer-events-none animate-fade-in flex flex-col gap-1 min-w-[220px]">
          <div className="font-bold text-sm text-slate-800">
            {hoveredCell.activity.count === 0 ? 'No contributions' : `${hoveredCell.activity.count} contribution${hoveredCell.activity.count > 1 ? 's' : ''}`}
            <span className="text-slate-500 font-medium ml-1">on {hoveredCell.displayDate}</span>
          </div>
          {hoveredCell.activity.count > 0 && hoveredCell.activity.details.length > 0 && (
            <ul className="list-disc pl-4 text-slate-300 mt-1 space-y-0.5 max-h-[150px] overflow-hidden">
              {hoveredCell.activity.details.map((detail, idx) => (
                <li key={idx} className="truncate">{detail}</li>
              ))}
            </ul>
          )}
        </div>
      )}

    </div>
  );
};

export default ActivityHeatmap;

