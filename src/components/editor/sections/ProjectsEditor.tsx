import React, { useState, useRef } from 'react';
import { Plus, X, ExternalLink, Github, Image, Video } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { Project } from '../../../types';
import { uploadFile, getPublicUrl } from '../../../lib/supabase';
import toast from 'react-hot-toast';

export const ProjectsEditor: React.FC = () => {
  const { portfolio, updateProjects } = usePortfolioStore();
  const projects = portfolio?.projects?.projects || [];
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // Add new project
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image_url: '',
      video_url: '',
      media_type: 'image',
      live_url: '',
      github_url: '',
      tech_stack: [],
    };
    setEditingProject(newProject);
    setShowAddForm(true);
  };

  // Save project to store
  const saveProject = () => {
    if (!editingProject) return;

    const existingIndex = projects.findIndex(p => p.id === editingProject.id);
    const updatedProjects =
      existingIndex >= 0
        ? projects.map(p => (p.id === editingProject.id ? editingProject : p))
        : [...projects, editingProject];

    updateProjects({ projects: updatedProjects });
    setEditingProject(null);
    setShowAddForm(false);
  };

  // Delete project
  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    updateProjects({ projects: updatedProjects });
  };

  // Handle media uploads (image/video)
  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video'
  ) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    try {
      toast.loading(`Uploading ${type}...`);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      await uploadFile('portfolios', filePath, file);
      const publicUrl = getPublicUrl('portfolios', filePath);

      setEditingProject(prev => {
        if (!prev) return prev;
        if (type === 'image') {
          return { ...prev, image_url: publicUrl, media_type: prev.video_url ? 'both' : 'image' };
        } else {
          return { ...prev, video_url: publicUrl, media_type: prev.image_url ? 'both' : 'video' };
        }
      });

      toast.dismiss();
      toast.success(`${type} uploaded successfully!`);
    } catch (err) {
      toast.dismiss();
      toast.error(`Failed to upload ${type}`);
      console.error(err);
    }
  };

  // Add/remove tech stack
  const addTechStack = (tech: string) => {
    if (editingProject && tech.trim() && !editingProject.tech_stack.includes(tech.trim())) {
      setEditingProject(prev => prev ? { ...prev, tech_stack: [...prev.tech_stack, tech.trim()] } : prev);
    }
  };
  const removeTechStack = (tech: string) => {
    if (editingProject) {
      setEditingProject(prev => prev ? { ...prev, tech_stack: prev.tech_stack.filter(t => t !== tech) } : prev);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Project Form */}
      {(showAddForm || editingProject) && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-4">
            {editingProject?.id && projects.find(p => p.id === editingProject.id)
              ? 'Edit Project'
              : 'Add New Project'}
          </h4>

          <div className="space-y-4">
            {/* Title */}
            <Input
              label="Project Title"
              placeholder="My Awesome Project"
              value={editingProject?.title || ''}
              onChange={e => setEditingProject(prev => prev ? { ...prev, title: e.target.value } : null)}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="A brief description of your project..."
                value={editingProject?.description || ''}
                onChange={e =>
                  setEditingProject(prev => prev ? { ...prev, description: e.target.value } : null)
                }
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Project Media</label>

              {/* Image */}
              <div className="flex items-center gap-4">
                {editingProject?.image_url ? (
                  <div className="relative">
                    <img src={editingProject.image_url} alt="Project" className="w-20 h-20 rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditingProject(prev => prev ? { ...prev, image_url: '', media_type: prev.video_url ? 'video' : undefined } : null)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <input ref={imageInputRef} type="file" accept="image/*" onChange={e => handleMediaUpload(e, 'image')} className="hidden" />
                <Button variant="outline" size="sm" onClick={() => imageInputRef.current?.click()}>
                  <Image className="w-4 h-4 mr-2" /> Upload Image
                </Button>
              </div>

              {/* Video */}
              <div className="flex items-center gap-4">
                {editingProject?.video_url ? (
                  <div className="relative">
                    <video src={editingProject.video_url} className="w-20 h-20 rounded-lg object-cover" muted />
                    <button
                      type="button"
                      onClick={() => setEditingProject(prev => prev ? { ...prev, video_url: '', media_type: prev.image_url ? 'image' : undefined } : null)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <input ref={videoInputRef} type="file" accept="video/*" onChange={e => handleMediaUpload(e, 'video')} className="hidden" />
                <Button variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
                  <Video className="w-4 h-4 mr-2" /> Upload Video
                </Button>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Live URL"
                placeholder="https://myproject.com"
                value={editingProject?.live_url || ''}
                onChange={e => setEditingProject(prev => prev ? { ...prev, live_url: e.target.value } : null)}
              />
              <Input
                label="GitHub URL"
                placeholder="https://github.com/user/repo"
                value={editingProject?.github_url || ''}
                onChange={e => setEditingProject(prev => prev ? { ...prev, github_url: e.target.value } : null)}
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editingProject?.tech_stack.map((tech, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {tech}
                    <button onClick={() => removeTechStack(tech)} className="ml-2 text-blue-600 hover:text-blue-800">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Add technology (press Enter)"
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechStack((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button onClick={saveProject}>Save Project</Button>
              <Button variant="outline" onClick={() => { setEditingProject(null); setShowAddForm(false); }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Project List */}
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4 flex-1">
                {(project.image_url || project.video_url) && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    {project.media_type === 'video' && project.video_url ? (
                      <video src={project.video_url} className="w-full h-full object-cover" muted />
                    ) : (
                      project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{project.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tech_stack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-3 mt-2">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 text-sm flex items-center">
                        <ExternalLink className="w-3 h-3 mr-1" /> Live
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-500 text-sm flex items-center">
                        <Github className="w-3 h-3 mr-1" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => setEditingProject(project)} className="text-blue-600 hover:text-blue-500 text-sm">Edit</button>
                <button onClick={() => deleteProject(project.id)} className="text-red-600 hover:text-red-500 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && !showAddForm && <div className="text-center py-8 text-gray-500">No projects added yet. Click "Add Project" to get started.</div>}
      </div>
    </div>
  );
};
