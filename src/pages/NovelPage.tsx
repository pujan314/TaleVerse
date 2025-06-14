import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, Share, MessageCircle, Heart, Award, Star, Clock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';
import { useNovel, useUserLibrary } from '../hooks/useSupabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const NovelPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { novel, chapters, loading } = useNovel(id!);
  const { addToLibrary } = useUserLibrary();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const { isLoggedIn, user } = useAuth();
  const { addToast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    if (chapters.length > 0) {
      // Always start with the first chapter (index 0)
      setCurrentChapterIndex(0);
    }
  }, [chapters]);

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      addToast('Please sign in to bookmark novels', 'info');
      navigate('/login');
      return;
    }
    
    try {
      await addToLibrary(id!);
      setIsBookmarked(true);
      addToast('Novel added to your library', 'success');
    } catch (error) {
      addToast('Failed to add to library', 'error');
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      addToast('Please sign in to like novels', 'info');
      navigate('/login');
      return;
    }
    setIsLiked(!isLiked);
    addToast(isLiked ? 'Removed from favorites' : 'Added to favorites', 'success');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: novel?.title,
          text: novel?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard', 'success');
    }
  };

  const nextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const canReadChapter = (chapter: any) => {
    if (!chapter) return false;
    
    // Preview chapters can always be read by anyone
    if (chapter.is_preview) return true;
    
    // If user is not logged in, they can only read preview chapters
    if (!isLoggedIn) return false;
    
    // If novel is free (price = 0), logged in users can read all chapters
    if (novel && novel.price === 0) return true;
    
    // For paid novels, check if user has purchased it
    // For now, we'll allow logged in users to read all chapters
    // In a real app, you'd check if the user has purchased the novel
    return true;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!novel) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Novel not found</h2>
        <p className="text-[var(--text-secondary)] mt-2">The novel you're looking for doesn't exist or has been removed.</p>
        <Link to="/discover" className="btn-primary mt-6">Discover more novels</Link>
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Novel Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={novel.cover_image || 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt={novel.title} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600';
                }}
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {novel.title}
            </h1>
            <div className="flex items-center text-[var(--text-secondary)] mb-4 flex-wrap gap-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>by {novel.author_name}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>{novel.genre}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{novel.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <p className="text-[var(--text-secondary)] mb-6">
              {novel.description}
            </p>
          </div>
        </div>

        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No chapters available
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            This novel doesn't have any chapters available for preview yet.
          </p>
          <Link to="/discover" className="btn-primary">
            Discover Other Novels
          </Link>
        </div>
      </div>
    );
  }

  const currentChapter = chapters[currentChapterIndex];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Novel Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={novel.cover_image || 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt={novel.title} 
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600';
              }}
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                {novel.title}
              </h1>
              <div className="flex items-center text-[var(--text-secondary)] mb-4 flex-wrap gap-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>by {novel.author_name}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span>{novel.genre}</span>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{novel.rating.toFixed(1)}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{novel.total_chapters} chapters</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  isBookmarked 
                    ? 'text-primary-600 bg-primary-100 dark:bg-primary-900' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  isLiked 
                    ? 'text-red-600 bg-red-100 dark:bg-red-900' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <p className="text-[var(--text-secondary)] mb-6">
            {novel.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to={`/novel/${novel.id}/quiz`} className="btn-primary">
              <Award className="h-4 w-4 mr-2" />
              Take Quiz
            </Link>
            <button className="btn-secondary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Discuss
            </button>
            {novel.price > 0 && (
              <div className="flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                <span className="text-primary-700 dark:text-primary-300 font-medium">
                  {novel.price} TALE tokens
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Chapter Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-t-lg border border-[var(--border-color)] p-4 flex justify-between items-center">
        <button
          onClick={prevChapter}
          disabled={currentChapterIndex === 0}
          className={`flex items-center space-x-2 ${currentChapterIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous Chapter</span>
        </button>
        
        <div className="text-center">
          <span className="text-sm text-[var(--text-secondary)]">
            Chapter {currentChapterIndex + 1} of {chapters.length}
          </span>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {currentChapter?.title}
          </h2>
          {currentChapter?.is_preview && (
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mt-1">
              Preview
            </span>
          )}
        </div>
        
        <button
          onClick={nextChapter}
          disabled={currentChapterIndex === chapters.length - 1}
          className={`flex items-center space-x-2 ${currentChapterIndex === chapters.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
        >
          <span>Next Chapter</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Chapter Content */}
      {currentChapter && canReadChapter(currentChapter) ? (
        <div className="novel-page prose prose-lg dark:prose-invert max-w-none">
          <div 
            className="novel-content"
            dangerouslySetInnerHTML={{ 
              __html: currentChapter.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '<br>').join('') 
            }}
          />
        </div>
      ) : (
        <div className="novel-page text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {novel.price > 0 ? 'Purchase Required' : 'Sign in to continue reading'}
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              {novel.price > 0 
                ? `This chapter requires ${novel.price} TALE tokens to unlock.`
                : 'Create an account to access all chapters and earn tokens through quizzes.'
              }
            </p>
            <div className="space-y-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/signup\" className="btn-primary w-full">
                    Create Account
                  </Link>
                  <Link to="/login" className="btn-secondary w-full">
                    Sign In
                  </Link>
                </>
              ) : novel.price > 0 ? (
                <button 
                  className="btn-primary w-full"
                  onClick={() => addToast('Purchase feature coming soon!', 'info')}
                >
                  Purchase for {novel.price} TALE
                </button>
              ) : (
                <Link to="/login" className="btn-primary w-full">
                  Sign In to Continue
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Chapter Navigation Bottom */}
      {canReadChapter(currentChapter) && (
        <div className="bg-white dark:bg-gray-800 rounded-b-lg border-t-0 border border-[var(--border-color)] p-4 flex justify-between items-center mb-8">
          <button
            onClick={prevChapter}
            disabled={currentChapterIndex === 0}
            className={`flex items-center space-x-2 ${currentChapterIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous Chapter</span>
          </button>
          
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
            <Link to={`/novel/${novel.id}/quiz`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              Take Quiz
            </Link>
            <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <MessageCircle className="h-4 w-4" />
              <span>Comment</span>
            </button>
          </div>
          
          <button
            onClick={nextChapter}
            disabled={currentChapterIndex === chapters.length - 1}
            className={`flex items-center space-x-2 ${currentChapterIndex === chapters.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
          >
            <span>Next Chapter</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NovelPage;