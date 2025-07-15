import type { Project } from "~repo-shared";

export const arrImages = [
  {
    id: 1,
    name: "Android",
    path: "/img/1. Android.png",
  },
  {
    id: 2,
    name: "Javascript",
    path: "/img/2. Javascript.png",
  },
  {
    id: 3,
    name: "React",
    path: "/img/3. React.webp",
  },
  {
    id: 4,
    name: "Typescript",
    path: "/img/4. Typescript.png",
  },
  {
    id: 5,
    name: "Firebase",
    path: "/img/5. Firebase.png",
  },
  // {
  //   id: 6,
  //   name: "Flutter",
  //   // path: '/img/6. Flutter.png',
  //   path: "https://www.kindpng.com/picc/m/355-3557482_flutter-logo-png-transparent-png.png",
  // },
  {
    id: 7,
    name: "Ionic",
    path: "/img/7. Ionic.png",
  },
  // {
  //   id: 8,
  //   name: "Dart",
  //   path: "/img/8. Dart.png",
  // },
  {
    id: 9,
    name: "Kotlin",
    path: "/img/9. Kotlin.png",
  },
  {
    id: 10,
    name: "Tailwind Css",
    path: "/img/11. Tailwind.png",
  },
];

// Dummy data instead of API call
export const dummyProjects: Project[] = [
  {
    bucket: "projects",
    description: "A modern e-commerce application with React Native",
    display: "https://via.placeholder.com/300x100?text=E-Commerce+App",
    id: "1",
    key: "ecommerce-app",
    link_appstore: "https://apps.apple.com/app/id123",
    link_playstore:
      "https://play.google.com/store/apps/details?id=com.ecommerce",
    link_website: "https://ecommerce.example.com",
    name: "E-Commerce App",
    platform: "mobile",
    tag: "react-native",
    year: "2023",
  },
  {
    bucket: "projects",
    description: "Professional portfolio website built with Next.js",
    display: "https://via.placeholder.com/300x100?text=Portfolio+Site",
    id: "2",
    key: "portfolio-website",
    link_appstore: "",
    link_playstore: "",
    link_website: "https://portfolio.example.com",
    name: "Portfolio Website",
    platform: "website",
    tag: "nextjs",
    year: "2023",
  },
  {
    bucket: "projects",
    description: "Productivity app for managing daily tasks",
    display: "https://via.placeholder.com/300x100?text=Task+Manager",
    id: "3",
    key: "task-manager",
    link_appstore: "https://apps.apple.com/app/id456",
    link_playstore: "https://play.google.com/store/apps/details?id=com.tasks",
    link_website: "",
    name: "Task Manager",
    platform: "mobile",
    tag: "flutter",
    year: "2022",
  },
  {
    bucket: "projects",
    description: "Real-time weather information dashboard",
    display: "https://via.placeholder.com/300x100?text=Weather+Dashboard",
    id: "4",
    key: "weather-dashboard",
    link_appstore: "",
    link_playstore: "",
    link_website: "https://weather.example.com",
    name: "Weather Dashboard",
    platform: "website",
    tag: "react",
    year: "2022",
  },
];
