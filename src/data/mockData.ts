import { Code, PenTool, BarChart, Shield, Target, Cpu, TrendingUp, Smartphone, Users, Briefcase } from "lucide-react";

export const MOCK_COURSES = [
  {
    id: "full-stack-web-development",
    title: "Full Stack Web Development Masterclass",
    slug: "full-stack-web-development",
    category: "Development",
    instructor: "Ankit Sharma",
    duration: "6 Months",
    lessons: 145,
    level: "Beginner to Advanced",
    rating: 4.9,
    reviews: 1200,
    students: 15400,
    price: 24999,
    originalPrice: 39999,
    badge: "Best Seller",
    icon: Code,
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=360&fit=crop&auto=format",
    description: "Master modern web development by building real-world projects. From frontend to backend, deployment to system design.",
    curriculum: [
      {
        module: "Module 1: Frontend Fundamentals",
        lessons: [
          { title: "HTML5 & Semantic Web", duration: "45 min", isFree: true },
          { title: "Advanced CSS3 & Tailwind", duration: "1h 20m", isFree: true },
          { title: "JavaScript ES6+ Deep Dive", duration: "2h 30m", isFree: false }
        ]
      },
      {
        module: "Module 2: React Ecosystem",
        lessons: [
          { title: "React Fundamentals", duration: "2h", isFree: false },
          { title: "State Management with Redux", duration: "1h 45m", isFree: false },
          { title: "Next.js & SSR", duration: "3h 10m", isFree: false }
        ]
      }
    ]
  },
  {
    id: "ui-ux-design-masterclass",
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    category: "Design",
    instructor: "Neha Gupta",
    duration: "4 Months",
    lessons: 85,
    level: "Beginner",
    rating: 4.8,
    reviews: 850,
    students: 8200,
    price: 18999,
    originalPrice: 29999,
    badge: "Trending",
    icon: PenTool,
    badgeColor: "text-violet-700 bg-violet-50 border-violet-200",
    tags: ["Figma", "Prototyping", "Research"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&h=360&fit=crop&auto=format",
    description: "Learn how to design beautiful, user-centric interfaces. Covers typography, color theory, wireframing, and Figma prototyping.",
    curriculum: []
  },
  {
    id: "data-analytics-visualization",
    title: "Data Analytics & Visualization",
    slug: "data-analytics-visualization",
    category: "Data Science",
    instructor: "Rahul Verma",
    duration: "3 Months",
    lessons: 60,
    level: "Intermediate",
    rating: 4.7,
    reviews: 640,
    students: 5100,
    price: 15999,
    originalPrice: 24999,
    badge: "New",
    icon: BarChart,
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    tags: ["Python", "Tableau", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop&auto=format",
    description: "Turn raw data into actionable insights. Master Python, SQL, and Tableau to become a sought-after data analyst.",
    curriculum: []
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning Bootcamp",
    slug: "ai-machine-learning",
    category: "Data Science",
    instructor: "Priya Singh",
    duration: "8 Months",
    lessons: 210,
    level: "Advanced",
    rating: 4.9,
    reviews: 2100,
    students: 12500,
    price: 34999,
    originalPrice: 49999,
    badge: "Premium",
    icon: Cpu,
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
    tags: ["Python", "TensorFlow", "NLP", "Deep Learning"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&h=360&fit=crop&auto=format",
    description: "Dive deep into neural networks, natural language processing, and computer vision with hands-on projects.",
    curriculum: []
  },
  {
    id: "digital-marketing-strategy",
    title: "Advanced Digital Marketing",
    slug: "digital-marketing-strategy",
    category: "Marketing",
    instructor: "Vikram Mehta",
    duration: "3 Months",
    lessons: 75,
    level: "Beginner",
    rating: 4.6,
    reviews: 420,
    students: 4800,
    price: 12999,
    originalPrice: 19999,
    badge: "Popular",
    icon: TrendingUp,
    badgeColor: "text-rose-700 bg-rose-50 border-rose-200",
    tags: ["SEO", "Google Ads", "Social Media"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=360&fit=crop&auto=format",
    description: "Master performance marketing, SEO, and social media strategies to drive growth for any business.",
    curriculum: []
  },
  {
    id: "mobile-app-development",
    title: "React Native App Development",
    slug: "mobile-app-development",
    category: "Development",
    instructor: "Amit Patel",
    duration: "4 Months",
    lessons: 95,
    level: "Intermediate",
    rating: 4.8,
    reviews: 780,
    students: 6300,
    price: 19999,
    originalPrice: 29999,
    badge: "Hot",
    icon: Smartphone,
    badgeColor: "text-orange-700 bg-orange-50 border-orange-200",
    tags: ["React Native", "iOS", "Android", "Firebase"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&h=360&fit=crop&auto=format",
    description: "Build cross-platform mobile applications for iOS and Android using a single codebase with React Native.",
    curriculum: []
  }
];

export const MOCK_USER = {
  name: "Arjun Reddy",
  email: "arjun.reddy@example.com",
  role: "student",
  avatar: "https://i.pravatar.cc/150?u=arjun",
  enrolledCourses: [
    {
      courseId: "full-stack-web-development",
      progress: 68,
      lastAccessed: "2026-06-25T10:30:00Z"
    },
    {
      courseId: "ui-ux-design-masterclass",
      progress: 12,
      lastAccessed: "2026-06-20T14:15:00Z"
    }
  ],
  certificates: [
    {
      id: "CERT-99827",
      courseId: "digital-marketing-strategy",
      date: "2026-01-15T00:00:00Z",
      grade: "A+"
    }
  ],
  cart: [
    {
      courseId: "ai-machine-learning"
    }
  ],
  wishlist: [
    "data-analytics-visualization",
    "mobile-app-development"
  ]
};

export const MOCK_MENTORS = [
  {
    id: "ankit-sharma",
    name: "Ankit Sharma",
    role: "Senior SDE @ Google",
    company: "Google",
    experience: "8 years",
    rating: 4.9,
    reviews: 342,
    sessions: 1250,
    price: 599,
    skills: ["React", "System Design", "DSA", "Node.js"],
    about: "I've interviewed over 100+ candidates at Google and Amazon. I can help you crack top tier product companies.",
    avatar: "https://i.pravatar.cc/150?u=ankit",
    slots: [
      "2026-06-28T10:00:00Z",
      "2026-06-28T11:00:00Z",
      "2026-06-29T15:00:00Z"
    ]
  },
  {
    id: "neha-gupta",
    name: "Neha Gupta",
    role: "Product Designer @ Meta",
    company: "Meta",
    experience: "5 years",
    rating: 5.0,
    reviews: 210,
    sessions: 850,
    price: 499,
    skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
    about: "Helping designers level up their craft and land jobs at FAANG.",
    avatar: "https://i.pravatar.cc/150?u=neha",
    slots: [
      "2026-06-29T14:00:00Z",
      "2026-06-30T16:00:00Z"
    ]
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    role: "Growth Lead @ Stripe",
    company: "Stripe",
    experience: "6 years",
    rating: 4.8,
    reviews: 180,
    sessions: 600,
    price: 699,
    skills: ["Growth", "SEO", "Performance Mktg", "Product Strategy"],
    about: "Data-driven growth marketer. Can help you structure your campaigns for maximum ROI.",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    slots: [
      "2026-06-28T18:00:00Z",
      "2026-07-01T09:00:00Z"
    ]
  }
];

export const MOCK_JOBS = [
  {
    id: "frontend-engineer-razorpay",
    title: "Frontend Engineer (React)",
    company: "Razorpay",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹15L - ₹22L",
    postedAt: "2026-06-25T00:00:00Z",
    logo: "https://logo.clearbit.com/razorpay.com",
    tags: ["React", "TypeScript", "Redux"],
    description: "We are looking for a strong Frontend Engineer to build blazing fast payment interfaces."
  },
  {
    id: "backend-developer-zomato",
    title: "Backend Developer (Node.js)",
    company: "Zomato",
    location: "Gurugram, India",
    type: "Full-time",
    experience: "2-5 years",
    salary: "₹18L - ₹28L",
    postedAt: "2026-06-24T00:00:00Z",
    logo: "https://logo.clearbit.com/zomato.com",
    tags: ["Node.js", "MongoDB", "Microservices"],
    description: "Join Zomato's core order processing team handling millions of transactions daily."
  },
  {
    id: "product-designer-cred",
    title: "Senior Product Designer",
    company: "CRED",
    location: "Remote",
    type: "Full-time",
    experience: "3-6 years",
    salary: "₹25L - ₹40L",
    postedAt: "2026-06-20T00:00:00Z",
    logo: "https://logo.clearbit.com/cred.club",
    tags: ["UI/UX", "Figma", "Animation"],
    description: "Design premium experiences for the top 1% of India."
  }
];

export const MOCK_INTERNSHIPS = [
  {
    id: "sde-intern-amazon",
    title: "Software Development Intern",
    company: "Amazon",
    location: "Hyderabad, India",
    type: "Internship",
    duration: "6 Months",
    stipend: "₹80,000/month",
    postedAt: "2026-06-26T00:00:00Z",
    logo: "https://logo.clearbit.com/amazon.in",
    tags: ["Java", "AWS", "DSA"],
    description: "Work on highly scalable systems and get a pre-placement offer."
  },
  {
    id: "data-analyst-intern-swiggy",
    title: "Data Analyst Intern",
    company: "Swiggy",
    location: "Bangalore, India",
    type: "Internship",
    duration: "3 Months",
    stipend: "₹45,000/month",
    postedAt: "2026-06-22T00:00:00Z",
    logo: "https://logo.clearbit.com/swiggy.com",
    tags: ["SQL", "Python", "Tableau"],
    description: "Help optimize delivery routes using data analytics."
  }
];
