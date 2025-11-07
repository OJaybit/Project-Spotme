import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { PortfolioPreview } from '../components/editor/PortfolioPreview'

export const PortfolioViewer = () => {
  const { slug } = useParams()
  const [portfolio, setPortfolio] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolios')
        .select('content, user_id')
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Error fetching portfolio:', error)
        setLoading(false)
        return
      }

      if (data?.user_id) {
        const { data: userData } = await supabase
          .from('users')
          .select('username')
          .eq('id', data.user_id)
          .single()

        if (userData?.username) {
          document.title = `${userData.username}'s Portfolio`
        } else {
          document.title = `Portfolio | ${slug}`
        }
      } else {
        document.title = `Portfolio | ${slug}`
      }

      setPortfolio(data?.content)
      setLoading(false)
    }

    fetchPortfolio()
  }, [slug])

  if (loading) return <div className="p-10 text-center">Loading portfolio...</div>
  if (!portfolio) return <div className="p-10 text-center">Portfolio not found</div>

  return <PortfolioPreview data={portfolio} readonly />
}
