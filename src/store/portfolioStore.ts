import { create } from 'zustand';
import { Portfolio, Project } from '../types';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface PortfolioStoreState {
  // Auth / user
  user: User | null;
  setUser: (user: User | null) => void;

  // Portfolio data
  portfolioData: Portfolio | null;
  setPortfolioData: (portfolio: Portfolio | null) => void;

  // Editor state
  portfolio: Portfolio | null;
  setPortfolio: (portfolio: Portfolio | null) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;

  // Updaters
  updateHero: (hero: Partial<Portfolio['hero']>) => void;
  updateAbout: (about: Partial<Portfolio['about']>) => void;
  updateSkills: (skills: Partial<Portfolio['skills']>) => void;
  updateProjects: (projects: Partial<Portfolio['projects']>) => void;
  updateContact: (contact: Partial<Portfolio['contact']>) => void;
  updateTheme: (theme: Partial<Portfolio['theme']>) => void;

  // Save functions
  saveProject: (project: Project) => Promise<void>;
  saveChanges: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStoreState>((set, get) => ({
  // Auth / user
  user: null,
  setUser: (user) => set({ user }),

  // Portfolio data
  portfolioData: null,
  setPortfolioData: (portfolio) => set({ portfolioData: portfolio }),

  // Editor state
  portfolio: null,
  setPortfolio: (portfolio) => set({ portfolio }),
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  previewMode: 'desktop',
  setPreviewMode: (mode) => set({ previewMode: mode }),

  // Updaters
  updateHero: (hero) =>
    set((state) => ({
      portfolio: state.portfolio
        ? {
            ...state.portfolio,
            hero: {
              ...state.portfolio.hero,
              ...hero,
              avatar_size: hero.avatar_size ?? state.portfolio.hero?.avatar_size ?? 128,
              avatar_shape: hero.avatar_shape ?? state.portfolio.hero?.avatar_shape ?? 'circle',
            },
          }
        : null,
    })),

  updateAbout: (about) =>
    set((state) => ({
      portfolio: state.portfolio
        ? { ...state.portfolio, about: { ...state.portfolio.about, ...about } }
        : null,
    })),

  updateSkills: (skills) =>
    set((state) => ({
      portfolio: state.portfolio
        ? { ...state.portfolio, skills: { ...state.portfolio.skills, ...skills } }
        : null,
    })),

  updateProjects: (projects) =>
    set((state) => ({
      portfolio: state.portfolio
        ? { ...state.portfolio, projects: { ...state.portfolio.projects, ...projects } }
        : null,
    })),

  updateContact: (contact) =>
    set((state) => ({
      portfolio: state.portfolio
        ? { ...state.portfolio, contact: { ...state.portfolio.contact, ...contact } }
        : null,
    })),

  updateTheme: (theme) =>
    set((state) => ({
      portfolio: state.portfolio
        ? { ...state.portfolio, theme: { ...state.portfolio.theme, ...theme } }
        : null,
    })),

  // Save a single project
  saveProject: async (project) => {
    const { portfolio, user } = get();
    if (!portfolio || !user) return;

    const projects = portfolio.projects?.projects || [];
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    const updatedProjects =
      existingIndex >= 0
        ? projects.map((p) => (p.id === project.id ? project : p))
        : [...projects, project];

    try {
      const { error } = await supabase
        .from('portfolios')
        .upsert(
          {
            user_id: user.id,
            projects: { projects: updatedProjects },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;

      set({ portfolio: { ...portfolio, projects: { projects: updatedProjects } } });
      toast.success('Project saved successfully!');
    } catch (err) {
      console.error('Error saving project:', err);
      toast.error('Failed to save project.');
    }
  },

  // Save all portfolio changes
  saveChanges: async () => {
    const { portfolio, user } = get();
    if (!portfolio || !user) return;

    try {
      const { error } = await supabase
        .from('portfolios')
        .upsert(
          {
            user_id: user.id,
            projects: portfolio.projects,
            hero: portfolio.hero,
            about: portfolio.about,
            skills: portfolio.skills,
            contact: portfolio.contact,
            theme: portfolio.theme,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;

      toast.success('Portfolio changes saved!');
    } catch (err) {
      console.error('Error saving portfolio:', err);
      toast.error('Failed to save portfolio.');
    }
  },
}));
