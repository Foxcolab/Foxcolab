
"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "../../Emoji/Emoji";
import { useModal } from "@/hooks/useModalStore";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdOutlineVideocam } from "react-icons/md";
import { FaMicrophone, FaRegFilePdf } from "react-icons/fa";
import { GoMention } from "react-icons/go";
import {GoPlusCircle} from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons"
import EditorEmoji from "../../Emoji/EditorEmoji";
import { useRef, useState } from "react";
import { GrDocumentCsv, GrPersonalComputer } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { FaRegFileZipper } from "react-icons/fa6";
import { BsFileEarmarkPptFill, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXlsx, BsRecordCircleFill } from "react-icons/bs";
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  // type: "forums" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
  contentText:z.string().optional(),
  fileUrl: z.string().array().optional()

});

 const ThreadEditor = ({
  apiUrl,
  query,
  name,
}: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const reactQuillRef = useRef(null);
  const [emojiDialog, setEmojiDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState( []);
  const [loading, setLoading] = useState(false);


  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      contentText:""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);

      form.reset();
      router.refresh();
      setLoading(false);
      form.setValue("content", "");
      form.setValue("fileUrl", []);
      form.setValue("contentText", "")
      setFiles([]);
      setPreviewUrl([]);
      setEmojiDialog(false);

    } catch (error) {
      setLoading(false);
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
    console.log(reactQuillRef);
    console.log(reactQuillRef.current.getEditor());
    const quill = reactQuillRef?.current?.getEditor();
    const range = quill.getSelection(true);
    quill.insertText(range.index, emoji);
    onChangee(range.index, emoji);
    console.log("ACTUAL VALUE", form.getValues("content"));
    // field.onChange(`${field.value}${emoji}`)}

  };

  const RemoveQuillText =()=>{
    console.log(reactQuillRef.current.getEditor());
    const quill = reactQuillRef?.current?.getEditor();
    quill.deleteText(0, quill.getLength())
    console.log("QUILL", quill)
  }
  const InputHandler = (event:any) => {
    form.setValue("content", event);
    const editorRef = reactQuillRef.current.getEditor();
    form.setValue("contentText", editorRef.getText());
    console.log(form.getValues("contentText"));
  };

  const processFile=(file:any)=>{
    return URL.createObjectURL(file);
}

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
      setUploading(true);
      const res = await axios.post(`/api/upload?serverId=${params?.id}`, formData);
      if(res.status===200){
        form.setValue("fileUrl", res.data.fileUrl);
      }
      // console.log(res);
      setUploading(false);
    } catch (error) {
      setUploading(false)
    }
  };
  const RemoveImage =(id:number)=>{
    if (id > -1) {
     files.splice(id, 1);
      previewUrl.splice(id,1);
    }
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

              <div className="thread_side_container">
      <ReactQuill 
       theme='snow'
        placeholder={`${name}`} 
        defaultValue={form.getValues("contentText")}
        modules={{'toolbar':[
          ['bold', 'italic', 'underline','strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['blockquote'],['code-block'],
          ['clean']
        ]}}
        onChange={e=>InputHandler(e)} 
         className='quill_editor' 
        //  {...field}
      // readOnly={true}
      // theme="bubble"
      ref={reactQuillRef}
      />

<div className="preview_imsg">
          

           {
             previewUrl.length!==0 && files.length!==0 && previewUrl.map((image, i)=>(
               <div key={i}>
                 <div >
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
           

           </div> 
      
        <div className="  editor_footer">
        
          <div>
          <button className="flex items-center  gap-2 text-sm   p-[0.3rem] rounded" style={{color:'var(--color2'}} >
          <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
            <Plus /> Media
        <input type="file" id="file" onChange={handleChange} multiple
        accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav, .json "
          />
</label>
          </button>
          {/* <button className="flex items-center gap-2 text-sm font-semibold  w-full p-[0.3rem] rounded" style={{color:'var(--color2'}} >
          <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
            <Plus />
            <input type="file" id="file" onChange={handleChange} multiple
          accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav, .json "
/>
</label>
          </button> */}


          <button 
          className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
          ><AiOutlineFullscreen/></button>
          <div className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center ">
          <EditorEmoji
                    setEmojiDialog={setEmojiDialog}
                      emojiDialog={emojiDialog}
                      onChange={(emoji: string) =>
                          insertEmoji(emoji, field.onChange)
                      }
                    />
          </div>
        
          </div>
          {/* send_msg':"send_msg ssdnBg */}
          <div  className={form.getValues("contentText")==="" ? "send_msg" : "send_msg ssdnBg"} >
            <button onClick={onSubmit} disabled={isLoading}  >
              
              {
                isLoading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  <IoSend/>
              }
             
              
              
              </button>|
            <button disabled={isLoading} ><MdKeyboardArrowDown/></button>
          </div>

          
        </div>
      </div>

  


                    

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ThreadEditor;



