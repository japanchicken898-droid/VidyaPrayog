
export const ROLE_DIAGNOSTIC_QUESTIONS = {
  // Software Development
  "Full-Stack Web Developer (MERN / Next.js)": [
    { id: 1, difficulty: "easy", text: "What does the 'M' in MERN stack stand for?", options: ["MySQL", "MongoDB", "Memcached", "MariaDB"], correct: 1 },
    { id: 2, difficulty: "easy", text: "In React, how do you pass data from a parent component to a child component?", options: ["State", "Redux", "Props", "Context"], correct: 2 },
    { id: 3, difficulty: "medium", text: "Which HTTP method is conventionally used to update an entire existing resource in a REST API?", options: ["POST", "PATCH", "PUT", "UPDATE"], correct: 2 },
    { id: 4, difficulty: "medium", text: "What is the primary advantage of Next.js Server-Side Rendering (SSR) over pure Client-Side Rendering?", options: ["Faster initial page load and better SEO", "Lower server costs", "Simpler state management", "Automatic database caching"], correct: 0 },
    { id: 5, difficulty: "hard", text: "When architecting a high-traffic Next.js app, how would you handle highly dynamic data that updates every second without overwhelming the server?", options: ["Use SSR for every request", "Use Static Site Generation (SSG) with a 1-second revalidate", "Use SSG for the shell and WebSockets/SWR on the client", "Use a traditional Express backend instead"], correct: 2 }
  ],
  "Backend & Distributed Systems Engineer": [
    { id: 1, difficulty: "easy", text: "What is the primary purpose of a load balancer?", options: ["To encrypt data in transit", "To distribute network traffic across multiple servers", "To cache database queries", "To run serverless functions"], correct: 1 },
    { id: 2, difficulty: "easy", text: "In a relational database, what does ACID stand for?", options: ["Asynchronous, Concurrent, Isolated, Distributed", "Atomicity, Consistency, Isolation, Durability", "Active, Consistent, Indexed, Dynamic", "Array, Class, Integer, Double"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is the 'N+1 query problem' in ORMs?", options: ["Adding 1 to the result of every query", "Fetching a parent record and then executing N separate queries for its children", "A database index failure", "A memory leak in Node.js"], correct: 1 },
    { id: 4, difficulty: "medium", text: "Which messaging pattern involves a message being broadcast to all active subscribers simultaneously?", options: ["Point-to-Point", "Publish-Subscribe (Pub/Sub)", "Request-Reply", "FIFO Queue"], correct: 1 },
    { id: 5, difficulty: "hard", text: "In a distributed system, the CAP theorem states that you can only guarantee two out of three properties. Which property is typically sacrificed in a highly available NoSQL database like Cassandra during a network partition?", options: ["Consistency", "Availability", "Partition Tolerance", "Durability"], correct: 0 }
  ],
  "Mobile App Developer (Flutter / React Native)": [
    { id: 1, difficulty: "easy", text: "What language is primarily used to write Flutter applications?", options: ["JavaScript", "Dart", "Swift", "Kotlin"], correct: 1 },
    { id: 2, difficulty: "easy", text: "In React Native, which component is typically used as the building block for layout, analogous to a <div> in HTML?", options: ["<View>", "<Box>", "<Container>", "<Layout>"], correct: 0 },
    { id: 3, difficulty: "medium", text: "How does React Native achieve native performance?", options: ["By compiling JavaScript into native machine code", "By running inside a hidden WebView", "By using a JavaScript bridge to communicate with native UI threads", "By using WebAssembly"], correct: 2 },
    { id: 4, difficulty: "medium", text: "What is the primary benefit of Flutter's rendering engine (Impeller/Skia)?", options: ["It converts Dart into native OEM widgets", "It renders every pixel itself directly to the GPU", "It uses the device's native browser engine", "It relies entirely on CPU rendering"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When dealing with complex, deeply nested navigation stacks and background state persistence in a mobile app, what is the safest architectural approach?", options: ["Store all state in local variables", "Use a global Redux/Riverpod store and deep link routing", "Force a full app reload on every screen change", "Store state in SharedPreferences/AsyncStorage on every render"], correct: 1 }
  ],
  "System Software & C++ Programmer": [
    { id: 1, difficulty: "easy", text: "In C++, what keyword is used to dynamically allocate memory on the heap?", options: ["malloc", "new", "allocate", "alloc"], correct: 1 },
    { id: 2, difficulty: "easy", text: "What is the size of a standard pointer on a 64-bit architecture?", options: ["4 bytes", "8 bytes", "16 bytes", "It depends on the compiler"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What does the RAII idiom stand for in C++?", options: ["Run And Initialize Immediately", "Resource Acquisition Is Initialization", "Random Access Index Iterator", "Runtime Allocation Initializer Interface"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What happens when a 'virtual' function is called on an object via a base class pointer?", options: ["The base class implementation is always called", "The derived class implementation is resolved at runtime via the vtable", "It causes a compile-time error", "It executes both implementations"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When writing highly concurrent, low-latency trading software in C++, what is the most critical memory hazard to avoid?", options: ["False sharing on multi-core CPU caches", "Using std::vector instead of arrays", "Using too many if statements", "Memory leaks"], correct: 0 }
  ],
  "Frontend UI/UX Systems Engineer": [
    { id: 1, difficulty: "easy", text: "What CSS property is used to create a flexible layout grid?", options: ["display: flex", "display: grid", "layout: flex", "position: absolute"], correct: 1 },
    { id: 2, difficulty: "easy", text: "Which HTML tag is most appropriate for the main navigation menu of a website?", options: ["<menu>", "<nav>", "<header>", "<ul>"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is the purpose of a CSS preprocessor like Sass or Less?", options: ["To minify CSS files", "To compile CSS into JavaScript", "To add variables, nesting, and mixins to CSS", "To automatically prefix vendor properties"], correct: 2 },
    { id: 4, difficulty: "medium", text: "In the context of web accessibility (a11y), what does the 'aria-hidden' attribute do?", options: ["Hides the element visually but keeps it for screen readers", "Hides the element from screen readers but keeps it visible", "Hides the element completely from both", "Encrypts the element's content"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When building a complex, responsive UI system, how should you architect design tokens?", options: ["Hardcode pixel values in every component", "Use a monolithic CSS file with global utility classes", "Define semantic CSS variables (e.g., --color-primary) derived from primitive variables", "Use inline styles generated by JavaScript"], correct: 2 }
  ],
  
  // Data, AI & ML
  "Data Scientist & ML Engineer": [
    { id: 1, difficulty: "easy", text: "Which Python library is the standard for data manipulation and analysis using DataFrames?", options: ["NumPy", "TensorFlow", "Pandas", "Scikit-learn"], correct: 2 },
    { id: 2, difficulty: "easy", text: "In machine learning, what is 'overfitting'?", options: ["When a model performs poorly on training data", "When a model learns the training data too well, failing to generalize to new data", "When a model is too simple to capture the underlying patterns", "When a model runs out of memory"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is the purpose of cross-validation?", options: ["To increase the size of the dataset", "To assess how the results of a statistical analysis will generalize to an independent dataset", "To convert categorical data into numerical data", "To speed up model training"], correct: 1 },
    { id: 4, difficulty: "medium", text: "In a Random Forest classifier, what does 'Random' refer to?", options: ["The random initialization of weights", "The random selection of features and bootstrap sampling of data for each tree", "The random predictions it makes", "The random number of trees in the forest"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When dealing with highly imbalanced classification datasets (e.g., fraud detection), which evaluation metric is MOST appropriate?", options: ["Accuracy", "Mean Squared Error", "Area Under the Precision-Recall Curve (PR AUC)", "R-squared"], correct: 2 }
  ],
  "NLP & Generative AI Specialist": [
    { id: 1, difficulty: "easy", text: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Logic Programming", "Network Layer Protocol", "Node Language Parsing"], correct: 0 },
    { id: 2, difficulty: "easy", text: "What is the core architecture behind models like GPT-3 and BERT?", options: ["Convolutional Neural Networks (CNN)", "Recurrent Neural Networks (RNN)", "The Transformer architecture", "Generative Adversarial Networks (GAN)"], correct: 2 },
    { id: 3, difficulty: "medium", text: "In the attention mechanism, what are the three primary vectors computed for each input token?", options: ["State, Action, Reward", "Query, Key, Value", "Input, Hidden, Output", "Encoder, Decoder, Attention"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What is the primary difference between fine-tuning and retrieval-augmented generation (RAG)?", options: ["Fine-tuning updates model weights; RAG retrieves external data for context at inference time.", "RAG updates model weights; fine-tuning changes the prompt.", "Fine-tuning is for images; RAG is for text.", "There is no difference."], correct: 0 },
    { id: 5, difficulty: "hard", text: "When deploying a large language model (LLM) for low-latency inference, which technique is most commonly used to reduce memory footprint without catastrophic loss of quality?", options: ["Gradient descent", "Quantization (e.g., INT8, INT4)", "Increasing the context window", "Using a larger batch size"], correct: 1 }
  ],
  "Computer Vision & Robotics Engineer": [
    { id: 1, difficulty: "easy", text: "Which deep learning architecture is most commonly used for image classification?", options: ["RNN", "Transformer", "CNN (Convolutional Neural Network)", "MLP"], correct: 2 },
    { id: 2, difficulty: "easy", text: "What is the primary function of a LiDAR sensor in robotics?", options: ["To capture high-resolution color images", "To measure distances and map 3D environments using laser pulses", "To measure temperature", "To communicate via radio waves"], correct: 1 },
    { id: 3, difficulty: "medium", text: "In a CNN, what is the purpose of a Max Pooling layer?", options: ["To increase the image resolution", "To reduce the spatial dimensions of the feature maps, decreasing parameters and computation", "To add non-linearity to the network", "To convert the image to grayscale"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What is the ROS (Robot Operating System) primarily used for?", options: ["It is a Linux kernel replacement", "It is a middleware framework for robotics software development and message passing", "It is a hardware controller chip", "It is a 3D modeling software"], correct: 1 },
    { id: 5, difficulty: "hard", text: "In SLAM (Simultaneous Localization and Mapping), what is the 'loop closure' problem?", options: ["When a robot gets stuck in an infinite while loop", "Recognizing a previously visited location and correcting the accumulated drift in the map", "When a drone's propellers stop spinning", "The process of closing the camera shutter"], correct: 1 }
  ],
  "Business Intelligence & Telemetry Analyst": [
    { id: 1, difficulty: "easy", text: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "Standard Query Logic", "System Query Link"], correct: 1 },
    { id: 2, difficulty: "easy", text: "Which of these is a popular BI visualization tool?", options: ["Jenkins", "Tableau", "Docker", "Ansible"], correct: 1 },
    { id: 3, difficulty: "medium", text: "In data warehousing, what is a Star Schema?", options: ["A database organized randomly", "A central fact table surrounded by dimension tables", "A network topology", "A method for encrypting data"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What is the primary purpose of an ETL pipeline?", options: ["Extract, Transform, Load data from various sources into a centralized data warehouse", "Encrypt, Transmit, Lock data securely", "Estimate, Test, Launch software", "Execute, Terminate, Log processes"], correct: 0 },
    { id: 5, difficulty: "hard", text: "When analyzing massive, continuous telemetry streams for real-time anomaly detection, which architecture is most suitable?", options: ["A nightly cron job running complex SQL queries", "A stream processing engine like Apache Kafka + Flink", "Storing everything in Excel files", "Using a standard REST API backed by SQLite"], correct: 1 }
  ],

  // Cloud, DevOps & Infrastructure
  "Cloud & AI Systems Engineer": [
    { id: 1, difficulty: "easy", text: "Which of the following is a primary service offered by AWS for scalable compute capacity?", options: ["S3", "EC2", "RDS", "CloudFront"], correct: 1 },
    { id: 2, difficulty: "easy", text: "What does IaaS stand for in cloud computing?", options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Software", "Intelligent Automation and Scaling"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is the primary benefit of using Infrastructure as Code (IaC) tools like Terraform?", options: ["It automatically writes application code", "It provisions and manages infrastructure through machine-readable definition files", "It monitors application performance", "It replaces the need for databases"], correct: 1 },
    { id: 4, difficulty: "medium", text: "When deploying AI models in the cloud, what is the role of an inference endpoint?", options: ["To train the model on new data", "To serve the pre-trained model via an API for real-time predictions", "To store the model's source code", "To visualize the model's architecture"], correct: 1 },
    { id: 5, difficulty: "hard", text: "To optimize costs and performance for a highly variable AI workload, what cloud architecture strategy is best?", options: ["Provisioning a fixed cluster of large GPU instances", "Using serverless architectures or auto-scaling container clusters (e.g., EKS/GKE) with GPU node pools", "Running everything on a single massive virtual machine", "Using entirely spot instances without fallback"], correct: 1 }
  ],
  "DevOps & Site Reliability Engineer (SRE)": [
    { id: 1, difficulty: "easy", text: "What is the primary goal of CI/CD?", options: ["To manually test code", "To automate the integration, testing, and deployment of code changes", "To write better documentation", "To manage project timelines"], correct: 1 },
    { id: 2, difficulty: "easy", text: "Which tool is commonly used for container orchestration?", options: ["Git", "Jenkins", "Kubernetes", "Prometheus"], correct: 2 },
    { id: 3, difficulty: "medium", text: "In SRE, what is an Error Budget?", options: ["The financial cost of downtime", "The maximum allowable threshold for errors/downtime over a period, balancing reliability with innovation speed", "A tool for logging errors", "The number of bugs allowed in a sprint"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What is the difference between a golden signal 'Latency' and 'Saturation'?", options: ["Latency is error rate; saturation is traffic.", "Latency is the time it takes to service a request; saturation is how full the system is.", "They mean the same thing.", "Latency is for databases; saturation is for networks."], correct: 1 },
    { id: 5, difficulty: "hard", text: "During a major production outage, what is the SRE best practice for incident management?", options: ["Immediately push a hotfix directly to production", "Establish an Incident Commander, communicate clearly, mitigate the impact first, and conduct a blameless post-mortem later", "Ignore it until the next deployment window", "Reboot all servers simultaneously"], correct: 1 }
  ],
  "Database Administrator & SQL Architect": [
    { id: 1, difficulty: "easy", text: "What is a primary key?", options: ["A password to access the database", "A unique identifier for each record in a table", "The first column in a table", "A key used to encrypt data"], correct: 1 },
    { id: 2, difficulty: "easy", text: "What does the SQL command 'JOIN' do?", options: ["Combines two databases", "Combines rows from two or more tables based on a related column", "Appends data to a table", "Deletes data from multiple tables"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is a database index used for?", options: ["To enforce referential integrity", "To speed up data retrieval operations at the cost of slower writes and increased storage space", "To automatically backup the database", "To encrypt sensitive columns"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What is the difference between a TRUNCATE and a DELETE statement?", options: ["They are identical.", "DELETE removes rows one by one and logs them; TRUNCATE removes all rows quickly without individual logging.", "TRUNCATE removes the table structure; DELETE does not.", "DELETE is faster than TRUNCATE."], correct: 1 },
    { id: 5, difficulty: "hard", text: "When architecting a high-availability RDBMS for global read access, what replication strategy is most appropriate?", options: ["A single primary database with no backups", "A primary database for writes, with asynchronous read-replicas in multiple geographic regions", "Multi-master synchronous replication across all regions", "Storing data in flat files"], correct: 1 }
  ],
  "Network & Infrastructure Security Engineer": [
    { id: 1, difficulty: "easy", text: "What does a firewall do?", options: ["Protects against physical fires", "Monitors and controls incoming and outgoing network traffic based on security rules", "Encrypts all data on a hard drive", "Boosts Wi-Fi signal"], correct: 1 },
    { id: 2, difficulty: "easy", text: "What port does HTTPS typically use?", options: ["80", "21", "443", "22"], correct: 2 },
    { id: 3, difficulty: "medium", text: "What is the primary purpose of a VPN (Virtual Private Network)?", options: ["To speed up internet connection", "To create a secure, encrypted connection over a less secure network like the internet", "To bypass antivirus software", "To host a website"], correct: 1 },
    { id: 4, difficulty: "medium", text: "In network security, what does a DDoS attack attempt to achieve?", options: ["To steal sensitive data", "To overwhelm a system or network with traffic, making it unavailable to legitimate users", "To encrypt user data for ransom", "To gain administrative privileges"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When designing a secure enterprise network, what is the 'Zero Trust' architecture model?", options: ["Trusting only internal employees", "Assuming threats exist inside and outside the network; verifying every request regardless of origin", "Trusting devices based on their IP address", "Disabling all passwords and using biometrics"], correct: 1 }
  ],

  // Security
  "Cybersecurity & Ethical Hacking Analyst": [
    { id: 1, difficulty: "easy", text: "What is Phishing?", options: ["A type of malware", "A social engineering attack designed to trick victims into revealing sensitive information", "A network scanning technique", "An encryption algorithm"], correct: 1 },
    { id: 2, difficulty: "easy", text: "In cybersecurity, what does the 'CIA triad' stand for?", options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Code, Infrastructure, Application", "Cyber Incident Analysis"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is Cross-Site Scripting (XSS)?", options: ["A database injection attack", "An attack where malicious scripts are injected into otherwise benign and trusted websites", "A type of denial of service attack", "A method for encrypting passwords"], correct: 1 },
    { id: 4, difficulty: "medium", text: "During a penetration test, what is the purpose of the 'reconnaissance' phase?", options: ["To actively exploit vulnerabilities", "To gather information about the target system or organization without directly attacking it", "To write the final report", "To patch the systems"], correct: 1 },
    { id: 5, difficulty: "hard", text: "How does a Buffer Overflow vulnerability typically allow an attacker to execute arbitrary code?", options: ["By guessing weak passwords", "By writing data past the bounds of allocated memory, overwriting adjacent memory such as the return address", "By intercepting network traffic", "By exploiting an XSS flaw"], correct: 1 }
  ],

  // Emerging & Specialized Tech
  "Embedded Systems & IoT Developer": [
    { id: 1, difficulty: "easy", text: "Which programming language is most dominant in programming microcontrollers?", options: ["Python", "C", "Java", "Ruby"], correct: 1 },
    { id: 2, difficulty: "easy", text: "What is an RTOS?", options: ["Real-Time Operating System", "Remote Transmission of Signals", "Rapid Test and Optimization System", "Router Topology Optimization Standard"], correct: 0 },
    { id: 3, difficulty: "medium", text: "What is the primary difference between a microprocessor and a microcontroller?", options: ["They are the same thing.", "A microprocessor is for software; a microcontroller is for hardware.", "A microcontroller integrates CPU, memory, and I/O peripherals on a single chip; a microprocessor typically requires external components.", "A microcontroller is faster than a microprocessor."], correct: 2 },
    { id: 4, difficulty: "medium", text: "Which communication protocol is commonly used for short-range, low-power IoT devices?", options: ["TCP/IP", "Bluetooth Low Energy (BLE)", "HTTP", "FTP"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When designing a battery-powered IoT edge node, what is the most effective strategy for maximizing battery life?", options: ["Running the CPU at maximum frequency to finish tasks quickly", "Using a standard Linux OS", "Implementing deep sleep modes and waking up only via external interrupts or RTC timers to transmit data", "Using a continuous Wi-Fi connection"], correct: 2 }
  ],
  "Blockchain & Web3 Developer": [
    { id: 1, difficulty: "easy", text: "What is a smart contract?", options: ["A legally binding digital PDF", "Self-executing code deployed on a blockchain", "A fast internet connection", "A type of cryptocurrency wallet"], correct: 1 },
    { id: 2, difficulty: "easy", text: "Which programming language is primarily used to write smart contracts on the Ethereum network?", options: ["Python", "Solidity", "JavaScript", "C++"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is the purpose of a consensus mechanism in a blockchain?", options: ["To encrypt user data", "To agree on the validity of transactions and maintain a synchronized, distributed ledger", "To generate new coins automatically", "To host decentralized websites"], correct: 1 },
    { id: 4, difficulty: "medium", text: "What does 'Gas' refer to in Ethereum?", options: ["The server hosting the blockchain", "The unit measuring the computational effort required to execute operations", "The name of a token", "The speed of the network"], correct: 1 },
    { id: 5, difficulty: "hard", text: "What is a Reentrancy attack in a smart contract?", options: ["When a user forgets their private key", "When a malicious contract calls back into the calling contract before the first invocation is finished, potentially draining funds", "When the blockchain forks into two networks", "When too many users access the network at once"], correct: 1 }
  ],
  "Autonomous Systems & Drone Software Engineer": [
    { id: 1, difficulty: "easy", text: "What sensor is primarily used to measure a drone's orientation (pitch, roll, yaw)?", options: ["GPS", "Camera", "IMU (Inertial Measurement Unit)", "Barometer"], correct: 2 },
    { id: 2, difficulty: "easy", text: "What does PID stand for in control systems?", options: ["Proportional, Integral, Derivative", "Position, Inertia, Distance", "Power, Input, Data", "Program, Instruction, Directory"], correct: 0 },
    { id: 3, difficulty: "medium", text: "What is the purpose of a Kalman filter in robotics?", options: ["To filter out spam emails", "To fuse data from multiple noisy sensors to estimate the true state of a system", "To compress video feeds", "To regulate battery voltage"], correct: 1 },
    { id: 4, difficulty: "medium", text: "In autonomous navigation, what is path planning?", options: ["Drawing a map on a screen", "Calculating a collision-free route from a start point to a goal point", "Controlling the motor speeds", "Processing camera images"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When an autonomous drone loses GPS signal in a complex environment, what fallback technique is most robust for maintaining position holding?", options: ["Optical flow combined with visual-inertial odometry (VIO)", "Relying entirely on the barometer", "Executing a hard landing immediately", "Switching to Wi-Fi triangulation"], correct: 0 }
  ],
  "Enterprise SAP & ERP Cloud Specialist": [
    { id: 1, difficulty: "easy", text: "What does ERP stand for?", options: ["Enterprise Resource Planning", "Electronic Record Processing", "Enterprise Revenue Platform", "Event Routing Protocol"], correct: 0 },
    { id: 2, difficulty: "easy", text: "Which programming language is proprietary to SAP for developing applications?", options: ["Java", "ABAP", "C#", "Python"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is the primary advantage of SAP HANA over traditional relational databases?", options: ["It is free and open-source", "It is an in-memory, column-oriented database allowing real-time analytics", "It uses only NoSQL structures", "It runs exclusively on mobile devices"], correct: 1 },
    { id: 4, difficulty: "medium", text: "In SAP, what is a 'T-Code' (Transaction Code)?", options: ["A password for the system", "A shortcut code used to directly access a specific screen or function", "A database table", "A compile error code"], correct: 1 },
    { id: 5, difficulty: "hard", text: "When migrating a legacy on-premise SAP ECC system to SAP S/4HANA Cloud, what approach minimizes disruption but requires significant pre-planning for data mapping?", options: ["Greenfield Implementation", "Brownfield (System Conversion)", "Bluefield (Selective Data Transition)", "Copy-pasting database tables directly"], correct: 2 }
  ],

  // Quality & Gaming
  "QA & Automated Testing Engineer": [
    { id: 1, difficulty: "easy", text: "What is the primary purpose of Unit Testing?", options: ["To test the entire application end-to-end", "To test individual functions or components in isolation", "To test UI aesthetics", "To test server load capacity"], correct: 1 },
    { id: 2, difficulty: "easy", text: "Which of these is a popular tool for automated browser testing?", options: ["Photoshop", "Selenium", "Docker", "Wireshark"], correct: 1 },
    { id: 3, difficulty: "medium", text: "What is Regression Testing?", options: ["Testing a system's performance under heavy load", "Testing new software to ensure that recent code changes haven't broken existing functionality", "Testing software from the perspective of a malicious hacker", "Testing the database schema"], correct: 1 },
    { id: 4, difficulty: "medium", text: "In the Testing Pyramid, which type of test should form the broad base (i.e., have the highest quantity)?", options: ["End-to-End (E2E) Tests", "Integration Tests", "Unit Tests", "Manual QA Tests"], correct: 2 },
    { id: 5, difficulty: "hard", text: "When building a scalable UI automation suite, how should you select elements to minimize test flakiness?", options: ["By using complex XPath expressions based on DOM hierarchy", "By using class names and tag names", "By adding dedicated, immutable data attributes (e.g., data-testid) to elements", "By using absolute pixel coordinates"], correct: 2 }
  ],
  "Game Developer (Unity / Unreal Engine)": [
    { id: 1, difficulty: "easy", text: "Which programming language is standard for scripting in Unity?", options: ["C++", "C#", "Python", "JavaScript"], correct: 1 },
    { id: 2, difficulty: "easy", text: "Which programming language is standard for scripting in Unreal Engine?", options: ["C++", "C#", "Python", "JavaScript"], correct: 0 },
    { id: 3, difficulty: "medium", text: "What is a 'Delta Time' in game development?", options: ["The total time played", "The time it takes to render the entire level", "The time elapsed since the last frame, used to ensure smooth, frame-rate independent movement", "The time required to compile the game"], correct: 2 },
    { id: 4, difficulty: "medium", text: "In 3D graphics, what does a Shader program do?", options: ["It calculates physics collisions", "It manages game saving", "It runs on the GPU to determine how vertices and pixels are rendered and lit", "It compresses audio files"], correct: 2 },
    { id: 5, difficulty: "hard", text: "When optimizing a dense 3D scene to maintain a stable 60 FPS, which technique drastically reduces GPU draw calls?", options: ["Increasing texture resolution", "Static and Dynamic Batching / Instancing of identical meshes", "Using more real-time point lights", "Adding more polygons to the models"], correct: 1 }
  ]
};
