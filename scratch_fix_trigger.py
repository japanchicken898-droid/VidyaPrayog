path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OpportunitiesView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Fix triggerApplication
old_trigger = """  const triggerApplication = () => {
    if (!selectedJob) return;

    if (applyMethod === 'upload' && !uploadedFile) {
      return;
    }

    setAppliedJobs(prev => [...prev, selectedJob.id]);
    setIsApplyModalOpen(false);

    if (triggerToast) {
      triggerToast(`Application successfully submitted to ${selectedJob.company}!`);
    } else {
      alert(`Application successfully submitted to ${selectedJob.company}!`);
    }
  };"""

new_trigger = """  const triggerApplication = () => {
    if (!selectedJob) return;

    if (applyMethod === 'upload' && !uploadedFile) {
      return;
    }

    setAppliedJobs(prev => [...prev, {
      id: selectedJob.id,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }]);
    setIsApplyModalOpen(false);

    if (triggerToast) {
      triggerToast(`Application successfully submitted to ${selectedJob.company}!`);
    } else {
      alert(`Application successfully submitted to ${selectedJob.company}!`);
    }
  };"""

text = text.replace(old_trigger, new_trigger)

# Fix appliedJobs.includes
text = text.replace("appliedJobs.includes(job.id)", "appliedJobs.some(a => a.id === job.id)")
text = text.replace("appliedJobs.includes(selectedJob.id)", "appliedJobs.some(a => a.id === selectedJob.id)")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed triggerApplication")