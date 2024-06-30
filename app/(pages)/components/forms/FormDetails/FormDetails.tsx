"use client";
import { FormField, FormFieldResponse, Member, User, formResponse, Form } from '@prisma/client'
import React from 'react'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { RxBox } from 'react-icons/rx';
import { IoCheckboxOutline } from 'react-icons/io5';
import MsgFile from '../../Chat/MsgFile';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

  

interface Props {
    formResponse:formResponse & {
        createdMember: Member & {
            user:User
        } 
    } & {
        formFieldResponses:FormFieldResponse[] & {
            formField:FormField
        }
    }
    form:Form
}
function FormDetails({formResponse, form}:Props) {

    const submittedMember = formResponse.createdMember;
    const formFieldResponses:FormFieldResponse[] = formResponse.formFieldResponses;

    const params = useParams();
    const router = useRouter();

    const hrefHandler =()=>{
        router.push(`/servers/${params?.id}/forms`);
    }
  return (
    <>
    
    <div className="r_des_container">
        <Button className='py-2 px-4 bg-cyan-700 text-white hover:bg-cyan-800' onClick={()=>hrefHandler()}>Back to Forms</Button>
        <div className="respondent p-4">
            <div className='text-[2rem] font-bold text-center'>{form.title}</div>
            <div className='text-center'>{form.description}</div>
        </div>
        <div className="respondent">
            <div className='px-4'>
            <label htmlFor="">RESPONDENT</label>
        <div className='flex gap-8'>
        <div className='resp_prf'>
        {
            ((submittedMember.user.profilePic===null || submittedMember.user.profilePic===undefined)) ? 
          <LetterAvatar
           name={submittedMember.user.name===undefined ? "Y" :submittedMember.user.name as string}
           size={40}
           radius={50}
            />
        
            : 
          <UserAvatar src={submittedMember.user.profilePic} />

          }
        
          <span className='flex items-center  gap-4'>{submittedMember.user.name} 
        <span className='text-sm text-[#8a9aa2]'>On {format(new Date(formResponse.createdAt), 'd MMM, yyyy')}</span></span>
        </div>
        </div>
            </div>

        </div>

        {
            formFieldResponses && formFieldResponses.map((res, i)=>(
                <>
                <div className="respondent" key={res.id}>
                    <div className='px-8 py-4'>
                    <div className='font-semibold '>{res.formField.name}</div>
                    {
                        res.formFieldType==="shortAns" ? 
                        <>
                        <div className='py-2'>
                        <Input value={res.fieldResponse[0]} disabled className='bg-[#f1f5f8] text-black' />
                        </div>
                        </> :
                        res.formFieldType==="longAns" ? 
                        <>
                        <div className='py-2'>
                        <Textarea value={res.fieldResponse[0]} disabled className='bg-[#f1f5f8] text-black' />
                        </div>
                        </>:
                        res.formFieldType==="singleChoice" ? <>
                        <div className='py-2'>
                         {res.formField.options.map((option:string, i:number)=>(
                            <>
                            <div key={i} className='flex items-center gap-2 py-1'> <span className='text-[1.5rem] text-[#b3cedd]'> {res.fieldResponse.includes(option) ? <IoMdRadioButtonOn/> : <IoMdRadioButtonOff/> } </span> {option}</div>
                            
                            </>
                         ))}
                        </div>
                        </> :
                        res.formFieldType==="multipleChoice" ? <>
                        {res.formField.options.map((option:string, i:number)=>(
                            <>
                            <div key={i} className='flex items-center gap-2 py-1'> <span className='text-[1.5rem] text-[#b3cedd]'> {res.fieldResponse.includes(option) ? <IoCheckboxOutline/> : <RxBox/> } </span>{option}</div>
                            
                            </>
                         ))}
                        </> :
                        res.formFieldType==="select" ? <>
                            <div className="py-2">
                            <Select>
                                <SelectTrigger className="w-full bg-[#f1f5f8] text-black" defaultValue={res.fieldResponse[0]} disabled>
                                    <SelectValue placeholder={res.fieldResponse[0]} />
                                </SelectTrigger>
                                <SelectContent className='bg-[#f1f5f8] text-black'>
                                <SelectGroup>
                                  {res.formField.options.map((option:string, i:number)=>(
                            <>
                                 <SelectItem value={option}  key={i}>{option}</SelectItem>

                            {/* <option value={option} selected={res.fieldResponse.includes(option)} key={i}>{option}</option> */}
                            </>
                         ))}
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                            </div>
                            
                        
                        </> :
                        res.formFieldType==="file" ? <>
                            {
                                res.files.length>0 && 
                                <MsgFile files={res.files} length={res.files} />
                            }
                        </> :
                        ""
                    }


                    </div>
                </div>
                
                </>
            ))
        }




    </div>
    
    
    </>
  )
}

export default FormDetails