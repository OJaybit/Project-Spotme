import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Portfolio, Project } from '../types/portfolio';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface PortfolioContextType {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
  fetchPortfolios: () => Promise<void>;
  createPortfolio: (portfolio: Partial<Portfolio>) => Promise<Portfolio | null>;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  savePortfolio: (portfolio: Portfolio) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  setCurrentPortfolio: (portfolio: Portfolio | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolios
  const fetchPortfolios = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const transformedPortfolios: Portfolio[] = (data || []).map(profile => ({
        id: profile.id,
        user_id: profile.user_id,
        name: profile.username || 'Untitled Portfolio',
        description: profile.bio || '',
        theme: 'light',
        is_published: profile.is_published || false,
        custom_domain: '',
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        sections: [],
        projects: { projects: [] }, // safe initialization
      }));

      setPortfolios(transformedPortfolios);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  // Create portfolio
  const createPortfolio = async (portfolio: Partial<Portfolio>): Promise<Portfolio | null> => {
    if (!user) return null;
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          username: portfolio.name || 'untitled',
          full_name: portfolio.name || 'Untitled Portfolio',
          bio: portfolio.description || '',
          is_published: portfolio.is_published || false,
        })
        .select()
        .single();

      if (error || !data) throw error || new Error('No data returned');

      const newPortfolio: Portfolio = {
        id: data.id,
        user_id: data.user_id,
        name: data.username || 'Untitled Portfolio',
        description: data.bio || '',
        theme: 'light',
        is_published: data.is_published || false,
        custom_domain: '',
        created_at: data.created_at,
        updated_at: data.updated_at,
        sections: [],
        projects: { projects: [] },
      };

      setPortfolios(prev => [...prev, newPortfolio]);
      return newPortfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update portfolio
  const updatePortfolio = async (id: string, updates: Partial<Portfolio>) => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: updates.name,
          bio: updates.description,
          is_published: updates.is_published,
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setPortfolios(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updates } : p))
      );

      if (currentPortfolio?.id === id) {
        setCurrentPortfolio(prev => (prev ? { ...prev, ...updates } : null));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio
  const deletePortfolio = async (id: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setPortfolios(prev => prev.filter(p => p.id !== id));

      if (currentPortfolio?.id === id) setCurrentPortfolio(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Save portfolio
  const savePortfolio = async (portfolio: Portfolio) => {
    await updatePortfolio(portfolio.id, portfolio);
  };

  // Save project
  const saveProject = async (project: Project) => {
    if (!currentPortfolio || !user) return;

    const projects = currentPortfolio.projects?.projects ?? [];
    const existingIndex = projects.findIndex(p => p.id === project.id);
    const updatedProjects =
      existingIndex >= 0
        ? projects.map(p => (p.id === project.id ? project : p))
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

      setCurrentPortfolio(prev =>
        prev ? { ...prev, projects: { projects: updatedProjects } } : null
      );

      setPortfolios(prev =>
        prev.map(p =>
          p.id === currentPortfolio.id
            ? { ...p, projects: { projects: updatedProjects } }
            : p
        )
      );

      toast.success('Project saved successfully!');
    } catch (err) {
      console.error('Error saving project:', err);
      toast.error('Failed to save project.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchPortfolios();
    } else {
      setPortfolios([]);
      setCurrentPortfolio(null);
    }
  }, [user]);

  const value: PortfolioContextType = {
    portfolios,
    currentPortfolio,
    loading,
    error,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    savePortfolio,
    saveProject,
    setCurrentPortfolio,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export { PortfolioContext };
