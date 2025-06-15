import C1 from "../images/c1.jpg";
import C2 from "../images/c2.jpg";
import C3 from "../images/c3.jpg";
import C4 from "../images/c4.jpg";
import C5 from "../images/c5.jpg";
import C6 from "../images/c6.jpg";
import C7 from "../images/c7.jpeg";
import C8 from "../images/b1.jpg";
import C9 from "../images/b2.jpg";
import C10 from "../images/b3.jpg";
import C11 from "../images/b4.png";

export const courses = [
  {
    id: "learn-javascript-from-scratch",
    title: "Learn JavaScript from Scratch",
    image: C1,
    rating: 4,
    reviews: 239,
    price: "Free",
    instructor: {
      name: "Harshit Aggarwal",
      image: C4,
      role: "Web Developer at Quizopedia"
    },
    description: "Modern Javascript from the beginning - all the way up to JS expert level! The must-have JavaScript resource in 2024.",
    overview: `The JavaScript Beginners Course is a comprehensive program designed to introduce participants to the fundamentals of JavaScript programming from the ground up. Starting with the basics, students will explore the role of JavaScript in web development and learn how to set up their development environments and tools. 

    They will delve into JavaScript syntax, data types, and variables, gaining a solid understanding of foundational concepts. As the course progresses, participants will advance to more complex topics such as control flow, loops, functions, and scope. Through hands-on exercises and projects, students will learn to manipulate the Document Object Model (DOM), handle asynchronous operations, and utilize ES6 features.

    Additionally, the course will cover essential web APIs and introduce participants to debugging techniques and best practices for writing clean and maintainable code. By the end of the program, students will have the knowledge and skills necessary to build interactive web applications and pursue further specialization in JavaScript development.`,
    whatYouWillLearn: [
      "JavaScript from scratch - beginner to advanced.",
      "Everything you need to become a JS expert and apply for JS Jobs.",
      "All about objects, functions, variables and arrays.",
      "All core features and concepts you need to know in modern JavaScript development.",
      "Project-driven learning with plenty of examples.",
      "Object-Oriented Programming."
    ],
    includes: [
      "52 hours videos",
      "Articles",
      "Downloadable resources",
      "Lifetime Access",
      "Access on mobile and TV",
      "Assignments",
      "Certificate of completion"
    ]
  },
  {
    id: "html-css-foundation",
    title: "HTML & CSS Foundation",
    image: C2,
    rating: 4,
    reviews: 312,
    price: "₹799",
    instructor: {
      name: "Ritika Kapoor",
      image: C5,
      role: "Frontend Developer at Zomato"
    },
    description: "Build a strong foundation in HTML and CSS to design beautiful, responsive websites from scratch.",
    overview: `This course is perfect for beginners who want to learn how websites are structured and styled. 
You’ll understand how to write clean HTML, structure web pages semantically, and apply CSS to make your designs come alive. 
No prior experience needed — just bring your curiosity!

By the end of this course, you’ll be confident in building landing pages, portfolios, and responsive layouts.`,
    whatYouWillLearn: [
      "HTML Tags, Structure & Semantics",
      "CSS Selectors, Box Model & Flexbox",
      "Responsive Web Design using Media Queries",
      "CSS Grid & Layout Techniques",
      "Web Forms & Input Validation",
      "Building and Deploying a Portfolio Project"
    ],
    includes: [
      "20 hours videos",
      "Downloadable resources",
      "Mini projects",
      "Lifetime Access",
      "Quizzes & Exercises",
      "Certificate of completion"
    ]
  },
  {
    id: "python-programming-basics",
    title: "Python Programming Course",
    image: C3,
    rating: 5,
    reviews: 302,
    price: "₹999",
    instructor: {
      name: "Ankit Sharma",
      image: C6,
      role: "Senior Software Engineer at Google"
    },
    description: "A comprehensive course to learn Python programming from scratch — ideal for beginners and aspiring developers.",
    overview: "This course offers a beginner-friendly yet thorough introduction to Python programming. You'll learn to write clean code, understand core programming principles, and work with real-world problems using Python.",
    whatYouWillLearn: [
      "Python Syntax and Data Types",
      "Conditional Statements and Loops",
      "Functions, Modules, and Packages",
      "File Handling and Exception Handling",
      "Object-Oriented Programming (OOP)",
      "Hands-on Projects and Use Cases"
    ],
    includes: [
      "40 hours videos",
      "Practice Exercises",
      "Mini Projects",
      "Source Code Downloads",
      "Lifetime Access",
      "Certificate of completion"
    ]
  },
  {
    id: "web-design-complete",
    title: "Web Design Course",
    image: C4,
    rating: 4,
    reviews: 127,
    price: "Free",
    instructor: {
      name: "Simran Kaur",
      image: C7,
      role: "Lead UI Designer at Swiggy"
    },
    description: "Master the art of responsive, user-centric web design using industry tools like Figma, Adobe XD, and Webflow.",
    overview: "This comprehensive course takes you through the full journey of modern web design — from ideation and layout principles to polished, responsive websites. You'll understand how to apply visual hierarchy, typography, and grid systems while learning how to bring your ideas to life with powerful tools such as Figma, Webflow, and Adobe XD. \n\n With hands-on projects and real-world examples, you'll build a strong foundation in user interface design, usability, and modern responsive techniques. Whether you aim to design static websites or dynamic web apps, this course equips you with the practical skills and design confidence to deliver seamless user experiences across all screen sizes.",
    whatYouWillLearn: [
      "Core Principles of Modern Web Design",
      "Wireframing and Low-fidelity Prototyping",
      "High-fidelity UI Design in Figma & Adobe XD",
      "Designing for Responsive Layouts and Breakpoints",
      "Creating Interactive Prototypes and Animations",
      "Web Accessibility, Usability, and Design Handoff"
    ],
    includes: [
      "32 hours videos",
      "Design Templates & Style Guides",
      "Interactive Projects",
      "Downloadable Figma & XD files",
      "Lifetime Access",
      "Certificate of completion"
    ]
  },
  {
    id: "data-structures-java",
    title: "Mastering Data Structures & Algorithms in Java",
    image: C5,
    rating: 5,
    reviews: 276,
    price: "₹799",
    instructor: {
      name: "Ravi Verma",
      image: C2,
      role: "Senior Instructor at Coding Ninjas"
    },
    description: "Crack coding interviews at top tech companies with a strong command of Data Structures and Algorithms using Java. Ideal for beginners and intermediates alike.",
    overview: "This in-depth course is designed to help you become proficient in Data Structures and Algorithms (DSA) using Java — one of the most popular languages for competitive coding and technical interviews. You'll start with the basics like arrays and linked lists, then progress to complex topics like graphs, trees, heaps, and dynamic programming.\n\n Each topic is covered from a conceptual and implementation standpoint with step-by-step explanations, Java code examples, and real-world applications. The course also includes time and space complexity analysis for each structure and algorithm so you can write optimized code confidently. With 100+ coding problems, mock interviews, and video explanations, this course will prepare you thoroughly for placements and interviews at product-based companies like Amazon, Google, Microsoft, and more.",
    whatYouWillLearn: [
      "Deep Understanding of Time and Space Complexity",
      "Implementation of Arrays, Linked Lists, Stacks, and Queues",
      "Tree and Graph Traversals (BFS, DFS, etc.)",
      "Sorting Algorithms: Merge Sort, Quick Sort, etc.",
      "Dynamic Programming Techniques and Patterns",
      "Tons of Interview-Focused DSA Problems Solved in Java"
    ],
    includes: [
      "60 hours videos",
      "100+ Problems with Solutions",
      "Ready-to-use Java Code Snippets",
      "Lifetime Access to All Course Material",
      "Realistic Mock Interviews and Quizzes",
      "Certificate of completion"
    ]
  },
  {
    id: "angular-development-complete",
    title: "Full Stack Web Development with Angular",
    image: C6,
    rating: 5,
    reviews: 391,
    price: "₹1799",
    instructor: {
      name: "Sneha Dey",
      image: C3,
      role: "Frontend Architect at Paytm"
    },
    description: "Master full stack web development using Angular, TypeScript, Node.js, Express, and MongoDB.",
    overview: "This comprehensive course equips you with the skills to build full-fledged web applications using Angular as the frontend framework. Starting from the basics of TypeScript and Angular CLI, you'll progress through component-driven development, services, routing, form handling, and RxJS. You'll then move into backend development with Node.js, Express, and MongoDB, learning to connect your Angular frontend with RESTful APIs. The course emphasizes real-world project development, including deployment and continuous integration using GitHub and cloud services.",
    whatYouWillLearn: [
      "HTML, CSS, TypeScript, and Angular CLI",
      "Angular Components, Services & Routing",
      "Reactive Forms & Observables",
      "Node.js, Express & MongoDB Integration",
      "JWT Authentication & Guards",
      "Deployment on Firebase/Render with CI/CD"
    ],
    includes: [
      "80 hours videos",
      "Real-world Projects",
      "GitHub Repositories",
      "Lifetime Access",
      "Assignments & Quizzes",
      "Certificate of completion"
    ]
  }
  ,
  {
    id: "vuejs-development-essentials",
    title: "Vue.js Course for Web Development",
    image: C7,
    rating: 4,
    reviews: 98,
    price: "Free",
    instructor: {
      name: "Ananya Bose",
      image: C2,
      role: "Frontend Engineer at Meesho"
    },
    description: "Kickstart your frontend career by building responsive websites and apps using Vue.js 3 and Composition API.",
    overview: "This beginner-friendly course walks you through Vue.js fundamentals, from creating reactive interfaces with the Composition API to handling user input and managing state. You’ll build interactive components, manage routes with Vue Router, and learn how to consume APIs. Practical mini-projects help you reinforce core concepts. By the end, you’ll be able to build and deploy dynamic SPAs (Single Page Applications) confidently using Vue and supporting tools.",
    whatYouWillLearn: [
      "Vue CLI & Project Setup",
      "Composition API & Data Binding",
      "Props, Events, Slots & Component Reuse",
      "State Management using Pinia",
      "Routing with Vue Router",
      "Consuming REST APIs & Deployment"
    ],
    includes: [
      "20 hours videos",
      "Mini Projects",
      "Code Templates",
      "Lifetime Access",
      "Certificate of completion"
    ]
  }
  ,
  {
    id: "web-development-android",
    title: "Web Development for Android Devices",
    image: C9,
    rating: 4,
    reviews: 189,
    price: "₹899",
    instructor: {
      name: "Tanmay Jain",
      image: C6,
      role: "Mobile Web Specialist at Flipkart"
    },
    description: "Build responsive and progressive web apps (PWAs) optimized for Android devices using HTML, CSS, JS, and Service Workers.",
    overview: "This course bridges the gap between mobile and web by teaching how to develop responsive, mobile-first web applications tailored for Android environments. You'll learn how to use modern CSS layouts, JavaScript APIs, and Web App Manifests to create installable Progressive Web Apps (PWAs). The course also introduces backend integration and storage options that work well on Android. You’ll work on real-world projects and learn how to test and deploy web apps that feel like native Android apps.",
    whatYouWillLearn: [
      "Responsive Layouts with Flexbox & Grid",
      "HTML5 APIs for Geolocation, Media, and Storage",
      "PWA Fundamentals & Offline Support",
      "Service Workers & Web App Manifest",
      "Form Handling and Validation",
      "Deployment and Android Optimization"
    ],
    includes: [
      "48 hours videos",
      "Capstone Projects",
      "Starter Templates & Assets",
      "Lifetime Access",
      "Certificate of completion"
    ]
  }
  ,
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals: Eat, Sleep, Code, Repeat",
    image: C9,
    rating: 4,
    reviews: 189,
    price: "₹899",
    instructor: {
      name: "Tanmay Jain",
      image: C6,
      role: "Software Engineer at Flipkart"
    },
    description: "Start your coding journey by learning the core concepts of programming with hands-on practice in logic building and algorithms.",
    overview: "This beginner-focused course is your gateway into the world of programming. You'll explore core topics such as variables, loops, functions, conditionals, arrays, and object-oriented programming with a focus on logic development and problem solving. Whether you're preparing for placements or diving into software development, this course builds the foundational mindset: Eat, Sleep, Code, Repeat!",
    whatYouWillLearn: [
      "Variables, Data Types, and Operators",
      "Loops and Conditional Statements",
      "Functions and Recursion",
      "Arrays and Strings",
      "Object-Oriented Programming Basics",
      "Problem Solving and Debugging Skills"
    ],
    includes: [
      "48 hours videos",
      "Beginner Projects",
      "Logic Practice Sets",
      "Lifetime Access",
      "Certificate of completion"
    ]
  }
  ,
  {
    id: "intro-ml-mnist",
    title: "Introduction to Machine Learning: Mastering MNIST",
    image: C10,
    rating: 5,
    reviews: 64,
    price: "₹499",
    instructor: {
      name: "Mehul Batra",
      image: C4,
      role: "Machine Learning Scientist at Deloitte"
    },
    description: "Dive into machine learning fundamentals by building a digit recognizer using the MNIST dataset.",
    overview: "This project-based course is a hands-on introduction to machine learning using Python. Learn to clean data, apply models, and train your first neural network using the iconic MNIST digit dataset. You’ll understand the difference between supervised learning techniques, loss functions, model accuracy, and overfitting. Perfect for beginners looking to master machine learning through a real-world example.",
    whatYouWillLearn: [
      "Understanding MNIST Dataset",
      "Data Preprocessing with NumPy and Pandas",
      "Model Training using scikit-learn and TensorFlow",
      "Accuracy, Loss Functions & Evaluation",
      "Overfitting and Regularization",
      "Deploying Your First ML Model"
    ],
    includes: [
      "16 hours videos",
      "Hands-on Labs",
      "MNIST Projects",
      "Lifetime Access",
      "Certificate of completion"
    ]
  }
  ,
  {
    id: "react-dark-mode-theme",
    title: "React and Styled Components: Building a Dark Mode Theme",
    image: C11,
    rating: 4,
    reviews: 143,
    price: "₹599",
    instructor: {
      name: "Neha Joshi",
      image: C3,
      role: "Frontend Engineer at Google"
    },
    description: "Build modern React applications with stunning UI using Styled Components and Dark Mode functionality.",
    overview: "This course dives into styling in React using the powerful Styled Components library. You’ll learn to build reusable styled components, manage themes, and implement an elegant dark/light mode toggle. Learn how to apply conditional styling, theme switching, and animation effects to your UI components. Great for frontend developers wanting to polish their React apps with a sleek modern look.",
    whatYouWillLearn: [
      "React Component Architecture",
      "Styled Components Syntax and Best Practices",
      "Dark Mode Toggle with Context API",
      "Theming with ThemeProvider",
      "Responsive Styling & Animations",
      "Real Project: Personal Portfolio with Dark Mode"
    ],
    includes: [
      "28 hours videos",
      "Dark Mode Projects",
      "Source Code Access",
      "Lifetime Access",
      "Certificate of completion"
    ]
  }
];
