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
  refreshAuth: () => Promise<void>;
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

// Local storage keys for persistence
const AUTH_STORAGE_KEY = 'taleverse_auth_state';
const USER_STORAGE_KEY = 'taleverse_user_data';

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [connectionTested, setConnectionTested] = useState<boolean>(false);
  const [connectionWorking, setConnectionWorking] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { addToast } = useToast();

  // Persist user data to localStorage
  const persistUserData = (userData: User | null) => {
    try {
      if (userData) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist user data:', error);
    }
  };

  // Load user data from localStorage
  const loadPersistedUserData = (): User | null => {
    try {
      const authState = localStorage.getItem(AUTH_STORAGE_KEY);
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      
      if (authState === 'authenticated' && userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.warn('Failed to load persisted user data:', error);
      // Clear corrupted data
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    return null;
  };

  // Refresh authentication state with debouncing
  const refreshAuth = async () => {
    if (!connectionWorking || isRefreshing) return;

    setIsRefreshing(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error refreshing session:', error);
        return;
      }

      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
        persistUserData(null);
      }
    } catch (error) {
      console.error('Error in refreshAuth:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: any = null;
    let refreshTimeout: NodeJS.Timeout;

    // Initialize auth with persistence
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Load persisted user data immediately for faster UI
        const persistedUser = loadPersistedUserData();
        if (persistedUser && mounted) {
          setUser(persistedUser);
          setIsLoading(false);
          setInitialLoading(false);
        }
        
        // Check if we have Supabase environment variables
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url' || supabaseKey === 'your_supabase_anon_key') {
          console.warn('Supabase environment variables not configured, running in demo mode');
          if (mounted) {
            setConnectionTested(true);
            setConnectionWorking(false);
            setInitialLoading(false);
            setIsLoading(false);
          }
          return;
        }
        
        const connectionOk = await testConnection();
        
        if (mounted) {
          setConnectionTested(true);
          setConnectionWorking(connectionOk);
        }
        
        if (!connectionOk) {
          console.warn('Supabase connection failed, running in demo mode');
          if (mounted) {
            setInitialLoading(false);
            setIsLoading(false);
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
            setIsLoading(false);
          }
          return;
        }

        if (mounted && session?.user) {
          console.log('Found existing session, fetching profile...');
          await fetchUserProfile(session.user);
        } else {
          console.log('No existing session found');
          if (mounted) {
            setUser(null);
            persistUserData(null);
          }
        }

        // Set up auth listener
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
              persistUserData(null);
              setIsLoading(false);
            } else if (event === 'TOKEN_REFRESHED' && session?.user) {
              console.log('Token refreshed, updating profile...');
              await fetchUserProfile(session.user);
            }
          }
        );
        authSubscription = data.subscription;

      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          console.warn('Running in demo mode due to connection issues');
        }
      } finally {
        if (mounted) {
          setInitialLoading(false);
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Handle page visibility changes with debouncing
    const handleVisibilityChange = () => {
      if (!document.hidden && connectionWorking && !isRefreshing) {
        console.log('Page became visible, scheduling auth refresh...');
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
          refreshAuth();
        }, 500); // Debounce for 500ms
      }
    };

    // Handle focus events with debouncing
    const handleFocus = () => {
      if (connectionWorking && !isRefreshing) {
        console.log('Window focused, scheduling auth refresh...');
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
          refreshAuth();
        }, 500); // Debounce for 500ms
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      mounted = false;
      clearTimeout(refreshTimeout);
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [connectionWorking, isRefreshing]);

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
        persistUserData(newProfile);
      } else if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      } else {
        console.log('Profile fetched successfully:', data);
        setUser(data);
        persistUserData(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      addToast('Error loading user profile', 'error');
    }
  };

  const login = async (email: string, password: string) => {
    if (!connectionWorking) {
      addToast('Cannot login - database connection unavailable. Please check back later.', 'error');
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
      addToast('Cannot signup - database connection unavailable. Please check back later.', 'error');
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
      
      if (connectionWorking) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      
      setUser(null);
      persistUserData(null);
      addToast('Successfully logged out', 'success');
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
      addToast('Failed to log out', 'error');
      // Even if logout fails, clear the local state
      setUser(null);
      persistUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      console.log('Updating user:', updatedUser);
      setUser(updatedUser);
      persistUserData(updatedUser);
    }
  };

  const isLoggedIn = !!user;

  // Debug logging
  console.log('AuthProvider state:', { 
    user: user?.email, 
    isLoggedIn, 
    isLoading, 
    initialLoading,
    connectionWorking,
    isRefreshing
  });

  // Show loading spinner only during initial app load, not on tab focus
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
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                Running in demo mode. Some features may be limited.
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
      isLoading: isLoading && !initialLoading, // Don't show loading on tab focus
      login, 
      signup,
      logout, 
      updateUser,
      refreshAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}