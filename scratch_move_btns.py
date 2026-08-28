path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\ShowcaseView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Move the buttons into the bio section
buttons_block_regex = r'<div className="mt-6 flex flex-wrap gap-3 print:hidden">.*?</div>\n                    </div>\n                  </section>'
match = re.search(buttons_block_regex, text, flags=re.DOTALL)
if match:
    buttons_html = match.group(0).replace('</div>\n                    </div>\n                  </section>', '')
    # Remove it from the old location
    text = text.replace(match.group(0), '</div>\n                  </section>')
    
    # Inject it right after the CGPA / Email block
    cgpa_block_regex = r'<div className="flex gap-4 mt-2">.*?</div>'
    cgpa_match = re.search(cgpa_block_regex, text, flags=re.DOTALL)
    if cgpa_match:
        text = text.replace(cgpa_match.group(0), cgpa_match.group(0) + '\n' + buttons_html)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Moved buttons into bio block")
else:
    print("Could not find buttons block")