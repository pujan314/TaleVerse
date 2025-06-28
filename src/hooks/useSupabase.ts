import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Novel, Chapter, Quiz, QuizResult } from '../lib/supabase';

// Hook for managing user profile
export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const getProfile = async () => {
      try {
        setError(null);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!mounted) return;
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (!mounted) return;

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
            if (mounted) setProfile(newProfile);
          } else if (error) {
            throw error;
          } else {
            if (mounted) setProfile(data);
          }
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        if (mounted) setError(error.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message);
      throw error;
    }
  };

  return { profile, loading, error, updateProfile };
};

// Hook for managing novels
export const useNovels = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNovels = async (filters?: { genre?: string; search?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
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
        setError(error.message);
        setNovels([]);
        return;
      }
      
      setNovels(data || []);
    } catch (error: any) {
      console.error('Error fetching novels:', error);
      setError(error.message);
      setNovels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovels();
  }, []);

  return { novels, loading, error, fetchNovels };
};

// Hook for managing a single novel with chapters
export const useNovel = (novelId: string) => {
  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchNovel = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching novel with ID:', novelId);
        
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'your_supabase_project_url' || 
            supabaseKey === 'your_supabase_anon_key') {
          console.log('Supabase not configured, novel not available');
          if (mounted) {
            setNovel(null);
            setChapters([]);
          }
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
          if (mounted) {
            setError(novelError.message);
            setNovel(null);
            setChapters([]);
          }
          return;
        }
        
        if (mounted) {
          console.log('Novel data:', novelData);
          setNovel(novelData);
        }

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
            if (mounted) {
              setError(previewError.message);
              setChapters([]);
            }
          } else {
            console.log('Preview chapters:', previewChapters);
            if (mounted) setChapters(previewChapters || []);
          }
        } else {
          console.log('All chapters data:', chaptersData);
          if (mounted) setChapters(chaptersData || []);
        }
      } catch (error: any) {
        console.error('Error fetching novel:', error);
        if (mounted) {
          setError(error.message);
          setNovel(null);
          setChapters([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (novelId) {
      fetchNovel();
    }

    return () => {
      mounted = false;
    };
  }, [novelId]);

  return { novel, chapters, loading, error };
};

// Hook for managing quizzes
export const useQuiz = (novelId: string) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'your_supabase_project_url' || 
            supabaseKey === 'your_supabase_anon_key') {
          console.log('Supabase not configured, quiz not available');
          if (mounted) setQuiz(null);
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
          if (mounted) {
            setError(quizError.message);
            setQuiz(null);
          }
          return;
        }
        
        if (quizData && mounted) {
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
      } catch (error: any) {
        console.error('Error fetching quiz:', error);
        if (mounted) {
          setError(error.message);
          setQuiz(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (novelId) {
      fetchQuiz();
    }

    return () => {
      mounted = false;
    };
  }, [novelId]);

  const submitQuizResult = async (result: Omit<QuizResult, 'id' | 'completed_at'>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([result])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error submitting quiz result:', error);
      setError(error.message);
      throw error;
    }
  };

  return { quiz, loading, error, submitQuizResult };
};

// Hook for user library
export const useUserLibrary = () => {
  const [library, setLibrary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchLibrary = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey || 
            supabaseUrl === 'your_supabase_project_url' || 
            supabaseKey === 'your_supabase_anon_key') {
          console.log('Supabase not configured, library not available');
          if (mounted) setLibrary([]);
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
          if (mounted) {
            setError(error.message);
            setLibrary([]);
          }
          return;
        }
        
        if (mounted) setLibrary(data || []);
      } catch (error: any) {
        console.error('Error fetching library:', error);
        if (mounted) {
          setError(error.message);
          setLibrary([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLibrary();

    return () => {
      mounted = false;
    };
  }, []);

  const addToLibrary = async (novelId: string) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('user_library')
        .insert([{ novel_id: novelId }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error adding to library:', error);
      setError(error.message);
      throw error;
    }
  };

  return { library, loading, error, addToLibrary };
};