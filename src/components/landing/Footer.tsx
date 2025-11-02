import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Logo from "../../assets/logo.jpg";
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div >
                <img src={Logo} alt="Logo" className="w-6 h-6 object-contain rounded-full" />

            </div>
              <span className="text-xl font-bold">SpotMe</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The simplest way to launch your digital identity. Create beautiful portfolios 
              that showcase your professional story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href='#' className="hover:text-white transition-colors">Help Center</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SpotMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};