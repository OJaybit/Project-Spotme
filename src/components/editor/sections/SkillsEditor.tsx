import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { usePortfolioStore } from '../../../store/portfolioStore';

const skillCategories = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Design',
  'Mobile',
  'Other'
];

export const SkillsEditor: React.FC = () => {
  const { portfolio, updateSkills } = usePortfolioStore();
  const skills = portfolio?.skills?.skills || [];
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', icon: '' });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const updatedSkills = [...skills, { ...newSkill, id: Date.now().toString() }];
      updateSkills({ skills: updatedSkills });
      setNewSkill({ name: '', category: 'Frontend', icon: '' });
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateSkills({ skills: updatedSkills });
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updatedSkills = skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    updateSkills({ skills: updatedSkills });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Tools</h3>
        
        {/* Add New Skill */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Add New Skill</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Input
              placeholder="Skill name (e.g., React)"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            >
              {skillCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <Button onClick={addSkill} size="sm">
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
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  placeholder="Skill name"
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={skill.category}
                  onChange={(e) => updateSkill(index, 'category', e.target.value)}
                >
                  {skillCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
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
    </div>
  );
};