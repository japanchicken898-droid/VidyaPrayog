export const C_ROADMAP = [
  { id: "intro", label: "Introduction", type: "node", left: [], right: [] },
  { id: "setting-up", label: "Setting up", type: "node", 
    left: [
      { id: "installing", label: "Installing C" },
      { id: "running", label: "Running your First Program" },
      { id: "editors", label: "Code Editors / IDEs", pills: ["vim / nvim", "VSCode"] }
    ],
    right: [
      { id: "apps", label: "Applications" },
      { id: "assembly", label: "C vs Assembly" },
      { id: "cpp", label: "C vs C++" },
      { id: "cpp-roadmap", label: "C++ Roadmap", isLink: true }
    ]
  },
  { id: "learn-basics", label: "Learn the Basics", type: "label" },
  { id: "variables", label: "Variables", type: "node",
    left: [],
    right: [
      { id: "decl-def", label: "Declaration vs Definition" },
      { id: "init", label: "Initialization" },
      { id: "print-var", label: "Printing Variables" }
    ]
  },
  { id: "data-types", label: "Data Types", type: "node",
    left: [
      { id: "basic-types", label: "Basic Types", pills: ["integers", "float", "double", "char", "fixed-width integers", "booleans", "Extended Types"] }
    ],
    right: [
      { id: "type-conv", label: "Type Conversion" },
      { id: "type-qual", label: "Type Qualifiers", pills: ["const", "volatile", "restrict", "_Atomic"] }
    ]
  },
  { id: "operators", label: "Operators", type: "node",
    left: [
      { id: "arithmetic", label: "Arithmetic", pills: ["Logical", "Ternary", "Bitwise", "Comparison"] }
    ],
    right: []
  },
  { id: "control-flow", label: "Control Flow", type: "node",
    left: [],
    right: [
      { id: "if-switch", label: "if else / switch" },
      { id: "loops", label: "for / while / do while loops" },
      { id: "break-cont", label: "break / continue" }
    ]
  },
  { id: "functions", label: "Functions", type: "node",
    left: [
      { id: "main-func", label: "main Function" },
      { id: "recursive", label: "Recursive Functions" },
      { id: "scopes", label: "Variable Scopes" },
      { id: "variadic", label: "Variadic Functions" },
      { id: "cli-args", label: "Command-Line Arguments" }
    ],
    right: []
  },
  { id: "core-c", label: "Core C", type: "label" },
  { id: "pointers-memory", label: "Pointers & Memory", type: "node",
    left: [],
    right: [
      { id: "memory", label: "Memory", pills: ["Memory Model", "Stack vs Heap", "Lifetime of Objects"] },
      { id: "ptr-mech", label: "Pointer Mechanics", pills: ["Pointer Basics & Syntax", "Null Pointers", "void Pointers", "Pointer Arithmetic"] },
      { id: "mem-mgmt", label: "Memory Management", pills: ["malloc", "calloc", "realloc", "free"] },
      { id: "dyn-mem", label: "Dynamic Memory Allocation" },
      { id: "mem-leak", label: "Memory Leakage" },
      { id: "dangling", label: "Dangling Pointers" },
      { id: "ub", label: "Undefined Behavior" },
      { id: "buffer-overflow", label: "Buffer Overflow" }
    ]
  },
  { id: "arrays", label: "Arrays", type: "node", left: [], right: [] },
  { id: "strings", label: "Strings", type: "node", left: [], right: [] },
  { id: "user-types", label: "User-Defined Types", type: "node",
    left: [
      { id: "structs", label: "Structs", pills: ["Typedef", "Unions", "Enums"] }
    ],
    right: []
  },
  { id: "data-structures", label: "Common Data Structures", type: "node",
    left: [
      { id: "dyn-arr", label: "Dynamic Arrays" },
      { id: "hash-maps", label: "Hash Maps" },
      { id: "linked-lists", label: "Linked Lists" },
      { id: "ring-buffers", label: "Ring Buffers / FIFO Queues" }
    ],
    right: []
  },
  { id: "structuring", label: "Structuring Codebase", type: "node",
    left: [
      { id: "headers", label: "Header Files" },
      { id: "linkage", label: "Linkage", pills: ["static", "extern"] }
    ],
    right: []
  },
  { id: "error-handling", label: "Error Handling", type: "node",
    left: [
      { id: "errno", label: "errno" },
      { id: "exit-codes", label: "Exit Codes" },
      { id: "setjmp", label: "setjmp / longjmp" }
    ],
    right: []
  },
  { id: "file-io", label: "File I/O", type: "node",
    left: [
      { id: "streams", label: "Streams" },
      { id: "file-ptrs", label: "File Pointers" },
      { id: "bin-text", label: "Binary vs Text Mode" }
    ],
    right: []
  },
  { id: "std-lib", label: "Standard Library", type: "node",
    left: [],
    right: [
      { id: "io", label: "Input / Output" },
      { id: "data-utils", label: "Data Utilities" },
      { id: "text-proc", label: "Text Processing" },
      { id: "math-time", label: "Math & Time" },
      { id: "diag-limits", label: "Diagnostics & Limits" },
      { id: "os-sig", label: "OS & Signal Interfaces" }
    ]
  },
  { id: "build-comp", label: "Build & Compilation", type: "node",
    left: [
      { id: "preproc", label: "Preprocessors", pills: ["Macros", "Conditional Compilation", "Predefined Macros"] },
      { id: "compilers", label: "Compilers", pills: ["GCC / Clang", "TinyCC", "Optimization Levels", "Symbol Tables"] },
      { id: "linking", label: "Linking" },
      { id: "abi", label: "ABI" },
      { id: "build-sys", label: "Build Systems", pills: ["GNU Make", "CMake", "Ninja", "Meson"] },
      { id: "pkg-mgr", label: "Package Managers", pills: ["vcpkg", "Conan"] }
    ],
    right: []
  },
  { id: "debugging", label: "Debugging", type: "node",
    left: [],
    right: [
      { id: "dbg-tools", label: "Debugging Tools", pills: ["GDB", "LLDB", "WinDbg", "Valgrind", "strace", "ASan & LSan"] }
    ]
  },
  { id: "testing", label: "Testing", type: "node",
    left: [],
    right: [
      { id: "test-tools", label: "Testing Frameworks", pills: ["assert.h", "Unity", "CMocka", "Check"] }
    ]
  },
  { id: "advanced-c", label: "Advanced C", type: "label" },
  { id: "idioms", label: "Idioms & Design Patterns", type: "node",
    left: [],
    right: [
      { id: "func-ptrs", label: "Function pointers & Callbacks" },
      { id: "opaque-ptrs", label: "Opaque Pointers" },
      { id: "oo-c", label: "Object-Oriented C" },
      { id: "raii", label: "RAII-Simulated Cleanup" }
    ]
  },
  { id: "concurrency", label: "Concurrency", type: "node",
    left: [],
    right: [
      { id: "posix", label: "POSIX Threads" },
      { id: "mutexes", label: "Mutexes" }
    ]
  },
  { id: "process-mgmt", label: "Process Management", type: "node",
    left: [],
    right: [
      { id: "ipc", label: "IPC" }
    ]
  },
  { id: "c-standards", label: "C Standards", type: "node",
    left: [],
    right: [
      { id: "c89", label: "C89 / C90", pills: ["C99", "C11", "C17", "C23"] }
    ]
  }
];


