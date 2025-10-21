import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Use native scroll restoration
    if ('scrollRestoration' in window.history) {
      try { window.history.scrollRestoration = 'manual' } catch {}
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}

export default ScrollToTop


