path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# We need to add the button near the top of RoadmapTree
old_div = """      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, justifyContent: "center", flexWrap: "wrap", padding: "0 20px" }}>"""

new_div = """      {/* Retake Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 20px", marginBottom: "16px" }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('RETAKE_ONBOARDING'))}
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#64748b",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Retake Diagnostic / Change Target Role
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, justifyContent: "center", flexWrap: "wrap", padding: "0 20px" }}>"""

text = text.replace(old_div, new_div)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated RoadmapTree")