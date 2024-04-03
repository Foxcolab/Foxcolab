"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
// const Editor = dynamic(() => import("./Canvas/CanvasEditorJs"), { ssr: false });
import Editor from "./CEditor2";
function CanvasEditor() {
  const [value, setValue] = useState('');
  return (
    <>
<div id="editorjs"></div>
{/* <Editor value={value} onChange={setValue} holder="editorjs-container" />  */}

    {/* <Editor data={value} setData={setValue} /> */}
 


    </>
  )
}

export default CanvasEditor