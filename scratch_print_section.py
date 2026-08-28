path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

print_section = """
      </div>

      {/* PRINT-ONLY RESUME EXTENSION */}
      <div className="hidden print-only mt-10">
        <hr className="border-slate-300 my-6" />
        <h3 className="text-xl font-black text-slate-800 mb-4">Contact & Links</h3>
        <p className="text-sm text-slate-700 font-medium"><strong>LinkedIn:</strong> {profileData.linkedinUrl}</p>
        {githubUser && <p className="text-sm text-slate-700 font-medium"><strong>GitHub:</strong> github.com/{githubUser}</p>}
        <p className="text-sm text-slate-700 font-medium"><strong>Email:</strong> {profileData.email}</p>
        
        <h3 className="text-xl font-black text-slate-800 mt-8 mb-4">Top Projects</h3>
        {githubRepos.length > 0 ? (
          <div className="space-y-4">
            {githubRepos.slice(0, 5).map(repo => (
              <div key={repo.id} className="border-l-2 border-slate-300 pl-4">
                <h4 className="text-lg font-bold text-slate-800">{repo.name}</h4>
                <p className="text-sm text-slate-600">{repo.description || 'No description provided.'}</p>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Language: {repo.language || 'Mixed'} | Stars: {repo.stargazers_count}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No public repositories linked.</p>
        )}
      </div>
    </div>
  );
};

export default ShowcaseView;
"""

text = text.replace("      </div>\n    </div>\n  );\n};\n\nexport default ShowcaseView;", print_section)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Added print-only section")