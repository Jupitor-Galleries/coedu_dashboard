import React from 'react';
import './Homepage.css';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Features from './components/features/Features';
import Pricing from './components/pricing/Pricing';

const Homepage = () => {
  return (
    <div className='homepage-container'>
        <Hero />
        <About />
        <Features />
        <Pricing />
    </div>
  )
}

export default Homepage