import React from 'react'
import NavBar from '../../LandingPage/Components/Navbar/NavBar'
import Footer from '../../LandingPage/Components/Footer/Footer'


function HeaderFooter({children}:{children:React.ReactNode}) {
  return (
    <>
    
    <NavBar />
    {children}
    <Footer />
    
    
    </>
  )
}

export default HeaderFooter