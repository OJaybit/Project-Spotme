import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Mail, Phone } from 'lucide-react';
import { Portfolio } from '../types';
import { Button } from '../components/ui/Button';

export const PublicPortfolio: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // Simulate API call to fetch portfolio by username
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock portfolio data - in real app, this would come from Supabase
        const mockPortfolio: Portfolio = {
          id: '1',
          user_id: '1',
          username: username || 'demo',
          hero: {
            name: 'SpotMe',
            title: 'Frontend Developer & SaaS Builder',
            avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
            cta_text: 'See my work',
            cta_url: '#projects'
          },
          about: {
            bio: "I'm a frontend developer specialized in building exceptional digital experiences. I enjoy working with modern technologies to create responsive and performant web applications. Based in New York, with a degree in Computer Science.",
            mission: 'To create digital experiences that make a positive impact on people\'s lives.'
          },
          skills: {
            skills: [
              { name: 'React', category: 'Frontend', icon: 'react' },
              { name: 'JavaScript', category: 'Frontend', icon: 'javascript' },
              { name: 'HTML, CSS', category: 'Frontend', icon: 'html' },
              { name: 'Figma', category: 'Design', icon: 'figma' },
              { name: 'Node.js', category: 'Backend', icon: 'nodejs' },
              { name: 'Firebase', category: 'Backend', icon: 'firebase' }
            ]
          },
          projects: {
            projects: [
              {
                id: '1',
                title: 'Project One',
                description: 'A web-based analytics platform',
                image_url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
                video_url: '',
                media_type: 'image' as const,
                live_url: 'https://example.com',
                github_url: 'https://github.com/user/project',
                tech_stack: ['React', 'Node.js', 'CSS']
              },
              {
                id: '2',
                title: 'Project Two',
                description: 'An e-commerce website',
                image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
                video_url: '',
                media_type: 'image' as const,
                live_url: 'https://example.com',
                github_url: 'https://github.com/user/project',
                tech_stack: ['JavaScript', 'HTML', 'CSS']
              },
              {
                id: '3',
                title: 'Project Three',
                description: 'A task management app',
                image_url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
                video_url: '',
                media_type: 'image' as const,
                live_url: 'https://example.com',
                github_url: 'https://github.com/user/project',
                tech_stack: ['Vue.js', 'Firebase']
              }
            ]
          },
          contact: {
            email: 'SpotMe@example.com',
            phone: '',
            social_links: [
              { platform: 'LinkedIn', url: 'https://linkedin.com/in/joshua', icon: 'linkedin' },
              { platform: 'GitHub', url: 'https://github.com/joshua', icon: 'github' },
              { platform: 'Twitter', url: 'https://twitter.com/joshua', icon: 'twitter' }
            ],
            show_contact_form: true
          },
          theme: {
            mode: 'light',
            dark_opacity: 0.9,
            primary_color: '#3B82F6',
            secondary_color: '#10B981',
            accent_color: '#F97316',
            font_family: 'Inter, sans-serif'
          },
          is_published: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        };

        setPortfolio(mockPortfolio);
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (notFound || !portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Portfolio not found</p>
          <a href="/" className="text-blue-600 hover:text-blue-500">
            Back to SpotMe
          </a>
        </div>
      </div>
    );
  }

  const { hero, about, skills, projects, contact, theme } = portfolio;

  // Calculate dark mode background with opacity
  const darkBgStyle = theme.mode === 'dark' 
    ? { backgroundColor: `rgba(17, 24, 39, ${theme.dark_opacity || 0.9})` }
    : {};

  return (
    <div
      className={`min-h-screen ${theme.mode === 'dark' ? '' : 'bg-white'}`}
      style={{
        ...(theme.mode === 'dark' ? darkBgStyle : {}),
        fontFamily: theme.font_family
      }}
    >
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm ${
        theme.mode === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
      } border-b border-gray-200`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className={`text-xl font-bold ${
              theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {hero.name}
            </h1>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className={`hover:opacity-75 ${
                theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Home</a>
              <a href="#about" className={`hover:opacity-75 ${
                theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>About</a>
              <a href="#projects" className={`hover:opacity-75 ${
                theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Projects</a>
              <a href="#contact" className={`hover:opacity-75 ${
                theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`pt-24 pb-20 px-6 text-center ${
        theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {hero.avatar_url && (
              <img
                src={hero.avatar_url}
                alt={hero.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm {hero.name}.
            </h1>
            <p className="text-2xl lg:text-3xl mb-8 opacity-90">
              {hero.title}
            </p>
            {hero.cta_text && (
              <Button 
                style={{ backgroundColor: theme.primary_color }}
                className="text-white border-none text-lg px-8 py-3"
                onClick={() => {
                  if (hero.cta_url?.startsWith('#')) {
                    document.querySelector(hero.cta_url)?.scrollIntoView({ behavior: 'smooth' });
                  } else if (hero.cta_url) {
                    window.open(hero.cta_url, '_blank');
                  }
                }}
              >
                {hero.cta_text}
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 ${
        theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{hero.about_title || 'About Me'}</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg leading-relaxed mb-6 opacity-90">
                {about.bio}
              </p>
              {about.mission && (
                <div>
                  <h3 className="font-semibold mb-2 text-xl">Mission</h3>
                  <p className="opacity-90 text-lg">{about.mission}</p>
                </div>
              )}
            </div>
            
            {/* Skills */}
            {skills.skills.length > 0 && (
              <div>
                <h3 className="font-semibold mb-6 text-xl">Skills/Tools</h3>
                <div className="space-y-4">
                  {Object.entries(
                    skills.skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill.name);
                      return acc;
                    }, {} as Record<string, string[]>)
                  ).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium opacity-70 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-6 ${
        theme.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
                style={theme.mode === 'dark' ? { backgroundColor: `rgba(31, 41, 55, ${(theme.dark_opacity || 0.9) * 0.8})` } : {}}
              >
                {(project.image_url || project.video_url) && (
                  <div className="w-full h-48 overflow-hidden">
                    {project.media_type === 'video' && project.video_url ? (
                      <video
                        src={project.video_url}
                        className="w-full h-full object-cover"
                        controls
                        poster={project.image_url}
                      />
                    ) : project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="opacity-90 mb-4">{project.description}</p>
                  
                  {project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-500"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-gray-500"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 ${
        theme.mode === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact</h2>
          <p className="text-lg mb-12 opacity-90">
            I'm currently available for freelance work. Get in touch with me via email or through social media.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-3 text-xl hover:opacity-75 transition-opacity px-6 py-3 rounded-lg"
                style={{ backgroundColor: theme.primary_color, color: 'white' }}
              >
                <Mail className="w-6 h-6" />
                <span>{contact.email}</span>
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center space-x-3 text-xl hover:opacity-75 transition-opacity"
                style={{ color: theme.primary_color }}
              >
                <Phone className="w-6 h-6" />
                <span>{contact.phone}</span>
              </a>
            )}
          </div>

          {contact.social_links.length > 0 && (
            <div className="flex justify-center space-x-6">
              {contact.social_links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                    theme.mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <span className="font-medium">
                    {link.platform.charAt(0).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 text-center border-t ${
        theme.mode === 'dark' 
          ? 'border-gray-800 text-gray-400' 
          : 'border-gray-200 text-gray-600'
      }`}>
        <p>&copy; 2024 {hero.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};