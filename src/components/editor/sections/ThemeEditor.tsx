import React from 'react';
import { usePortfolioStore } from '../../../store/portfolioStore';

const colorOptions = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Indigo', value: '#6366F1' },
];

const fontOptions = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
];

export const ThemeEditor: React.FC = () => {
  const { portfolio, updateTheme } = usePortfolioStore();
  const theme = portfolio?.theme;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Customization</h3>
        
        <div className="space-y-6">
          {/* Theme Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme Mode</label>
            <div className="space-y-4">
              <div className="flex space-x-4">
              <button
                onClick={() => updateTheme({ mode: 'light' })}
                className={`flex-1 p-4 border-2 rounded-lg text-center transition-colors ${
                  theme?.mode === 'light'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-white border border-gray-300 rounded mx-auto mb-2"></div>
                Light Mode
              </button>
              <button
                onClick={() => updateTheme({ mode: 'dark' })}
                className={`flex-1 p-4 border-2 rounded-lg text-center transition-colors ${
                  theme?.mode === 'dark'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-800 border border-gray-600 rounded mx-auto mb-2"></div>
                Dark Mode
              </button>
            </div>
              
              {/* Dark Mode Intensity */}
              {theme?.mode === 'dark' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dark Mode Intensity: {Math.round((theme?.dark_opacity || 0.9) * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.3"
                    max="1"
                    step="0.1"
                    value={theme?.dark_opacity || 0.9}
                    onChange={(e) => updateTheme({ dark_opacity: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Primary Color</label>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateTheme({ primary_color: color.value })}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    theme?.primary_color === color.value
                      ? 'border-gray-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded mx-auto mb-2"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Secondary Color</label>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateTheme({ secondary_color: color.value })}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    theme?.secondary_color === color.value
                      ? 'border-gray-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded mx-auto mb-2"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Accent Color</label>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateTheme({ accent_color: color.value })}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    theme?.accent_color === color.value
                      ? 'border-gray-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded mx-auto mb-2"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Font Family</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={theme?.font_family || 'Inter, sans-serif'}
              onChange={(e) => updateTheme({ font_family: e.target.value })}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};