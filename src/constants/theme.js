export const COLORS = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#10B981',
  accent: '#F59E0B',

  background: '#0F172A',
  backgroundLight: '#1E293B',
  surface: '#1E293B',
  surfaceLight: '#334155',

  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  border: '#334155',

  gradient: {
    primary: ['#6366F1', '#8B5CF6'],
    secondary: ['#10B981', '#06B6D4'],
    dark: ['#0F172A', '#1E293B'],
  }
};

export const FONTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,

  padding: 16,
  margin: 16,
  radius: 12,
  radiusSm: 8,
  radiusLg: 16,
  radiusXl: 24,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const DATA = {
  stats: [
    { number: '6+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Completed' },
    { number: '20+', label: 'Technologies' },
  ],

  skills: {
    android: {
      title: 'Android Development',
      items: ['Java', 'Kotlin', 'Jetpack Compose', 'Android SDK', 'MVVM Architecture', 'Clean Architecture', 'Retrofit', 'Ktor', 'GraphQL', 'Room Database', 'Dagger Hilt', 'Koin', 'Kotlin Coroutines', 'Material Design', 'Firebase'],
    },
    flutter: {
      title: 'Flutter Development',
      items: ['Flutter', 'Dart', 'BLoC Pattern', 'Provider', 'Dio', 'Firebase', 'SQLite', 'GetX', 'Riverpod'],
    },
    tools: {
      title: 'Tools & Technologies',
      items: ['Git', 'GitHub', 'GitLab', 'Android Studio', 'JIRA', 'GitHub Actions', 'Gradle', 'Xcode'],
    },
    other: {
      title: 'Other Skills',
      items: ['REST APIs', 'WebSocket', 'Socket.io', 'Google Maps', 'MapBox', 'MapsPeople', 'Payment Gateways', 'Agile/Scrum'],
    },
  },

  experience: [
    {
      title: 'Software Engineer (Mobile Application Developer)',
      company: 'Outcode Software',
      location: 'Naxal, Kathmandu, Nepal',
      period: 'October 2020 - Present',
      isCurrent: true,
      responsibilities: [
        'Develop Android native applications and Flutter cross-platform applications',
        'Participate in architecture and design based on project requirements',
        'Write modular, reusable code through TDD and best practices',
        'Create and maintain technical documentation',
        'Conduct code reviews and share knowledge within the team',
      ],
    },
    {
      title: 'Software Engineer (Android Developer)',
      company: 'Insight Workshop',
      location: 'Naxal, Kathmandu, Nepal',
      period: 'November 2019 - October 2020',
      isCurrent: false,
      responsibilities: [
        'Design and build native Android and Flutter applications',
        'Handle requirement analysis, estimation, and deployment',
        'Implement TDD, code reviews, and best practices',
        'Conduct risk analysis and communicate with stakeholders',
      ],
    },
    {
      title: 'Android Developer',
      company: 'YarshaTech',
      location: 'New-Baneswar, Kathmandu, Nepal',
      period: 'November 2018 - November 2019',
      isCurrent: false,
      responsibilities: [
        'Collaborate with team to develop quality software solutions',
        'Handle requirement analysis and development of assigned tasks',
        'Research and implement new technologies for efficiency',
      ],
    },
  ],

  projects: [
    {
      title: 'Safety & Emergency Management',
      description: 'A comprehensive safety app with real-time alerts, chat functionality, and map integration for emergency response.',
      tags: ['Kotlin', 'Jetpack Compose', 'Dagger Hilt', 'Clean Architecture', 'Google Maps', 'Mapbox', 'MapsPeople', 'Firebase', 'Real-time Chat'],
      color: '#EF4444',
    },
    {
      title: 'Game Analysis & Booking',
      description: 'Sports analytics platform with booking system, real-time game statistics, and player performance tracking.',
      tags: ['Kotlin', 'MVVM', 'Retrofit'],
      color: '#F59E0B',
    },
    {
      title: 'Payment App',
      description: 'Secure payment processing application with Stripe integration, transaction history, and multi-currency support.',
      tags: ['Android', 'Stripe API', 'Khalti', 'Security'],
      color: '#10B981',
    },
    {
      title: 'Job Portal App',
      description: 'Job search and recruitment platform connecting job seekers with employers, featuring advanced filters and application tracking.',
      tags: ['Flutter', 'BLoC', 'REST API', 'Firebase Auth'],
      color: '#6366F1',
    },
    {
      title: 'Reward App',
      description: 'Loyalty and rewards management system with points tracking, redemption features, and gamification elements.',
      tags: ['Kotlin', 'Room DB', 'Coroutines', 'Material Design'],
      color: '#EC4899',
    },
    {
      title: 'Measurement App',
      description: 'Precision measurement tool using device sensors and camera for accurate real-world measurements.',
      tags: ['Android', 'Camera API', 'Custom Views', 'Sensors'],
      color: '#8B5CF6',
    },
    {
      title: 'EdTech App',
      description: 'Educational technology platform with video streaming, interactive quizzes, and progress tracking for students.',
      tags: ['Flutter', 'Provider', 'Video Streaming', 'SQLite'],
      color: '#06B6D4',
    },
    {
      title: 'Social Media App',
      description: 'Social networking platform with posts, stories, real-time messaging, and content sharing capabilities.',
      tags: ['Kotlin', 'WebSocket', 'Firebase', 'Jetpack Compose'],
      color: '#F97316',
    },
    {
      title: 'Ridesharing App',
      description: 'Ride-hailing platform with real-time location tracking, route optimization, and in-app payment processing.',
      tags: ['Android', 'Google Maps', 'Location Services', 'Payment Gateway'],
      color: '#14B8A6',
    },
    {
      title: 'Streaming App',
      description: 'Video streaming platform with offline downloads, personalized recommendations, and multi-device sync.',
      tags: ['Kotlin', 'ExoPlayer', 'MVVM', 'Koin'],
      color: '#A855F7',
    },
  ],

  contact: {
    email: 'Shresthaaaush25@gmail.com',
    phone: '+977-9843548792',
    linkedin: 'View Profile',
    location: 'Kathmandu, Nepal',
  },
};
