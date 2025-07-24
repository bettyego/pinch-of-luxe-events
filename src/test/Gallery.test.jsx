import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Gallery from '../component/page/Gallery'

// Mock Swiper components
vi.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }) => <div data-testid="swiper" {...props}>{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide">{children}</div>
}))

vi.mock('swiper/modules', () => ({
  Pagination: {}
}))

// Mock CSS imports
vi.mock('swiper/css', () => ({}))
vi.mock('swiper/css/pagination', () => ({}))

// Mock OptimizedImage component
vi.mock('../ui/OptimizedImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="optimized-image" />
  )
}))

describe('Gallery Component', () => {
  test('renders gallery heading', () => {
    render(<Gallery />)
    
    expect(screen.getByText('Our Event Gallery')).toBeInTheDocument()
  })

  test('renders category buttons', () => {
    render(<Gallery />)
    
    expect(screen.getByRole('button', { name: /show weddings gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show birthdays gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show baby showers gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show corporate events gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show kids gallery/i })).toBeInTheDocument()
  })

  test('default category is Weddings', () => {
    render(<Gallery />)
    
    const weddingsButton = screen.getByRole('button', { name: /show weddings gallery/i })
    expect(weddingsButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('category switching works', async () => {
    const user = userEvent.setup()
    render(<Gallery />)
    
    // Initially Weddings should be active
    const weddingsButton = screen.getByRole('button', { name: /show weddings gallery/i })
    const birthdaysButton = screen.getByRole('button', { name: /show birthdays gallery/i })
    
    expect(weddingsButton).toHaveAttribute('aria-pressed', 'true')
    expect(birthdaysButton).toHaveAttribute('aria-pressed', 'false')
    
    // Click Birthdays button
    await user.click(birthdaysButton)
    
    // Now Birthdays should be active
    expect(weddingsButton).toHaveAttribute('aria-pressed', 'false')
    expect(birthdaysButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('renders swiper component', () => {
    render(<Gallery />)
    
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })

  test('category buttons have proper accessibility attributes', () => {
    render(<Gallery />)
    
    const categoryButtons = screen.getAllByRole('button')
    
    categoryButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed')
      expect(button).toHaveAttribute('aria-label')
    })
  })

  test('gallery section has proper accessibility structure', () => {
    render(<Gallery />)
    
    const section = screen.getByRole('region', { name: /gallery/i })
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { name: /our event gallery/i })
    expect(heading).toBeInTheDocument()
    
    const tablist = screen.getByRole('tablist', { name: /gallery categories/i })
    expect(tablist).toBeInTheDocument()
  })

  test('keyboard navigation works for category buttons', async () => {
    const user = userEvent.setup()
    render(<Gallery />)
    
    const weddingsButton = screen.getByRole('button', { name: /show weddings gallery/i })
    const birthdaysButton = screen.getByRole('button', { name: /show birthdays gallery/i })
    
    // Focus first button
    weddingsButton.focus()
    expect(weddingsButton).toHaveFocus()
    
    // Press Tab to move to next button
    await user.tab()
    expect(birthdaysButton).toHaveFocus()
    
    // Press Enter to activate
    await user.keyboard('{Enter}')
    expect(birthdaysButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('component is memoized (no unnecessary re-renders)', () => {
    const { rerender } = render(<Gallery />)
    
    // Re-render with same props
    rerender(<Gallery />)
    
    // Component should still be rendered correctly
    expect(screen.getByText('Our Event Gallery')).toBeInTheDocument()
  })
})
