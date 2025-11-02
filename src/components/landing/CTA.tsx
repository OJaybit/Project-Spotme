import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23333%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20" />



      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <div className="w-4 h-4 mr-2" />
            Join thousands of professionals
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Launch Your
            <br />
            Digital Identity?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Create your professional portfolio in minutes. No coding required, no monthly fees. 
            Just you, your story, and a beautiful way to share it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className=" text-blue px-8 py-4">
Get Started                <div className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/SpotMe">
              <Button variant="outline" size="lg" className=" text-blue bg-white text-lg px-8 py-4">
                View Demo
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
     </section>
  );
};
