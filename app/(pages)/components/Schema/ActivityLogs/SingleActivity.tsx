import { ActivityLog, Member, SchemaActivity, User } from '@prisma/client'
import React from 'react'
import {format} from "date-fns"
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import LetterAvatar from '../../UserAvatar/LetterAvatar';


const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface Props {
    activityLog: SchemaActivity & {
        member:Member & {
            user:User
        } & {
            member1: Member & {
                user:User
            }
        }
    }
}

function SingleActivity({activityLog}:Props) {
  return (
    <>

        <div className="">
            {activityLog.activityType==="Update" && activityLog.name==="Name" && 

                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span> 
                changed the {activityLog.schemaType} name from <span>{activityLog.oldData}</span> to <span>{activityLog.newData}</span> at {format(new Date(activityLog.createdAt), DATE_FORMAT)}
                </div>

            
            }
            {
                activityLog.activityType==="Update" && activityLog.name==="Description" && 

                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  changed the <span>{activityLog.schemaType}</span> name from <span>{activityLog.oldData}</span> to <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType==="Update" && activityLog.name==="Type Change" && 
                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  changed the <span>{activityLog.schemaType}</span> type from <span>{activityLog.oldData}</span> to <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType==="Add Member"  && 
                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  added  {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}  at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType==="Add Member"  && 
                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  added  {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}  at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType==="Remove Member"  && 
                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  removed  {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}  at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType==="Left"  && 
                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  left the {activityLog.schemaType} at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType==="Make Manager"  && 
                <div className="single_schema_activity">
                    <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  assined {activityLog.schemaType} manager   {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}  at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
                </div>
            }
            {
                activityLog.activityType ==="Remove Manager" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  removed {activityLog.schemaType}   {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />} from {activityLog.schemaType} manager list  at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>
            }
            {
                activityLog.activityType ==="Create" && activityLog.schemaType==="Canvas" && activityLog.name==="Note" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  created a new note <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>
            }
            {
                activityLog.activityType ==="Delete" && activityLog.schemaType==="Canvas" && activityLog.name==="Note" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  deleted a note <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>  
            }
            {
                activityLog.activityType ==="Create" && activityLog.schemaType==="Forum Channel" && activityLog.name==="Forum" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  created a forum <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>  
            }
            {
                activityLog.activityType ==="Delete" && activityLog.schemaType==="Forum Channel" && activityLog.name==="Forum" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  deleted a forum <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>  
            }
             {
                activityLog.activityType ==="Create" && activityLog.schemaType==="Test Channel" && activityLog.name==="Test" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  created a test <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>  
            }
            {
                activityLog.activityType ==="Delete" && activityLog.schemaType==="Test Channel" && activityLog.name==="Test" && <div className="single_schema_activity">
                <span className='flex items-center gap-1'> {activityLog.member.user.profilePic!==null ? <UserAvatar src={activityLog.member.user.profilePic} /> : <LetterAvatar name={activityLog.member.user.name as string} radius={50} size={25} />}    {activityLog.member.user.name}</span>  deleted a test <span>{activityLog.newData}</span> at <span>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</span>
            </div>  
            }
        </div>

    </>
  )
}

export default SingleActivity