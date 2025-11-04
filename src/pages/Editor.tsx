import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { EditorSidebar } from '../components/editor/EditorSidebar'
import { HeroEditor } from '../components/editor/sections/HeroEditor'
import { AboutEditor } from '../components/editor/sections/AboutEditor'
import { SkillsEditor } from '../components/editor/sections/SkillsEditor'
import { ProjectsEditor } from '../components/editor/sections/ProjectsEditor'
import { ContactEditor } from '../components/editor/sections/ContactEditor'
import { ThemeEditor } from '../components/editor/sections/ThemeEditor'
import { PortfolioPreview } from '../components/editor/PortfolioPreview'
import { usePortfolioStore } from '../store/portfolioStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

// Correct imports — only these
import { supabase } from '../lib/supabase'
import slugify from '../lib/slugify'
import { v4 as uuidv4 } from 'uuid'

export const Editor: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const { portfolio, setPortfolio } = usePortfolioStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    if (!portfolio) {
      const defaultPortfolio = {
        id: '1',
user_id: user?.id && user.id.length === 36 ? user.id : uuidv4(),
        username: user.username || 'user',
        hero: {
          name: '',
          title: '',
          avatar_url: '',
          cta_text: 'See my work',
          cta_url: ''
        },
        about: { bio: '', mission: '' },
        skills: { skills: [] },
        projects: { projects: [] },
        contact: {
          email: user.email,
          phone: '',
          social_links: [],
          show_contact_form: true
        },
        theme: {
          mode: 'light' as const,
          dark_opacity: 0.9,
          primary_color: '#3B82F6',
          secondary_color: '#10B981',
          accent_color: '#F97316',
          font_family: 'Inter, sans-serif'
        },
        is_published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setPortfolio(defaultPortfolio)
    }
  }, [portfolio, user, setPortfolio, navigate])

  const handleSave = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Portfolio saved successfully!')
    } catch (error) {
      toast.error('Failed to save portfolio')
    }
  }

  const handlePublish = async () => {
    if (!user || !portfolio) return toast.error('User not logged in')

    const base = user?.username
      ? slugify(user.username)
      : slugify(portfolio.hero?.name || 'portfolio')
    const candidate = base || `p-${uuidv4().slice(0, 8)}`

   const { data, error } = await supabase
  .from('portfolios')
  .upsert([
    {
      user_id: user?.id && user.id.length === 36 ? user.id : uuidv4(),
      title: portfolio.hero?.title || 'My Portfolio',
      content: portfolio, // no need to stringify; Supabase handles jsonb
      slug: candidate,
      published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ])
  .select('slug')
  .single()


    if (error) {
  console.error('Supabase error:', error.message, error.details)
  toast.error('Failed to publish portfolio')
}
 else {
      setPortfolio({ ...portfolio, is_published: true })
      toast.success('Portfolio published successfully!')
      toast.success(`Your portfolio is live at ${window.location.origin}/p/${data.slug}`)
    }
  }

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroEditor />
      case 'about':
        return <AboutEditor />
      case 'skills':
        return <SkillsEditor />
      case 'projects':
        return <ProjectsEditor />
      case 'contact':
        return <ContactEditor />
      case 'theme':
        return <ThemeEditor />
      default:
        return <HeroEditor />
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      <EditorSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSave={handleSave}
        onPublish={handlePublish}
        isPublished={portfolio?.is_published || false}
      />

      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderEditor()}
          </motion.div>
        </div>
      </div>

      <PortfolioPreview />
    </div>
  )
}
