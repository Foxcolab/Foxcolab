import Loader from '@/app/(pages)/components/Loaders/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  serverId:string
  serverType:string
}
function ServerType({serverId, serverType}:Props) {
  const [type, setType] = useState(serverType);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const NameHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.put(`/api/server/update/serverCategory?serverId=${serverId}`, {serverType:type});
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
        <div className="setting_section_title">Server Type</div>
        <div className="setting_section_content">   
            <div className="server_set_inp">
              <select name="" id="" defaultValue={type} onChange={e=>setType(e.target.value)}>
                <option selected={type===""} value="">Select--</option>
                <option selected={type==="Artificial Intelligence"} value="Artificial Intelligence">Artificial Intelligence</option>
                <option selected={type==="Science"} value="Science">Science</option>
                <option selected={type==="Gaming"} value="Gaming">Gaming</option>
                <option selected={type==="Book Solution"} value="Book Solution">Book Solution</option>
                <option selected={type==="Course"} value="Course">Course</option>
                <option selected={type==="Code Academy"} value="Code Academy">Code Academy</option>
                <option selected={type==="Cultural & Spiritual"} value="Cultural & Spiritual">Cultural & Spiritual</option>
                <option selected={type==="Education"} value="Education">Education</option>
                <option selected={type==="Engineering"} value="Engineering">Engineering</option>
                <option selected={type==="Finance"} value="Finance">Finance</option>
                <option selected={type==="Tourism"} value="Tourism">Tourism</option>
                <option selected={type==="Hospitality"} value="Hospitality">Hospitality</option>
                <option selected={type==="Health Science"} value="Health Science">Health Science</option>
                <option selected={type==="Jobs"} value="Jobs">Jobs</option>
                <option selected={type==="News"} value="News">News</option>
                <option selected={type==="Sports"} value="Sports">Sports</option>
                <option selected={type==="Assessment"} value="Assessment">Assessment</option>
                <option selected={type==="Ecommerce"} value="Ecommerce">Ecommerce</option>
              </select>

              {
                serverType===type ? "" : <> {loading ? <Loader/> :  <button onClick={NameHandler}>Save</button>} </>
              }
              
            </div>

        </div>
    </div>
    
    </>
  )
}

export default ServerType