import React from 'react';
import './Homepage.css';
import Hero from './components/hero/Hero';
import About from './components/about/About';

const Homepage = () => {
  return (
    <div className='homepage-container'>
        <Hero />
        <About />
    </div>
  )
}

export default Homepage