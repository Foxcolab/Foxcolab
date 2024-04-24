import Loader from '@/app/(pages)/components/Loaders/Loader';
import { MemberRole } from '@prisma/client';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
    serverId:string
    displayPic:string 
    coverPic:string
    whoCanUpdate:MemberRole
    hasPermission:boolean

}
function ServerAvatar({displayPic,coverPic, serverId, hasPermission}:Props) {
    const [preview, setPreview] = useState<null | string>(displayPic);

    const [dp, setDp] = useState<null | any>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setupLoading] = useState(false);
    const [showOpt, setShowOpt] = useState(false);
    const [showOpt2, setShowOpt2] = useState(false);

    const router = useRouter();

    const onSubmitHandler =async()=>{
        try {
            if(dp!==null){
                setLoading(true);
                const fileUrl = await UploadImage();
                if(!fileUrl) return;
                const res = await axios.put(`/api/server/update/updatePic?serverId=${serverId}`, {displayPic:fileUrl});
                if(res.status===200){
                    setPreview(res.data.displayPic);
                }
                setLoading(false);
                setDp(null);
                
                router.refresh();
            }
        } catch (error) {
                setLoading(false);
                console.log(error);
        }
    }
 
    const UploadImage  = async()=>{
        try {
            const formData = new FormData();
            formData.append('file', dp);
            setupLoading(true);
            const res = await axios.post('/api/upload', formData);
            if(res.status===200){
            setupLoading(false);
            return res.data.fileUrl[0];
            }
        } catch (error) {
            setupLoading(false);
            
        }
    }

    const onChangeHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log("AVATARRR");
        const files = e.target.files;
        if(!files) return;
        console.log(files);
        const fileUrl = URL.createObjectURL(files[0]);
        setPreview(fileUrl)
        setDp(files[0]);
        // setPreview(fileUrl);
    }

 

  return (
    <>
     <div className="setting_section">
            
            <div className="setting_section_title">Server Avatar</div>
            {
                hasPermission ? <>
                 <div className="setting_section_content">
                <div className="setting_avt">
                    <>
                    {/* <div className='server_ndp' onMouseEnter={()=>setShowOpt(true)} onMouseLeave={()=>setShowOpt(false)}>
                    <label className="custum-file-upload flex items-center justify-center  gap-1" htmlFor="file" id='avatar'>
                    {   showOpt && <span>Change Icon</span> }
                    { preview && !showOpt && <Image src={preview} height={100} width={100} alt='image' /> }
                    <input type="file" id="display_pic" 
                    accept="image/jpeg,image/png,image/webp,image/gif" onChange={onChangeHandler}
                    />
                    </label>
                    </div> */}
            <div className="server_ndp" onMouseEnter={()=>setShowOpt(true)} onMouseLeave={()=>setShowOpt(false)}>
             <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
    
             {   showOpt && <span>Change Icon</span> }
             { preview && !showOpt && <Image src={preview} height={100} width={100} alt='image' unoptimized /> }


<input type="file" id="file"  
accept="image/jpeg,image/png,image/webp,image/gif" onChange={onChangeHandler}
/>
            </label>
            </div>      
                    </>

                    <div className="server_set_inp">
                    {
                displayPic===preview ? "" : <> {loading ? <Loader/> :  <button onClick={onSubmitHandler}>Change</button>} </>
              }
                    </div>
                   
                </div>
    
            </div>
            </>
             :

            <div className="setting_section_content">
                <div className="setting_avt">
                    <>
                    <div className='server_ndp' >
                    {
                        preview && <Image src={preview} height={100} width={100} alt='image' />
                    }
                     
                    
                    </div>
                   
                    
                    </>

                   
                </div>
    
            </div>

                
            }
    </div>
           
    



    
    </>
  )
}

export default ServerAvatar