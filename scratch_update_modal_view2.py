path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\CodingSandboxModal.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = text.replace("Coding Practice Portal", "Proctored Coding Benchmark")

new_explorer = """function ExplorerView({ onSolve }) {
  const assessmentProblems = CHALLENGES.slice(0, 5);
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col bg-[#f8fafc] overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto w-full p-8 space-y-8">
        
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black mb-1">Standard Baseline Evaluation</h2>
            <p className="text-indigo-100 text-sm font-medium">Complete the 5 problems below within the 45-minute benchmark limit.</p>
          </div>
          <div className="bg-indigo-800/50 px-4 py-2 rounded-xl font-black tracking-widest text-lg">
            45:00
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Benchmark Problems</h3>
          {assessmentProblems.map((prob) => (
            <div key={prob.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1.5">
                <h4 className="text-base font-black text-slate-800">{prob.title}</h4>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className={`${prob.difficulty === 'Easy' ? 'text-emerald-500' : prob.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'}`}>{prob.difficulty}</span>
                  <span className="text-slate-300">-</span>
                  <span className="text-slate-500">{prob.domain} ({prob.category})</span>
                  <span className="text-slate-300">-</span>
                  <span className="text-slate-500">Max Score: {prob.score}</span>
                </div>
              </div>
              <button 
                onClick={() => onSolve(prob.id)}
                className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 font-bold text-sm rounded-xl transition-colors"
              >
                Start Problem
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}"""

text = re.sub(r'function ExplorerView\(\{ onSolve \}\) \{.*?(?=function EditorView)', new_explorer + '\n\n', text, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated CodingSandboxModal.jsx ExplorerView safely")