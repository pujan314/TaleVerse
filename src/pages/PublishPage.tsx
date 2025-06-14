import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, BookOpen, Save, DollarSign, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';
import { supabase } from '../lib/supabase';
import FileUpload from '../components/ui/FileUpload';

const PublishPage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    coverImage: '',
    coverImagePath: '', // Store the storage path for potential deletion
    price: 0,
    chapters: [{
      title: 'Chapter 1',
      content: '',
      isPreview: true
    }]
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleChapterChange = (index: number, field: string, value: string | boolean) => {
    const newChapters = [...formData.chapters];
    newChapters[index] = { ...newChapters[index], [field]: value };
    setFormData(prev => ({ ...prev, chapters: newChapters }));
  };
  
  const addChapter = () => {
    setFormData(prev => ({
      ...prev,
      chapters: [...prev.chapters, {
        title: `Chapter ${prev.chapters.length + 1}`,
        content: '',
        isPreview: false
      }]
    }));
  };
  
  const removeChapter = (index: number) => {
    if (formData.chapters.length > 1) {
      const newChapters = formData.chapters.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, chapters: newChapters }));
      if (currentChapter >= index && currentChapter > 0) {
        setCurrentChapter(currentChapter - 1);
      }
    }
  };
  
  const handleCoverImageUpload = (url: string, path: string) => {
    setFormData(prev => ({ 
      ...prev, 
      coverImage: url,
      coverImagePath: path
    }));
  };

  const handleCoverImageError = (error: string) => {
    console.error('Cover image upload error:', error);
    // Error is already handled by the FileUpload component
  };
  
  const validateForm = () => {
    if (!formData.title.trim()) {
      addToast('Please enter a title', 'error');
      return false;
    }
    if (!formData.description.trim()) {
      addToast('Please enter a description', 'error');
      return false;
    }
    if (!formData.genre) {
      addToast('Please select a genre', 'error');
      return false;
    }
    if (formData.chapters.some(chapter => !chapter.title.trim() || !chapter.content.trim())) {
      addToast('Please fill in all chapter titles and content', 'error');
      return false;
    }
    return true;
  };
  
  const handleSaveDraft = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      // Save novel as draft
      const { data: novel, error: novelError } = await supabase
        .from('novels')
        .insert([{
          title: formData.title,
          description: formData.description,
          author_id: user!.id,
          author_name: user!.username || user!.email,
          cover_image: formData.coverImage,
          genre: formData.genre,
          price: formData.price,
          is_published: false,
          total_chapters: formData.chapters.length
        }])
        .select()
        .single();

      if (novelError) throw novelError;

      // Save chapters
      const chaptersData = formData.chapters.map((chapter, index) => ({
        novel_id: novel.id,
        title: chapter.title,
        content: chapter.content,
        chapter_number: index + 1,
        is_preview: chapter.isPreview
      }));

      const { error: chaptersError } = await supabase
        .from('chapters')
        .insert(chaptersData);

      if (chaptersError) throw chaptersError;

      addToast('Draft saved successfully!', 'success');
      navigate(`/novel/${novel.id}`);
    } catch (error: any) {
      console.error('Error saving draft:', error);
      addToast('Failed to save draft. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePublish = async () => {
    if (!validateForm()) return;
    
    setIsPublishing(true);
    try {
      // Create novel
      const { data: novel, error: novelError } = await supabase
        .from('novels')
        .insert([{
          title: formData.title,
          description: formData.description,
          author_id: user!.id,
          author_name: user!.username || user!.email,
          cover_image: formData.coverImage,
          genre: formData.genre,
          price: formData.price,
          is_published: true,
          total_chapters: formData.chapters.length
        }])
        .select()
        .single();

      if (novelError) throw novelError;

      // Save chapters
      const chaptersData = formData.chapters.map((chapter, index) => ({
        novel_id: novel.id,
        title: chapter.title,
        content: chapter.content,
        chapter_number: index + 1,
        is_preview: chapter.isPreview
      }));

      const { error: chaptersError } = await supabase
        .from('chapters')
        .insert(chaptersData);

      if (chaptersError) throw chaptersError;

      // Create a basic quiz (optional)
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert([{
          novel_id: novel.id,
          title: `${formData.title} - Comprehension Quiz`
        }])
        .select()
        .single();

      if (!quizError && quiz) {
        // Add sample quiz questions
        const sampleQuestions = [
          {
            quiz_id: quiz.id,
            question_text: `What is the main theme of "${formData.title}"?`,
            options: ['Adventure', 'Romance', 'Mystery', 'Science Fiction'],
            correct_answer_index: 0,
            question_number: 1
          },
          {
            quiz_id: quiz.id,
            question_text: 'Who is the main character?',
            options: ['The protagonist', 'The antagonist', 'A side character', 'The narrator'],
            correct_answer_index: 0,
            question_number: 2
          }
        ];

        await supabase
          .from('quiz_questions')
          .insert(sampleQuestions);
      }

      addToast('Novel published successfully!', 'success');
      navigate(`/novel/${novel.id}`);
    } catch (error: any) {
      console.error('Error publishing novel:', error);
      addToast('Failed to publish novel. Please try again.', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Please sign in to publish
        </h2>
        <p className="text-[var(--text-secondary)] mt-2">
          You need to be logged in to publish novels
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              Create New Story
            </h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="btn-secondary"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit Mode' : 'Preview'}
              </button>
              
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="btn-secondary"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="btn-primary"
              >
                <PenTool className="h-4 w-4 mr-2" />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
          
          {!previewMode ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Enter your story title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Genre *
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="input"
                    required
                  >
                    <option value="">Select a genre</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Horror">Horror</option>
                    <option value="Literary Fiction">Literary Fiction</option>
                    <option value="Historical Fiction">Historical Fiction</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="input"
                  placeholder="Write a compelling description for your story"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Image
                </label>
                <FileUpload
                  onUploadComplete={handleCoverImageUpload}
                  onUploadError={handleCoverImageError}
                  currentImage={formData.coverImage}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price (TALE Tokens)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input pl-10"
                    placeholder="0 for free"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Set to 0 to make your novel free to read
                </p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Chapters
                  </h3>
                  <button
                    type="button"
                    onClick={addChapter}
                    className="btn-secondary text-sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Chapter
                  </button>
                </div>
                
                <div className="flex mb-4 overflow-x-auto">
                  {formData.chapters.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentChapter(index)}
                      className={`mr-2 px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                        currentChapter === index
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Chapter {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="chapterTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Chapter Title *
                      </label>
                      {formData.chapters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChapter(currentChapter)}
                          className="text-red-500 hover:text-red-600 text-sm flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove Chapter
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      id="chapterTitle"
                      value={formData.chapters[currentChapter]?.title || ''}
                      onChange={(e) => handleChapterChange(currentChapter, 'title', e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="chapterContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Chapter Content *
                    </label>
                    <textarea
                      id="chapterContent"
                      value={formData.chapters[currentChapter]?.content || ''}
                      onChange={(e) => handleChapterChange(currentChapter, 'content', e.target.value)}
                      rows={15}
                      className="input font-serif"
                      placeholder="Write your chapter content here..."
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`preview-${currentChapter}`}
                      checked={formData.chapters[currentChapter]?.isPreview || false}
                      onChange={(e) => handleChapterChange(currentChapter, 'isPreview', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`preview-${currentChapter}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Make this chapter available as preview (free to read)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="flex items-center mb-6">
                {formData.coverImage && (
                  <img 
                    src={formData.coverImage} 
                    alt={formData.title}
                    className="w-32 h-48 object-cover rounded-lg mr-6"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-serif font-bold mb-2">{formData.title || 'Untitled Story'}</h1>
                  <p className="text-[var(--text-secondary)] mb-4">{formData.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
                    <span>{formData.genre}</span>
                    <span>•</span>
                    <span>{formData.price > 0 ? `${formData.price} TALE` : 'Free'}</span>
                    <span>•</span>
                    <span>{formData.chapters.length} chapters</span>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-serif font-semibold mb-4">
                {formData.chapters[currentChapter]?.title || 'Chapter Title'}
              </h2>
              <div className="novel-content whitespace-pre-wrap">
                {formData.chapters[currentChapter]?.content || 'No content yet...'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishPage;