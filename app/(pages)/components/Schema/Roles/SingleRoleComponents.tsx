import { SchemaRole } from '@prisma/client'
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
    disabled:boolean
    schemaType:string
}
function SingleRoleCompoents({title, subTitle, state, onChangeHandler, disabled, schemaType}:Props) {
  console.log("Schema Doan;e", title, disabled)
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
      <SelectValue placeholder={state==="admin" ? "Owner" : state==="manager" ? "Manager" : state==="member"? `${schemaType} Member` : state==="serverMember" ? "Server Member" : "Outside Server" }  />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          {/* <SelectLabel>{state==="admin" ? "Owner" : state==="moderator" ? "Admninistator" : "Regular Member"}</SelectLabel> */}
          <SelectItem value={SchemaRole.admin} defaultChecked={SchemaRole.admin===state}>Owner</SelectItem>
          <SelectItem value={SchemaRole.manager} defaultChecked={SchemaRole.manager===state}>Manager</SelectItem>
          <SelectItem value={SchemaRole.member} defaultChecked={SchemaRole.member===state}>{schemaType} Member</SelectItem>
          {
            disabled===true && <>
            <SelectItem value={SchemaRole.serverMember} defaultChecked={SchemaRole.serverMember===state}>Server Member</SelectItem>
          <SelectItem value={SchemaRole.guest} defaultChecked={SchemaRole.guest===state}>Outside Server</SelectItem>
            </>
          }
          

        </SelectGroup>
      </SelectContent>
    </Select>            
        </div>
    </div>
    
    </>
  )
}

export default SingleRoleCompoents