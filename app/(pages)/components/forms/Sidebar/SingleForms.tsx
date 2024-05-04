import { Form, FormField, Member, Message, User, formResponse } from '@prisma/client'
import React, { useState } from 'react'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ViewForm from '../../Chat/form/ViewForm'

interface Props {
    Message:Message & {
        member: Member & {
            user:User
        },
        form:Form & {
            formFields:FormField[]
        } & {
            formResponses:formResponse[]
        }
    }
    type:"myForms" | "submittedForm"
    currentMember:Member
}
function SingleForms({Message, type, currentMember}:Props) {
    const [viewDialog, setViewDialog] = useState(false);
    const member = Message.member;
    const form = Message.form;
    const formFields = form.formFields;

    let myFieldResponse = [];
    if(type==="submittedForm"){
        for(let i=0; i<form.formResponses.length;i++){
            if(form.formResponses[i].createdBy===currentMember.id){
                console.log(form.formResponses[i])
                myFieldResponse = form.formResponses[i].formFieldResponses;
            }
        }
    }


    console.log("Respose", form.formResponses, form.formResponses.length)

  return (
    <>
    {
        type==="submittedForm" ?
         <div className='relative group flex items-center p-2 mb-4 mr-4  transition w-full single_poll_container rounded-md border'>
        <div className="group flex gap-x-2 items-start w-full ">
        <div  className="cursor-pointer hover:drop-shadow-md transition">
        { (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
        <LetterAvatar 
        name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name as string }
       size={40}
        radius={50}
        />
        : 
        <UserAvatar src={member.user.profilePic} />
        }
        </div>
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-x-2 ">
        <div className="flex items-center">
          <p  className=" chat_un">
            {!member?.user ? "User": member?.user.name}
          </p>
        </div>
        <span className=" timestamp">
          {format(new Date(Message.createdAt), 'dd MMM yyyy')}
        </span>
      </div>
          <div>
    
          <div className="border rounded text-sm form_container_background">
            <div className='text-lg pb-1 font-semibold'>{form.title} </div>
            <hr />
            <div className='pt-1'>{form.description}</div>
          </div>
          {formFields?.length!==0  &&       
            formFields.map((formField, i:number)=>(
              <div key={formField.id}>           
              <div key={formField.id} className='border rounded text-sm form_container_background'>
                {
                  formField.type==="shortAns" ?
                  <>
                  <div>
                    <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                    <div style={{color:"var(--color3)"}}>{formField.description}</div>
                    <div className='mt-2'><Input type='text' disabled defaultValue={myFieldResponse[i].fieldResponse[0]} /></div>
                  </div>
                  </> :
                  formField.type==="longAns" ?
                  <>
                  <div>
                    <label htmlFor="" className='font-semibold'>{formField.name}</label>
                    <div style={{color:"var(--color3)"}}>{formField.description}</div>
                    <div className='mt-2'><Textarea  className='resize-none' disabled  defaultValue={myFieldResponse[i].fieldResponse[0]}  /></div>
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
                          <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id} checked={myFieldResponse[i].fieldResponse.includes(option)}  disabled /></span>{option} </div>
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
                          <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' disabled checked={myFieldResponse[i].fieldResponse.includes(option)}  /></span> {option} </div>
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
                    <Select  defaultValue={myFieldResponse[i].fieldResponse[0]} >
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
                      <div>Uploaded {myFieldResponse[i].fieldResponse.length} file</div>
                    
                    </div>   
                  </div>
                  </> :
                  ''    
                }   
              </div>       
              </div>         
            ))     
          }
           
          </div>  
      </div>
      </div>
    
        </div> :

        // type === submitted 
        <div className='relative group flex items-center p-2 mb-4 mr-4  transition w-full single_poll_container rounded-md border'>
    <div className="group flex gap-x-2 items-start w-full ">
    <div  className="cursor-pointer hover:drop-shadow-md transition">
    { (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
    <LetterAvatar 
    name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name as string }
   size={40}
    radius={50}
    />
    : 
    <UserAvatar src={member.user.profilePic} />
    }
    </div>
<div className="flex flex-col w-full">
  <div className="flex items-center gap-x-2 ">
    <div className="flex items-center">
      <p  className=" chat_un">
        {!member?.user ? "User": member?.user.name}
      </p>
    </div>
    <span className=" timestamp">
      {format(new Date(Message.createdAt), 'dd MMM yyyy')}
    </span>
  </div>
      <div>

      <div className="border rounded text-sm form_container_background">
        <div className='text-lg pb-1 font-semibold'>{form.title} </div>
        <hr />
        <div className='pt-1'>{form.description}</div>
      </div>
      {formFields?.length!==0  &&       
        formFields.map((formField)=>(
          <div key={formField.id}>           
          <div key={formField.id} className='border rounded text-sm form_container_background'>
            {
              formField.type==="shortAns" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'><Input type='text' disabled  /></div>
              </div>
              </> :
              formField.type==="longAns" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'><Textarea  className='resize-none' disabled   /></div>
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
                      <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id}   disabled /></span>{option} </div>
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
                      <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' disabled  /></span> {option} </div>
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
                <Select  >
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
                <div>File Type: {formField.fileType}</div>
                <div>File Count: {formField.fileCount}</div>
                <div>File Max Size: {formField.fileMaxSize}</div>    
                </div>   
              </div>
              </> :
              ''    
            }   
          </div>       
          </div>         
        ))     
      }
    <div className='form_container_background flex justify-between items-center border rounded'>    
           <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-yellow-500 text-white' onClick={()=>setViewDialog(true)}>View Response ({form.formResponses.length || 0})</button>
          </div>
      </div>  
  </div>
  </div>
  {
          viewDialog && <ViewForm open={viewDialog} setOpen={setViewDialog} formResponse={form.formResponses} formFields={form.formFields} />
        }
    </div> 

    }  
    </>
  )
}

export default SingleForms