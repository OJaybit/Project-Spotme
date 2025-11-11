import React, { useState, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { usePortfolioStore } from '../../../store/portfolioStore';

const allSkills = [
  // Frontend Frameworks & Libraries
  "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Remix", "Ember.js", "Backbone.js", "Meteor.js",
  "Preact", "Alpine.js", "Solid.js", "Stencil", "Lit", "Hyperapp", "Riot.js", "Mithril", "Dojo", "Inferno",
  
  // Backend Frameworks & Libraries
  "Node.js", "Express", "NestJS", "Koa.js", "Hapi.js", "Fastify", "Django", "Flask", "FastAPI", "Spring Boot",
  "Ruby on Rails", "Laravel", "Symfony", "Phoenix", "ASP.NET Core", "Gin", "Echo", "Fiber", "Play Framework", "Micronaut",
  
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "C", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin",
  "Scala", "Elixir", "Haskell", "Perl", "Lua", "R", "Dart", "Objective-C", "Shell", "Bash", "PowerShell",
  
  // Web Technologies & Tools
  "HTML", "CSS", "Tailwind", "Sass", "Less", "Stylus", "Bootstrap", "Material-UI", "Chakra UI", "Ant Design",
  "Bulma", "Foundation", "Semantic UI", "UIKit", "Vanilla JS", "jQuery", "Three.js", "D3.js", "Chart.js", "GSAP",
  "Webpack", "Vite", "Parcel", "Rollup", "Babel", "ESLint", "Prettier", "Storybook", "Bit", "Nx", "Turborepo", "Lerna",

  // Mobile & Cross-platform
  "React Native", "Flutter", "Ionic", "Xamarin", "SwiftUI", "Jetpack Compose", "Cordova", "NativeScript", "Kotlin Multiplatform",
  "Unity", "Godot", "Cocos2d-x", "ARKit", "ARCore", "VR Development", "Mixed Reality", "HoloLens",

  // Databases
  "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Cassandra", "MariaDB", "SQLite", "Oracle DB", "Microsoft SQL Server",
  "DynamoDB", "Neo4j", "ElasticSearch", "InfluxDB", "CockroachDB", "ArangoDB", "Realm", "Supabase",

  // DevOps & Cloud
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform", "Ansible", "Chef", "Puppet", "Jenkins", "GitHub Actions",
  "GitLab CI", "CircleCI", "Travis CI", "Vercel", "Netlify", "Heroku", "DigitalOcean", "Linode", "OpenShift", "CI/CD",

  // Testing
  "Jest", "Mocha", "Chai", "Cypress", "Playwright", "Puppeteer", "React Testing Library", "Enzyme", "Selenium", "Jasmine",
  "JUnit", "PyTest", "RSpec", "TestNG", "Unit Testing", "Integration Testing", "End-to-End Testing", "Load Testing",

  // Version Control & Collaboration
  "Git", "GitHub", "GitLab", "Bitbucket", "SourceTree", "SVN", "Mercurial", "Notion", "Trello", "Asana", "ClickUp", "Miro", "Slack", "Microsoft Teams",

  // Graphic Design / UI/UX / Motion
  "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "InDesign", "Canva", "Blender", "After Effects", "Premiere Pro",
  "Cinema 4D", "Maya", "CorelDRAW", "Procreate", "UI Design", "UX Design", "Interaction Design", "Wireframing", "Prototyping",
  "Motion Graphics", "Animation", "Typography", "Color Theory", "Brand Identity", "Illustration", "Photography", "Infographic Design",

  // AI Tools / Generative AI / ML
  "ChatGPT", "GPT-4", "Claude AI", "Bard AI", "LLaMA", "Mistral AI", "MPT", "Anthropic AI", "MidJourney", "Stable Diffusion",
  "DALL·E", "Runway ML", "OpenAI API", "Hugging Face Transformers", "AI Image Generation", "Text-to-Image AI", "AI Video Generation",
  "AI Music Generation", "AI Copywriting", "AI Code Generation", "Prompt Engineering", "Generative AI Workflows", "Voice Cloning AI",
  "Text-to-Speech AI", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Pandas", "NumPy",
  "Matplotlib", "Seaborn", "Plotly", "Tableau", "Power BI", "ML Ops",

  // Cybersecurity / Blockchain
  "Penetration Testing", "Network Security", "Ethical Hacking", "Cryptography", "Blockchain Development", "Solidity", "Web3.js", "Ethers.js",
  "NFT Development", "Smart Contracts", "DeFi", "Metaverse Development",

  // Automation / Scripting
  "RPA", "Python Automation", "Bash Scripting", "PowerShell Scripting", "Excel Automation", "Zapier", "Make (Integromat)", "IFTTT", "Automation Workflows",

  // Cloud Architecture / Edge / CDN
  "Serverless Architecture", "Edge Computing", "CDN Management", "Cloud Design Patterns",

  // 3D & AR/VR Tools
  "Augmented Reality SDKs", "ARKit", "ARCore", "Mixed Reality", "HoloLens Development", "3D Modeling", "3D Animation", "3D Rendering", "VR Design",

  // Other Miscellaneous Tools
  "Content Writing", "Copywriting", "SEO", "Social Media Management", "Marketing Automation", "Email Marketing", "Google Analytics",
  "Data Analysis", "Growth Hacking", "Content Strategy", "Blog Writing", "Technical Writing", "Scriptwriting", "Brand Storytelling",
  "Video Editing", "Final Cut Pro", "DaVinci Resolve", "Motion Capture", "Stop Motion", "Visual Effects (VFX)"
];

const yearsOfExperience = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+'];

export const SkillsEditor: React.FC = () => {
  const { portfolio, updateSkills } = usePortfolioStore();
  const skills = portfolio?.skills?.skills || [];
  const [newSkill, setNewSkill] = useState({ name: '', experience: '0-1', icon: '' });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addSkill = (skillName?: string) => {
    const nameToAdd = skillName || newSkill.name.trim();
    if (!nameToAdd) return;

    const updatedSkills = [
      ...skills,
      { ...newSkill, name: nameToAdd, id: Date.now().toString() }
    ];
    updateSkills({ skills: updatedSkills });
    setNewSkill({ name: '', experience: '0-1', icon: '' });
    setSuggestions([]);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateSkills({ skills: updatedSkills });
  };

  const handleInputChange = (value: string) => {
    setNewSkill({ ...newSkill, name: value });
    if (!value.trim()) return setSuggestions([]);

    const filtered = allSkills.filter(
      skill =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    );
   setSuggestions(filtered);
  };

  return (
    <div className="space-y-6" ref={wrapperRef}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Experience</h3>

      {/* Add New Skill */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 relative">
        <h4 className="font-medium text-gray-900 mb-3">Add New Skill</h4>
        <div className="grid grid-cols-2 gap-3 mb-3 relative">
          <Input
            placeholder="Skill name (e.g., React)"
            value={newSkill.name}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addSkill(); }}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newSkill.experience}
            onChange={(e) => setNewSkill({ ...newSkill, experience: e.target.value })}
          >
            {yearsOfExperience.map(year => (
              <option key={year} value={year}>{year} years</option>
            ))}
          </select>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-14 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {suggestions.map(s => (
                <li
                  key={s}
                  onClick={() => addSkill(s)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button onClick={() => addSkill()} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <Input
                value={skill.name}
                onChange={(e) => {
                  const updatedSkills = skills.map((s, i) =>
                    i === index ? { ...s, name: e.target.value } : s
                  );
                  updateSkills({ skills: updatedSkills });
                }}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={skill.experience}
                onChange={(e) => {
                  const updatedSkills = skills.map((s, i) =>
                    i === index ? { ...s, experience: e.target.value } : s
                  );
                  updateSkills({ skills: updatedSkills });
                }}
              >
                {yearsOfExperience.map(year => (
                  <option key={year} value={year}>{year} years</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => removeSkill(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No skills added yet. Add your first skill above.
          </div>
        )}
      </div>
    </div>
  );
};
