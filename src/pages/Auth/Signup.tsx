import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import googleIcon from '../../assets/google.png';

export const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  // 🧩 Handle Email/Password Signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { username: formData.username },
         emailRedirectTo: "https://project-spotme-l5lh.vercel.app/auth/callback",
 // 👈 added correctly here
        },
      });

      if (error) throw error;

      // ✅ Stop and prompt for email verification
      if (data?.user && !data.user.confirmed_at) {
        toast.success('Please check your email to confirm your account before signing in.');
        setLoading(false);
        return; // Don’t proceed until email is confirmed
      }

      // ✅ Proceed only if already confirmed (rarely immediate)
      setUser({
        id: data.user!.id,
        email: data.user!.email ?? '',
        username: data.user!.user_metadata?.username || formData.username,
        created_at: data.user!.created_at
      });

      await supabase
        .from('profiles')
        .insert([{ id: data.user!.id, username: formData.username }]);

      toast.success('Account created successfully!');
      navigate('/editor');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Handle Google OAuth Signup
  const handleGoogleSignup = async () => {
  setLoading(true);
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`, // front-end callback route
    },
  });

  if (error) toast.error(error.message);
  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
          <p className="text-gray-500 mt-1">
            Build your digital portfolio in minutes
          </p>
        </div>

        {/* --- SIGNUP FORM --- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="your-username"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Portfolio URL: spotme.com/{formData.username || 'username'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Create a strong password"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <input
              type="checkbox"
              required
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* --- GOOGLE SIGNUP --- */}
        <div className="mt-6 text-center text-gray-500">
          <span className="text-sm">or continue with</span>
          <div
            onClick={handleGoogleSignup}
            className="mt-3 cursor-pointer inline-flex items-center justify-center border rounded-lg py-2 px-4 w-full hover:bg-gray-100 transition"
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-gray-700">Sign up with Google</span>
          </div>
        </div>

        {/* --- LOGIN LINK --- */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
