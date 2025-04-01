import { useState } from 'react'

import React from 'react';

import './index.css';

import HeroSection from './components/heroSection'

import { UserAuth } from "./context/AuthContext";



function App() {
  
  const { user } = UserAuth();

  return (

    

    <div className='!scroll-smooth'>
      <HeroSection />
    </div>
  )
}

export default App
