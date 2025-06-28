import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoadingFallback from '../components/ui/LoadingFallback';
import ErrorBoundary from '../components/ui/ErrorBoundary';

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
    <Suspense fallback={<LoadingFallback message="Loading page..." />}>
      <Routes>
        <Route path="/" element={
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        } />
        <Route path="/discover" element={
          <ErrorBoundary>
            <DiscoverPage />
          </ErrorBoundary>
        } />
        <Route path="/novel/:id" element={
          <ErrorBoundary>
            <NovelPage />
          </ErrorBoundary>
        } />
        <Route path="/novel/:id/quiz" element={
          <ErrorBoundary>
            <QuizPage />
          </ErrorBoundary>
        } />
        <Route path="/community" element={
          <ErrorBoundary>
            <CommunityPage />
          </ErrorBoundary>
        } />
        <Route path="/login" element={
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>
        } />
        <Route path="/signup" element={
          <ErrorBoundary>
            <SignupForm />
          </ErrorBoundary>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <MessagesPage />
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <NotificationsPage />
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <ProfilePage />
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        <Route path="/publish" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <PublishPage />
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        <Route path="/web3" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <Web3DashboardPage />
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        
        {/* Footer pages */}
        <Route path="/about" element={
          <ErrorBoundary>
            <AboutPage />
          </ErrorBoundary>
        } />
        <Route path="/features" element={
          <ErrorBoundary>
            <FeaturesPage />
          </ErrorBoundary>
        } />
        <Route path="/pricing" element={
          <ErrorBoundary>
            <PricingPage />
          </ErrorBoundary>
        } />
        <Route path="/faq" element={
          <ErrorBoundary>
            <FAQPage />
          </ErrorBoundary>
        } />
        <Route path="/writer-guidelines" element={
          <ErrorBoundary>
            <WriterGuidelinesPage />
          </ErrorBoundary>
        } />
        <Route path="/community-rules" element={
          <ErrorBoundary>
            <CommunityRulesPage />
          </ErrorBoundary>
        } />
        <Route path="/token-economy" element={
          <ErrorBoundary>
            <TokenEconomyPage />
          </ErrorBoundary>
        } />
        <Route path="/help-center" element={
          <ErrorBoundary>
            <HelpCenterPage />
          </ErrorBoundary>
        } />
        <Route path="/privacy-policy" element={
          <ErrorBoundary>
            <PrivacyPolicyPage />
          </ErrorBoundary>
        } />
        <Route path="/terms-of-service" element={
          <ErrorBoundary>
            <TermsOfServicePage />
          </ErrorBoundary>
        } />
        <Route path="/copyright" element={
          <ErrorBoundary>
            <CopyrightPage />
          </ErrorBoundary>
        } />
        <Route path="/dao-governance" element={
          <ErrorBoundary>
            <DAOGovernancePage />
          </ErrorBoundary>
        } />
        
        <Route path="/404" element={
          <ErrorBoundary>
            <NotFoundPage />
          </ErrorBoundary>
        } />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;