import React from 'react'
import NavBar from '../Components/Navbar/NavBar'
import Footer from '../Components/Footer/Footer'
import HeroSection from '../Components/Hero/HeroSection'
import SecondaryHero from '../Components/Hero/Secondary/SecondaryHero'
import LandingFeatures from '../Components/Features/LandingFeatures'
import Solutions from '../Components/Solutions/Solutions'
import Security from '../Components/Security/Security'
import UsefulFeature from '../Components/Features/UsefulFeature'
import SaveTree from '../Components/SaveTree/SaveTree'

function MainPage() {
  return (
    <>
    
    <div className="ladingPageContainer">
        <NavBar />
        <HeroSection/>
        <SecondaryHero />
        <LandingFeatures />
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