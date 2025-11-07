import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Mail, Phone } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Button } from '../ui/Button';

interface PortfolioPreviewProps {
  data?: any;
  readonly?: boolean;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data, readonly = false }) => {
  const { portfolio: storedPortfolio } = usePortfolioStore();
  const portfolio = readonly ? data : storedPortfolio;

  if (!portfolio) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Start editing to see your portfolio preview</p>
        </div>
      </div>
    );
  }

  const { hero, about, skills, projects, contact, theme } = portfolio;
  const darkBgStyle = theme?.mode === 'dark'
    ? { backgroundColor: `rgba(17, 24, 39, ${theme.dark_opacity || 0.9})` }
    : {};

  return (
    <div
      className={`flex-1 overflow-y-auto ${theme?.mode === 'dark' ? '' : 'bg-white'}`}
      style={{ ...(theme?.mode === 'dark' ? darkBgStyle : {}), fontFamily: theme?.font_family }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Hero Section */}
        <section className={`py-20 px-6 text-center ${theme?.mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {hero?.avatar_url && (
              <img
                src={hero.avatar_url}
                alt={hero.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-5xl font-bold mb-4">
              Hi, I'm {hero?.name || 'Your Name'}.
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              {hero?.title || 'Your Professional Title'}
            </p>
            {hero?.cta_text && (
              <Button style={{ backgroundColor: theme?.primary_color }} className="text-white border-none">
                {hero.cta_text}
              </Button>
            )}
          </motion.div>
        </section>

        {/* About Section */}
        {about?.bio && (
          <section className={`py-16 px-6 ${theme?.mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">{hero?.about_title || 'About Me'}</h2>
              <p className="text-lg leading-relaxed mb-6 opacity-90">{about.bio}</p>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects?.projects?.length > 0 && (
          <section className={`py-16 px-6 ${theme?.mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.projects.map((project: any, index: number) => (
                  <motion.div
                    key={project.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl overflow-hidden shadow-lg bg-white"
                    style={theme?.mode === 'dark'
                      ? { backgroundColor: `rgba(31, 41, 55, ${(theme.dark_opacity || 0.9) * 0.8})` }
                      : {}}
                  >
                    {project.image_url && (
                      <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                      <p className="opacity-90 mb-4">{project.description}</p>
                      <div className="flex space-x-4">
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-500">
                            <ExternalLink className="w-4 h-4 mr-1" /> Live
                          </a>
                        )}
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-500">
                            <Github className="w-4 h-4 mr-1" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className={`py-16 px-6 ${theme?.mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contact</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              {contact?.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center space-x-2 text-lg" style={{ color: theme?.primary_color }}>
                  <Mail className="w-5 h-5" /> <span>{contact.email}</span>
                </a>
              )}
              {contact?.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center space-x-2 text-lg" style={{ color: theme?.primary_color }}>
                  <Phone className="w-5 h-5" /> <span>{contact.phone}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 px-6 text-center border-t ${
          theme?.mode === 'dark'
            ? 'border-gray-800 text-gray-400'
            : 'border-gray-200 text-gray-600'
        }`}>
          <p>&copy; 2025 {hero?.name || 'Your Name'}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
