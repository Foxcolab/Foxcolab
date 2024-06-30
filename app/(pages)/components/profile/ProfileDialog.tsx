
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator';
import Loader from '../Loaders/Loader';
import { User } from '@prisma/client';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';


interface Props {
    open:boolean
    setOpen:any
    user:User
}
function ProfileDialog({open, setOpen, user}:Props) {
    const [loading, setLoading] = useState(false);
    const [descLoader, setDescLoader] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [email, setEmail] = useState(user.email);
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState<null | string>(null);
    const [hover, setHover] = useState(false);
    
    // user.profilePic = "https://venngage-wordpress.s3.amazonaws.com/uploads/2022/03/user-flow-diagram.png";

    const processFile=(file:any)=>{
        return URL.createObjectURL(file);
    }
    const router = useRouter();
    const params = useParams();
    
    const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

        if(!e.target.files || e.target.files.length===0){
          return;
        }
        const formData = new FormData();

        const file = e.target.files[0];
        formData.append('file', file);
        router.refresh();
        try {
          setUploading(true);
          const res = await axios.post(`/api/upload`, formData);
          if(res.status===200){
            setFile(res.data.fileUrl[0]);
            const rest = await axios.post(`/api/user/dp`, {profilePic:res.data.fileUrl[0]});
            router.refresh();
          }
          // console.log(res);
          setUploading(false);
        } catch (error) {
            setUploading(false);
        }
      };
    
    const NameHandler = async()=>{
        try {
            setLoading(true);
            const res = await axios.put(`/api/user/name`, {name:name});
            router.refresh();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const BioHandler = async()=>{
        try {
            setDescLoader(true);
            const res = await axios.put(`/api/user/bio`, {bio:bio});
            router.refresh();
            setDescLoader(false);
        } catch (error) {
            setDescLoader(false);
        }
    }


  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className=" create_note_container " id='guide_cross' style={{maxWidth:"670px", height:"650px"}}>
        <div>

        
        <div className="note_container border overflow-hidden rounded-lg">

        <div className='note_left_container p-2' style={{width:"100%", padding:"0.5rem"}}>
        <div className="create_note_header" style={{padding:"0"}}>
            
            <div className='text-[1.5rem] font-semibold gap-2 w-full my-4 px-4'> 
            <div>Profile</div>
            </div>
            
        </div>
        <Separator orientation='horizontal' />
       

        <div className="canvas_Editor pb-0 pl-2" style={{height:"525px"}}>
             <div className='p-4'>
                
                <div className="profile_sec">
                    <label htmlFor="">DISPLAY PICTURE</label>
                    <div>
                        <div className='flex items-center justify-center'>
                        <label className="custum-file-upload flex items-center gap-1 " htmlFor="file" style={{width:"auto"}}>
                            <div className="w-full items-center flex justify-center">
                                {
                                   ( user.profilePic!==null && user.profilePic!==undefined) || previewUrl!==null ? 
                                    <div className='user_upload_img shadow' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
                                        <Image src={previewUrl===null ? user.profilePic  : previewUrl} className={cn(hover || uploading ? "opacity-10":"opacity-100")} height={100} width={100} alt='user profile' unoptimized />
                                        {
                                            hover && !uploading && <div className='user_prof_change'>Change</div>
                                        }
                                        {
                                            uploading && <div className='user_prof_change ' style={{top:"-6rem", left:"3.8rem"}}><div className="">
                                                <ReloadIcon className="mr-2 h-8 w-8 animate-spin p-[0.1rem] rounded-full " style={{background:"var(--background2"}} fontSize={30} /> 
                                                </div></div>
                                        }
                                        
                                    </div> :
                                    <div className='user_upload_img shadow' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
                                        <div  className={cn(hover || uploading ? "opacity-10":"opacity-100", "w-full h-full flex items-center justify-center text-[6rem]")}>
                                        <FaUserAlt  />
                                        </div>
                                        {
                                            hover && !uploading && <div className='user_prof_change'>
                                            Upload
                                        </div>
                                        }
                                        {
                                            uploading && <div className='user_prof_change ' style={{top:"-6rem", left:"3.8rem"}}>
                                                <div className=''>
                                                <ReloadIcon className="mr-2 h-8 w-8 animate-spin p-[0.1rem] rounded-full " style={{background:"var(--background2"}} fontSize={30} /> 
                                                </div>
                                            </div>
                                        }

                                    </div>
                                }
                                
                            </div>

                        <input type="file" id="file"
                        accept="image/jpeg,image/png,image/webp, image/svg"
                        onChange={handleChange}
                        />
                    </label>


                        </div>
                    </div>
                </div>

                <div className="profile_sec">
                    <label htmlFor="">DISPLAY NAME</label>
                    <div className='flex items-center gap-4 my-2'>
                        <Input type="text" defaultValue={name as string} onChange={(e)=>setName(e.target.value)} className='outline-none w-[80%]'  />
                        {
                            user.name!==name ? 
                            <>
                            {
                                loading ? <Loader/> : <Button type="button" className="bg-green-500 text-white hover:bg-green-600" onClick={NameHandler}>Change</Button>
                            }
                            
                            </> : ""
                          }
                    </div>
                </div>
                <div className="profile_sec">
                    <label htmlFor="">EMAIL</label>
                    <div className='flex items-center gap-4 my-2'>
                        <Input type="text" defaultValue={user.email as string} className='outline-none w-[80%]' disabled  />
                        {/* {
                            user.name!==name && 
                            <Button type="button" className="bg-green-500 text-white hover:bg-green-6000">Change</Button>
                        } */}
                    </div>
                </div>
                <div className="profile_sec">
                    <label htmlFor="">ABOUT ME</label>
                    <div className='flex items-center gap-4 my-2'>
                        <Textarea  defaultValue={bio as string} onChange={(e)=>setBio(e.target.value)} className='outline-none resize-none w-[80%]'  />
                        {
                            user.bio!==bio ?
                            <>
                            {
                                descLoader ? <Loader/> : <Button type="button" className="bg-green-500 text-white hover:bg-green-600" onClick={BioHandler}>Change</Button>
                            }
                            
                            </> : ""
                            
                        }
                    </div>
                </div>
                



             </div>
        <div>

        </div>


       
        </div>

        


        </div>
    </div>
       
       
        
      
      
       
    </div>
      </DialogContent>
    
    



    </Dialog>  
    
    
    </>
  )
}

export default ProfileDialog