export const JAVA_ROADMAP = [
  { id: "java-basics", label: "Learn the Basics", type: "node",
    left: [
      { id: "basic-syntax", label: "Basic Syntax" },
      { id: "lifecycle", label: "Lifecycle of a Program" },
      { id: "data-types", label: "Data Types" },
      { id: "vars-scopes", label: "Variables and Scopes" },
      { id: "type-casting", label: "Type Casting" }
    ],
    right: [
      { id: "strings-methods", label: "Strings and Methods" },
      { id: "math-ops", label: "Math Operations" },
      { id: "arrays", label: "Arrays" },
      { id: "conditionals", label: "Conditionals" },
      { id: "loops", label: "Loops" }
    ]
  },
  { id: "oop-label", label: "Object Oriented Programming", type: "label" },
  { id: "basics-oop", label: "Basics of OOP", type: "node",
    left: [
      { id: "classes-objects", label: "Classes and Objects" },
      { id: "attrs-methods", label: "Attributes and Methods" },
      { id: "access-specifiers", label: "Access Specifiers" },
      { id: "static-keyword", label: "Static Keyword" }
    ],
    right: [
      { id: "final-keyword", label: "Final Keyword" },
      { id: "nested-classes", label: "Nested Classes" },
      { id: "packages", label: "Packages" }
    ]
  },
  { id: "more-oop", label: "More about OOP", type: "node",
    left: [
      { id: "obj-lifecycle", label: "Object Lifecycle" },
      { id: "inheritance", label: "Inheritance" },
      { id: "abstraction", label: "Abstraction" },
      { id: "encapsulation", label: "Encapsulation" },
      { id: "interfaces", label: "Interfaces" },
      { id: "pass-by-value", label: "Pass by Value / Reference" }
    ],
    right: [
      { id: "method-chaining", label: "Method Chaining" },
      { id: "enums-record", label: "Enums & Record" },
      { id: "method-overload", label: "Overloading / Overriding" },
      { id: "init-block", label: "Initializer Block" },
      { id: "dynamic-binding", label: "Static vs Dynamic Binding" }
    ]
  },
  { id: "core-java-apis", label: "Core Java APIs", type: "label" },
  { id: "exception-handling", label: "Exception Handling", type: "node",
    left: [],
    right: [
      { id: "lambda-exp", label: "Lambda Expressions" },
      { id: "annotations", label: "Annotations" },
      { id: "modules", label: "Modules" },
      { id: "optionals", label: "Optionals" }
    ]
  },
  { id: "collections", label: "Collections", type: "node",
    left: [
      { id: "collection-fw", label: "Collection Framework", pills: ["Array vs ArrayList", "Set", "Map", "Queue", "Dequeue", "Stack", "Iterator", "Generic Collections"] }
    ],
    right: []
  },
  { id: "concurrency", label: "Concurrency", type: "node",
    left: [],
    right: [
      { id: "threads", label: "Threads & Memory", pills: ["volatile keyword", "Java Memory Model", "Virtual Threads", "Threads"] }
    ]
  },
  { id: "functional-prog", label: "Functional Programming", type: "node",
    left: [
      { id: "fp-concepts", label: "FP Concepts", pills: ["High Order Functions", "Functional Interfaces", "Functional Composition", "Stream API"] }
    ],
    right: []
  },
  { id: "utilities", label: "Utilities & I/O", type: "node",
    left: [
      { id: "crypto", label: "Cryptography" },
      { id: "date-time", label: "Date and Time" },
      { id: "networking", label: "Networking" },
      { id: "regex", label: "Regular Expressions" }
    ],
    right: [
      { id: "di", label: "Dependency Injection" },
      { id: "io-ops", label: "I/O Operations" },
      { id: "file-ops", label: "File Operations" }
    ]
  },
  { id: "frameworks-tools", label: "Ecosystem & Frameworks", type: "label" },
  { id: "build-tools", label: "Build Tools", type: "node",
    left: [
      { id: "maven", label: "Maven" },
      { id: "gradle", label: "Gradle" },
      { id: "bazel", label: "Bazel" }
    ],
    right: []
  },
  { id: "web-frameworks", label: "Web Frameworks", type: "node",
    left: [],
    right: [
      { id: "spring", label: "Spring (Spring Boot)" },
      { id: "quarkus", label: "Quarkus" },
      { id: "javalin", label: "Javalin" },
      { id: "play-fw", label: "Play Framework" }
    ]
  },
  { id: "database-access", label: "Database Access", type: "node",
    left: [
      { id: "jdbc", label: "JDBC" },
      { id: "ebean", label: "EBean" },
      { id: "hibernate", label: "Hibernate" },
      { id: "spring-data", label: "Spring Data JPA" }
    ],
    right: []
  },
  { id: "testing", label: "Testing", type: "node",
    left: [],
    right: [
      { id: "unit-testing", label: "Unit Testing", pills: ["JUnit", "TestNG"] },
      { id: "integration-testing", label: "Integration Testing", pills: ["REST Assured", "JMeter"] },
      { id: "behavior-testing", label: "Behavior Testing", pills: ["Cucumber-JVM"] },
      { id: "mocking", label: "Mocking", pills: ["Mockito"] }
    ]
  },
  { id: "logging-frameworks", label: "Logging Frameworks", type: "node",
    left: [
      { id: "logging-libs", label: "Logging Libraries", pills: ["Logback", "Log4j2", "SLF4J", "TinyLog"] }
    ],
    right: []
  }
];


