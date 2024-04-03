
import React from 'react'
import Server_Sidebar from './Server_Sidebar'
import Header from '../Header/Header'
import ChannelSidebar from './ChannelSidebar';
  function MainSidebar ({children, server}) {
    // const name = "Teststriver";
  

  return (
    <>
        <Header server={server}/>

    <div className="serv_m_c">
      
      <div className="serv_sidebar">
      <Server_Sidebar/>
      <ChannelSidebar server={server}/>
      </div>
      <div className="serv_c_body">
      <div className="child_cbdoy">
      {children}
      </div>
      </div>

      
    </div>

    
    </>
  )
}

export default MainSidebar