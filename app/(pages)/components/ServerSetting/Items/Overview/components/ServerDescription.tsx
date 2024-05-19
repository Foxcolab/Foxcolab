import Loader from '@/app/(pages)/components/Loaders/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  serverDescription:string
  serverId:string
  hasPermission:boolean

}
function ServerDescription({serverDescription, serverId, hasPermission}:Props) {
    const [description, setDescription] = useState(serverDescription);
    const [loading, setloading] = useState(false);
    const router = useRouter();

    const DescriptionHandler =async()=>{
      try {
        setloading(true);
        const res = await axios.put(`/api/server/update/description?serverId=${serverId}`, {description});
        setloading(false);
        router.refresh();
        
      } catch (error) {
        setloading(false);
        console.log(error)
      }
    }


  return (
    <>
    
    <div className="setting_section">      
        <div className="setting_section_title">Server Description</div>
        <div className="setting_sec_desc">
        Provide a snapshot of what your server is all about in the server description. 
        </div>
        <div className="setting_section_content">   
            <div className="server_set_inp">
              <textarea name="" id="" cols={5} rows={5}  onChange={(e)=>setDescription(e.target.value)} defaultValue={description} disabled={!hasPermission} ></textarea>
              {
                serverDescription===description ? "" :
                <>
                {
                  loading ? <Loader/> :  <button onClick={DescriptionHandler}>Save</button>
                }
                </>
               
              }
              
            </div>

        </div>
    </div>
    
    </>
  )
}

export default ServerDescription