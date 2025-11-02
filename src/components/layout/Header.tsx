import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, User, LogOut, Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import Logo from "../../assets/logo.jpg";
export const Header: React.FC = () => {
  const location = useLocation();
  const { user, setUser } = useAuthStore();

  const handleLogout = async () => {
    // Implement logout logic
    setUser(null);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div >
              <img src={Logo} alt="SpotMe Logo" className="w-5 h-5 object-contain rounded-full" />
            </div>
            <span className="text-xl font-bold text-gray-900">SpotMe</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/features' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/pricing' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/editor">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Editor
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};