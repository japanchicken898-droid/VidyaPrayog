path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\OpportunitiesView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We want to replace:
#        )}
#      
#      )}
#
#      </div>
#
#      {/* Application Modal */}
# with just:
#        )}
#      </div>
#      )}
#      {/* Application Modal */}

# Wait, the closing of the `lg:w-[62%]` div is `</div>`. Then `)}` closes `selectedJob ? ( ... ) : ( ... )`.
# Then `</div>` closes the `flex flex-col lg:flex-row` wrapper.
# Then `)}` closes the `activeSubTab === 'Applications' ? ( ... ) : (`

text = re.sub(r'\)\}\s*\)\}\s*</div>\s*\{/\* Application Modal \*/\}', r')}\n      </div>\n      )}\n\n      {/* Application Modal */}', text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Cleaned up OpportunitiesView closing tags")