export const PYTHON_ROADMAP = [
  { id: "py-basics", label: "Learn the Basics", type: "node",
    left: [
      { id: "basic-syntax", label: "Basic Syntax" },
      { id: "vars-datatypes", label: "Variables and Data Types" },
      { id: "conditionals", label: "Conditionals" },
      { id: "loops", label: "Loops" }
    ],
    right: [
      { id: "type-casting", label: "Type Casting" },
      { id: "exceptions", label: "Exceptions" },
      { id: "functions", label: "Functions & Builtins" },
      { id: "collections", label: "Collections", pills: ["Lists", "Tuples", "Sets", "Dictionaries"] }
    ]
  },
  { id: "dsa", label: "Data Structures & Algorithms", type: "node",
    left: [
      { id: "dsa-topics", label: "Core DSA", pills: ["Arrays and Linked Lists", "Hash Tables", "Heaps, Stacks and Queues", "Binary Search Tree", "Recursion", "Sorting Algorithms"] }
    ],
    right: [
      { id: "modules", label: "Modules", pills: ["Builtin", "Custom"] },
      { id: "lambdas", label: "Lambdas" },
      { id: "decorators", label: "Decorators" },
      { id: "iterators", label: "Iterators" },
      { id: "regex", label: "Regular Expressions" }
    ]
  },
  { id: "oop", label: "Object Oriented Programming", type: "node",
    left: [
      { id: "pkg-managers", label: "Package Managers", pills: ["PyPI", "Pip", "Conda", "uv", "Poetry"] },
      { id: "common-pkgs", label: "Common Packages", pills: ["pyproject.toml", "Configuration"] },
      { id: "paradigms", label: "Paradigms", pills: ["List Comprehensions", "Generator Expressions", "Context Manager"] }
    ],
    right: [
      { id: "oop-concepts", label: "OOP Concepts", pills: ["Classes", "Inheritance", "Methods, Dunder"] },
      { id: "environments", label: "Environments", pills: ["Pipenv", "virtualenv", "pyenv"] },
      { id: "static-typing", label: "Static Typing", pills: ["typing", "mypy", "pyright", "pyre", "Pydantic"] }
    ]
  },
  { id: "concurrency", label: "Concurrency", type: "node",
    left: [
      { id: "frameworks", label: "Learn a Framework", pills: ["Plotly Dash", "Pyramid", "gevent", "aiohttp", "Tornado", "Sanic", "Fast API", "Django", "Flask"] }
    ],
    right: [
      { id: "conc-concepts", label: "Concurrency Concepts", pills: ["Multiprocessing", "Asynchrony", "GIL", "Threading"] }
    ]
  },
  { id: "tooling", label: "Tooling & Testing", type: "label" },
  { id: "code-formatting", label: "Code Formatting", type: "node",
    left: [
      { id: "docs", label: "Documentation", pills: ["Sphinx"] }
    ],
    right: [
      { id: "formatters", label: "Formatters", pills: ["yapf", "black", "ruff"] }
    ]
  },
  { id: "testing", label: "Testing", type: "node",
    left: [],
    right: [
      { id: "test-fw", label: "Testing Frameworks", pills: ["tox", "nose", "unittest / pyUnit", "doctest", "pytest"] }
    ]
  }
];


