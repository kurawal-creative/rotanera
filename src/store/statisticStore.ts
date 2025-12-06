import { UserStatistics } from "@/types/statistics";

export const dummyUserStatistics: UserStatistics = {
  // Template Statistics
  templatesUsed: 12,
  totalTemplateUsage: 48,
  favoriteTemplatesCount: 7,
  mostUsedTemplate: {
    id: "1",
    title: "Kursi Minimalis Modern",
    usageCount: 15,
  },

  // Project Statistics
  totalProjects: 23,
  draftProjects: 8,
  publishedProjects: 12,
  archivedProjects: 3,

  // Activity Statistics
  recentActivity: [
    {
      id: "1",
      action: "TEMPLATE_USED",
      description: "Menggunakan template Kursi Minimalis Modern",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      icon: "✨",
    },
    {
      id: "2",
      action: "PROJECT_CREATED",
      description: "Membuat proyek baru 'Furniture Set Ruang Tamu'",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      icon: "📁",
    },
    {
      id: "3",
      action: "TEMPLATE_FAVORITED",
      description: "Menambahkan Sofa Set 3-2-1 ke favorit",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      icon: "❤️",
    },
    {
      id: "4",
      action: "PROJECT_PUBLISHED",
      description: "Mempublikasikan proyek 'Desain Kursi Outdoor'",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      icon: "🚀",
    },
    {
      id: "5",
      action: "TEMPLATE_USED",
      description: "Menggunakan template Meja Makan Keluarga",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      icon: "✨",
    },
    {
      id: "6",
      action: "PROJECT_UPDATED",
      description: "Memperbarui proyek 'Kursi Teras Belakang'",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      icon: "✏️",
    },
    {
      id: "7",
      action: "TEMPLATE_FAVORITED",
      description: "Menambahkan Lemari Hias Tradisional ke favorit",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      icon: "❤️",
    },
    {
      id: "8",
      action: "TEMPLATE_USED",
      description: "Menggunakan template Set Taman Outdoor",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      icon: "✨",
    },
  ],

  joinDate: new Date("2024-01-15").toISOString(),
  lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago

  // Weekly activity for last 4 weeks
  weeklyActivity: [
    { week: "Jan 15", templatesUsed: 8, projectsCreated: 3 },
    { week: "Jan 22", templatesUsed: 12, projectsCreated: 5 },
    { week: "Jan 29", templatesUsed: 15, projectsCreated: 4 },
    { week: "Feb 05", templatesUsed: 13, projectsCreated: 6 },
  ],
};
