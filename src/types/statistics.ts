export interface UserStatistics {
  // Template Statistics
  templatesUsed: number;
  totalTemplateUsage: number;
  favoriteTemplatesCount: number;
  mostUsedTemplate: {
    id: string;
    title: string;
    usageCount: number;
  } | null;

  // Project Statistics
  totalProjects: number;
  draftProjects: number;
  publishedProjects: number;
  archivedProjects: number;

  // Activity Statistics
  recentActivity: ActivitySummary[];
  joinDate: string;
  lastActive: string;

  // Trends
  weeklyActivity: {
    week: string;
    templatesUsed: number;
    projectsCreated: number;
  }[];
}

export interface ActivitySummary {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  icon: string; // emoji or icon name
}
