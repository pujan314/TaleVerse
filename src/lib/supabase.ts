import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Test connection function with improved error handling and longer timeout
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key (first 20 chars):', supabaseAnonKey?.substring(0, 20) + '...');
    
    // Use a simple health check with a longer timeout (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(0)
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      if (error) {
        // If the error is about table not existing or permissions, connection is still working
        if (error.code === 'PGRST116' || 
            error.message.includes('permission denied') || 
            error.message.includes('does not exist') ||
            error.message.includes('relation') ||
            error.code === '42P01') {
          console.log('Supabase connection successful (table access limited but connection working)');
          return true;
        }
        console.error('Supabase connection error:', error);
        return false;
      }
      
      console.log('Supabase connection successful');
      return true;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Supabase connection timeout after 10 seconds');
        return false;
      }
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Supabase connection failed:', error.message || error);
    
    // Provide helpful error messages
    if (error.message?.includes('fetch')) {
      console.error('Network error - check if Supabase URL is correct and accessible');
    } else if (error.message?.includes('Invalid API key')) {
      console.error('Invalid API key - check if VITE_SUPABASE_ANON_KEY is correct');
    }
    
    // Don't fail the entire app if connection test fails - allow graceful degradation
    return false;
  }
};

// Database types
export interface User {
  id: string;
  email: string;
  username?: string;
  profile_image?: string;
  tokens: number;
  nfts: string[];
  is_writer: boolean;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Novel {
  id: string;
  title: string;
  description: string;
  author_id: string;
  author_name: string;
  cover_image?: string;
  genre: string;
  rating: number;
  price: number;
  is_published: boolean;
  total_chapters: number;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  novel_id: string;
  title: string;
  content: string;
  chapter_number: number;
  is_preview: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  novel_id: string;
  title: string;
  questions: QuizQuestion[];
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer_index: number;
  question_number: number;
}

export interface QuizResult {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  tokens_earned: number;
  nft_earned: boolean;
  completed_at: string;
}