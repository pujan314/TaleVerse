import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, testConnection } from '../lib/supabase';
import { useToast } from '../components/ui/Toaster';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [connectionTested, setConnectionTested] = useState<boolean>(false);
  const [connectionWorking, setConnectionWorking] = useState<boolean>(false);
  const { addToast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Test Supabase connection and initialize auth
    const initializeAuth = async () => {
      try {
        console.log('Testing Supabase connection...');
        const connectionOk = await testConnection();
        
        if (mounted) {
          setConnectionTested(true);
          setConnectionWorking(connectionOk);
        }
        
        if (!connectionOk) {
          console.warn('Supabase connection failed, running in demo mode');
          if (mounted) {
            addToast('Unable to connect to database. Please check your Supabase configuration.', 'error');
            setInitialLoading(false);
          }
          return;
        }

        console.log('Supabase connection successful, checking session...');
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setInitialLoading(false);
          }
          return;
        }

        if (mounted && session?.user) {
          console.log('Found existing session, fetching profile...');
          await fetchUserProfile(session.user);
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          addToast('Failed to initialize authentication. Please refresh the page.', 'error');
        }
      } finally {
        if (mounted) {
          setInitialLoading(false);
        }
      }
    };

    initializeAuth();

    // Set up auth listener
    let subscription: any = null;
    
    const { data } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in, fetching profile...');
          setIsLoading(true);
          await fetchUserProfile(session.user);
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          setIsLoading(false);
        }
      }
    );
    subscription = data.subscription;

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    if (!connectionWorking) {
      console.warn('Cannot fetch user profile - no database connection');
      return;
    }

    try {
      console.log('Fetching profile for user:', authUser.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        console.log('Profile not found, creating new profile...');
        // Profile doesn't exist, create one
        const profileData = {
          id: authUser.id,
          email: authUser.email!,
          username: authUser.user_metadata?.username || `user_${authUser.id.substring(0, 8)}`,
          tokens: 50,
          nfts: [],
          is_writer: false
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert([profileData]);

        if (insertError) {
          console.error('Error creating profile:', insertError);
          throw insertError;
        }

        // Now fetch the newly created profile
        const { data: newProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (fetchError) {
          console.error('Error fetching new profile:', fetchError);
          throw fetchError;
        }

        console.log('New profile created and fetched:', newProfile);
        setUser(newProfile);
      } else if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      } else {
        console.log('Profile fetched successfully:', data);
        setUser(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      addToast('Error loading user profile', 'error');
    }
  };

  const login = async (email: string, password: string) => {
    if (!connectionWorking) {
      addToast('Cannot login - database connection unavailable', 'error');
      throw new Error('Database connection unavailable');
    }

    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Login error:', error);
        let errorMessage = 'Failed to log in';
        
        if (error.message === 'Invalid login credentials') {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a moment before trying again.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
        
        throw new Error(errorMessage);
      }
      
      if (!data.user) {
        throw new Error('Login failed - no user data returned');
      }
      
      console.log('Login successful:', data.user.id);
      addToast('Successfully logged in', 'success');
      
      // Immediately fetch and set user profile
      await fetchUserProfile(data.user);
      
    } catch (error: any) {
      console.error('Login error:', error);
      addToast(error.message || 'Failed to log in', 'error');
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username?: string) => {
    if (!connectionWorking) {
      addToast('Cannot signup - database connection unavailable', 'error');
      throw new Error('Database connection unavailable');
    }

    setIsLoading(true);
    try {
      console.log('Attempting signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username?.trim() || `user_${Date.now()}`
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        let errorMessage = 'Failed to create account';
        
        if (error.message.includes('already registered')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        throw new Error(errorMessage);
      }
      
      console.log('Signup successful:', data.user?.id);
      addToast('Account created successfully! You can now sign in.', 'success');
    } catch (error: any) {
      console.error('Signup error:', error);
      addToast(error.message || 'Failed to create account', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting logout...');
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      addToast('Successfully logged out', 'success');
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
      addToast('Failed to log out', 'error');
      // Even if logout fails, clear the local state
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      console.log('Updating user:', updatedUser);
      setUser(updatedUser);
    }
  };

  const isLoggedIn = !!user;

  // Debug logging
  console.log('AuthProvider state:', { 
    user: user?.email, 
    isLoggedIn, 
    isLoading, 
    initialLoading,
    connectionWorking 
  });

  // Show loading spinner only during initial app load
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Taleverse...</p>
          {!connectionTested && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Testing connection...</p>
          )}
          {connectionTested && !connectionWorking && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Unable to connect to database. Please check your Supabase configuration in the .env file.
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                The app will continue in demo mode with limited functionality.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isLoading, 
      login, 
      signup,
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}