import re
path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Add handlePhotoUpload function
func_to_add = """
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditForm({...editForm, photoUrl: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
"""
text = text.replace("  const handleSaveProfile = () => {", func_to_add)

# Replace the camera button with a file input label
old_camera = """<button className="absolute bottom-0 right-0 bg-white shadow-md border border-slate-200 p-1.5 rounded-full hover:bg-slate-50">
                            <Camera className="w-4 h-4 text-slate-600" />
                          </button>"""
new_camera = """<label className="absolute bottom-0 right-0 bg-white shadow-md border border-slate-200 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
                            <Camera className="w-4 h-4 text-slate-600" />
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                          </label>"""
text = text.replace(old_camera, new_camera)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added photo upload functionality")