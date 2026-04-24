import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import EmailButton from '../../components/ui/EmailButton'
import InstagramButton from '../../components/ui/InstagramButton'

export const Layout = () => {
  const location = useLocation()
  const [headerHeight, setHeaderHeight] = useState(0)

  // The Home page uses a full-screen hero that is designed to sit behind the
  // transparent fixed header, so we skip the top offset only on that route.
  const isHome = location.pathname === '/'

  useLayoutEffect(() => {
    const header = document.querySelector('header')
    if (!header) return

    const update = () => setHeaderHeight(header.offsetHeight)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(header)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  // Re-measure after route changes (fonts/layout may shift header height)
  useEffect(() => {
    const header = document.querySelector('header')
    if (header) setHeaderHeight(header.offsetHeight)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className={`flex-1 ${isHome ? '' : 'pt-20 md:pt-24'}`}
        style={isHome ? undefined : { paddingTop: headerHeight || undefined }}
      >
        <Outlet />
      </main>

      <Footer />

      {/* Communication Buttons */}
      <EmailButton />
      <InstagramButton />
    </div>
  )
}
