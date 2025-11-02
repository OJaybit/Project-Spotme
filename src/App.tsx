import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/landing/Footer';
import { Landing } from './pages/Landing';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { PublicPortfolio } from './pages/PublicPortfolio';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/:username" element={<PublicPortfolio />} />
          </Routes>
        </main>
        <Routes>
          <Route path="/:username" element={null} />
          <Route path="/editor" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;