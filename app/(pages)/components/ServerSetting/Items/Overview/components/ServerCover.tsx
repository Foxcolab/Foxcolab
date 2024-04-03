import Loader from '@/app/(pages)/components/Loaders/Loader';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
    serverId:string
    coverPic:any 
}
function ServerCover({coverPic, serverId}:Props) {
    const [previewc, setPreviewc] = useState<null | string>(coverPic);
    const [cover, setCover] = useState<null | any>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setupLoading] = useState(false);
    const [showOptc, setShowOptc] = useState(false);

    const router = useRouter();

    const onSubmitHandler =async()=>{
        try {
            if(cover!==null){
                setLoading(true);
                const fileUrl = await UploadImage();
                if(!fileUrl) return;
                const res = await axios.put(`/api/server/update/cover?serverId=${serverId}`, {coverPic:fileUrl});
                setLoading(false);
                setCover(null);
                setPreviewc(fileUrl);
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
            formData.append('file', cover);
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

    const onCoverHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{

        const files = e.target.files;
        if(!files) return;
        const fileUrl = URL.createObjectURL(files[0]);
        setPreviewc(fileUrl)
        setCover(files[0]);
    }


    

  return (
    <>
     <div className="setting_section">
            
            <div className="setting_section_title">Server Cover</div>
            <div className="setting_section_content">
                <div className="setting_avt">
                    <>
                    <div className='server_cover' onMouseEnter={()=>setShowOptc(true)} onMouseLeave={()=>setShowOptc(false)}>
                    {/* <label className="custum-file-upload flex items-center justify-center  gap-1" htmlFor="file" id='cover_file'>
                    {   showOptc && <span>Change Cover</span> }
                    { previewc && !showOptc && <Image src={previewc} height={100} width={100} alt='image' /> }
                    <input type="file" id="file" 
                    accept="image/jpeg,image/png,image/webp,image/gif" onChange={onCoverHandler}
                    />
                    </label> */}
                    <label htmlFor="fileInput">
            
            {/* JJJJJJSDSD */}
            {   showOptc && <span>Change Cover</span> }
            
                    { previewc && !showOptc && <Image src={previewc} height={100} width={100} alt='image' /> }
    </label>
    <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onCoverHandler} />
                    </div>
                   
                    
                    </>

                    <div className="server_set_inp">
                    {
                coverPic===previewc ? "" : <> {loading ? <Loader/> :  <button onClick={onSubmitHandler}>Change</button>} </>
              }
                    </div>
                </div>
    
            </div>
            </div>


    {/* <div id="customFileUpload"> */}
    {/* <label htmlFor="fileInput">
            
            JJJJJJSDSD

    </label>
    <input type="file" id="fileInput" onChange={(e)=>handleFileSelect(e)} />
    <div id="fileName"></div> */}
    {/* <button onClick={uploadFile}>Upload</button> */}
{/* </div> */}

    
    </>
  )
}

export default ServerCover