import React from 'react';

export default function AmbientBackground() {
  return (
    <>
      <style>{`
        @keyframes fastSpinCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fastSpinCCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes activeFloatDrift {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-20px, -25px) rotate(10deg); }
        }
        @keyframes activeDriftReverse {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(25px, 20px) rotate(-10deg); }
        }

        .anim-rotate-fast-cw  { animation: fastSpinCW 18s linear infinite; transform-origin: center; }
        .anim-rotate-fast-ccw { animation: fastSpinCCW 22s linear infinite; transform-origin: center; }
        .anim-drift-fast      { animation: activeFloatDrift 9s ease-in-out infinite; transform-origin: center; }
        .anim-drift-rev-fast  { animation: activeDriftReverse 11s ease-in-out infinite; transform-origin: center; }
      `}</style>

      {/* Pure Clean White Canvas */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#ffffff]">

        {/* 1. Giant Left Mint/Cyan Polygon Sheet */}
        <div className="absolute -top-10 -left-12 w-[520px] h-[780px] anim-drift-fast flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <polygon points="0,0 92,10 74,95 0,100" fill="#d8f4f0" fillOpacity="0.85" />
          </svg>
        </div>

        {/* 2. Center-Top Fast Spinning Pentagon */}
        <div className="absolute top-10 left-[42%] w-44 h-44 anim-rotate-fast-cw flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,38 78,92 22,92 5,38" fill="#c3ebe6" fillOpacity="0.90" />
          </svg>
        </div>

        {/* 3. SWAPPED: Large Solid Sky-Blue Pentagon (NOW AT TOP-RIGHT) */}
        <div className="absolute top-6 right-10 w-[420px] h-[420px] anim-rotate-fast-ccw flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 98,40 81,95 19,95 2,40" fill="#bfe2f7" fillOpacity="0.95" />
          </svg>
        </div>

        {/* 4. SWAPPED: Giant Sky-Blue Tilted Sheet (NOW AT BOTTOM-RIGHT) */}
        <div className="absolute bottom-4 right-4 w-[660px] h-[520px] anim-drift-rev-fast flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <polygon points="12,0 100,0 88,95 0,72" fill="#e0f1fa" fillOpacity="0.80" />
          </svg>
        </div>

        {/* 5. Sharp Triangle (Bottom-Right, over tilted sheet) */}
        <div className="absolute bottom-16 right-[24%] w-32 h-32 anim-rotate-fast-cw flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <polygon points="70,5 95,85 10,65" fill="#a8d3e6" fillOpacity="0.85" />
          </svg>
        </div>

        {/* 6. Bottom-Left Wide Triangle */}
        <div className="absolute -bottom-8 left-[30%] w-60 h-60 anim-drift-fast flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <polygon points="50,15 95,85 5,85" fill="#cae8f2" fillOpacity="0.85" />
          </svg>
        </div>

        {/* 7. Floating Pastel Circles */}
        <div className="absolute bottom-32 left-[24%] w-20 h-20 rounded-full bg-[#bde3f7] opacity-90 anim-drift-rev-fast" />
        <div className="absolute top-20 right-[35%] w-10 h-10 rounded-full bg-[#9edcd6] opacity-85 anim-rotate-fast-cw" />
        <div className="absolute bottom-28 right-[12%] w-6 h-6 rounded-full bg-[#bfe2f7] opacity-80 anim-drift-fast" />

      </div>
    </>
  );
}
