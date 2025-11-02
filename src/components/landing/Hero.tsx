import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import Logo from "../../assets/logo.jpg"; 
export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
     <div className="absolute inset-0 bg-gradient-to-tr from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb]" />

{/* Subtle wave shape */}
<svg
  className="absolute top-0 left-0 w-full h-full opacity-20"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  viewBox="0 0 1440 320"
>
  <path
    fill="#3b82f6"
    fillOpacity="0.05"
    d="M0,192L48,170.7C96,149,192,107,288,117.3C384,128,480,192,576,192C672,192,768,128,864,128C960,128,1056,192,1152,186.7C1248,181,1344,107,1392,69.3L1440,32V0H0Z"
  />
</svg>

{/* Soft light spot */}
<div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-30 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
           
            {/* Tagline */}
            <div className="inline-flex items-center px-5 py-2 bg-blue-600 to-indigo-500 text-white rounded-full text-sm font-semibold shadow-md mb-6">
              The simplest way to launch your digital identity
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your Perfect Portfolio
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Create stunning OnePage portfolios in minutes. No coding required. 
              Customize everything, publish instantly, and share your professional story with the world.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-4">
Get Started                <div className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/SpotMe">
             <Button variant="outline" size="lg" className=" text-blue bg-white text-lg px-8 py-4">
                             View Demo
                           </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
