"use client";
import React, { useEffect, useState } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ChoseBetter from '../Components/ChoseBetter';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import { FaLock, FaRegFilePdf, FaRegFileZipper } from "react-icons/fa6";
import { BsFiletypeDocx, BsFiletypeTxt, BsRecordCircleFill } from "react-icons/bs";
import { GrDocumentCsv, GrPersonalComputer } from "react-icons/gr";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFileEarmarkPptFill } from "react-icons/bs";
import { useToast } from '@/components/ui/use-toast';


function ContactUs() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);

      const [email, setEmail] = useState('');
      const [name, setName] = useState('');
      const [help, setHelp] = useState('');
      const [detailed, setDetailed] = useState('');
      const [files, setFiles] = useState([]);
      const [previewUrl, setPreviewUrl] = useState( []);
      const [fileUrl, setFileUrl] = useState([]);
      const [uploading, setUploading] = useState(false);
      const [loading, setLoading] = useState(false);

      const { toast } = useToast()
      const processFile=(file:any)=>{
        return URL.createObjectURL(file);
    }

    const router = useRouter();
  
    const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
  
      if(!e.target.files || e.target.files.length===0){
        return;
      }
      const filess = e.target.files;
      const formData = new FormData();
      for (const file of Array.from(filess)) {
        files.push(file);
        
        previewUrl.push(processFile(file));
        formData.append('file', file);
      }
      
      router.refresh();
      // return;
      try {
        setUploading(true);
        const res = await axios.post(`/api/upload`, formData);
        console.log(res);
        if(res.status===200){
          
          setFileUrl(res.data.fileUrl);
        }
        // console.log(res);
        setUploading(false);
      } catch (error) {
        setUploading(false);
      }
    };

    const CheckEmail = (email:string)=>{
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
      const isValid = emailPattern.test(email); 
      return isValid;
    }

    const onSubmit = async()=>{
      try {
        if(!CheckEmail(email)){
          toast({
            title:"Please enter a valid email"
          });
          return;
        }
        if(!email && !help){
          toast({
            title:"Please enter the fields"
          });
          return;
        }
        setLoading(true);
        console.log(fileUrl);
        const res = await axios.post(`/api/contactUs`, {name, email, files:fileUrl, message:help, detailedMessage:detailed });
        setLoading(false);
        setName("");
        setEmail("");
        setFileUrl([]);
        setHelp('');
        setDetailed('');
        setPreviewUrl([]);
        toast({
          title:"Message sent successfully"
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  
    const RemoveImage =(id:number)=>{
      
      if (id > -1) {
       files.splice(id, 1);
        previewUrl.splice(id,1);
        router.refresh();
      }
    }
  
  return (
    <>
    <HeaderFooter>
    <div className='bg-[#fbf7f1] pt-[5rem] pb-[10rem]'>
        <div className='h-full w-full flex items-center  justify-center font-bold text-[4rem]'>
            Contact <span className='text-[#E04D6C]'>&nbsp;Us</span>
        </div>
        <div className='text-center text-[1.2rem] font-semibold'><span className='text-[#E04D6C]'>Questions, bug reports, feedback</span> – we’re here for all of it.</div>
    </div>

    <div className='flex items-center justify-center mt-[-5rem] mb-[5rem]'>
    <div className='w-[700px] shadow-lg rounded-md bg-white  p-8'>
      <div className='mt-8'>
        <label htmlFor="" className='font-semibold text-[1.1rem]'>Your Full Name:</label>
        <div className='mt-1'>
          <Input type='text' className='border w-full h-[2.8rem] px-4 text-[1.1rem]  rounded' onChange={(e)=>setName(e.target.value)} defaultValue={name} />
        </div>
      </div>
      <div className='mt-8'>
        <label htmlFor="" className='font-semibold text-[1.1rem]'>Your Email Id:</label>
        <div className='mt-1'>
          <Input type='text' className='border w-full h-[2.8rem] px-4 text-[1.1rem]  rounded' onChange={(e)=>setEmail(e.target.value)} defaultValue={email} />
        </div>
      </div>
      <div className='mt-8'>
        <label htmlFor="" className='font-semibold text-[1.1rem]'>Tell us what you need help with:</label>
        <div className='mt-1'>
          <Input type='text' className='border w-full h-[2.8rem] px-4 text-[1.1rem]   rounded' onChange={(e)=>setHelp(e.target.value)} defaultValue={help} />
        </div>
      </div>
      <div className='mt-8'>
        <label htmlFor="" className='font-semibold text-[1.1rem]'>Can you give us more details?</label>
        <div className='mt-1'>
          <Textarea  className='border w-full h-[2.8rem] px-4 text-[1.1rem] resize-none rounded' onChange={(e)=>setDetailed(e.target.value)} defaultValue={detailed}  />
        </div>
      </div>
      <div className='mt-8'>
        <label htmlFor="" className='font-semibold text-[1.1rem]'>Attached files (optional)</label>
        <div className='mt-1'>
        <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
          <div className='h-[4rem] border-dotted border w-full flex items-center justify-center rounded text-[#1d9bd1] hover:underline'>
              Browse for a file
          </div>
        <input type="file" id="file" onChange={handleChange} multiple
        accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav, .json "
          />
      </label>
        </div>


        {
              previewUrl.length!==0 && 
              
              
              
              files.length!==0 && previewUrl.map((image, i)=>(
                <div key={i}>
                  <div >
                            {files[i]?.type.startsWith("image/") ?
                        <div className="upload_img">
                         <div className="upld_img_opt">
                          {
                            uploading ? 
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                          
                        </div>
                          <div className="upload_img_container">
                          <Image  src={image} alt="upload" height={100} width={100} />
                          </div>
 
                            
                        </div> :
                       files[i]?.type.startsWith("video/")?
                       <div className="upload_img">
                        <div>
                          {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                          
                        </div>
                       
                         <video  src={image} height={100} width={100} />
                     </div>  : 
                    files[i]?.type==="application/pdf" ?
                     <div className="upload_application">
                      <div className="application_cross">
                      {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                        </div>
                        <div className="doc_thumbnail doc_thumbnail_width">
                         <div className="doc_thum_icon">
                         <FaRegFilePdf/> 
                         </div>
                         <div className="doc_thum_nm">
                          <div className="extn">{files[i].name}</div>
                          <div >PDF</div>
                          
                         </div>
                        </div>
                     </div> 
                     
                     : 
 
                     files[i]?.type==="application/zip" ? 
                    
                     <div className="upload_application">
                     <div className="application_cross">
                     {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                       </div>
                       <div className="doc_thumbnail doc_thumbnail_width">
                        <div className="doc_icon bg-yellow-500">
                        <FaRegFileZipper/> 
                        </div>
                        <div className="doc_thum_nm">
                         <div className="extn">{files[i].name}</div>
                         <div >Zip</div>
                         
                        </div>
                       </div>
                    </div>                      
                     
                     
                     
                     : 
                     
                     
                     files[i]?.name.endsWith(".docx") || files[i]?.name.endsWith(".doc") ? 
                    
                     <div className="upload_application">
                     <div className="application_cross">
                     {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                       </div>
                       <div className="doc_thumbnail doc_thumbnail_width">
                        <div className="doc_icon bg-green-700">
                        <BsFiletypeDocx/> 
                        </div>
                        <div className="doc_thum_nm">
                         <div className="extn">{files[i].name}</div>
                         <div >Word</div>
                         
                        </div>
                       </div>
                    </div>                      
                     
                     
                     
                     : 
                     files[i]?.name.endsWith(".xls") || files[i]?.name.endsWith(".xlsx") ? 
                    
                     <div className="upload_application">
                     <div className="application_cross">
                     {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                       </div>
                       <div className="doc_thumbnail doc_thumbnail_width">
                        <div className="doc_icon bg-violet-700">
                        <BsFiletypeXlsx/> 
                        </div>
                        <div className="doc_thum_nm">
                         <div className="extn">{files[i].name}</div>
                         <div >Excel</div>
                         
                        </div>
                       </div>
                    </div> : 
                          files[i]?.name.endsWith(".csv")? 
                    
                          <div className="upload_application">
                          <div className="application_cross">
                          {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                            </div>
                            <div className="doc_thumbnail doc_thumbnail_width">
                             <div className="doc_icon bg-yellow-700">
                             <GrDocumentCsv/> 
                             </div>
                             <div className="doc_thum_nm">
                              <div className="extn">{files[i].name}</div>
                              <div >CSV</div>
                              
                             </div>
                            </div>
                         </div> :
                          files[i]?.name.endsWith(".txt")? 
                    
                          <div className="upload_application">
                          <div className="application_cross">
                          {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
                            </div>
                            <div className="doc_thumbnail doc_thumbnail_width">
                             <div className="doc_icon bg-pink-700">
                             <BsFiletypeTxt/> 
                             </div>
                             <div className="doc_thum_nm">
                              <div className="extn">{files[i].name}</div>
                              <div >txt</div>
                              
                             </div>
                            </div>
                         </div> :
 
 files[i]?.name.endsWith(".ppt")? 
                    
 <div className="upload_application">
 <div className="application_cross">
 {
                            uploading ? 
                            
                            <button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </button> 
                            : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                          }
  </div>
  <div className="doc_thumbnail doc_thumbnail_width">
   <div className="doc_icon bg-orange-700">
   <BsFileEarmarkPptFill/> 
   </div>
   <div className="doc_thum_nm">
    <div className="extn">{files[i].name}</div>
    <div >PPT</div>
    
   </div>
  </div>
 </div> :
 
 
                     ''
 
                        
                        }
                        </div>
                </div>
              ))
            }

        <div className='my-8'>
                           
          <button className='w-full h-[3.5rem] text-center bg-green-500 hover:bg-green-600 rounded text-white font-semibold text-[1.2rem] ' disabled={loading} onClick={onSubmit} > {loading ? <><span className='flex items-center justify-center'><ReloadIcon className="mr-2 h-4 w-4 animate-spin " /> Please Wait</span> </> : <> SEND MESSAGE </>}  </button>
        </div>
      </div>


    </div>
    </div>



    <ChoseBetter />


    </HeaderFooter>

    
    
    </>
  )
}

export default ContactUs