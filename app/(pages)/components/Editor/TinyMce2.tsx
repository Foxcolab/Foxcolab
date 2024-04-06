import { Editor } from '@tinymce/tinymce-react'
import React from 'react';
import { useTheme } from 'next-themes';

interface Props {
    setTitle:Function,
    defaultValue:string
    placeholder:string
}


const TinyMce2 = ({setTitle, defaultValue, placeholder}:Props)=> {
  const cloudName =  process.env.REACT_APP_CLIENT_NAME
    const unsignedUploadPreset = process.env.REACT_APP_UPLOAD_PRESET

    const FileLoc =  'https://cdn.jsdelivr.net/npm/@wiris/mathtype-tinymce6@8.4.0/plugin.min.js';
  

    const content = defaultValue;

    const {resolvedTheme} = useTheme();
    
    
    
  return(
    <>
    
    <Editor
        
        onEditorChange={(e)=>setTitle(e)}
        initialValue={content}
        
        // value={content}
        apiKey='yyyncy8o4zxczahnhs5n0tz3ha0h7cvmrdg8jcap53vuu6wj'
         init={{
          menubar: false,
          selector: 'textarea',
          a_plugin_option: false,
          placeholder: placeholder,
          statusbar:false,
          skin: resolvedTheme==="dark"? "oxide-dark" : "oxide" ,
          content_css: resolvedTheme==='dark' ? 'dark' : 'oxide',
          height: 216,
          branding: false,
          external_plugins: {
          'tiny_mce_wiris' : FileLoc
      },
       
          plugins: [
             'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview',  'pagebreak', 'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'emoticons', 'template', 'codesample', 
          ],
          toolbar: 'undo redo | styles |' +
            'bold italic forecolor | alignleft aligncenter alignright alignjustify |'  + 
            'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry ' +
            'bullist numlist outdent indent | image | print preview media fullscreen |' +
            'forecolor backcolor emoticons',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
          htmlAllowedTags:  ['.*'],
          htmlAllowedAttrs: ['.*'],
          extended_valid_elements: '*[.*]',
       a_configuration_option: 400,
    //    images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        images_upload_credentials: true,
        image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            // file_picker_callback: function (cb, value, meta) {
            //   var input = document.createElement('input');
            //   input.setAttribute('type', 'file');
            //   input.setAttribute('accept', 'image/*');
            //   var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            //   var xhr = new XMLHttpRequest();
            //   var fd = new FormData();
            //   xhr.open('POST', url, true);

            //   input.onchange = function () {
            //     var file = this.files[0];
            //     var reader = new FileReader();
            //     xhr.onload = function () {
            //       if (xhr.readyState === 4 && xhr.status === 200) {
                  
            //         var response = JSON.parse(xhr.responseText);

            //         var url = response.secure_url;
                 
            //         cb(url, { title: response.original_filename });

            //       }
            //     };

            //     reader.onload = function () {
            //       var id = 'blobid' + (new Date()).getTime();
            //       var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
            //       var base64 = reader.result.split(',')[1];

            //       var blobInfo = blobCache.create(id, file, base64);
            //       blobCache.add(blobInfo);

            //       // call the callback and populate the Title field with the file name

            //       fd.append('upload_preset', unsignedUploadPreset);
            //       fd.append('tags', 'browser_upload');
            //       fd.append('file', blobInfo.blob(), blobInfo.filename());

            //       xhr.send(fd);

            //     };

            //     reader.readAsDataURL(file);
            //   }

            //   input.click();
            
        
            // },
            // image_upload_handler:(blobInfo, progress) => new Promise((resolve, reject) => {
            //   const xhr = new XMLHttpRequest();
            //   xhr.withCredentials = false;
            //   xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)
            
            //   xhr.upload.onprogress = (e) => {
            //     progress(e.loaded / e.total * 100);
            //   };
            
            //   xhr.onload = () => {
            //     if (xhr.status === 403) {
            //       reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
            //       return;
            //     }
            
            //     if (xhr.status < 200 || xhr.status >= 300) {
            //       reject('HTTP Error: ' + xhr.status);
            //       return;
            //     }
            
            //     const json = JSON.parse(xhr.responseText);
            
            //     if (!json || typeof json.location != 'string') {
            //       reject('Invalid JSON: ' + xhr.responseText);
            //       return;
            //     }
            
            //     resolve(json.location);
            //   };
            
            //   xhr.onerror = () => {
            //     reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
            //   };
            
            //   const formData = new FormData();
            //   formData.append('file', blobInfo.blob(), blobInfo.filename());
            
            //   xhr.send(formData);
            // })
            
         
    
          
          }}


      />
      
    
    
    </>
  )

}




export default TinyMce2;