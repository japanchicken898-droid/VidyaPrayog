path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\data\roadmapData.js"
with open(path, 'a', encoding='utf-8') as f:
    f.write("""
export const UX_ROADMAP = [
  { id: "stage1", label: "Stage 1: UX Foundations", type: "label" },
  { id: "human_decision", label: "Human Decision Making", type: "node", 
    left: [{ id: "nudge", label: "Nudge Theory" }, { id: "behavioral", label: "Behavioral Science" }],
    right: [{ id: "fogg", label: "BJ Fogg's Model" }, { id: "funnel", label: "CREATE Action Funnel" }]
  },
  { id: "chk1", label: "Checkpoint: Psychology & Cognitive Theory", type: "label" },
  
  { id: "stage2", label: "Stage 2: Strategy & Empathy", type: "label" },
  { id: "strategy", label: "Behavior Change & Product", type: "node",
    left: [{ id: "outcome", label: "Target Outcome" }, { id: "actor", label: "Target Actor" }],
    right: [{ id: "routine", label: "Replace Routine" }, { id: "personas", label: "Create User Personas" }]
  },
  { id: "chk2", label: "Checkpoint: User Research & Empathy Maps", type: "label" },

  { id: "stage3", label: "Stage 3: Design & Prototyping", type: "label" },
  { id: "conceptual", label: "Conceptual Design", type: "node",
    left: [{ id: "stories", label: "User Stories" }, { id: "cem", label: "Customer Experience Map" }],
    right: [{ id: "figma", label: "Figma / Adobe XD" }, { id: "layout", label: "Good Layout Rules" }]
  },
  { id: "chk3", label: "Checkpoint: Wireframes & High-Fidelity Prototypes", type: "label" },

  { id: "stage4", label: "Stage 4: Testing & Iteration", type: "label" },
  { id: "impact", label: "Measuring the Impact", type: "node",
    left: [{ id: "abtest", label: "A/B Testing" }, { id: "multivariate", label: "Multivariate Testing" }],
    right: [{ id: "gamification", label: "Gamification" }, { id: "distractions", label: "Clear Distractions" }]
  },
  { id: "chk4", label: "Checkpoint: Usability Testing & Iteration", type: "label" }
];

export const FLUTTER_ROADMAP = [
  { id: "stage1", label: "Stage 1: Dart Foundations", type: "label" },
  { id: "dart", label: "Basics of Dart", type: "node", 
    left: [{ id: "vars", label: "Variables & Types" }, { id: "control", label: "Control Flow" }],
    right: [{ id: "oop", label: "OOP Principles" }, { id: "async", label: "Async / Await" }]
  },
  { id: "chk1", label: "Checkpoint: Core Programming Logic", type: "label" },
  
  { id: "stage2", label: "Stage 2: UI & Widgets", type: "label" },
  { id: "widgets", label: "Flutter Widgets", type: "node",
    left: [{ id: "stateless", label: "Stateless / Stateful Widgets" }, { id: "material", label: "Material & Cupertino" }],
    right: [{ id: "responsive", label: "Responsive Layouts" }, { id: "inherited", label: "Inherited Widgets" }]
  },
  { id: "chk2", label: "Checkpoint: Building Pixel-Perfect Screens", type: "label" },

  { id: "stage3", label: "Stage 3: State & Data", type: "label" },
  { id: "state", label: "State Management & APIs", type: "node",
    left: [{ id: "riverpod", label: "Riverpod / Provider" }, { id: "bloc", label: "BLoC Architecture" }],
    right: [{ id: "rest", label: "RESTful APIs" }, { id: "firebase", label: "Firebase Auth & Firestore" }]
  },
  { id: "chk3", label: "Checkpoint: Dynamic Data & Authentication", type: "label" },

  { id: "stage4", label: "Stage 4: Advanced & Deployment", type: "label" },
  { id: "advanced", label: "Animations & Testing", type: "node",
    left: [{ id: "anim", label: "Animation Controller" }, { id: "hero", label: "Hero Animations" }],
    right: [{ id: "unit", label: "Unit & Widget Testing" }, { id: "stores", label: "AppStore / PlayStore Deployment" }]
  },
  { id: "chk4", label: "Checkpoint: Production-Ready App", type: "label" }
];

export const ML_ROADMAP = [
  { id: "stage1", label: "Stage 1: Mathematical Foundations", type: "label" },
  { id: "math", label: "Math & Statistics", type: "node", 
    left: [{ id: "linalg", label: "Linear Algebra" }, { id: "calc", label: "Calculus" }],
    right: [{ id: "stats", label: "Descriptive Statistics" }, { id: "prob", label: "Probability Theory" }]
  },
  { id: "chk1", label: "Checkpoint: Algorithmic Math Proficiency", type: "label" },
  
  { id: "stage2", label: "Stage 2: Programming & Data", type: "label" },
  { id: "data", label: "Python for Data", type: "node",
    left: [{ id: "numpy", label: "Numpy & Pandas" }, { id: "matplotlib", label: "Matplotlib & Seaborn" }],
    right: [{ id: "cleaning", label: "Data Cleaning" }, { id: "feature", label: "Feature Engineering" }]
  },
  { id: "chk2", label: "Checkpoint: Data Wrangling & Visualization", type: "label" },

  { id: "stage3", label: "Stage 3: Core ML Algorithms", type: "label" },
  { id: "ml", label: "Machine Learning Types", type: "node",
    left: [{ id: "supervised", label: "Supervised Learning" }, { id: "classreg", label: "Classification & Regression" }],
    right: [{ id: "unsupervised", label: "Unsupervised Learning" }, { id: "clustering", label: "Clustering" }]
  },
  { id: "chk3", label: "Checkpoint: Predictive Modeling", type: "label" },

  { id: "stage4", label: "Stage 4: Deep Learning & Advanced", type: "label" },
  { id: "dl", label: "Deep Learning (NN)", type: "node",
    left: [{ id: "pytorch", label: "TensorFlow / PyTorch" }, { id: "cnn", label: "Convolutional Neural Networks" }],
    right: [{ id: "attention", label: "Attention Mechanisms" }, { id: "nlp", label: "Natural Language Processing" }]
  },
  { id: "chk4", label: "Checkpoint: AI Systems & Model Deployment", type: "label" }
];
""")
print("Added UX, FLUTTER, ML roadmaps to data")