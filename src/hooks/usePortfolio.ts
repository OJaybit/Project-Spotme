// Extract business logic into custom hooks
import { useContext } from 'react';
import { PortfolioContext } from '../contexts/PortfolioContext';

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const usePortfolioActions = () => {
  const { updatePortfolio, savePortfolio, deletePortfolio } = usePortfolio();
  return { updatePortfolio, savePortfolio, deletePortfolio };
};