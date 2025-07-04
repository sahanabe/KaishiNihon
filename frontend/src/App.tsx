import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import Language from './pages/Language';
import Visa from './pages/Visa';
import Services from './pages/Services';
import Consultation from './pages/Consultation';
import Profile from './pages/Profile';
import ProfileDashboard from './pages/ProfileDashboard';
import Dashboard from './pages/Dashboard';
import JLPTN5 from './pages/JLPTN5';
import JLPTN4 from './pages/JLPTN4';
import JLPTN3 from './pages/JLPTN3';
import JLPTN2 from './pages/JLPTN2';
import JLPTN1 from './pages/JLPTN1';
import BecomeLecturer from './pages/BecomeLecturer';
import LecturerProfile from './pages/LecturerProfile';
import N5Vocabulary from './pages/N5Vocabulary';
import KanjiMastery from './pages/KanjiMastery';
import GrammarFundamentals from './pages/GrammarFundamentals';
import HiraganaKatakana from './pages/HiraganaKatakana';
import MinnaNoNihongoLessons from './pages/MinnaNoNihongoLessons';
import OnlineClass from './pages/OnlineClass';
import ComprehensiveTestingN5 from './pages/ComprehensiveTestingN5';
import AIInterviewPreparation from './pages/AIInterviewPreparation';
import KanjiMasteryN4 from './pages/KanjiMasteryN4';

import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/language" element={<Language />} />
                <Route path="/language/jlpt-n5" element={<JLPTN5 />} />
                <Route path="/language/jlpt-n4" element={<JLPTN4 />} />
                <Route path="/language/jlpt-n3" element={<JLPTN3 />} />
                <Route path="/language/jlpt-n2" element={<JLPTN2 />} />
                <Route path="/language/jlpt-n1" element={<JLPTN1 />} />
                <Route path="/language/online-class" element={<OnlineClass />} />
                <Route path="/become-lecturer" element={<BecomeLecturer />} />
                <Route path="/lecturer/:lecturerId" element={<LecturerProfile />} />
                <Route path="/language/n5-vocabulary" element={<N5Vocabulary />} />
          <Route path="/language/kanji-mastery" element={<KanjiMastery />} />
          <Route path="/language/grammar-fundamentals" element={<GrammarFundamentals />} />
                <Route path="/language/hiragana-katakana" element={<HiraganaKatakana />} />
                <Route path="/language/minna-no-nihongo" element={<MinnaNoNihongoLessons />} />
                <Route path="/language/comprehensive-testing-n5" element={<ComprehensiveTestingN5 />} />
                <Route path="/language/ai-interview-preparation" element={<AIInterviewPreparation />} />
                <Route path="/language/jlpt-n4/kanji-mastery" element={<KanjiMasteryN4 />} />
                <Route path="/visa" element={<Visa />} />
                <Route path="/services" element={<Services />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile-dashboard" element={<ProfileDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Redirect login attempts to home */}
                <Route path="/login" element={<Home />} />
                
                {/* Catch all route for 404 */}
                <Route path="*" element={
                  <div className="page-container flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
