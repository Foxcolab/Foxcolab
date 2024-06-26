
"use client";
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
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Editor } from '@tinymce/tinymce-react'
import ReactQuill from 'react-quill';
// import VideoRecorder from "../Chat/Recorder/VideoRecorder";


interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    schemaType: "conversation" | "forum" | "thread" | "Channel" | "DirectMessage";
    setisEditing:any
  }
  const formSchema = z.object({
    content: z.string().optional(),
  });

const EditMessageEditor = ({apiUrl,
    query,
    name,
    setisEditing,
    schemaType
  }: ChatInputProps)=> {
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: name,
    }
  });
  
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      if(schemaType==="DirectMessage"){
        const url = qs.stringifyUrl({
          url: apiUrl,
          query,
        });
        const res = await axios.post(url, values);
        
      }else if(schemaType==="Channel"){
        const url = qs.stringifyUrl({
          url: apiUrl,
          query,
        }); 
        const res = await axios.post(url, values);

      }else {
        const url = qs.stringifyUrl({
          url: apiUrl,
          query,
        });
      }
      
  
      form.reset();
      router.refresh();
      setisEditing(false);
    //   console.log("Set to false")
    } catch (error) {
    //   setisEditing(false);
      console.log(error);
    }
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

              <div className=''>
      <div className="">
      
     
      <div id="">
      <ReactQuill
          {...field}
            theme={"snow"}
            defaultValue={name}
            // onChange={e=>InputHandler(e)} 
            // placeholder={`Send a messsage in "${name}`} 
            modules={{'toolbar':[
              ['bold', 'italic', 'underline','strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
             
            ]}}
            />
</div>
          
                
                    <div className='edit_msg_btns'>

         
          <div className='send_can_btn'>
          <div className='send_can_div'>
            <button onClick={()=>setisEditing(false)}>Cancel</button>
          </div>
          <div  className={isLoading?'send_msg':"send_msg ssdnBg"}  >
            <button onClick={onSubmit} disabled={isLoading}  >
              
              {
                isLoading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  "Send"
              }
             
              
              
              </button>
          </div>
         
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




export default EditMessageEditor;