export const FULLSTACK_ROADMAP = [
  { id: "fs-frontend-basics", label: "Frontend Basics", type: "node",
    left: [
      { id: "fs-html", label: "HTML" },
      { id: "fs-css", label: "CSS" },
      { id: "cp-static", label: "Checkpoint - Static Webpages" }
    ],
    right: [
      { id: "fs-js", label: "JavaScript" },
      { id: "fs-npm", label: "npm" },
      { id: "cp-interactivity", label: "Checkpoint - Interactivity" },
      { id: "cp-packages", label: "Checkpoint - External Packages" }
    ]
  },
  { id: "fs-frontend-fw", label: "Frontend Frameworks & VCS", type: "node",
    left: [
      { id: "fs-react", label: "React" },
      { id: "fs-tailwind", label: "Tailwind CSS" },
      { id: "cp-frontend-apps", label: "Checkpoint - Frontend Apps" }
    ],
    right: [
      { id: "fs-git", label: "Git" },
      { id: "fs-github", label: "GitHub" },
      { id: "cp-collab", label: "Checkpoint - Collaborative Work" }
    ]
  },
  { id: "fs-backend-start", label: "Backend Starts Here", type: "label" },
  { id: "fs-backend-basics", label: "Backend Basics", type: "node",
    left: [
      { id: "fs-nodejs", label: "Node.js" },
      { id: "cp-cli", label: "Checkpoint - CLI Apps" }
    ],
    right: [
      { id: "fs-postgres", label: "PostgreSQL" },
      { id: "cp-crud", label: "Checkpoint - Simple CRUD Apps" }
    ]
  },
  { id: "fs-advanced-backend", label: "Advanced Backend", type: "node",
    left: [
      { id: "fs-rest", label: "RESTful APIs" },
      { id: "fs-jwt", label: "JWT Auth" },
      { id: "fs-redis", label: "Redis" }
    ],
    right: [
      { id: "cp-complete-app", label: "Checkpoint - Complete App" }
    ]
  },
  { id: "fs-devops-start", label: "DevOps Starts Here", type: "label" },
  { id: "fs-cloud", label: "Cloud Services", type: "node",
    left: [
      { id: "fs-linux", label: "Linux Basics" }
    ],
    right: [
      { id: "fs-aws", label: "Basic AWS Services", pills: ["EC2", "VPC", "S3", "Route53", "SES"] },
      { id: "cp-deploy", label: "Checkpoint - Deployment" }
    ]
  },
  { id: "fs-automation", label: "Automation & Monitoring", type: "node",
    left: [
      { id: "fs-ansible", label: "Ansible" },
      { id: "cp-automation", label: "Checkpoint - Automation" }
    ],
    right: [
      { id: "fs-github-actions", label: "GitHub Actions" },
      { id: "fs-monit", label: "Monit" },
      { id: "cp-cicd", label: "Checkpoint - CI / CD" },
      { id: "cp-monitoring", label: "Checkpoint - Monitoring" }
    ]
  },
  { id: "fs-infrastructure", label: "Infrastructure", type: "node",
    left: [
      { id: "fs-terraform", label: "Terraform" },
      { id: "cp-infra", label: "Checkpoint - Infrastructure" }
    ],
    right: []
  }
];


