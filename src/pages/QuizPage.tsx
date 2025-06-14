import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Award, ChevronRight, AlertTriangle, Check, X, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';
import { useQuiz } from '../hooks/useSupabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import clsx from '../utils/clsx';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, user, updateUser } = useAuth();
  const { addToast } = useToast();
  const { quiz, loading, submitQuizResult } = useQuiz(id!);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });
  const [showResults, setShowResults] = useState(false);
  const [rewardEarned, setRewardEarned] = useState<{ tokens: number; nft: boolean } | null>(null);
  
  useEffect(() => {
    if (quiz?.questions) {
      setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [quiz]);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (quizSubmitted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < (quiz?.questions.length || 0)) {
      setCurrentQuestionIndex(index);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };
    
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        correctCount++;
      }
    });
    
    const total = quiz.questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    
    return { correct: correctCount, total, percentage };
  };
  
  const handleSubmitQuiz = async () => {
    if (!isLoggedIn) {
      addToast('Please sign in to submit the quiz', 'info');
      navigate('/login');
      return;
    }
    
    // Check if all questions are answered
    const unanswered = selectedAnswers.findIndex(answer => answer === -1);
    if (unanswered !== -1) {
      addToast(`Please answer question ${unanswered + 1} before submitting`, 'error');
      setCurrentQuestionIndex(unanswered);
      return;
    }
    
    setQuizSubmitted(true);
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    
    // Determine rewards based on score
    let tokensEarned = 0;
    let nftEarned = false;
    
    if (calculatedScore.percentage >= 95) {
      tokensEarned = 10;
      if (calculatedScore.percentage === 100) {
        nftEarned = true;
      }
    } else if (calculatedScore.percentage >= 80) {
      tokensEarned = 5;
    } else if (calculatedScore.percentage >= 60) {
      tokensEarned = 2;
    }
    
    setRewardEarned({ tokens: tokensEarned, nft: nftEarned });
    
    // Submit quiz result to database
    try {
      await submitQuizResult({
        user_id: user!.id,
        quiz_id: quiz!.id,
        score: calculatedScore.correct,
        total_questions: calculatedScore.total,
        percentage: calculatedScore.percentage,
        tokens_earned: tokensEarned,
        nft_earned: nftEarned
      });
      
      // Update user tokens
      if (user && tokensEarned > 0) {
        updateUser({ tokens: user.tokens + tokensEarned });
      }
      
      // If user earned NFT, add it to their collection
      if (user && nftEarned) {
        const updatedNfts = [...(user.nfts || []), `novel_${id}_perfect_score`];
        updateUser({ nfts: updatedNfts });
      }
      
      addToast('Quiz submitted successfully!', 'success');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      addToast('Failed to submit quiz results', 'error');
    }
    
    setShowResults(true);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Quiz not available</h2>
        <p className="text-[var(--text-secondary)] mt-2">This novel doesn't have a quiz yet, or it may have been removed.</p>
        <Link to={`/novel/${id}`} className="btn-primary mt-6">Return to Novel</Link>
      </div>
    );
  }
  
  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              {score.percentage >= 80 ? (
                <div className="w-24 h-24 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center text-success-600 dark:text-success-400">
                  <Award className="h-12 w-12" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <BookOpen className="h-12 w-12" />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Quiz Complete!
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                {score.percentage}%
                {score.percentage === 100 && (
                  <Star className="h-8 w-8 text-yellow-500 ml-2" />
                )}
              </div>
              <p className="text-[var(--text-secondary)]">
                You answered {score.correct} out of {score.total} questions correctly
              </p>
            </div>
            
            {rewardEarned && (
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  🎉 Rewards Earned:
                </h3>
                <ul className="space-y-2">
                  {rewardEarned.tokens > 0 && (
                    <li className="flex items-center text-success-700 dark:text-success-400">
                      <Check className="h-5 w-5 mr-2" />
                      <span>{rewardEarned.tokens} TALE Tokens added to your wallet</span>
                    </li>
                  )}
                  {rewardEarned.nft && (
                    <li className="flex items-center text-success-700 dark:text-success-400">
                      <Check className="h-5 w-5 mr-2" />
                      <span>🏆 Perfect Score NFT earned!</span>
                    </li>
                  )}
                  {!rewardEarned.tokens && !rewardEarned.nft && (
                    <li className="flex items-center text-[var(--text-secondary)]">
                      <X className="h-5 w-5 mr-2" />
                      <span>Score 60% or higher to earn tokens!</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            <div className="space-y-4">
              <button 
                onClick={() => setShowResults(false)}
                className="btn-secondary w-full"
              >
                Review Answers
              </button>
              
              <Link 
                to={`/novel/${id}`}
                className="btn-primary w-full"
              >
                Return to Novel
              </Link>
              
              <Link 
                to="/discover"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-center block w-full"
              >
                Discover More Novels
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {quiz.title}
          </h2>
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-[var(--text-secondary)]">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
            
            {!isLoggedIn && (
              <div className="flex items-center text-warning-600 dark:text-warning-400 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Sign in to earn rewards</span>
              </div>
            )}
          </div>
          
          {/* Question Progress Bar */}
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
            <div 
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
          
          {currentQuestion && (
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                {currentQuestion.text}
              </h3>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={clsx(
                      "w-full text-left p-4 rounded-lg border transition-colors",
                      quizSubmitted ? (
                        idx === currentQuestion.correctIndex 
                          ? "bg-success-50 dark:bg-success-900/30 border-success-300 dark:border-success-700" 
                          : idx === selectedAnswers[currentQuestionIndex]
                            ? "bg-error-50 dark:bg-error-900/30 border-error-300 dark:border-error-700"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      ) : (
                        selectedAnswers[currentQuestionIndex] === idx
                          ? "bg-primary-50 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )
                    )}
                  >
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-6 h-6 rounded-full flex items-center justify-center mr-3 border text-sm font-medium",
                        selectedAnswers[currentQuestionIndex] === idx
                          ? "bg-primary-600 text-white border-primary-600"
                          : "border-gray-300 dark:border-gray-600"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{option}</span>
                      
                      {quizSubmitted && (
                        <div className="ml-auto">
                          {idx === currentQuestion.correctIndex ? (
                            <Check className="h-5 w-5 text-success-500" />
                          ) : idx === selectedAnswers[currentQuestionIndex] ? (
                            <X className="h-5 w-5 text-error-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center space-x-2 ${currentQuestionIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                  <span>Previous</span>
                </button>
                
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={quizSubmitted}
                    className={clsx(
                      "btn-primary",
                      quizSubmitted && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {quizSubmitted ? 'Quiz Submitted' : 'Submit Quiz'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Question Navigation */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => navigateToQuestion(idx)}
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                  currentQuestionIndex === idx 
                    ? "bg-primary-600 text-white" 
                    : selectedAnswers[idx] !== -1
                      ? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;