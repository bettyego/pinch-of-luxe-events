import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import EmailButton from '../../components/ui/EmailButton'

export const Layout = () => {
  return (
    <div>
        <Header />

        <div>
            <Outlet />
        </div>

        <div>
            <Footer />
        </div>

        {/* Email Integration */}
        <EmailButton />

    </div>
  )
}
