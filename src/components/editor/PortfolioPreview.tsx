import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Mail,
  Phone,
  Linkedin,
  X,
  Instagram,
  Dribbble,
  Globe,
} from "lucide-react";
import { usePortfolioStore } from "../../store/portfolioStore";
import { Button } from "../ui/Button";

// Custom SVG icons
const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7 8.8c-.4 1.3-.9 2.6-1.6 3.8-.7-1.2-1.2-2.5-1.6-3.8h-1.6v4.4c0 1.2-.8 2.1-2 2.1s-2-.9-2-2.1V8.8H2v4.4c0 2.2 1.6 4 3.9 4 1.6 0 2.9-.8 3.6-2 1 1.3 2.2 2.2 3.6 2.7l.5-1.4c-1.1-.4-2-.9-2.8-1.7.6-1 .9-2.1 1.3-3.2.3.7.8 1.3 1.4 1.8l.5-1.5c-.8-.6-1.2-1.3-1.7-2.3zM18.6 8c-1.8 0-3.3 1.6-3.3 3.6s1.5 3.6 3.3 3.6 3.3-1.6 3.3-3.6S20.4 8 18.6 8zm0 5.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 8.2h-5.7v-1h5.7v1zm-5.6 7.4c.7.5 1.7.7 2.9.7 1.4 0 2.4-.3 3.2-1 .7-.7 1.1-1.7 1.1-2.9h-4.3v1.1h2.9c-.1.6-.3 1.1-.7 1.4-.4.3-1 .5-1.7.5-.8 0-1.4-.2-1.8-.6-.4-.4-.7-1-.8-1.8h6.9c.1-1.1 0-2.1-.3-2.9-.3-.8-.8-1.4-1.4-1.8-.6-.4-1.4-.6-2.3-.6-1.4 0-2.4.3-3.2 1-.8.7-1.2 1.7-1.2 3 0 1.3.4 2.3 1.2 3zM10.7 9.8c0-.6-.2-1.1-.5-1.6-.3-.4-.8-.8-1.4-1-.6-.3-1.4-.4-2.3-.4H0v9.3h7.2c1 0 1.8-.1 2.5-.4.7-.3 1.2-.7 1.6-1.2.4-.5.5-1.1.5-1.7 0-.6-.2-1.1-.5-1.6-.3-.4-.8-.8-1.4-1-.1-.1-.2-.1-.3-.1.7-.3 1.1-.6 1.4-1.1.3-.4.4-.9.4-1.3zm-2.1 3.4c.4.3.6.7.6 1.2 0 .5-.2.9-.6 1.2-.4.3-.9.4-1.6.4H2.3v-3.1h4.7c.6 0 1.1.1 1.6.3zm-.2-4.4c.3.2.5.5.5 1 0 .5-.2.8-.5 1.1-.3.3-.9.4-1.6.4H2.3V8.1h4.5c.7 0 1.3.1 1.6.3z"/>
  </svg>
);

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

  const darkBgStyle =
    theme?.mode === "dark"
      ? { backgroundColor: `rgba(17, 24, 39, ${theme.dark_opacity || 0.9})` }
      : {};

  return (
    <div
      className={`flex-1 overflow-y-auto ${theme?.mode === "dark" ? "" : "bg-white"}`}
      style={{
        ...(theme?.mode === "dark" ? darkBgStyle : {}),
        fontFamily: theme?.font_family,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        {hero && (
          <section className="text-center py-10">
            {hero.avatar_url && (
              <img
                src={hero.avatar_url}
                alt={hero.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-4xl font-bold mb-2">
              Hi, I'm {hero.name || "Your Name"}.
            </h1>
            <p className="text-xl opacity-90">{hero.title || "Professional Title"}</p>

            {/* CTA Button: Only if both text and URL exist */}
            {hero?.cta_text && hero?.cta_url && (
              <motion.a
                href={hero.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 mt-4 rounded-lg shadow text-white hover:opacity-90 transition"
                style={{ backgroundColor: theme?.primary_color || "#2563eb" }}
                whileHover={{ scale: 1.05 }}
              >
                {hero.cta_text}
              </motion.a>
            )}
          </section>
        )}

        {/* About Section */}
        {(about?.bio || about?.mission) && (
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            {about.bio && <p className="opacity-90 mb-4">{about.bio}</p>}
            {about.mission && (
              <div>
                <h3 className="text-xl font-semibold mb-2">My Mission</h3>
                <p className="opacity-90">{about.mission}</p>
              </div>
            )}
          </section>
        )}

        {/* Skills Section */}
        {skills?.skills?.length > 0 && (
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Skills & Experience</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {skills.skills.map((skill: any) => (
                <div
                  key={skill.id}
                  className="flex justify-between items-center px-2 py-1 bg-gray-100 rounded-md shadow-sm text-sm"
                >
                  <span>{skill.name}</span>
                  <span className="text-gray-500 text-xs">{skill.experience || 0} yrs</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects?.projects?.length > 0 && (
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="opacity-90">{project.description}</p>
                    <div className="flex space-x-4 mt-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" /> Live
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600"
                        >
                          <Github className="w-4 h-4 mr-1" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {(contact?.email || contact?.phone || contact?.social_links?.length > 0) && (
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Contact</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {contact?.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center space-x-2 text-lg">
                  <Mail className="w-5 h-5" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact?.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center space-x-2 text-lg">
                  <Phone className="w-5 h-5" />
                  <span>{contact.phone}</span>
                </a>
              )}
            </div>

            {contact?.social_links?.length > 0 && (
              <div className="flex justify-center space-x-6 mt-4 flex-wrap gap-4">
                {contact.social_links.map((link: any, i: number) => {
                  const platform = link.platform.toLowerCase();
                  const iconMap: Record<string, JSX.Element> = {
                    linkedin: <Linkedin className="w-6 h-6 text-white rounded-lg bg-blue-600" strokeWidth={1}/>,
                    x: <X className="w- h-6 rounded-lg bg-black text-white rounded-halve" />,
                    github: <Github className="w-6 h-6 bg-gray-500 rounded-lg" />,
                    instagram: <Instagram className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4]" />,
                    dribbble: <Dribbble className="w-6 h-6 bg-[#EA4C89]" />,
                    behance: <BehanceIcon />,
                    upwork: <UpworkIcon />,
                  };
                  const Icon = iconMap[platform] || <Globe className="w-6 h-6" />;
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition"
                    >
                      {Icon}
                    </a>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="py-8 px-6 text-center border-t border-gray-200 text-gray-600">
          <p>&copy; 2025 {hero?.name || "Your Name"}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
