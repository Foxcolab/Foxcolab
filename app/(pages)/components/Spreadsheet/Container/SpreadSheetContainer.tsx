"use client";
import { Member, SpreadSheetManager, Spreadsheets, Table } from '@prisma/client'
import React, { useState } from 'react'
import SchemaHeader from '../../Schema/Header/SchemaHeader'
import { FaPlus, FaRegClock } from 'react-icons/fa'
import CreateTable from '../components/CreateTable';
import { cn } from '@/lib/utils';
import SingleTable from '../components/SingleTable';
import { spread } from 'axios';

interface Props {
    tables:Table[]
    name:string
    members:Member[]
    serverMember:Member[]
    member:Member
    description:string
    createdBy:string
    createdAt:string
    type:string
    isAdmin:boolean 
    managers:SpreadSheetManager
    sectionId:string
    activeTable:Table | null

}
function SpreadSheetContainer({activeTable, sectionId, tables, name, members, member, description, createdBy, createdAt, type, isAdmin, managers, serverMember}:Props) {
    
    const [activeState, setActiveState] = useState(activeTable?.name);
    const [table, setTable] = useState<null | Table>(activeTable);
    const [createDialog, setCreateDialog] = useState(false);

    const ClickHandler =(value:string)=>{
        setActiveState(value);
        for(let i=0; i<tables.length; i++){
            if(tables[i].name===value){
                setTable(tables[i]);
            }
        }
    }

  return (
    <>
    
    <div className="body_content_container">
        {/* <SchemaHeader 
        name={name}
        members={members}
        member={member}
        description={description}
        createdBy={createdBy}
        createdAt={createdAt}
        type={type}
        isAdmin={isAdmin}
        schemaType="Spreadsheet" 
        managers={managers}
        serverMembers={serverMember}
      
        /> */}

        {/* Spreadsheets  */}
        <div className='spreadsheet_container'>
            <div className="spread_header border">
            
        <div className='flex items-center gap-4 all_table_container'>
            {
                tables && tables.map((table, i)=>(
                    <button className={cn('border border-l-0 border-t-0 border-b-0', activeState===table.name && "activeTable")} key={i} onClick={()=>ClickHandler(table.name)}>{table.name}</button>
                ))
            }
            <button className='text-xl' onClick={()=>setCreateDialog(true)}><FaPlus/></button>
        </div>
        <div>
            <button className='flex items-center gap-1  font-semibold'><span className=''><FaRegClock/> </span>Logs</button>
        </div>
        </div>
        </div>
        

    </div>
    <hr />
    {
        table!==null && table!==undefined && <SingleTable table={table} sectionId={sectionId} />
    }
    
    
    
    {
        createDialog && <CreateTable open={createDialog} setOpen={setCreateDialog} sectionId={sectionId} />
    }


    </>
  )
}

export default SpreadSheetContainer