export const POSTGRES_ROADMAP = [
  { id: "pg-intro", label: "Introduction", type: "node",
    left: [
      { id: "pg-queries", label: "Queries" },
      { id: "pg-datatypes", label: "Data Types" },
      { id: "pg-rows-cols", label: "Rows / Columns" },
      { id: "pg-tables-schemas", label: "Tables / Schemas" },
      { id: "pg-databases", label: "Databases" }
    ],
    right: [
      { id: "pg-what-relational", label: "What are Relational Databases?" },
      { id: "pg-rdbms-benefits", label: "RDBMS Benefits and Limitations" },
      { id: "pg-vs-nosql", label: "PostgreSQL vs NoSQL" },
      { id: "pg-vs-other", label: "PostgreSQL vs Other RDBMS" }
    ]
  },
  { id: "pg-basic-rdbms", label: "Basic RDBMS Concepts", type: "node",
    left: [
      { id: "pg-relational-model", label: "Relational Model", pills: ["Domains", "Attributes", "Tuples", "Relations", "Constraints", "NULL"] }
    ],
    right: [
      { id: "pg-high-level-db", label: "High Level Database Concepts", pills: ["ACID", "MVCC", "Transactions", "Write-ahead Log", "Query Processing"] }
    ]
  },
  { id: "pg-install-setup", label: "Installation and Setup", type: "node",
    left: [
      { id: "pg-managing", label: "Managing Postgres", pills: ["Using systemd", "Using pg_ctl", "Using pg_ctlcluster"] },
      { id: "pg-deploying", label: "Deployment", pills: ["Using Docker", "Package Managers", "Connect using psql", "Deployment in Cloud"] }
    ],
    right: []
  },
  { id: "pg-learn-sql", label: "Learn SQL", type: "node",
    left: [],
    right: [
      { id: "pg-ddl-dml", label: "DDL & DML Queries", pills: ["For Schemas", "ForTables", "Data Types", "Querying Data", "Filtering Data", "Modifying Data", "Joining Tables"] },
      { id: "pg-import-export", label: "Import / Export Using COPY" },
      { id: "pg-adv-sql", label: "Advanced Topics", pills: ["Transactions", "CTE", "Subqueries", "Lateral Join", "Grouping", "Set Operations"] }
    ]
  },
  { id: "pg-configuring", label: "Configuring", type: "node",
    left: [
      { id: "pg-reporting-log", label: "Reporting Logging & Statistics" },
      { id: "pg-adding-ext", label: "Adding Extra Extensions" },
      { id: "pg-conf", label: "postgres.conf configuration", pills: ["Resource Usage", "Write-ahead Log", "Vacuums", "Replication", "Query Planner", "Checkpoints"] }
    ],
    right: []
  },
  { id: "pg-security", label: "Security", type: "node",
    left: [
      { id: "pg-object-priv", label: "Object Privileges", pills: ["Default Privileges", "Grant / Revoke"] }
    ],
    right: [
      { id: "pg-auth-models", label: "Authentication Models", pills: ["Roles", "pg_hba.conf", "SSL Settings"] },
      { id: "pg-adv-sec", label: "Advanced Topics", pills: ["Row-Level Security", "SELinux"] }
    ]
  },
  { id: "pg-infra-skills", label: "Infrastructure Skills", type: "label" },
  { id: "pg-learn-automate", label: "Learn to Automate", type: "node",
    left: [
      { id: "pg-shell-scripts", label: "Shell Scripts" },
      { id: "pg-any-lang", label: "Any Programming Language" },
      { id: "pg-config-mgmt", label: "Configuration Management", pills: ["Ansible", "Salt", "Puppet", "Chef"] }
    ],
    right: [
      { id: "pg-anonymization", label: "Anonymization", pills: ["PostgreSQL Anonymizer"] },
      { id: "pg-backup-rec", label: "Backup & Recovery Tools", pills: ["3rd Party", "Builtin Tools", "Backup Validation Procedures"] },
      { id: "pg-upgrades", label: "Upgrade Procedures", pills: ["Using pg_upgrade", "Using Logical Replication"] },
      { id: "pg-replication", label: "Replication", pills: ["Logical", "Streaming"] },
      { id: "pg-conn-pooling", label: "Connection Pooling", pills: ["PgBouncer"] },
      { id: "pg-cluster-mgmt", label: "Cluster Management", pills: ["Patroni"] },
      { id: "pg-k8s", label: "Kubernetes Deployment", pills: ["Helm", "Operators"] },
      { id: "pg-monitoring", label: "Monitoring", pills: ["Prometheus", "Zabbix"] },
      { id: "pg-load-balancing", label: "Load Balancing", pills: ["HAProxy", "Consul", "KeepAlived", "Etcd"] }
    ]
  },
  { id: "pg-app-skills", label: "Application Skills", type: "label" },
  { id: "pg-advanced-topics", label: "Advanced Topics", type: "node",
    left: [
      { id: "pg-low-level", label: "Low Level Internals", pills: ["Processes & Memory", "Vacuum Processing", "Buffer Management", "Lock Management", "Physical Storage", "System Catalog"] }
    ],
    right: [
      { id: "pg-migrations", label: "Migrations", pills: ["Practical Patterns", "Migration Related Tools"] },
      { id: "pg-data-proc", label: "Data and Processing", pills: ["Bulk Loading", "Data Partitioning", "Sharding Patterns", "Normalization"] },
      { id: "pg-queues", label: "Queues", pills: ["Patterns / Antipatterns", "PgQ"] }
    ]
  },
  { id: "pg-fine-grained", label: "Fine-grained Tuning", type: "node",
    left: [],
    right: [
      { id: "pg-per-user", label: "Per-User, Per-Database Setting" },
      { id: "pg-storage-params", label: "Storage Parameters" },
      { id: "pg-workload", label: "Workload-Dependant Tuning", pills: ["OLTP", "OLAP", "HTAP"] },
      { id: "pg-adv-sql-tuning", label: "Advanced SQL", pills: ["PL/pgSQL", "Procedures and Functions", "Triggers", "Recursive CTE", "Aggregate and Window functions"] }
    ]
  },
  { id: "pg-troubleshooting", label: "Troubleshooting Techniques", type: "node",
    left: [
      { id: "pg-sys-views", label: "Posgres System Views", pills: ["pg_stat_activity", "pg_stat_statements"] },
      { id: "pg-techniques", label: "Techniques", pills: ["USE", "RED", "Golden Signals"] },
      { id: "pg-tools", label: "Posgres Tools", pills: ["pgcenter"] }
    ],
    right: [
      { id: "pg-query-analysis", label: "Query Analysis", pills: ["EXPLAIN", "Depesz", "PEV2", "Tensor", "explain.dalibo.com"] },
      { id: "pg-profiling", label: "Profiling Tools", pills: ["perf-tools", "gdb", "strace", "Core Dumps", "ebpf"] },
      { id: "pg-os-tools", label: "Operating System Tools", pills: ["top", "sysstat", "iotop"] },
      { id: "pg-log-analysis", label: "Log Analysis", pills: ["pgCluu", "pgBadger"] },
      { id: "pg-cli-utils", label: "CLI Utilities", pills: ["awk", "grep", "sed"] }
    ]
  },
  { id: "pg-sql-opt", label: "SQL Optimization Techniques", type: "node",
    left: [],
    right: [
      { id: "pg-sql-patterns", label: "SQL Query Patterns / Anti-patterns" },
      { id: "pg-schema-patterns", label: "Schema Design Patterns / Anti-patterns" }
    ]
  },
  { id: "pg-indexes", label: "Indexes and their Usecases", type: "node",
    left: [],
    right: [
      { id: "pg-index-types", label: "Index Types", pills: ["B-Tree", "BRIN", "GiST", "Hash", "SP-GiST", "GIN"] }
    ]
  },
  { id: "pg-get-involved", label: "Get Involved in Development", type: "node",
    left: [
      { id: "pg-mailing-lists", label: "Mailing Lists" },
      { id: "pg-reviewing", label: "Reviewing Patches" },
      { id: "pg-writing", label: "Writing Patches" }
    ],
    right: []
  }
];

