export const projectsData = [
  {
    id: 'planprep',
    title: 'PlanPrep',
    description: 'Personalized meal planning mobile application with real-time sync.',
    longDescription: 'PlanPrep is a mobile app designed to take the guesswork out of meal prep. It syncs user preferences with a cloud database to generate weekly meal plans, complete with automated grocery lists and step-by-step recipes.',
    features: [
      'Cross-platform mobile application built with Java.',
      'Real-time cloud synchronization using Firebase.',
      'Automated grocery list generation based on selected meals.'
    ],
    tech: ['Java', 'Firebase', 'REST API'],
    type: 'featured',
    isMobile: true,
    image: '/planprep-main.jpg',
    apkUrl: 'https://drive.google.com/uc?export=download&id=1RkeRfmCrgmo9zM0GH6-yI8yYGLdEt6j5',
    screenshots: ['/planprep-ss1.jpg', '/planprep-ss2.jpg', '/planprep-ss3.jpg'],
    codeUrl: 'https://github.com/shenzzuu/PlanPrep-Mobile-App'
  },
  {
    id: 'esports-club',
    title: 'E-Sports Club Management',
    description: 'A web-based club management system with admin dashboard and CRUD features.',
    longDescription: 'A robust web application designed to manage an E-Sports club. It handles user registration, member subscriptions, merchandise sales, and features a comprehensive administrative dashboard for overseeing operations.',
    features: [
      'Full administrative dashboard for managing users and products.',
      'Secure payment processing integration with Stripe API.',
      'Database migration capabilities from PostgreSQL to SQLite.'
    ],
    tech: ['PHP', 'PostgreSQL', 'Stripe API'],
    type: 'featured',
    image: '/esports-main.png',
    screenshots: ['/esports-ss1.png', '/esports-ss2.png', '/esports-ss3.png'],
    liveUrl: 'https://mlbbclub.onrender.com',
    codeUrl: 'https://github.com/shenzzuu/Esports-Club-Management-System'
  },
  {
    id: 'restaurant-finder',
    title: 'Local Restaurant Finder',
    description: 'Discover nearby restaurants dynamically based on location and real-time weather conditions.',
    longDescription: 'A web-based application designed to help users discover nearby restaurants dynamically. It demonstrates API integration, dynamic content rendering, and full-stack web development using PHP and JavaScript, integrating Google Maps and Open-Meteo APIs.',
    features: [
      'Search and discover nearby restaurants using location data.',
      'Integration with Google Maps Scraper and Open-Meteo APIs.',
      'Dynamic content rendering with a responsive web interface.'
    ],
    tech: ['PHP', 'JavaScript', 'HTML/CSS'],
    type: 'featured',
    image: '/restaurant-main.png',
    screenshots: ['/restaurant-ss1.png', '/restaurant-ss2.png', '/restaurant-ss3.png'],
    liveUrl: 'https://local-restaurant-finder-rgw2.onrender.com/',
    codeUrl: 'https://github.com/shenzzuu/local-restaurant-finder'
  }
];
