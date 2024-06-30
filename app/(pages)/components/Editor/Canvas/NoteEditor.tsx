import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
 import { useTheme } from "next-themes";
import { useState } from "react";
import { JsonValue } from "@prisma/client/runtime/library";
import axios from "axios";
import { useParams } from "next/navigation";


interface Props {
  editable?:boolean;
  initialContent?:JsonValue
  onChange:(value:any)=>void

}
export default function NoteEditor({editable, initialContent, onChange}:Props) {


  const params = useParams();

  const HandleUpload = async(file:any)=>{
    try {
      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`/api/upload?serverId=${params?.id}`, formData);
        console.log(res);
        if(res.status===200){
          return res.data.publicUrl;
      }
      

    } catch (error) {
      console.log(error);
    }

  }

  const editor = useCreateBlockNote({
    initialContent:initialContent ? initialContent as PartialBlock[] : undefined,
    uploadFile:HandleUpload
  });

  const {resolvedTheme} = useTheme();

  
 
  return(<>
  
    <BlockNoteView editor={editor} editable={editable}
    onChange={()=>onChange(editor.document)}
      theme={resolvedTheme==="dark" ? "dark" : "light"}
      
      />


  
  
  </>
  )
}