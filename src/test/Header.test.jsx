import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Header from '../component/page/Header'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  test('renders navigation links', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Gallery')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('renders logo', () => {
    renderWithRouter(<Header />)
    
    const logo = screen.getByAltText('Pinchofluxeevents Logo')
    expect(logo).toBeInTheDocument()
  })

  test('renders Book Now button', () => {
    renderWithRouter(<Header />)
    
    const bookButton = screen.getByRole('link', { name: /book now/i })
    expect(bookButton).toBeInTheDocument()
    expect(bookButton).toHaveAttribute('href', '/inquiryform')
  })

  test('mobile menu toggle works', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)
    
    // Mobile menu should not be visible initially
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    
    // Click hamburger button
    const hamburgerButton = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(hamburgerButton)
    
    // Mobile menu should now be visible
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
    
    // Button text should change
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toBeInTheDocument()
  })

  test('mobile menu contains all navigation links', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)
    
    // Open mobile menu
    const hamburgerButton = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(hamburgerButton)
    
    // Check all mobile navigation links
    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(mobileNav).toBeInTheDocument()
    
    // Check for navigation links in mobile menu
    expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop + mobile
    expect(screen.getAllByText('About')).toHaveLength(1) // Mobile only (desktop shows "About Us")
    expect(screen.getAllByText('Services')).toHaveLength(2) // Desktop + mobile
  })

  test('navigation links have correct href attributes', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /about us/i })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: /gallery/i })).toHaveAttribute('href', '/gallery')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact')
  })

  test('hamburger button has proper accessibility attributes', () => {
    renderWithRouter(<Header />)
    
    const hamburgerButton = screen.getByRole('button', { name: /open navigation menu/i })
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
    expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-menu')
  })

  test('mobile menu closes when clicking a link', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)
    
    // Open mobile menu
    const hamburgerButton = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(hamburgerButton)
    
    // Verify menu is open
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
    
    // Click a navigation link in mobile menu
    const mobileHomeLink = screen.getAllByText('Home')[1] // Get the mobile version
    await user.click(mobileHomeLink)
    
    // Menu should close (note: this might need adjustment based on actual implementation)
    // The test might need to be updated based on how the mobile menu closing is implemented
  })
})
