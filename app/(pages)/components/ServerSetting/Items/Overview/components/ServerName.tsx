import Loader from '@/app/(pages)/components/Loaders/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  serverName:string
  serverId:string
}
function ServerName({serverName, serverId}:Props) {
    const [name, setName] = useState(serverName);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const NameHandler =async()=>{
      try {
        setLoading(true);
        const res = await axios.put(`/api/server/update/name?serverId=${serverId}`, {name});
        setLoading(false);
        router.refresh();
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }

  return (
    <>
    
    <div className="setting_section">      
        <div className="setting_section_title">Server Name</div>
        <div className="setting_section_content">   
            <div className="server_set_inp">
                <input type="text" onChange={(e)=>setName(e.target.value)} defaultValue={name} />
                {
                serverName===name ? "" : <> {loading ? <Loader/> :  <button onClick={NameHandler}>Save</button>} </>
              }
            </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default ServerName