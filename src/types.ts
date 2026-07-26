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
