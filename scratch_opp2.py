path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OpportunitiesView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find the main split layout block
main_split = """      {/* Main split dashboard content */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-[500px] items-stretch">"""

applications_render = """      {/* Main split dashboard content */}
      {activeSubTab === 'Applications' ? (
        <div className="flex-1 w-full bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-6 overflow-y-auto">
          <h2 className="text-xl font-black text-slate-800 mb-6 text-left">Application Status Pipeline</h2>
          {appliedJobs.length === 0 ? (
             <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-3 block">history</span>
                <p className="text-slate-500 font-bold">You haven't applied to any opportunities yet.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Applied', 'Under Review', 'Accepted', 'Rejected'].map(statusGroup => {
                const groupJobs = appliedJobs.filter(a => a.status === statusGroup);
                const colors = {
                  'Applied': 'bg-slate-100 text-slate-700 border-slate-300',
                  'Under Review': 'bg-amber-100 text-amber-700 border-amber-300',
                  'Accepted': 'bg-emerald-100 text-emerald-700 border-emerald-300',
                  'Rejected': 'bg-rose-100 text-rose-700 border-rose-300'
                };
                return (
                  <div key={statusGroup} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 min-h-[300px]">
                    <h3 className={`text-xs font-black uppercase mb-4 py-1.5 px-3 rounded-lg border inline-block ${colors[statusGroup]}`}>
                      {statusGroup} ({groupJobs.length})
                    </h3>
                    <div className="space-y-3">
                      {groupJobs.map(app => {
                        const jobDetails = [...internshipsList, ...jobsList].find(j => j.id === app.id);
                        if (!jobDetails) return null;
                        return (
                          <div key={app.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-left relative overflow-hidden">
                            {statusGroup === 'Accepted' && <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />}
                            {statusGroup === 'Rejected' && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />}
                            {statusGroup === 'Applied' && <div className="absolute top-0 left-0 w-1 h-full bg-slate-300" />}
                            {statusGroup === 'Under Review' && <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />}
                            <h4 className="text-sm font-bold text-slate-800 truncate mb-1 pl-1">{jobDetails.title}</h4>
                            <p className="text-xs text-slate-500 truncate mb-2 pl-1">{jobDetails.company}</p>
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pl-1">
                              <span>Applied: {app.appliedDate}</span>
                            </div>
                          </div>
                        );
                      })}
                      {groupJobs.length === 0 && (
                        <p className="text-xs text-slate-400 font-medium italic p-4 text-center">Empty</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-6 min-h-[500px] items-stretch">"""

text = text.replace(main_split, applications_render)

# Now find the end of the split layout
# It ends right before {/* End main container */} or the last `</div>`
end_split = """            </div>
          </div>
        </div>
      </div>
"""

new_end_split = """            </div>
          </div>
        </div>
      </div>
      )}
"""
text = text.replace(end_split, new_end_split)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Opportunities")