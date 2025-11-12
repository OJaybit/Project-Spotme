import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { usePortfolioStore } from '../../../store/portfolioStore';

const socialPlatforms = [
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'Upwork', icon: 'upwork' },
  { name: 'GitHub', icon: 'github' },
  { name: 'X', icon: 'x' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Dribbble', icon: 'dribbble' },
  { name: 'Behance', icon: 'behance' },
];


export const ContactEditor: React.FC = () => {
  const { portfolio, updateContact } = usePortfolioStore();
  const contact = portfolio?.contact;
  const [newSocial, setNewSocial] = useState({ platform: 'LinkedIn', url: '', icon: 'linkedin' });

 const addSocialLink = () => {
  if (newSocial.url.trim()) {
    const platform = newSocial.platform.toLowerCase();
    const updatedLinks = [...(contact?.social_links || []), {
      ...newSocial,
      platform,
      icon: platform
    }];
    updateContact({ social_links: updatedLinks });
    setNewSocial({ platform: 'linkedin', url: '', icon: 'linkedin' });
  }
};


  const removeSocialLink = (index: number) => {
    const updatedLinks = contact?.social_links?.filter((_, i) => i !== index) || [];
    updateContact({ social_links: updatedLinks });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const updatedLinks = contact?.social_links?.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ) || [];
    updateContact({ social_links: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={contact?.email || ''}
            onChange={(e) => updateContact({ email: e.target.value })}
          />

          <Input
            label="Phone Number (optional)"
            placeholder="+1 (555) 123-4567"
            value={contact?.phone || ''}
            onChange={(e) => updateContact({ phone: e.target.value })}
          />
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-contact-form"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={contact?.show_contact_form || false}
              onChange={(e) => updateContact({ show_contact_form: e.target.checked })}
            />
            <label htmlFor="show-contact-form" className="ml-2 text-sm text-gray-700">
              Show contact form on portfolio
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Social Links</h4>
        
        {/* Add New Social Link */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h5 className="font-medium text-gray-900 mb-3">Add Social Link</h5>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSocial.platform}
              onChange={(e) => {
                const platform = socialPlatforms.find(p => p.name === e.target.value);
                setNewSocial({ 
                  ...newSocial, 
                  platform: e.target.value,
                  icon: platform?.icon || 'link'
                });
              }}
            >
              {socialPlatforms.map(platform => (
                <option key={platform.name} value={platform.name}>{platform.name}</option>
              ))}
            </select>
            <Input
              placeholder="Profile URL"
              value={newSocial.url}
              onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
            />
          </div>
          <Button onClick={addSocialLink} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>

        {/* Social Links List */}
        <div className="space-y-3">
          {contact?.social_links?.map((link, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={link.platform}
                  onChange={(e) => {
                    const platform = socialPlatforms.find(p => p.name === e.target.value);
                    updateSocialLink(index, 'platform', e.target.value);
                    updateSocialLink(index, 'icon', platform?.icon || 'link');
                  }}
                >
                  {socialPlatforms.map(platform => (
                    <option key={platform.name} value={platform.name}>{platform.name}</option>
                  ))}
                </select>
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="Profile URL"
                />
              </div>
              <button
                onClick={() => removeSocialLink(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )) || []}
          
          {(!contact?.social_links || contact.social_links.length === 0) && (
            <div className="text-center py-4 text-gray-500">
              No social links added yet. Add your first link above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};