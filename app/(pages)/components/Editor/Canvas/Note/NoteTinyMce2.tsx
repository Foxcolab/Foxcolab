import { Editor } from '@tinymce/tinymce-react'
import React from 'react';
import { useTheme } from 'next-themes';

interface Props {
    setTitle:Function,
    defaultValue:string
}


const NoteTinyMce2 = ({setTitle, defaultValue}:Props)=> {

  const {resolvedTheme} = useTheme();

  const cloudName =  process.env.REACT_APP_CLIENT_NAME
    const unsignedUploadPreset = process.env.REACT_APP_UPLOAD_PRESET

    const FileLoc =  'https://cdn.jsdelivr.net/npm/@wiris/mathtype-tinymce6@8.4.0/plugin.min.js';
  

    const content = defaultValue
    

  return(
    <>
    
    <Editor
        
        onEditorChange={(e)=>setTitle(e)}
        value={content}
        // value={content}
        apiKey='yyyncy8o4zxczahnhs5n0tz3ha0h7cvmrdg8jcap53vuu6wj'
         init={{
            theme_advanced_buttons3_add : "insertlayer,moveforward,movebackward,absolute",
          menubar: false,
          selector: 'textarea',
          a_plugin_option: false,
          statusbar:false,
        //   readonly:true,
          editable_root:true,
         height: '100%',
        //   skin: 'oxide-dark',
        //  content_css: 'dark',

        skin: resolvedTheme==="dark"? "oxide-dark" : "oxide" ,
        content_css: resolvedTheme==='dark' ? 'dark' : 'oxide',
         
        branding: false,
        external_plugins: {
          'tiny_mce_wiris' : FileLoc
      },
       
          plugins: [
             'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview',  'pagebreak', 'searchreplace',  'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'emoticons', 'template', 'codesample', 'layer', 
          ],
          toolbar: 'undo redo |' +
            'bold italic forecolor | alignleft aligncenter alignright alignjustify |'  + 
            'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry ' +
            'bullist numlist outdent indent | image | print preview media |' +
            'forecolor backcolor emoticons',

          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
          htmlAllowedTags:  ['.*'],
          htmlAllowedAttrs: ['.*'],
          extended_valid_elements: '*[.*]',
       a_configuration_option: 400,
    //    images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        images_upload_credentials: true,
        image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
           
            init_instance_callback: function (editor) {
                // move last aux helper to dialog, if field is in a dialog
                const dialogContainer = editor.editorContainer.closest('dialog')
                if (dialogContainer) {
                  const auxElements = document.querySelectorAll('body > .tox-tinymce-aux')
                  if (auxElements.length) dialogContainer.append(auxElements[auxElements.length - 1])
                }
              }  
          
          }}


      />
      
    
    
    </>
  )

}




export default NoteTinyMce2;