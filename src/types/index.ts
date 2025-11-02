export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  username: string;
  hero: HeroSection;
  about: AboutSection;
  skills: SkillsSection;
  projects: ProjectsSection;
  contact: ContactSection;
  theme: ThemeSettings;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface HeroSection {
  name: string;
  title: string;
  avatar_url?: string;
  cta_text: string;
  cta_url?: string;
  about_title?: string;
}

export interface AboutSection {
  bio: string;
  mission?: string;
}

export interface SkillsSection {
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  category: string;
}

export interface ProjectsSection {
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  video_url?: string;
  media_type?: 'image' | 'video' | 'both';
  live_url?: string;
  github_url?: string;
  tech_stack: string[];
}

export interface ContactSection {
  email: string;
  phone?: string;
  social_links: SocialLink[];
  show_contact_form: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ThemeSettings {
  mode: 'light' | 'dark';
  dark_opacity: number; // 0.1 to 1.0 for dark mode intensity
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
}