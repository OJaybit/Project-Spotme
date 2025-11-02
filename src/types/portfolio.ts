// Better type definitions
export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  theme: 'light' | 'dark' | 'custom';
  is_published: boolean;
  custom_domain?: string;
  created_at: string;
  updated_at: string;
  sections: PortfolioSection[];
}

export interface PortfolioSection {
  id: string;
  portfolio_id: string;
  type: 'hero' | 'about' | 'projects' | 'contact' | 'skills' | 'experience';
  title: string;
  content: Record<string, any>;
  order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  is_featured: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}