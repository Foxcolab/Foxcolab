"use client";
import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
function Editor({setContent, name, disable}) {
  console.log(content);
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
  return (
    <>
    
      <ReactQuill disabled={disable} theme='snow' placeholder={`Message to ${name}`} modules={modulee} className='quill_editor'  
      
      
      />
  
    </>
  )
}

export default Editor