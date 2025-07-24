import React from 'react'
import Hero, { BusinessCredentials } from './Hero'
import Features from './Features'
import Owners from './Owner'
import ClientReviewSlider from './ClientReviewSlider'
import LetsTalk from './LetsTalk'
import VideoPage from './VideoPage'

const Home = () => {
  return (
    <div>
        <Hero />
        <BusinessCredentials />
        <Features />
        <Owners />
        <VideoPage />
        <ClientReviewSlider />
        <LetsTalk />
    </div>
  )
}
export default Home
