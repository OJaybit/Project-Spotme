import React from 'react';
import { motion } from 'framer-motion';
import Logo from "../../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { 
  Palette, 
  Eye, 
  Globe, 
  Smartphone, 
  Code2,
  Star,
  MessageSquare,
  Mail,
  Moon
} from 'lucide-react';

const features = [
  {
    icon: <img src={Logo} alt="Logo" className="w-6 h-6 object-contain rounded-full" />,
    title: 'Hero Banner',
    description: 'Instantly introduce yourself with a headline, avatar, and call-to-action buttons.',
    color: 'blue'
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'About Me',
    description: 'Share your background, mission, and what drives you professionally.',
    color: 'emerald'
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Skills Matrix',
    description: 'Visually present your tech stack with icons and categories.',
    color: 'purple'
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Projects',
    description: 'Showcase your best work with descriptions, images, and links.',
    color: 'orange'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Testimonials',
    description: 'Build trust with social proof from clients and colleagues.',
    color: 'pink'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Contact Form',
    description: 'Make it easy for anyone to reach you with integrated contact options.',
    color: 'indigo'
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: 'Dark/Light Mode',
    description: 'Because good UX is a vibe with theme customization.',
    color: 'gray'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Live Preview',
    description: 'See real-time changes as you type and customize your portfolio.',
    color: 'teal'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Responsive Design',
    description: 'Your portfolio looks perfect on desktop, tablet, and mobile devices.',
    color: 'cyan'
  }
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  gray: 'bg-gray-100 text-gray-600',
  teal: 'bg-teal-100 text-teal-600',
  cyan: 'bg-cyan-100 text-cyan-600'
};

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Features of Your OnePageBio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your digital identity fully loaded with everything you need to stand out online.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
