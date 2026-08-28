path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\student\DashboardView.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Remove PerformanceCharts from left column
left_col_charts = """            <div className="w-full">
              <PerformanceCharts hasActivity={hasActivity} />
            </div>"""
text = text.replace(left_col_charts, "")

# Same if there are slightly different spaces
text = re.sub(r'<div className="w-full">\s*<PerformanceCharts hasActivity=\{hasActivity\} />\s*</div>', '', text)

# Add it below Upcoming Schedule
schedule_card_end = """                  </div>
                </div>
              </div>
            </div>"""

new_right_col = """                  </div>
                </div>
              </div>
            </div>

            {/* Performance Charts Moved Here */}
            <div className="w-full">
              <PerformanceCharts hasActivity={true} />
            </div>"""

# Be careful, finding the end of the Schedule Card could be tricky.
# Let's find the Exact Schedule Card structure.