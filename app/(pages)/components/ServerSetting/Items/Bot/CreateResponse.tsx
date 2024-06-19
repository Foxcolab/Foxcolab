import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaUserLarge } from 'react-icons/fa6'
import { Textarea } from "@/components/ui/textarea"
import { FaRobot } from 'react-icons/fa'
import { LucidePlusCircle, Plus, PlusCircle } from 'lucide-react'
import EditorEmoji from '../../../Emoji/EditorEmoji'
import { GoPlusCircle } from 'react-icons/go'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import {  FaRegFilePdf, FaRegFileZipper } from "react-icons/fa6";
import { BsFiletypeDocx, BsFiletypeTxt, BsRecordCircleFill } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFileEarmarkPptFill } from "react-icons/bs";
import { RxCross2 } from 'react-icons/rx'
import Image from 'next/image'
import Loader from '../../../Loaders/Loader'
import { useToast } from "@/components/ui/use-toast"


interface Props {
    serverId:string
}

function CreateResponse({serverId}:Props) {
    const [triggeredText, setTriggeredText] = useState("");
    const [responseText, setResponseText] = useState("");
    const [triggeredType, setTriggeredType] = useState("specificText");
    const [emojiDialog, setEmojiDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [uploading, setUplodaing] = useState(false);
    const router = useRouter();
    const params = useParams();
    const [openDialog, setOpenDialog] = useState(false);

    const { toast } = useToast();

    const onSubmit = async () => {
        try {
            
            setLoading(true);
            let responseFileUrl = []
            if(files.length>0){
                const formData = new FormData();
                for(let i=0;i<files.length;i++){
                    formData.append("file", files[i]);
                }
                const res = await axios.post('/api/upload', formData);
                if(res.status===200){
                    responseFileUrl = res.data.fileUrl;
                }
            }

            const res = await axios.post(`/api/bot/response?serverId=${params?.id}`, {
                triggeredText:triggeredText, responseText:responseText, responseFileUrl:responseFileUrl,
                triggeredType:triggeredType
            });
            console.log(res);
        //   await axios.post(url, values);
          router.refresh();
          setOpenDialog(false);
          setLoading(false);
          setFiles([]);
          setPreviewUrl([]);
          setEmojiDialog(false);
        } catch (error:any) {
        //   setOpenDialog(false);
          setLoading(false);
          console.log(error);
          toast({
            title: error.response.data.error ,
            
          })
        }
      }


 
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files || e.target.files.length===0){
      return;
    }
    const filess = e.target.files;
    const formData = new FormData();
    for (const file of Array.from(filess)) {
      files.push(file);
      const processFile = URL.createObjectURL(file);
      previewUrl.push(processFile);
      formData.append('file', file);
    }
    
    router.refresh();
    try {
      setUplodaing(true);
    //   const res = await axios.post('/api/upload', formData);
    //   if(res.status===200){
    //     form.setValue("fileUrl", res.data.fileUrl);
    //   }
      // console.log(res);
      setUplodaing(false);
    } catch (error) {
      setUplodaing(false)
    }
  };

  const RemoveImage =(id:number)=>{
    console.log(id);
  if (id > -1) {
    files.splice(id, 1);
    previewUrl.splice(id,1);
    router.refresh();
  }

  }

  return (
    <>
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className='addBotBtn'>Add New Response</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Add FoxcolabBot Response</DialogTitle>
        </DialogHeader>
        <hr />
        <div className='mb-4'>
            <div className='botRes_inp_con'>
                <label htmlFor="">When someone says</label>
                <div className='botInp_con'>
                <div className='bot_usr_logo bg-blue-500'><FaUserLarge/></div>
                <div className='bot_user_inpt'>
                {/* <Textarea placeholder="Type your message here." /> */}
                <textarea  rows={3} onChange={(e)=>setTriggeredText(e.target.value)} defaultValue={triggeredText} />

                </div>
                </div>
            </div>
            <div className='botRes_inp_con mt-2'>
                <label htmlFor="">FoxcolabBot Responds</label>
                <div className='botInp_con'>
                <div className='bot_usr_logo bg-red-500'><FaRobot/></div>
                <div className='bot_res_inpt' id='bot_res_inp'>
                {/* <Textarea placeholder="Type your message here." /> */}
                <textarea  rows={2} onChange={(e)=>setResponseText(e.target.value)} value={responseText} />

                <div className="preview_imsg" style={{background:"transparent"}}>
            {/* {previewUrl && (
                        <div>
                            {files.type.startsWith("image/") ?
                        <div>
                            <Image  src={previewUrl} alt="upload" height={100} width={100} />
                        </div> :
                        <div></div>    
                        
                        }
                        </div>
                    )} */}

            {
              previewUrl.length!==0 && files.length!==0 && previewUrl.map((image, i)=>(
                <div key={i}>
                  <div >
                            {files[i]?.type.startsWith("image/") ?
                        <div className="upload_img">
                           <div className="upld_img_opt">
                          
                          <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        </div>
                            <Image  src={image} alt="upload" height={100} width={100} />
                        </div> :
                       files[i]?.type.startsWith("video/")?
                       <div className="upload_img">
                        <div>
                         
                          <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        </div>
                       
                         <video  src={image} height={100} width={100} />
                     </div>  : 
                    files[i]?.type==="application/pdf" ?
                     <div className="upload_application">
                      <div className="application_cross">
                          
                          <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                         
                         <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                         
                         <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                        
                         <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                              
                              <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                             
                              <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
    
    <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
  
            </div>  
                <div className='response_btns'>
                    <button className='transition rounded-full p-1 flex items-center justify-center'>
                        
            <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
            {/* <RiComputerFill /> Upload from local */}
                <PlusCircle/>
                <input type="file" id="file" onChange={handleChange} multiple
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt "
                />
            </label>
                        
                        
                        
                        {/* <PlusCircle/> */}
                        </button>
                    <EditorEmoji emojiDialog={emojiDialog}  setEmojiDialog={setEmojiDialog}  onChange={(emoji)=> {
                        console.log(emoji);
                        setResponseText(`${responseText}${emoji}`);
                        setEmojiDialog(false);
                        console.log(emojiDialog)
                    } }  />
                </div>
                </div>
                </div>
            </div>

            <div className="botRes_inp_con flex items-center justify-between mt-4 ">
                <div>
                <label htmlFor=""> Bot Triggered Checking Type</label>
                
                </div>
                
                <div >
                <Select onValueChange={(value)=>setTriggeredType(value)} defaultValue={triggeredType}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Bot response type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="fullText">Full Text</SelectItem>
                        <SelectItem value="specificText">Sepcific Text</SelectItem>
                        
                        
                            
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <HoverCard open>
                            <HoverCardTrigger asChild>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                            In this type, bot will triggered if the entire text is present in the full inputs.
                            </HoverCardContent>
                </HoverCard>
                <HoverCard>
                            <HoverCardTrigger asChild>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                            In this type, bot will triggered if the specific text is present in the full inputs.
                            </HoverCardContent>
                        </HoverCard>
                </div>

            </div>
            <DialogDescription>
                    In <span className='font-bold'>Full Text</span> type, bot will triggered if the entire text is present in the full inputs and <span className='font-bold'>Specific Text</span> type  bot will triggered if the specific text is present in the full inputs.
                </DialogDescription>




        </div>
        <DialogFooter>
            {
                loading ? <Loader/> : <>
                    <Button type="submit" variant={"outline"}>Cancel</Button>
                    <Button type="submit" className='bg-green-500 hover:bg-green-600 text-white' onClick={onSubmit}>Create</Button>
                </>
            }
    
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default CreateResponse