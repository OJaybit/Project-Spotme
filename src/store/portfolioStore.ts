import { create } from 'zustand';
import { Portfolio } from '../types';

interface PortfolioState {
  portfolio: Portfolio | null;
  isEditing: boolean;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  setPortfolio: (portfolio: Portfolio | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  updateHero: (hero: Partial<Portfolio['hero']>) => void;
  updateAbout: (about: Partial<Portfolio['about']>) => void;
  updateSkills: (skills: Partial<Portfolio['skills']>) => void;
  updateProjects: (projects: Partial<Portfolio['projects']>) => void;
  updateContact: (contact: Partial<Portfolio['contact']>) => void;
  updateTheme: (theme: Partial<Portfolio['theme']>) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: null,
  isEditing: false,
  previewMode: 'desktop',
  setPortfolio: (portfolio) => set({ portfolio }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setPreviewMode: (previewMode) => set({ previewMode }),
  updateHero: (hero) =>
    set((state) => ({
      portfolio: state.portfolio
        ? { ...state.portfolio, hero: { ...state.portfolio.hero, ...hero } }
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
}));