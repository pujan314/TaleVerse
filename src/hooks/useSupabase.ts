import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Novel, Chapter, Quiz, QuizResult } from '../lib/supabase';

// Hook for managing user profile
export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error && error.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: user.id,
                  email: user.email!,
                  username: `user_${user.id.substring(0, 8)}`,
                  tokens: 50,
                  nfts: [],
                  is_writer: false
                }
              ])
              .select()
              .single();

            if (insertError) throw insertError;
            setProfile(newProfile);
          } else if (error) {
            throw error;
          } else {
            setProfile(data);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return { profile, loading, updateProfile };
};

// Hook for managing novels
export const useNovels = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNovels = async (filters?: { genre?: string; search?: string }) => {
    try {
      setLoading(true);
      
      // Check if Supabase is available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'your_supabase_project_url' || 
          supabaseKey === 'your_supabase_anon_key') {
        console.log('Supabase not configured, using empty novels list');
        setNovels([]);
        return;
      }

      let query = supabase
        .from('novels')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (filters?.genre && filters.genre !== 'All') {
        query = query.eq('genre', filters.genre);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,author_name.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching novels:', error);
        setNovels([]);
        return;
      }
      
      setNovels(data || []);
    } catch (error) {
      console.error('Error fetching novels:', error);
      setNovels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovels();
  }, []);

  return { novels, loading, fetchNovels };
};

// Hook for managing a single novel with chapters
export const useNovel = (novelId: string) => {
  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        setLoading(true);
        console.log('Fetching novel with ID:', novelId);
        
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'your_supabase_project_url' || 
            supabaseKey === 'your_supabase_anon_key') {
          console.log('Supabase not configured, novel not available');
          setNovel(null);
          setChapters([]);
          return;
        }
        
        // Fetch novel details - this should work for public access now
        const { data: novelData, error: novelError } = await supabase
          .from('novels')
          .select('*')
          .eq('id', novelId)
          .eq('is_published', true)
          .single();

        if (novelError) {
          console.error('Error fetching novel:', novelError);
          setNovel(null);
          setChapters([]);
          return;
        }
        
        console.log('Novel data:', novelData);
        setNovel(novelData);

        // Fetch chapters - try to get all chapters first, then fall back to preview only
        console.log('Fetching chapters for novel:', novelId);
        
        // First, try to get all chapters (this will work for authenticated users)
        let { data: chaptersData, error: chaptersError } = await supabase
          .from('chapters')
          .select('*')
          .eq('novel_id', novelId)
          .order('chapter_number', { ascending: true });

        // If that fails, try to get just preview chapters (public access)
        if (chaptersError) {
          console.log('Failed to fetch all chapters, trying preview only:', chaptersError);
          const { data: previewChapters, error: previewError } = await supabase
            .from('chapters')
            .select('*')
            .eq('novel_id', novelId)
            .eq('is_preview', true)
            .order('chapter_number', { ascending: true });
          
          if (previewError) {
            console.error('Error fetching preview chapters:', previewError);
            setChapters([]);
          } else {
            console.log('Preview chapters:', previewChapters);
            setChapters(previewChapters || []);
          }
        } else {
          console.log('All chapters data:', chaptersData);
          setChapters(chaptersData || []);
        }
      } catch (error) {
        console.error('Error fetching novel:', error);
        setNovel(null);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };

    if (novelId) {
      fetchNovel();
    }
  }, [novelId]);

  return { novel, chapters, loading };
};

// Hook for managing quizzes
export const useQuiz = (novelId: string) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'your_supabase_project_url' || 
            supabaseKey === 'your_supabase_anon_key') {
          console.log('Supabase not configured, quiz not available');
          setQuiz(null);
          return;
        }
        
        const { data: quizData, error: quizError } = await supabase
          .from('quizzes')
          .select(`
            *,
            quiz_questions (*)
          `)
          .eq('novel_id', novelId)
          .single();

        if (quizError && quizError.code !== 'PGRST116') {
          console.error('Error fetching quiz:', quizError);
          setQuiz(null);
          return;
        }
        
        if (quizData) {
          // Transform the data to match our expected format
          const transformedQuiz = {
            ...quizData,
            questions: quizData.quiz_questions.map((q: any) => ({
              id: q.id,
              text: q.question_text,
              options: q.options,
              correctIndex: q.correct_answer_index
            }))
          };
          setQuiz(transformedQuiz);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    if (novelId) {
      fetchQuiz();
    }
  }, [novelId]);

  const submitQuizResult = async (result: Omit<QuizResult, 'id' | 'completed_at'>) => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([result])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      throw error;
    }
  };

  return { quiz, loading, submitQuizResult };
};

// Hook for user library
export const useUserLibrary = () => {
  const [library, setLibrary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'your_supabase_project_url' || 
            supabaseKey === 'your_supabase_anon_key') {
          console.log('Supabase not configured, library not available');
          setLibrary([]);
          return;
        }
        
        const { data, error } = await supabase
          .from('user_library')
          .select(`
            *,
            novels (*)
          `)
          .order('added_at', { ascending: false });

        if (error) {
          console.error('Error fetching library:', error);
          setLibrary([]);
          return;
        }
        
        setLibrary(data || []);
      } catch (error) {
        console.error('Error fetching library:', error);
        setLibrary([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const addToLibrary = async (novelId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_library')
        .insert([{ novel_id: novelId }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to library:', error);
      throw error;
    }
  };

  return { library, loading, addToLibrary };
};