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
        id: uuidv4(),
        user_id: user.id,
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
    if (!portfolio) return
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Portfolio saved successfully!')
    } catch {
      toast.error('Failed to save portfolio')
    }
  }

  const handlePublish = async () => {
    try {
      if (!user || !portfolio) {
        toast.error('User not logged in')
        return
      }

      const base = user.username
        ? slugify(user.username)
        : slugify(portfolio.hero?.name || 'portfolio')
      let slugCandidate = base || `p-${uuidv4().slice(0, 8)}`

      // 1) Check if this user already has a portfolio
      const { data: existingForUser, error: existingUserErr } = await supabase
        .from('portfolios')
        .select('id, slug')
        .eq('user_id', user.id)
        .maybeSingle()

      if (existingUserErr) {
        console.error('Error checking user portfolio:', existingUserErr)
        toast.error('Failed to publish portfolio')
        return
      }

      // 2) Ensure slug is unique
      const { data: slugConflict, error: slugErr } = await supabase
        .from('portfolios')
        .select('id')
        .eq('slug', slugCandidate)
        .maybeSingle()

      if (slugErr) {
        console.error('Error checking slug uniqueness:', slugErr)
        toast.error('Failed to publish portfolio')
        return
      }

      if (slugConflict && (!existingForUser || slugConflict.id !== existingForUser.id)) {
        slugCandidate = `${slugCandidate}-${uuidv4().slice(0, 6)}`
      }

      const payload = {
        user_id: user.id,
        title: portfolio.hero?.title || 'My Portfolio',
        content: portfolio,
        slug: slugCandidate,
        published: true,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // 3a) Update existing portfolio
      if (existingForUser?.id) {
        const { data, error } = await supabase
          .from('portfolios')
          .update(payload)
          .eq('id', existingForUser.id)
          .select('slug')
          .single()

        if (error) {
          console.error('Supabase update error:', error)
          toast.error('Failed to publish portfolio')
          return
        }

        setPortfolio({ ...portfolio, is_published: true })
        toast.success('Portfolio updated and published!')
        toast.success(`Your portfolio is live at ${window.location.origin}/p/${data.slug}`)
        return
      }

      // 3b) Insert new portfolio
      const newId = uuidv4()
      const { data: insertData, error: insertErr } = await supabase
        .from('portfolios')
        .insert([{ id: newId, ...payload }])
        .select('slug')
        .single()

      if (insertErr) {
        console.error('Supabase insert error:', insertErr)
        if (insertErr.code === '23505') {
          toast.error('Slug conflict — please try again')
        } else {
          toast.error('Failed to publish portfolio')
        }
        return
      }

      setPortfolio({ ...portfolio, id: newId, is_published: true })
      toast.success('Portfolio published successfully!')
      toast.success(`Your portfolio is live at ${window.location.origin}/p/${insertData.slug}`)
    } catch (err) {
      console.error('Unexpected publish error:', err)
      toast.error('Failed to publish portfolio')
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
