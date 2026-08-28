
export const FULLSTACK_ROADMAP = [
  { id: "stage1", label: "Stage 1: Frontend Foundations", type: "label" },
  { id: "internet", label: "Internet & Web Basics", type: "node", 
    left: [
      { id: "html", label: "HTML" },
      { id: "css", label: "CSS" }
    ],
    right: [
      { id: "javascript", label: "JavaScript" },
      { id: "npm", label: "npm / Package Managers" }
    ]
  },
  { id: "chk1", label: "Checkpoint: Static Webpages, Interactivity, External Packages", type: "label" },
  
  { id: "stage2", label: "Stage 2: Modern Frontend & State", type: "label" },
  { id: "react_fw", label: "React & Frameworks", type: "node",
    left: [
      { id: "react", label: "React" },
      { id: "tailwind", label: "Tailwind CSS" }
    ],
    right: [
      { id: "git", label: "Git" },
      { id: "github", label: "GitHub" }
    ]
  },
  { id: "chk2", label: "Checkpoint: Single Page Apps, Responsive Layouts", type: "label" },

  { id: "stage3", label: "Stage 3: Backend & Data Architecture", type: "label" },
  { id: "server_db", label: "Server & Databases", type: "node",
    left: [
      { id: "nodejs", label: "Node.js" },
      { id: "express", label: "Express" },
      { id: "rest", label: "RESTful APIs" }
    ],
    right: [
      { id: "postgres", label: "PostgreSQL" },
      { id: "redis", label: "Redis" },
      { id: "jwt", label: "JWT Auth" }
    ]
  },
  { id: "chk3", label: "Checkpoint: CLI Apps, Simple CRUD, Auth Flows", type: "label" },

  { id: "stage4", label: "Stage 4: Cloud & Deployment", type: "label" },
  { id: "devops", label: "DevOps & Infrastructure", type: "node",
    left: [
      { id: "linux", label: "Linux Basics" },
      { id: "docker", label: "Docker" }
    ],
    right: [
      { id: "github_actions", label: "CI/CD GitHub Actions" },
      { id: "aws", label: "AWS Services (EC2/S3)" }
    ]
  },
  { id: "chk4", label: "Checkpoint: Automated Testing, Containerization, Live Cloud Deployment", type: "label" }
];

export const BACKEND_ROADMAP = [
  { id: "b_stage1", label: "Internet Protocols & Languages", type: "label" },
  { id: "b_internet", label: "Internet & OS Basics", type: "node", 
    left: [
      { id: "b_http", label: "HTTP / TCP" },
      { id: "b_dns", label: "DNS & Hosting" }
    ],
    right: [
      { id: "b_lang", label: "Language/Runtime (Go/Python/Node)" },
      { id: "b_threads", label: "Threads & Concurrency" }
    ]
  },
  { id: "b_stage2", label: "Databases & Caching", type: "label" },
  { id: "b_data", label: "Relational DBs & Caching", type: "node",
    left: [
      { id: "b_sql", label: "PostgreSQL / MySQL" },
      { id: "b_nosql", label: "NoSQL (MongoDB)" }
    ],
    right: [
      { id: "b_redis", label: "Redis / Memcached" },
      { id: "b_orm", label: "ORMs & ACID" }
    ]
  },
  { id: "b_stage3", label: "API Design & Security", type: "label" },
  { id: "b_apis", label: "API Security", type: "node",
    left: [
      { id: "b_rest", label: "REST & GraphQL" },
      { id: "b_auth", label: "OAuth & JWT" }
    ],
    right: [
      { id: "b_sec", label: "CORS, SSL, Hashing" },
      { id: "b_rate", label: "Rate Limiting" }
    ]
  },
  { id: "b_stage4", label: "Architecture & DevOps", type: "label" },
  { id: "b_arch", label: "Microservices & Observability", type: "node",
    left: [
      { id: "b_micro", label: "Microservices & SOA" },
      { id: "b_docker", label: "Docker & Kubernetes" }
    ],
    right: [
      { id: "b_ci", label: "CI/CD Pipelines" },
      { id: "b_obs", label: "Logging & Observability" }
    ]
  }
];

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
