import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/landing/Footer';
import { Landing } from './pages/Landing';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { PortfolioViewer } from './pages/PortfolioViewer';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isPortfolioPage = location.pathname.startsWith('/p/');

  return (
    <div className="min-h-screen bg-white">
      {!isPortfolioPage && <Header />}
      <main>{children}</main>
      {!isPortfolioPage && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/p/:slug" element={<PortfolioViewer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
