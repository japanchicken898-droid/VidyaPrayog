path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\components\CareerRoadmap\RoadmapTree.jsx"
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Make RoadmapTree accept onOpenCoding
text = text.replace("export default function RoadmapTree({ studentProfile }) {", "export default function RoadmapTree({ studentProfile, onOpenCoding }) {")

# Pass it to TrackTree
text = text.replace("<TrackTree trackData={trackData} progress={progress} activePopup={activePopup} onNodeClick={setActivePopup} onSetStatus={handleSetStatus} />", "<TrackTree trackData={trackData} progress={progress} activePopup={activePopup} onNodeClick={setActivePopup} onSetStatus={handleSetStatus} onOpenCoding={onOpenCoding} />")

text = text.replace("function TrackTree({ trackData, progress, activePopup, onNodeClick, onSetStatus }) {", "function TrackTree({ trackData, progress, activePopup, onNodeClick, onSetStatus, onOpenCoding }) {")

text = text.replace("<NodeBox id={item.id} label={item.label} status={progress[item.id] || 'not-started'} isPopupOpen={activePopup === item.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant=\"left\" isPill />", "<NodeBox id={item.id} label={item.label} status={progress[item.id] || 'not-started'} isPopupOpen={activePopup === item.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant=\"left\" isPill onOpenCoding={onOpenCoding} />")

text = text.replace("<NodeBox id={item.id} label={item.label} status={progress[item.id] || 'not-started'} isPopupOpen={activePopup === item.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant=\"right\" isPill />", "<NodeBox id={item.id} label={item.label} status={progress[item.id] || 'not-started'} isPopupOpen={activePopup === item.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant=\"right\" isPill onOpenCoding={onOpenCoding} />")

text = text.replace("<NodeBox id={node.id} label={node.label} status={progress[node.id] || 'not-started'} isPopupOpen={activePopup === node.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant=\"main\" />", "<NodeBox id={node.id} label={node.label} status={progress[node.id] || 'not-started'} isPopupOpen={activePopup === node.id} onNodeClick={onNodeClick} onSetStatus={onSetStatus} variant=\"main\" onOpenCoding={onOpenCoding} />")

text = text.replace("function NodeBox({ id, label, status, isPopupOpen, onNodeClick, onSetStatus, variant, isPill }) {", "function NodeBox({ id, label, status, isPopupOpen, onNodeClick, onSetStatus, variant, isPill, onOpenCoding }) {")

# Change dispatchEvent to use onOpenCoding
text = text.replace("window.dispatchEvent(new CustomEvent('OPEN_CODING_SANDBOX'));", "if (onOpenCoding) onOpenCoding();")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Plumbed onOpenCoding through RoadmapTree")