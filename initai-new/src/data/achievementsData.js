export const achievementData = [
  {
    id: 1,
    title: "First Place in National AI Competition",
    category: "Competition",
    year: 2023,
    image: "/achievements/ai-competition.jpg", // Add your images to public folder
    excerpt: "Won first place in the National AI Competition for our innovative approach to natural language processing.",
    description: "Our team developed a groundbreaking NLP model that achieved state-of-the-art results on multiple benchmarks, earning recognition from industry leaders.",
    featured: true,
    tags: ["AI", "NLP", "Competition"],
    institution: "National AI Association",
    mapPosition: { x: 65, y: 40 } // For map view positioning
  },
  {
    id: 2,
    title: "Research Paper Published in Top AI Journal",
    category: "Publication",
    year: 2022,
    image: "/achievements/research-paper.jpg",
    excerpt: "Our research on transformer-based architectures was published in the prestigious Journal of Artificial Intelligence Research.",
    description: "The paper introduced novel attention mechanisms that significantly improved performance on vision-language tasks while reducing computational requirements.",
    featured: true,
    tags: ["Research", "Publication", "Transformers"],
    institution: "JAIR",
    mapPosition: { x: 35, y: 30 }
  },
  {
    id: 3,
    title: "Innovation Award for AI Ethics Framework",
    category: "Award",
    year: 2023,
    image: "/achievements/ethics-award.jpg",
    excerpt: "Received the Innovation Award for developing a comprehensive AI ethics framework adopted by multiple organizations.",
    description: "Our framework provides practical guidelines for responsible AI development, addressing bias, transparency, and accountability in AI systems.",
    featured: true,
    tags: ["Ethics", "Innovation", "Framework"],
    institution: "Global Tech Ethics Council",
    mapPosition: { x: 50, y: 60 }
  },
  {
    id: 4,
    title: "Partnership with Leading Tech Company",
    category: "Partnership",
    year: 2022,
    image: "/achievements/partnership.jpg",
    excerpt: "Established a strategic partnership with a Fortune 500 tech company to develop next-generation AI solutions.",
    description: "This collaboration focuses on integrating our AI technologies into enterprise-scale applications, reaching millions of users worldwide.",
    featured: false,
    tags: ["Partnership", "Enterprise", "Scaling"],
    institution: "Tech Giant Inc.",
    mapPosition: { x: 80, y: 45 }
  },
  {
    id: 5,
    title: "Best Demo Award at International AI Conference",
    category: "Recognition",
    year: 2021,
    image: "/achievements/conference-award.jpg",
    excerpt: "Our interactive AI demo received the Best Demo Award at the International Conference on Artificial Intelligence.",
    description: "The demo showcased our real-time multimodal learning system that can process and respond to visual, audio, and text inputs simultaneously.",
    featured: true,
    tags: ["Demo", "Conference", "Multimodal"],
    institution: "ICAI",
    mapPosition: { x: 25, y: 70 }
  },
  {
    id: 6,
    title: "1 Million Users Milestone",
    category: "Milestone",
    year: 2023,
    image: "/achievements/users-milestone.jpg",
    excerpt: "Our AI-powered educational platform reached the milestone of 1 million active users worldwide.",
    description: "This achievement represents our commitment to democratizing AI education and making advanced learning tools accessible to students globally.",
    featured: false,
    tags: ["Users", "Education", "Growth"],
    institution: null,
    mapPosition: { x: 60, y: 75 }
  },
  {
    id: 7,
    title: "Government Grant for AI Research",
    category: "Funding",
    year: 2022,
    image: "/achievements/research-grant.jpg",
    excerpt: "Secured a major government grant to advance research in explainable AI for critical applications.",
    description: "The multi-year funding supports our team's work on developing transparent AI systems that can explain their decision-making processes in human-understandable terms.",
    featured: false,
    tags: ["Grant", "Research", "XAI"],
    institution: "National Science Foundation",
    mapPosition: { x: 40, y: 50 }
  },
  {
    id: 8,
    title: "AI for Social Good Recognition",
    category: "Recognition",
    year: 2021,
    image: "/achievements/social-good.jpg",
    excerpt: "Recognized for our AI solutions addressing critical social and environmental challenges.",
    description: "Our projects in healthcare diagnostics, climate modeling, and accessibility tools demonstrated the positive impact of AI technologies on society and the environment.",
    featured: true,
    tags: ["Social Impact", "Sustainability", "Healthcare"],
    institution: "AI for Humanity Initiative",
    mapPosition: { x: 55, y: 25 }
  }
];

export const categories = [
  "Competition",
  "Publication",
  "Award",
  "Partnership",
  "Recognition",
  "Milestone",
  "Funding"
];

export const featuredAchievements = achievementData.filter(achievement => achievement.featured);