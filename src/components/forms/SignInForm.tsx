// Extract form logic into separate component
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail } from '../../utils/validation';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { AlertCircle } from 'lucide-react';

interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        onSuccess?.();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 bordert5 border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
      </button>
    </form>
  );
};