import React from 'react'
import MainSidebar from "../Sidebar/MainSidebar";
import EditorFooter from '../Editor/EditorFooter2';


function ChatComponents({children, server}) {
  

  return (
    <>
    
    <MainSidebar server={server} >

      <div  className='msg_main_container'>

    {
        children
    }


    </div>
    {/* <EditorFooter  /> */}
    </MainSidebar>
    
    
    
    </>
  )
}

export default ChatComponents