import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Gallery from '../component/page/Gallery'
import { galleryAlbums } from '../data/galleryData'

const renderGallery = () =>
  render(
    <MemoryRouter>
      <Gallery />
    </MemoryRouter>
  )

describe('Gallery (album-style)', () => {
  test('renders the gallery heading', () => {
    renderGallery()
    expect(screen.getByRole('heading', { name: /the gallery/i })).toBeInTheDocument()
  })

  test('renders the gallery region with proper aria label', () => {
    renderGallery()
    expect(screen.getByRole('region', { name: /gallery albums/i })).toBeInTheDocument()
  })

  test('renders an "All Events" album card linking to /gallery/all', () => {
    renderGallery()
    const allLink = screen.getByRole('link', { name: /view all events album/i })
    expect(allLink).toBeInTheDocument()
    expect(allLink).toHaveAttribute('href', '/gallery/all')
  })

  test('renders a card for every album in the data set', () => {
    renderGallery()
    galleryAlbums.forEach((album) => {
      const link = screen.getByRole('link', { name: new RegExp(`view ${album.category} album`, 'i') })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', `/gallery/${album.slug}`)
    })
  })

  test('each album card displays its photo count', () => {
    renderGallery()
    galleryAlbums.forEach((album) => {
      const link = screen.getByRole('link', { name: new RegExp(`view ${album.category} album`, 'i') })
      expect(link).toHaveTextContent(`${album.images.length}`)
    })
  })
})
