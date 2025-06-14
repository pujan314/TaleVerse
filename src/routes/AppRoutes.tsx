import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const DiscoverPage = lazy(() => import('../pages/DiscoverPage'));
const NovelPage = lazy(() => import('../pages/NovelPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const PublishPage = lazy(() => import('../pages/PublishPage'));
const CommunityPage = lazy(() => import('../pages/CommunityPage'));
const QuizPage = lazy(() => import('../pages/QuizPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const MessagesPage = lazy(() => import('../pages/MessagesPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const Web3DashboardPage = lazy(() => import('../pages/Web3DashboardPage'));
const LibraryPage = lazy(() => import('../pages/LibraryPage'));
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'));
const LoginForm = lazy(() => import('../components/auth/LoginForm'));
const SignupForm = lazy(() => import('../components/auth/SignupForm'));

// Footer pages
const AboutPage = lazy(() => import('../pages/AboutPage'));
const FeaturesPage = lazy(() => import('../pages/FeaturesPage'));
const PricingPage = lazy(() => import('../pages/PricingPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const WriterGuidelinesPage = lazy(() => import('../pages/WriterGuidelinesPage'));
const CommunityRulesPage = lazy(() => import('../pages/CommunityRulesPage'));
const TokenEconomyPage = lazy(() => import('../pages/TokenEconomyPage'));
const HelpCenterPage = lazy(() => import('../pages/HelpCenterPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/TermsOfServicePage'));
const CopyrightPage = lazy(() => import('../pages/CopyrightPage'));
const DAOGovernancePage = lazy(() => import('../pages/DAOGovernancePage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/novel/:id" element={<NovelPage />} />
        <Route path="/novel/:id/quiz" element={<QuizPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/publish" element={<ProtectedRoute><PublishPage /></ProtectedRoute>} />
        <Route path="/web3" element={<ProtectedRoute><Web3DashboardPage /></ProtectedRoute>} />
        
        {/* Footer pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/writer-guidelines" element={<WriterGuidelinesPage />} />
        <Route path="/community-rules" element={<CommunityRulesPage />} />
        <Route path="/token-economy" element={<TokenEconomyPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/copyright" element={<CopyrightPage />} />
        <Route path="/dao-governance" element={<DAOGovernancePage />} />
        
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;