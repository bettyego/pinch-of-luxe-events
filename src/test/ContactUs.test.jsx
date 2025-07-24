import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ContactUs from '../component/page/ContactUs'

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(() => Promise.resolve({ status: 200 }))
  }
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ContactUs Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders contact form', () => {
    renderWithRouter(<ContactUs />)
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell us about your event...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  test('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactUs />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  test('shows email validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactUs />)
    
    const emailInput = screen.getByPlaceholderText('you@example.com')
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactUs />)
    
    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('you@example.com')
    const messageInput = screen.getByPlaceholderText('Tell us about your event...')
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Test message')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Thank you for your message! We\'ll get back to you soon.')).toBeInTheDocument()
    })
  })

  test('shows loading state during submission', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactUs />)
    
    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('you@example.com')
    const messageInput = screen.getByPlaceholderText('Tell us about your event...')
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Test message')
    
    await user.click(submitButton)
    
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })
})
