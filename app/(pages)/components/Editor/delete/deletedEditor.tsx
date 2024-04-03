
"use client";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "../Emoji/Emoji";
import { useModal } from "@/hooks/useModalStore";
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdOutlineVideocam } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { GoMention } from "react-icons/go";
import {GoPlusCircle} from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Editor } from '@tinymce/tinymce-react'
import { PlusIcon } from "./EditorFooter/PlusIcon";
import { useState } from "react";
import { RiComputerFill } from "react-icons/ri";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Loader from "../Loaders/Loader";
import { Button } from "@/components/ui/button";
import { FaRegFilePdf, FaRegFileZipper } from "react-icons/fa6";
import { BsFiletypeDocx, BsFiletypeTxt, BsRecordCircleFill } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFileEarmarkPptFill } from "react-icons/bs";
import VoiceRecorder from "../Chat/Recorder/VoiceRecorder";
import ScreenRecording from "../Chat/Recorder/ScreenRecording";
import VideoRecorder from "../Chat/Recorder/VideoRecorder";
// import VideoRecorder from "../Chat/Recorder/VideoRecorder";
import Mention from "./EditorFooter/MentionComponent";
import { Group } from "@prisma/client";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
    groups:Group[]
  }
  const formSchema = z.object({
    content: z.string().optional(),
    fileUrl: z.string().array().optional()
  });

