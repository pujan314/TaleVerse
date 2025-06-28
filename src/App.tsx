import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './contexts/AuthContext';
import { Web3Provider } from './contexts/Web3Context';
import { Toaster, ToastProvider } from './components/ui/Toaster';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingFallback from './components/ui/LoadingFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false, // Prevent automatic refetch on window focus
      refetchOnReconnect: false, // Prevent automatic refetch on reconnect
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <Web3Provider>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthProvider>
              <Router>
                <Suspense fallback={<LoadingFallback size="lg" message="Loading Taleverse..." />}>
                  <Layout>
                    <ErrorBoundary fallback={
                      <div className="text-center py-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Page Error
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Something went wrong loading this page. Please try refreshing.
                        </p>
                      </div>
                    }>
                      <AppRoutes />
                    </ErrorBoundary>
                  </Layout>
                </Suspense>
              </Router>
              <Toaster />
            </AuthProvider>
          </ToastProvider>
        </QueryClientProvider>
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default App;