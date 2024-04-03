import React from 'react'

interface FilesPRops {
    FilesStatus:any
    state:string
}
function FilesHeader({FilesStatus, state}:FilesPRops) {


  return (
   <>
   
  
<div className="pmsg_sts">
            <button onClick={()=>FilesStatus("All Files")} id='' className={state==="All Files"? "activePmsg": ""} >All Files</button>
            <button onClick={()=>FilesStatus("Created by you")} id='' className={state==="Created by you"? "activePmsg": ""} >Created by you</button>
            <button onClick={()=>FilesStatus("Shared with you")} id='' className={state==="Shared with you"? "activePmsg": ""} >Shared with you</button>
        </div>
   
   
   </>
  )
}

export default FilesHeader