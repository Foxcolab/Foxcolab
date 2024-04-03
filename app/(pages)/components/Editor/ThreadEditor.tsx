
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





const EmojiHandler =(emoji:any)=>{
  
}

// 
  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>

              <div className="thrd_editor">
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
        <div className="  editor_footer">
        
          <div>
          <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className=" h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
          <button 
          className=" h-[24px] w-[24px] bg-zinc-700 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
          ><AiOutlineFullscreen/></button>
          <div className=" h-[24px] w-[24px] text-white bg-zinc-700 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center ">
          <EmojiPicker
                      onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                    />
          </div>
          
          <button 
          className=" h-[24px] w-[24px] bg-zinc-700 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
          ><GoMention /></button>
          <button 
          className=" h-[24px] w-[24px] bg-zinc-700 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
          ><MdOutlineVideocam/></button>
          <button
          className=" h-[24px] w-[24px] bg-zinc-700 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
          ><FaMicrophone/></button>
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

  


                    

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ThreadEditor;



