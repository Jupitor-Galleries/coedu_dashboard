import React from 'react';
import './Homepage.css';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Features from './components/features/Features';

const Homepage = () => {
  return (
    <div className='homepage-container'>
        <Hero />
        <About />
        <Features />
    </div>
  )
}

export default Homepage