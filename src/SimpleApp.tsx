import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Home, Search } from 'lucide-react';

function SimpleApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Taleverse</span>
              </Link>
              <nav className="flex space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/discover" className="text-gray-600 hover:text-gray-900">Discover</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Taleverse
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Your Web3-powered storytelling platform
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Read Stories</h3>
          <p className="text-gray-600">Discover amazing stories from talented writers</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Take Quizzes</h3>
          <p className="text-gray-600">Test your comprehension and earn rewards</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Join Community</h3>
          <p className="text-gray-600">Connect with other readers and writers</p>
        </div>
      </div>
    </div>
  );
}

function DiscoverPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Sample Novel {i}</h3>
              <p className="text-gray-600 text-sm">A fascinating story that will captivate your imagination...</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Science Fiction</span>
                <span className="text-sm font-medium text-blue-600">Free</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleApp;