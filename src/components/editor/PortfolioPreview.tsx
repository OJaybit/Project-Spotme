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

// ✅ Custom Upwork SVG icon
const UpworkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.7 8.8c-.4 1.3-.9 2.6-1.6 3.8-.7-1.2-1.2-2.5-1.6-3.8h-1.6v4.4c0 1.2-.8 2.1-2 2.1s-2-.9-2-2.1V8.8H2v4.4c0 2.2 1.6 4 3.9 4 1.6 0 2.9-.8 3.6-2 1 1.3 2.2 2.2 3.6 2.7l.5-1.4c-1.1-.4-2-.9-2.8-1.7.6-1 .9-2.1 1.3-3.2.3.7.8 1.3 1.4 1.8l.5-1.5c-.8-.6-1.2-1.3-1.7-2.3zM18.6 8c-1.8 0-3.3 1.6-3.3 3.6s1.5 3.6 3.3 3.6 3.3-1.6 3.3-3.6S20.4 8 18.6 8zm0 5.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
  </svg>
);
const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
             1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184
             -.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917
             0 .39.045.765.127 1.124-4.087-.205-7.713-2.165-10.141-5.144
             -.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099
             -.807-.026-1.566-.248-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.827
             -.413.112-.849.171-1.296.171-.317 0-.626-.03-.927-.086
             .627 1.956 2.444 3.377 4.6 3.418-1.68 1.318-3.808 2.105-6.115 2.105
             -.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.212 7.557 2.212
             9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634
             .961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
  </svg>
);

export default XIcon;


const BehanceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.5 8.2h-5.7v-1h5.7v1zm-5.6 7.4c.7.5 1.7.7 2.9.7 1.4 0 2.4-.3 3.2-1 .7-.7 1.1-1.7 1.1-2.9h-4.3v1.1h2.9c-.1.6-.3 1.1-.7 1.4-.4.3-1 .5-1.7.5-.8 0-1.4-.2-1.8-.6-.4-.4-.7-1-.8-1.8h6.9c.1-1.1 0-2.1-.3-2.9-.3-.8-.8-1.4-1.4-1.8-.6-.4-1.4-.6-2.3-.6-1.4 0-2.4.3-3.2 1-.8.7-1.2 1.7-1.2 3 0 1.3.4 2.3 1.2 3zM10.7 9.8c0-.6-.2-1.1-.5-1.6-.3-.4-.8-.8-1.4-1-.6-.3-1.4-.4-2.3-.4H0v9.3h7.2c1 0 1.8-.1 2.5-.4.7-.3 1.2-.7 1.6-1.2.4-.5.5-1.1.5-1.7 0-.6-.2-1.1-.5-1.6-.3-.4-.8-.8-1.4-1-.1-.1-.2-.1-.3-.1.7-.3 1.1-.6 1.4-1.1.3-.4.4-.9.4-1.3zm-2.1 3.4c.4.3.6.7.6 1.2 0 .5-.2.9-.6 1.2-.4.3-.9.4-1.6.4H2.3v-3.1h4.7c.6 0 1.1.1 1.6.3zm-.2-4.4c.3.2.5.5.5 1 0 .5-.2.8-.5 1.1-.3.3-.9.4-1.6.4H2.3V8.1h4.5c.7 0 1.3.1 1.6.3z" />
  </svg>
);

interface PortfolioPreviewProps {
  data?: any;
  readonly?: boolean;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  data,
  readonly = false,
}) => {
  const { portfolio: storedPortfolio } = usePortfolioStore();
  const portfolio = readonly ? data : storedPortfolio;

  if (!portfolio) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">
            Start editing to see your portfolio preview
          </p>
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
      className={`flex-1 overflow-y-auto ${
        theme?.mode === "dark" ? "" : "bg-white"
      }`}
      style={{
        ...(theme?.mode === "dark" ? darkBgStyle : {}),
        fontFamily: theme?.font_family,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* ================= Hero Section ================= */}
        <section
          className={`py-20 px-6 text-center ${
            theme?.mode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
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
              Hi, I'm {hero?.name || "Your Name"}.
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              {hero?.title || "Your Professional Title"}
            </p>
            {hero?.cta_text && (
              <Button
                style={{ backgroundColor: theme?.primary_color }}
                className="text-white border-none"
              >
                {hero.cta_text}
              </Button>
            )}
          </motion.div>
        </section>

        {/* ================= About Section ================= */}
        {(about?.bio || about?.mission) && (
          <section
            className={`py-16 px-6 ${
              theme?.mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">About Me</h2>
              {about?.bio && (
                <p className="text-lg leading-relaxed mb-6 opacity-90">
                  {about.bio}
                </p>
              )}
              {about?.mission && (
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-3">My Mission</h3>
                  <p className="text-lg opacity-90 leading-relaxed">
                    {about.mission}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= Skills Section ================= */}
        {skills?.skills?.length > 0 && (
          <section
            className={`py-16 px-6 ${
              theme?.mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Skills & Tools</h2>

              <div className="space-y-10 text-left">
                {[
                  "Frontend",
                  "Backend",
                  "Database",
                  "DevOps",
                  "Design",
                  "Mobile",
                  "Other",
                ].map((category) => {
                  const categorySkills = skills.skills.filter(
                    (skill: any) => skill.category === category
                  );
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
                        {category}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {categorySkills.map((skill: any, index: number) => (
                          <span
                            key={index}
                            className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                              theme?.mode === "dark"
                                ? "bg-gray-800 text-gray-200"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ================= Projects Section ================= */}
        {projects?.projects?.length > 0 && (
          <section
            className={`py-16 px-6 ${
              theme?.mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
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
                    style={
                      theme?.mode === "dark"
                        ? {
                            backgroundColor: `rgba(31, 41, 55, ${
                              (theme.dark_opacity || 0.9) * 0.8
                            })`,
                          }
                        : {}
                    }
                  >
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">
                        {project.title}
                      </h3>
                      <p className="opacity-90 mb-4">{project.description}</p>
                      <div className="flex space-x-4">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-500"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" /> Live
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-600 hover:text-gray-500"
                          >
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

        {/* ================= Contact Section ================= */}
        {(contact?.email ||
          contact?.phone ||
          contact?.social_links?.length > 0) && (
          <section
            className={`py-16 px-6 ${
              theme?.mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Contact</h2>

              {/* Email / Phone */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center space-x-2 text-lg"
                    style={{ color: theme?.primary_color }}
                  >
                    <Mail className="w-5 h-5" /> <span>{contact.email}</span>
                  </a>
                )}
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center space-x-2 text-lg"
                    style={{ color: theme?.primary_color }}
                  >
                    <Phone className="w-5 h-5" /> <span>{contact.phone}</span>
                  </a>
                )}
              </div>

              {/* Social Links */}
              {contact?.social_links?.length > 0 && (
                <div className="flex justify-center space-x-6 mt-6 flex-wrap gap-4">
                  {contact.social_links.map((link: any, i: number) => {
                    const platform = link.platform.toLowerCase();

                   const iconMap: Record<string, JSX.Element> = {
  linkedin: <Linkedin className="w-6 h-6" />,
  X: <X className="w-6 h-6" />,
  github: <Github className="w-6 h-6" />,
  instagram: <Instagram className="w-6 h-6" />,
  dribbble: <Dribbble className="w-6 h-6" />,
  behance: <BehanceIcon />, 
  upwork: <UpworkIcon />,
};

                    const Icon = iconMap[platform] || (
                      <Globe className="w-6 h-6" />
                    );

                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition"
                        style={{ color: theme?.secondary_color }}
                      >
                        {Icon}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= Footer ================= */}
        <footer
          className={`py-8 px-6 text-center border-t ${
            theme?.mode === "dark"
              ? "border-gray-800 text-gray-400"
              : "border-gray-200 text-gray-600"
          }`}
        >
          <p>&copy; 2025 {hero?.name || "Your Name"}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
