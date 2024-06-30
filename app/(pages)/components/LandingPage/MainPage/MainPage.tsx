"use client";
import React, { useEffect } from 'react'
import NavBar from '../Components/Navbar/NavBar'
import Footer from '../Components/Footer/Footer'
import HeroSection from '../Components/Hero/HeroSection'
import SecondaryHero from '../Components/Hero/Secondary/SecondaryHero'
import LandingFeatures from '../Components/Features/LandingFeatures'
import Solutions from '../Components/Solutions/Solutions'
import Security from '../Components/Security/Security'
import UsefulFeature from '../Components/Features/UsefulFeature'
import SaveTree from '../Components/SaveTree/SaveTree'
import { useTheme } from 'next-themes';
import Empower from '../Components/Empower/Empower';

function MainPage() {
  const {setTheme} = useTheme();

  useEffect(()=>{
    setTheme("light");
    // if(resolvedTheme==="")
  }, []);
  return (
    <>
    
    <div className="ladingPageContainer">
        <NavBar />
        <HeroSection/>
        <SecondaryHero />
        <LandingFeatures />
        <Empower />
        <Solutions/>
        <Security/>
        <UsefulFeature/>
        <SaveTree/>
        <Footer/>
    </div>
    
    
    
    
    </>
  )
}

export default MainPage