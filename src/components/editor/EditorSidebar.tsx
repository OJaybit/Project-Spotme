import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Code, 
  FolderOpen, 
  Mail, 
  Palette, 
  Eye,
  Save,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';

interface EditorSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSave: () => void;
  onPublish: () => void;
  isPublished: boolean;
}

const sections = [
  { id: 'hero', label: 'Personal Info', icon: User },
  { id: 'about', label: 'About Me', icon: Briefcase },
  { id: 'skills', label: 'Skills & Tools', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'theme', label: 'Theme', icon: Palette },
];

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeSection,
  onSectionChange,
  onSave,
  onPublish,
  isPublished
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Editor</h2>
        <div className="space-y-2">
          <Button onClick={onSave} variant="outline" size="sm" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button 
            onClick={onPublish} 
            variant={isPublished ? "secondary" : "primary"} 
            size="sm" 
            className="w-full"
          >
            <Globe className="w-4 h-4 mr-2" />
            {isPublished ? 'Update Live' : 'Publish'}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <section.icon className="w-4 h-4 mr-3" />
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Preview Mode</div>
        <div className="flex space-x-1">
          <button className="flex-1 p-2 text-xs bg-blue-50 text-blue-700 rounded">Desktop</button>
          <button className="flex-1 p-2 text-xs text-gray-600 hover:bg-gray-50 rounded">Tablet</button>
          <button className="flex-1 p-2 text-xs text-gray-600 hover:bg-gray-50 rounded">Mobile</button>
        </div>
      </div>
    </div>
  );
};