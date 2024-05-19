import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, Member, formResponse } from '@prisma/client';
import React from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface Props {
    form: Form & {
        formFields:FormField[]
      } & {
        formResponses:formResponse[]
      }
    currentMember:Member
}
function SinglePinForm({form, currentMember}:Props) {
    const formFields = form.formFields;
    
    let isSubmitted = false;
    let myFormResponse:any[] = []
    for(let i=0; i<form?.formResponses?.length; i++){
      if(form?.formResponses[i].createdBy===currentMember.id){
        isSubmitted=true;
        myFormResponse=form.formResponses[i].formFieldResponses;
        // setFieldResponse(form.formResponses[i].formFieldResponses);
        break;
      }
    }


  return (
    <>
    
    {
        isSubmitted ?  <div>

        <div className="border rounded text-sm form_container_background">
          <div className='text-lg pb-1 font-semibold'>{form.title} </div>
          <hr />
          <div className='pt-1'>{form.description}</div>
      
        </div>
        {formFields?.length!==0  && 
        
          formFields.map((formField, i)=>(
            <div key={i}>
  
              
            <div key={formField.id} className='border rounded text-sm form_container_background'>
              {
                formField.type==="shortAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Input type='text' disabled value={myFormResponse[i].fieldResponse[0]} /></div>
                </div>
                </> :
                formField.type==="longAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Textarea className='resize-none' disabled value={myFormResponse[i].fieldResponse[0]}  /></div>
                </div>
                </> :
                formField.type==="singleChoice" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                    {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id}  checked={option===myFormResponse[i].fieldResponse[0]} disabled /></span>{option} </div>
                      ))
                    }
      
                  </div>
                </div>
                </> :
                formField.type==="multipleChoice" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox'  checked={option===myFormResponse[i].fieldResponse[0]} disabled  /></span> {option} </div>
                      ))
                    }
                  </div>
                </div>
                </> :
                formField.type==="select" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  <Select defaultValue={myFormResponse[i].fieldResponse[0]} disabled >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Field Type" />
            </SelectTrigger>
            <SelectContent className='w-full p-4'>
              <SelectGroup >
                {
                  formField.options.map((option, j)=>(
                    <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                  ))
                }
                
              </SelectGroup>
            </SelectContent>
          </Select>
                  </div>
                </div>
                </> :
                formField.type==="file" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='my-2'>
                  <div className='border  h-8 flex justify-center items-center rounded w-[8rem]'>
                    Uploaded {myFormResponse[i].fieldResponse.length} file
                  </div>
  
      
      
                  </div>
      
                </div>
                </> :
                ''
      
      
              }
      
            </div>
              
        
          
            </div>
            
          ))
        
        }
  
  
     
      
      
   
      
      
        </div>   : 

<div>

<div className="border rounded text-sm form_container_background">
  <div className='text-lg pb-1 font-semibold'>{form.title} </div>
  <hr />
  <div className='pt-1'>{form.description}</div>

</div>

{
  formFields &&  formFields.map((formField, i)=>(
    <div key={formField.id} className='border rounded text-sm form_container_background'>
      {
        formField.type==="shortAns" ?
        <>
        <div>
          <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
          <div style={{color:"var(--color3)"}}>{formField.description}</div>
          <div className='mt-2'><Input type='text' disabled /></div>
        </div>
        </> :
        formField.type==="longAns" ?
        <>
        <div>
          <label htmlFor="" className='font-semibold'>{formField.name}</label>
          <div style={{color:"var(--color3)"}}>{formField.description}</div>
          <div className='mt-2'><Textarea  className='resize-none' disabled /></div>
        </div>
        </> :
        formField.type==="singleChoice" ?
        <>
        <div>
          <label htmlFor="" className='font-semibold'>{formField.name}</label>
          <div style={{color:"var(--color3)"}}>{formField.description}</div>
          <div className='mt-2'>
            {
              formField.options.map((option, j)=>(
                <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id} disabled /></span>{option} </div>
              ))
            }

          </div>
        </div>
        </> :
        formField.type==="multipleChoice" ? 
        <>
        <div>
          <label htmlFor="" className='font-semibold'>{formField.name}</label>
          <div style={{color:"var(--color3)"}}>{formField.description}</div>
          <div className='mt-2'>
          {
              formField.options.map((option, j)=>(
                <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' disabled /></span> {option} </div>
              ))
            }
          </div>
        </div>
        </> :
        formField.type==="select" ? 
        <>
        <div>
          <label htmlFor="" className='font-semibold'>{formField.name}</label>
          <div style={{color:"var(--color3)"}}>{formField.description}</div>
          <div className='mt-2'>
          <Select >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select Field Type" />
    </SelectTrigger>
    <SelectContent className='w-full p-4'>
      <SelectGroup >
        {
          formField.options.map((option, j)=>(
            <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
          ))
        }
        
      </SelectGroup>
    </SelectContent>
  </Select>
          </div>
        </div>
        </> :
        formField.type==="file" ? 
        <>
        <div>
          <label htmlFor="" className='font-semibold'>{formField.name}</label>
          <div style={{color:"var(--color3)"}}>{formField.description}</div>
        

        </div>
        </> :
        ''


      }

    </div>
  ))
}





</div>
    }
    
    </>
  )
}

export default SinglePinForm