// Improved AuthContext with email confirmation and access control
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ----------------- SIGN IN -----------------


  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as AuthError };
    }
  };

  // ----------------- SIGN UP (with email confirmation) -----------------
  const signUp = async (email: string, password: string, fullName?: string) => {
    if (isSignUp){
     const{ error } = await supabase.auth.signUp({
      email,
      password,})
      if (signUpError ) {console.error("Error signing up:", signUpError .message) 
        return
      }
    } else{
     const{ signInError } = await supabase.auth.signInWith({
      password,})
      if (error) {console.error("Error signing up:", signInError.message ) 
        return
      }

    }
      // ✅ notify user to confirm email
      if (!error && data.user && !data.user.email_confirmed_at) {
        alert("Please check your inbox and confirm your email before logging in.");
      }

      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as AuthError };
    }
  };

  // ----------------- SIGN OUT -----------------
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Sign out error:', error);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // ----------------- RESET PASSWORD -----------------
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as AuthError };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  // ----------------- ACCESS CONTROL -----------------
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div>Loading...</div>
      ) : !user ? (
        <div>Please sign in or sign up to continue.</div>  {/* 🚫 No user yet */}
      ) : !user.email_confirmed_at ? (
        <div>Please confirm your email before accessing the app.</div> {/* 🚫 Block until confirmed */}
      ) : (
        children  {/* ✅ User signed in AND confirmed */}
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext };
