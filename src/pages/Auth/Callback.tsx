import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        toast.error('Session not found. Please log in.');
        navigate('/login');
        return;
      }

      const user = data.session.user;

      setUser({
        id: user.id,
        email: user.email ?? '',
        username: user.user_metadata?.username || '',
        created_at: user.created_at
      });

      toast.success('Email confirmed! You’re now logged in.');
      navigate('/editor');
    };

    handleSession();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-700 text-lg">Verifying your account...</p>
    </div>
  );
};
