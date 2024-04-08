import { MemberRole } from '@prisma/client'
import React from 'react'
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
    title:string
    subTitle:string
    state:string
    onChangeHandler:any
}
function RoleComponents({title, subTitle, state, onChangeHandler}:Props) {
    const roles = MemberRole;
  
  return (
    <>
    <div className="role_com_container">
        <div className='role_left'>
            <div className='role_title'>{title}</div>
            <div className='role_subtitle'>{subTitle}</div>
        </div>
        <div className='role_right'>

    <Select onValueChange={(val)=>onChangeHandler(title, val)} defaultValue={state}>
      <SelectTrigger className="w-[120px]">
      <SelectValue placeholder={state==="admin" ? "Owner" : state==="moderator" ? "Admninistator" : "Regular Member"}  />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          {/* <SelectLabel>{state==="admin" ? "Owner" : state==="moderator" ? "Admninistator" : "Regular Member"}</SelectLabel> */}
          <SelectItem value={MemberRole.admin} defaultChecked={MemberRole.admin===state}>Owner</SelectItem>
          <SelectItem value={MemberRole.moderator} defaultChecked={MemberRole.moderator===state}>Administrator</SelectItem>
          <SelectItem value={MemberRole.user} defaultChecked={MemberRole.user===state}>Regular Member</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>            
        </div>
    </div>
    
    </>
  )
}

export default RoleComponents