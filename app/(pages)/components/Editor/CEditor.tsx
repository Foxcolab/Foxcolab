"use client";

import { EditorJsTool } from './Editorjstool';
// export const Editor = new EditorJS({ 
 
//   holder: 'editorjs', 
  

//   tools:{
//     embed: Embed,
//     table: Table,
//     list: List,
//     warning: Warning,
//     code: Code,
//     // linkTool: LinkTool,
//     image: SimpleImage,
//     // raw: Raw,
//     quote: Quote,
//     // marker: Marker,
//     checklist: CheckList,
//     // delimiter: Delimiter,
//     // inlineCode: InlineCode,
//     simpleImage: SimpleImage
//   } 
// })

// export  default CanvasEditor;


import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface Props {
  data:JSON,
  onChange:Function,
  holder:String,
  setTitle:Function,
  title:String,
  readonly:boolean
}


export default function Editor({ data, onChange, holder,  setTitle, title, readonly }:Props) {
  console.log("THIS IS BLOCL", data);
  
  //add a reference to editor
  const ref = useRef();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        data:{blocks:data},
        // readOnly:readonly,
        placeholder: "Start writing...",
        // defaultBlock:'paragraph',
        // defaultBlock:[data],
        tools:EditorJsTool,
        // tools: {
        //   Color: {
        //     class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        //     config: {
        //        colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
        //        defaultColor: '#FF1300',
        //        type: 'text', 
        //        customPicker: true // add a button to allow selecting any colour  
        //     }     
        //   },
        //   header: {
        //     class: Header,
        //     config: {
        //       placeholder: 'Enter a header',
        //       levels: [2, 3, 4],
        //       defaultLevel: 3
        //     }
        //   },
        //   embed: Embed,
        //       table: Table,
        //       list: List,
        //       link:Link,
        //       simpleImage: SimpleImage,
        //       warning: Warning,
        //       code: Code,
        //       // linkTool: LinkTool,
        //       paragraph: {
        //         class: Paragraph,
        //         inlineToolbar: true,
        //       },
        //       image: SimpleImage,
        //       SimpleImage:SimpleImage,
        //       // raw: Raw,
        //       quote: Quote,
        //       marker: Markar,
        //       checklist: CheckList,
        //       // delimiter: Delimiter,
        //       // inlineCode: InlineCode,
        // },
        async onChange(api, event) {
          // const data = await api.saver.save();
          onChange(data);
        },
      });
      // editor.blocks.insert(data.type, data.data);
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);


  return  (<>
  
  
  <input type='text' placeholder='Your canvas title' onChange={e=>setTitle(e.target.value)} defaultValue={title} />
  <hr  style={{borderTop:"1px solid rgb(114, 114, 114)", marginTop:"1rem"}} />
  <div id={holder} className="prose " />
 
  
  
  
  </>);
};