
"use client";

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
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdOutlineVideocam } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { GoMention } from "react-icons/go";
import {GoPlusCircle} from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons"
import EditorEmoji from "../Emoji/EditorEmoji";
import ScreenRecording from "../Chat/Recorder/ScreenRecording";
import VoiceRecorder from "../Chat/Recorder/VoiceRecorder";
import VideoRecorder from "../Chat/Recorder/VideoRecorder";
import Mention from "./EditorFooter/MentionComponent";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  // type: "forums" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

 const ThreadEditor = ({
  apiUrl,
  query,
  name,
}: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState( []);
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
  const [value, setValue ] =useState('')
  const [emojiDialog, setEmojiDialog] = useState(false);
  const reactQuillRef = useRef(null);
  const [toolBarToogle, setToolBarToogle] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      console.log(values)
      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': ['white'] }, { 'background': ['black'] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

  const modulee = {
    toolbar:toolbarOptions
  }

  const insertEmoji = (emoji:any, onChangee:any) => {
    const quill = reactQuillRef?.current?.getEditor();
    const range = quill.getSelection(true);
    quill.insertText(range.index, emoji);
    onChangee(range.index, emoji);
    // field.onChange(`${field.value}${emoji}`)}

  };

  const RemoveQuillText =()=>{
    const quill = reactQuillRef?.current?.getEditor();
    quill.deleteText(0, quill.getLength())
  }


  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>

              <div className="msg_footer">
                <div className="editor_container">
                  <div>
      <div id="editor_htigh">

      <ReactQuill 
       theme='snow'
        placeholder={`Message to ${name}`} 
        modules={{'toolbar':[
          ['bold', 'italic', 'underline','strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['blockquote'],['code-block'],
          ['clean']
        ]}}
         className='quill_editor' {...field}
      // readOnly={true}
      // theme="bubble"
      
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
              previewUrl.length!==0 && files.length!==0 && previewUrl.map((image, i)=>(
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


        <div className="editor_footer">
        
          <div className="footer_action">
          <button
                    type="button"
                    className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
                  >
                     <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
            {/* <RiComputerFill /> Upload from local */}
            <Plus className="text-white dark:text-[#29292a]" id="lucide_plus" />

<input type="file" id="file" onChange={handleChange} multiple
accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt "
/>
</label>
                    
                  </button>
                  <button className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center" ><AiOutlineFullscreen/></button>
          <div className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center overflow-hidden">
          <EditorEmoji
                      // onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                      setEmojiDialog={setEmojiDialog}
                      emojiDialog={emojiDialog}
                      onChange={(emoji: string) =>
                          // {
                          //   {console.log(field.value, emoji)}
                          //   field.onChange(`${field.value} ${emoji}`)
                          // }
                          insertEmoji(emoji, field.onChange)

                      
                      }

                    />
          </div>
          
          
          <Mention open={mentionDialog} setOpen={setMentionDialog}  groups={groups} onSelectHandler={(e:any)=>onGroupSelect(e, field.onChange)}  />
          <VideoRecorder setVideoName={setVideoName} setVideoUrl={setVideoUrl} />
          <VoiceRecorder setAudioUrl={setAudioUrl} setAudioName={setaudioName} />
          <ScreenRecording setScreenName={setScreenName} setScreenUrl={setScreenUrl}  />

          </div>

          <div  className={"send_msg ssdnBg"}  >
            <button onClick={onSubmit} disabled={isLoading}  >
              
              {
                isLoading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  <IoSend/>
              }
             
              
              
              </button>|
            <button disabled={isLoading} ><MdKeyboardArrowDown/></button>
          </div>

          
        </div>
      </div>

  
      </div></div>

                    

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ThreadEditor;



