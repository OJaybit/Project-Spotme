import React from 'react';
import { usePortfolioStore } from '../../../store/portfolioStore';

export const AboutEditor: React.FC = () => {
  const { portfolio, updateAbout } = usePortfolioStore();
  const about = portfolio?.about;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="I'm a frontend developer specialized in building exceptional digital experiences. I enjoy working with modern technologies to create responsive and performant web applications..."
              value={about?.bio || ''}
              onChange={(e) => updateAbout({ bio: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mission Statement (optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="To create digital experiences that make a positive impact..."
              value={about?.mission || ''}
              onChange={(e) => updateAbout({ mission: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};