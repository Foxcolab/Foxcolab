import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  serverId:string
  defaultNotification:string
  hasPermission:boolean
}
function NotificationSetting({serverId, defaultNotification, hasPermission}:Props) {

  const [defaultNoti, setDefaultNoti] = useState(defaultNotification);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const NameHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.put(`/api/server/update/defaultNotification?serverId=${serverId}`, {defaultNotification:defaultNoti});
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
        <div className="setting_section_title">Default Notification</div>
        <div className="setting_sec_desc">
        This will be the default notification setting for members who join your server. Members can override default notification settings with their own notification settings.
        </div>
        <div className="setting_section_content">   
            <div className="server_set_inp">
              <div className="">
                <div className='ser_radio_sec'>
                <input type="radio" value={"All Messages"} name="default_noti" defaultChecked={defaultNoti==="All Messages"} onChange={e=>setDefaultNoti(e.target.value)} disabled={!hasPermission} /> All Messages
              </div>
              <div className="ser_radio_sec">
                <input type="radio" value={"All Mentions"} name="default_noti" defaultChecked={defaultNoti==="All Mentions"} onChange={e=>setDefaultNoti(e.target.value)} disabled={!hasPermission} /> All Mentions
              </div>
            </div>
           
             {
                defaultNoti===defaultNotification ? "" : <> {loading ? <Loader/> :  <button onClick={NameHandler}>Save</button>} </>
              }
  </div>

        </div>
    </div>
    
    
    </>
  )
}

export default NotificationSetting