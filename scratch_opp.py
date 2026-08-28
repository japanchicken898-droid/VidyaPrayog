path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OpportunitiesView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Replace setAppliedJobs in triggerApplication
old_trigger = """  const triggerApplication = () => {
    const selectedJob = getActiveList().find(j => j.id === selectedJobId) || internshipsList[0];
    if (appliedJobs.includes(selectedJob.id)) {
      if (triggerToast) triggerToast("Already Applied!");
      return;
    }

    setAppliedJobs(prev => [...prev, selectedJob.id]);
    setIsApplyModalOpen(false);"""

new_trigger = """  const triggerApplication = () => {
    const selectedJob = getActiveList().find(j => j.id === selectedJobId) || internshipsList[0];
    if (appliedJobs.some(j => j.id === selectedJob.id)) {
      if (triggerToast) triggerToast("Already Applied!");
      return;
    }

    setAppliedJobs(prev => [...prev, {
      id: selectedJob.id,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }]);
    setIsApplyModalOpen(false);"""
text = text.replace(old_trigger, new_trigger)

# Update appliedJobs.includes checks
text = text.replace("appliedJobs.includes(job.id)", "appliedJobs.some(a => a.id === job.id)")
text = text.replace("appliedJobs.includes(selectedJob.id)", "appliedJobs.some(a => a.id === selectedJob.id)")

# Create custom rendering for the Applications tab
# Find the main split layout block
main_split = """      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-280px)] min-h-[500px]">"""

applications_render = """      {/* Main Layout / Pipeline View */}
      {activeSubTab === 'Applications' ? (
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-3xl p-6 overflow-y-auto">
          <h2 className="text-xl font-black text-slate-800 mb-6">Application Status Pipeline</h2>
          {appliedJobs.length === 0 ? (
             <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
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
                  <div key={statusGroup} className="bg-slate-50 rounded-xl p-4 border border-slate-200 min-h-[300px]">
                    <h3 className={`text-xs font-black uppercase mb-4 py-1.5 px-3 rounded-lg border inline-block ${colors[statusGroup]}`}>
                      {statusGroup} ({groupJobs.length})
                    </h3>
                    <div className="space-y-3">
                      {groupJobs.map(app => {
                        const jobDetails = [...internshipsList, ...jobsList].find(j => j.id === app.id);
                        if (!jobDetails) return null;
                        return (
                          <div key={app.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-left">
                            <h4 className="text-sm font-bold text-slate-800 truncate mb-1">{jobDetails.title}</h4>
                            <p className="text-xs text-slate-500 truncate mb-2">{jobDetails.company}</p>
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
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
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-280px)] min-h-[500px]">"""

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
text = text.replace(main_split, applications_render)
text = text.replace(end_split, new_end_split)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated Opportunities")