path = r"c:\Users\Bhuvanesh MP\Downloads\VidyaPrayog\VidyaPrayog\src\data\roadmapData.js"

fullstack_roadmap = """
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
"""

with open(path, 'w', encoding='utf-8') as f:
    f.write(fullstack_roadmap)
print("Updated roadmapData.js")