const EditorFooter = ({apiUrl,
    query,
    name,
    type,
    groups
  }: ChatInputProps)=> {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [uploading, setUplodaing] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioName, setaudioName] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoName, setVideoName] = useState(null);
    const [screenUrl, setScreenUrl] = useState(null);
    const [ScreenName, setScreenName] = useState(null);
    const [mentionDialog, setMentionDialog] = useState(false);
    const [hadlerName, setHandlerName] = useState('');
    const [mentions, setMentions] = useState([]);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });
  
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      // const res = await axios.post('/api/upload')
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      if(screenUrl){
        form.setValue('fileUrl', [screenUrl]);
      }
      if(audioUrl){
        form.setValue('fileUrl', [audioUrl]);
      }
      if(videoUrl){
        form.setValue('fileUrl', [videoUrl]);
      }
      
      console.log(url)
      if(uploading) return;
      await axios.post(url, values);

      form.reset();
      router.refresh();
      
    } catch (error) {
      // console.log(error);
    }
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] ?? null;
  //   setFiles(file);
  //   if (previewUrl) {
  //     URL.revokeObjectURL(previewUrl);
  //   }
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setPreviewUrl(url);
  //     console.log(url);
      
  //   } else {
  //     setPreviewUrl(null);
  //   }
  // };
    
  const processFile=(file:any)=>{
      return URL.createObjectURL(file);

  }
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if(!e.target.files || e.target.files.length===0){
  //     return;
  //   }
  //   const filess = e.target.files;
  //   form.setValue('file', filess);

  //   for (const file of Array.from(filess)) {
  //     files.push(file);
  //     previewUrl.push(processFile(file));
  //   }
  //   router.refresh();
  // };
 
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
    try {
      setUplodaing(true);
      const res = await axios.post('/api/upload', formData);
      if(res.status===200){
        form.setValue("fileUrl", res.data.fileUrl);
      }
      // console.log(res);
      setUplodaing(false);
    } catch (error) {
      setUplodaing(false)
    }
  };

  const RemoveImage =(id:number)=>{
    // const index = files.indexOf(id);
    // console.log(index, id);
    
  if (id > -1) {
    files.splice(id, 1);
    previewUrl.splice(id,1);
  }
 
  }

  const onGroupSelect =(e:string)=>{
    const editorContent = tinymce.activeEditor.getContent({ format: 'html' });
    console.log(editorContent, e);
    // setHandlerName(e);
    // const value = form.getValues("content");
    // const final = hadlerName + value;
    // form.setValue("content", final);
    // console.log("VALUE", form.getValues("content"));
    // let editor = document.getElementsByClassName("mce-content-body");
    // console.log(editor)
    // // editor?.innerText = "<p> Hii </p>";
    // // editor?.innerText = final;
    // router.refresh();
  }

  const onEditorChangeHandler=(e:any)=>{
    console.log("Editor Change", e);
  }


  return(
    <>
    

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>

              <div className='msg_footer'>
      <div className="editor_container">
      
     
      <div id="editor_htigh">
        <Editor
        // {...field}
        id="contentEditor"
        onEditorChange={e=>form.setValue('content', e)}
        onChange={e=>onEditorChangeHandler(e)}
        //  className='quill_editor'
        value={form.getValues('content')}
        apiKey='yyyncy8o4zxczahnhs5n0tz3ha0h7cvmrdg8jcap53vuu6wj'
         init={{
          skin: 'oxide-dark',
          content_css: 'dark',        
          menubar:false,
          placeholder:`Message to ${name}`,
            selector: "textarea",
            height:100,
            statusbar:false,
            plugins: [
                  "anchor", "autolink", "charmap", "codesample", "fullscreen",
                "help", "image", "insertdatetime", "link", "lists", "media",
                "preview", "searchreplace", "table", "visualblocks", "emoticons", "mentions",
            ],
            toolbar: "bold italic underline strikethrough bullist numlist outdent indent table codesample emoticons",
          
          }}
 />   
</div>
          
            <div className="preview_imsg">
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
              previewUrl && files && previewUrl.map((image, i)=>(
                <div>
                  <div key={i}>
                            {files[i]?.type.startsWith("image/") ?
                        <div className="upload_img">
                           <div className="upld_img_opt">
                          {
                            uploading ? 
                            
                            <Button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </Button> 
                            : ''
                          }
                          <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        </div>
                            <Image  src={image} alt="upload" height={100} width={100} />
                        </div> :
                       files[i]?.type.startsWith("video/")?
                       <div className="upload_img">
                        <div>
                          {
                            uploading ? 
                            
                            <Button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </Button> 
                            : ''
                          }
                          <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        </div>
                       
                         <video  src={image} height={100} width={100} />
                     </div>  : 
                    files[i]?.type==="application/pdf" ?
                     <div className="upload_application">
                      <div className="application_cross">
                          {
                            uploading ? 
                            
                            <Button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </Button> 
                            : ''
                          }
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
                         {
                           uploading ? 
                           
                           <Button disabled className=''>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                           </Button> 
                           : ''
                         }
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
                         {
                           uploading ? 
                           
                           <Button disabled className=''>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                           </Button> 
                           : ''
                         }
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
                         {
                           uploading ? 
                           
                           <Button disabled className=''>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                           </Button> 
                           : ''
                         }
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
                              {
                                uploading ? 
                                
                                <Button disabled className=''>
                               <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                                </Button> 
                                : ''
                              }
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
                              {
                                uploading ? 
                                
                                <Button disabled className=''>
                               <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                                </Button> 
                                : ''
                              }
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
    {
      uploading ? 
      
      <Button disabled className=''>
     <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
      </Button> 
      : ''
    }
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
            {
              audioUrl && 
              <div className="upload_application">
<div className="application_cross">
    
    <button onClick={()=>setAudioUrl(null)} className="cross_btn"><RxCross2  /></button>
  </div>
  <div className="doc_thumbnail doc_thumbnail_width">
   <div className="doc_icon bg-orange-700">
   <BsRecordCircleFill/> 
   </div>
   <div className="doc_thum_nm">
    <div className="extn">{audioName}</div>
    <div >wav</div>
    
   </div>
  </div>
</div>
            }

            {
              screenUrl &&
              <div className="upload_img">
               <div>
                   
                   
                 <button onClick={()=>setScreenUrl(null)}><RxCross2  /></button>
               </div>
              
                <video  src={screenUrl} height={100} width={100} />
              </div> 
            }
      {
              videoUrl &&
              <div className="upload_img">
               <div>
                   
                   
                 <button onClick={()=>setVideoUrl(null)}><RxCross2  /></button>
               </div>
              
                <video  src={videoUrl} height={100} width={100} />
              </div> 
            }
            </div>        
                    <div className='editor_footer'>

          <div className="footer_action">
          <button
                    type="button"
                    className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
                  >
                     <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
            {/* <RiComputerFill /> Upload from local */}
            <Plus className="text-white " />

<input type="file" id="file" onChange={handleChange} multiple
accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt "
/>
</label>
                    
                  </button>
          {/* <PlusIcon fileUrl={fileUrl} files={files} setFileUrl={setFileUrl} setFiles={setFiles} /> */}
          
          <button className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
          ><AiOutlineFullscreen/></button>
          <div className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center overflow-hidden">
          <EmojiPicker
                      // onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}

                      onChange={(e: string) =>form.setValue('content', e) }

                    />
          </div>
          
          {/* <button 
          className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"
          ><GoMention /></button> */}
          <Mention open={mentionDialog} setOpen={setMentionDialog}  groups={groups} onSelectHandler={onGroupSelect}  />
          <VideoRecorder setVideoName={setVideoName} setVideoUrl={setVideoUrl} />
          <VoiceRecorder setAudioUrl={setAudioUrl} setAudioName={setaudioName} />
          <ScreenRecording setScreenName={setScreenName} setScreenUrl={setScreenUrl}  />

          {/* <button
          className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"
          ><FaMicrophone/>
          </button> */}
          </div>

          <div  className={isLoading?'send_msg':"send_msg ssdnBg"}  >
            <button onClick={onSubmit} disabled={isLoading}  >
              
              {
                isLoading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  <IoSend/>
              }
             
              
              
              </button>|
            <button disabled={isLoading} ><MdKeyboardArrowDown/></button>
          </div>

          
        </div>
      </div>
      </div>

  


                    

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>




    
      
    
    
    </>
  )

}




export default EditorFooter;