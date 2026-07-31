export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  num: string;
  title: string;
  description: string;
  accent: string;
  technologies: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: "ai_ml" | "backend" | "frontend" | "databases" | "ai_libs";
  categoryLabel: string;
  description?: string;
  iconName?: string;
}

export interface TechStackGroup {
  id: "ai_ml" | "backend" | "frontend" | "databases" | "ai_libs";
  title: string;
  accent: string;
  items: string[];
}

export interface TechUsageDetail {
  name: string;
  category: string;
  accent: string;
  whereUsed: string;
  projects: { id: string; title: string; tags: string[] }[];
}