export const BACKEND_ROADMAP = [
  { id: "be-internet", label: "Internet", type: "node",
    left: [],
    right: [
      { id: "be-how-internet", label: "How does the internet work?" },
      { id: "be-http", label: "What is HTTP?" },
      { id: "be-domain", label: "What is Domain Name?" },
      { id: "be-hosting", label: "What is hosting?" },
      { id: "be-dns", label: "DNS and how it works?" },
      { id: "be-browsers", label: "Browsers and how they work?" }
    ]
  },
  { id: "be-lang", label: "Pick a Language", type: "node",
    left: [
      { id: "be-langs", label: "Languages", pills: ["JavaScript", "Go", "Python", "Ruby", "Java", "C#", "PHP", "Rust"] }
    ],
    right: []
  },
  { id: "be-vcs", label: "Version Control Systems", type: "node",
    left: [
      { id: "be-git", label: "Git" }
    ],
    right: []
  },
  { id: "be-repo", label: "Repo Hosting Services", type: "node",
    left: [
      { id: "be-github", label: "GitHub" },
      { id: "be-gitlab", label: "GitLab" },
      { id: "be-bitbucket", label: "Bitbucket" }
    ],
    right: []
  },
  { id: "be-rdbms", label: "Relational Databases", type: "node",
    left: [
      { id: "be-postgres", label: "PostgreSQL" }
    ],
    right: [
      { id: "be-mysql", label: "MySQL" },
      { id: "be-mariadb", label: "MariaDB" },
      { id: "be-mssql", label: "MS SQL" },
      { id: "be-oracle", label: "Oracle" },
      { id: "be-sqlite", label: "SQLite" }
    ]
  },
  { id: "be-apis", label: "Learn about APIs", type: "node",
    left: [
      { id: "be-hateoas", label: "HATEOAS" },
      { id: "be-openapi", label: "Open API Specs" }
    ],
    right: [
      { id: "be-api-types", label: "API Types", pills: ["REST", "JSON APIs", "SOAP", "gRPC", "GraphQL"] }
    ]
  },
  { id: "be-caching", label: "Caching", type: "node",
    left: [
      { id: "be-redis", label: "Redis" },
      { id: "be-memcached", label: "Memcached" },
      { id: "be-server-side", label: "Server Side" },
      { id: "be-cdn", label: "CDN" },
      { id: "be-client-side", label: "Client Side" }
    ],
    right: []
  },
  { id: "be-security", label: "Web Security", type: "node",
    left: [
      { id: "be-hashing", label: "Hashing Algorithms", pills: ["MD5", "SHA", "scrypt", "bcrypt"] },
      { id: "be-api-security", label: "API Security Best Practices", pills: ["HTTPS", "OWASP Risks", "CORS", "SSL/TLS", "CSP", "Server Security"] }
    ],
    right: []
  },
  { id: "be-testing", label: "Testing", type: "node",
    left: [],
    right: [
      { id: "be-int-testing", label: "Integration Testing" },
      { id: "be-unit-testing", label: "Unit Testing" },
      { id: "be-func-testing", label: "Functional Testing" }
    ]
  },
  { id: "be-cicd", label: "CI / CD", type: "node", left: [], right: [] },
  { id: "be-more-db", label: "More about Databases", type: "node",
    left: [],
    right: [
      { id: "be-db-concepts", label: "Database Concepts", pills: ["ORMs", "ACID", "Transactions", "N+1 Problem", "Normalization", "Failure Modes", "Profiling Perfor.", "Migrations"] }
    ]
  },
  { id: "be-scaling", label: "Scaling Databases", type: "node",
    left: [
      { id: "be-db-indexes", label: "Database Indexes" },
      { id: "be-data-rep", label: "Data Replication" },
      { id: "be-sharding", label: "Sharding Strategies" },
      { id: "be-cap", label: "CAP Theorem" }
    ],
    right: []
  },
  { id: "be-arch", label: "Software Design & Architecture", type: "node",
    left: [],
    right: [
      { id: "be-arch-patterns", label: "Architectural Patterns", pills: ["Monolithic Apps", "Microservices", "SOA", "Serverless", "Service Mesh", "Twelve Factor Apps"] }
    ]
  },
  { id: "be-dev-principles", label: "Design and Development Principles", type: "node",
    left: [
      { id: "be-gof", label: "GOF Design Patterns" },
      { id: "be-ddd", label: "Domain Driven Design" },
      { id: "be-tdd", label: "Test Driven Development" },
      { id: "be-cqrs", label: "CQRS" },
      { id: "be-event-sourcing", label: "Event Sourcing" }
    ],
    right: []
  },
  { id: "be-containers", label: "Containerization vs Virtualization", type: "node",
    left: [
      { id: "be-k8s", label: "Kubernetes" },
      { id: "be-docker", label: "Docker" },
      { id: "be-lxc", label: "LXC" }
    ],
    right: []
  },
  { id: "be-web-servers", label: "Web Servers", type: "node",
    left: [
      { id: "be-nginx", label: "Nginx" },
      { id: "be-apache", label: "Apache" },
      { id: "be-caddy", label: "Caddy" },
      { id: "be-iis", label: "MS IIS" }
    ],
    right: []
  },
  { id: "be-search", label: "Search Engines", type: "node",
    left: [],
    right: [
      { id: "be-elastic", label: "Elasticsearch" },
      { id: "be-solr", label: "Solr" }
    ]
  },
  { id: "be-brokers", label: "Message Brokers", type: "node",
    left: [],
    right: [
      { id: "be-rabbitmq", label: "RabbitMQ" },
      { id: "be-kafka", label: "Kafka" }
    ]
  },
  { id: "be-realtime", label: "Real-Time Data", type: "node",
    left: [
      { id: "be-graphql", label: "GraphQL" }
    ],
    right: [
      { id: "be-sse", label: "Server Sent Events" },
      { id: "be-websockets", label: "WebSockets" },
      { id: "be-long-polling", label: "Long Polling" },
      { id: "be-short-polling", label: "Short Polling" }
    ]
  },
  { id: "be-nosql", label: "NoSQL Databases", type: "node",
    left: [
      { id: "be-document", label: "Document DBs", pills: ["MongoDB", "CouchDB"] },
      { id: "be-kv", label: "Key-Value", pills: ["Redis", "DynamoDB"] },
      { id: "be-rt", label: "Realtime", pills: ["Firebase", "RethinkDB"] },
      { id: "be-ts", label: "Time Series", pills: ["Influx DB", "TimeScale"] },
      { id: "be-col", label: "Column DBs", pills: ["Cassandra", "Base"] },
      { id: "be-graph", label: "Graph DBs", pills: ["Neo4j", "AWS Neptune"] }
    ],
    right: []
  },
  { id: "be-building-scale", label: "Building For Scale", type: "node",
    left: [
      { id: "be-infra-knowledge", label: "Basic Infrastructure Knowledge" }
    ],
    right: [
      { id: "be-mitigation", label: "Mitigation Strategies", pills: ["Graceful Degradation", "Throttling", "Backpressure", "Loadshifting", "Circuit Breaker"] },
      { id: "be-mig-strat", label: "Migration Strategies" },
      { id: "be-types-scaling", label: "Types of Scaling" },
      { id: "be-observability", label: "Observability", pills: ["Instrumentation", "Monitoring", "Telemetry"] }
    ]
  }
];

export const ROADMAP_DATA = {
  c: C_ROADMAP,
  java: JAVA_ROADMAP,
  python: PYTHON_ROADMAP,
  fullstack: FULLSTACK_ROADMAP,
  postgres: POSTGRES_ROADMAP,
  backend: BACKEND_ROADMAP,
};