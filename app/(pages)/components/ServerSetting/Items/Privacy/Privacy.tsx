import React, { useState } from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from '../../../Loaders/Loader'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


interface Props {
    setOpen: any
    serverType:string
    serverId:string
    discoverable:string
  }
function Privacy({setOpen, serverType, serverId, discoverable}:Props) {
  const [type, setType] = useState(serverType);
  const [discover, setDiscover] = useState(discoverable);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const PrivacyHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.put(`/api/server/update/discoverable?serverId=${serverId}`, {type, discoverable:discover});
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  
  return (
   <>
   <ItemHeader setOpen={setOpen} title='Privacy Settings' />
   <div className="setting_section">
            
            <div className="setting_section_title">Set your server's privacy and membership levels. </div>
            <div className="setting_section_content">   
            <div className="server_set_inp">
              <div className="">
                <div className='ser_radio_sec2'>
                  <div className=''>
                <input type="radio" value={"public"} name="server_type" defaultChecked={type==="public"} onChange={e=>setType(e.target.value)} /> 
                </div> 
                <div>
                 Public
                
                <div className="setting_sec_desc w-full">
                People may join the server without an invite
                </div>
              </div>
              </div>
              <div className="ser_radio_sec2">
                <div>
                <input type="radio" value={"private"} name="server_type" defaultChecked={type==="private"} onChange={e=>setType(e.target.value)} /> 
                </div>
                <div>
                Private
                <div className='setting_sec_desc'>People may only join the server with an invite and your server can't be previewed</div>
              </div>
            </div>
            </div>
           
             
  </div>

        </div>
        <div className="flex items-center space-x-2 justify-between discoverable_switch mr-4">
      <div className="">
      <Label htmlFor="airplane-mode">Discoverable</Label>
      <div className="setting_sec_desc">
        Your server will show up in Foxcolab directories and search result. Private server cannot be discoverable.
      </div>
      </div>

      <Switch id="airplane-mode" disabled={type==="private"} onCheckedChange={(e:any)=>setDiscover(e)} />

    </div>
        <div className='privacy_save py-2'>
        
             
              {
                type==="public" ? <>
                {
                  type===serverType && discover===discoverable ? "" : <> {loading ? <Loader/> :  <button onClick={PrivacyHandler}>Save Changes</button>} </>
                }
                 </> : <>
                 {
                  type===serverType  ? "" : <> {loading ? <Loader/> :  <button onClick={PrivacyHandler}>Save Changes</button>} </>
                 }
                  </>
              }


        </div>
            
            </div>
   
   </>
  )
}

export default Privacy