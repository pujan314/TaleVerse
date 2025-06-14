import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './contexts/AuthContext';
import { Web3Provider } from './contexts/Web3Context';
import { Toaster, ToastProvider } from './components/ui/Toaster';
import Layout from './components/layout/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <Layout>
                <AppRoutes />
              </Layout>
            </Router>
            <Toaster />
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </Web3Provider>
  );
}

export default App;