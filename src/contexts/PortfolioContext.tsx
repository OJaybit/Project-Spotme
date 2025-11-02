import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Portfolio, PortfolioSection, Project } from '../types/portfolio';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

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
  setCurrentPortfolio: (portfolio: Portfolio | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
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
      
      // Transform the data to match Portfolio interface
      const transformedPortfolios: Portfolio[] = (data || []).map(profile => ({
        id: profile.id,
        user_id: profile.user_id,
        name: profile.username || 'Untitled Portfolio',
        description: profile.bio || '',
        theme: 'light' as const,
        is_published: profile.is_published || false,
        custom_domain: '',
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        sections: []
      }));
      
      setPortfolios(transformedPortfolios);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

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
          is_published: portfolio.is_published || false
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newPortfolio: Portfolio = {
        id: data.id,
        user_id: data.user_id,
        name: data.username,
        description: data.bio,
        theme: 'light',
        is_published: data.is_published,
        custom_domain: '',
        created_at: data.created_at,
        updated_at: data.updated_at,
        sections: []
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
          is_published: updates.is_published
        })
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setPortfolios(prev => 
        prev.map(portfolio => 
          portfolio.id === id ? { ...portfolio, ...updates } : portfolio
        )
      );
      
      if (currentPortfolio?.id === id) {
        setCurrentPortfolio(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update portfolio');
    } finally {
      setLoading(false);
    }
  };

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
      
      setPortfolios(prev => prev.filter(portfolio => portfolio.id !== id));
      
      if (currentPortfolio?.id === id) {
        setCurrentPortfolio(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete portfolio');
    } finally {
      setLoading(false);
    }
  };

  const savePortfolio = async (portfolio: Portfolio) => {
    await updatePortfolio(portfolio.id, portfolio);
  };

  useEffect(() => {
    if (user) {
      fetchPortfolios();
    } else {
      setPortfolios([]);
      setCurrentPortfolio(null);
    }
  }, [user]);

  const value = {
    portfolios,
    currentPortfolio,
    loading,
    error,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    savePortfolio,
    setCurrentPortfolio
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export { PortfolioContext };