import React from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { ActivityLog, Server } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LetterAvatar from '../../../UserAvatar/LetterAvatar';
import { UserAvatar } from '../../../UserAvatar/UserAvatar';
import { format } from 'date-fns';
import { FaNoteSticky } from 'react-icons/fa6';
import { MdForum } from 'react-icons/md';
import { RiSurveyFill } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi2';
import { FaDharmachakra } from 'react-icons/fa';


const DATE_FORMAT = "dd MMM yyyy, hh:mm";

interface Props {
  setOpen:any
  serverId:string
  activityLogs: ActivityLog[]
}
function ActivityLogComp({setOpen,serverId, activityLogs}:Props) {
  console.log("Activity Logs", activityLogs);
  return (
    <>
    
    <ItemHeader title="Activity Logs" setOpen={setOpen} />
    
    <div className="setting_section" style={{borderBottom:"none"}}>       
        <div className="setting_section_title">All Activites </div>
        <div className="setting_section_content">   

            <Table className='server_member_table'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">Member</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activityLogs &&  activityLogs.map((activityLog:ActivityLog, i:number) => (
          <TableRow key={activityLog.id}>
            <TableCell>
                      <div className="flex items-center justify-center gap-1">
                          {
                            activityLog.createdMember.user.profilePic===null ? 
                            <LetterAvatar name={activityLog.createdMember?.user?.name} size={30} radius={50} /> :
                            <UserAvatar src={activityLog.createdMember?.user?.profilePic} />
                            
                          }
                          {activityLog.createdMember.user.name}
                          </div>
            </TableCell>
            <TableCell>
            {/* {member.role} */}
            {
              activityLog.type==="Created" ? <>Created {activityLog.schemaType==="Channel"?"#" : activityLog.schemaType==="Canvas"?<FaNoteSticky/> : activityLog.schemaType==="Forum"?<MdForum/> :activityLog.schemaType==="Test Channel" ? <RiSurveyFill/> :activityLog.schemaType==="Group" ? <HiUserGroup/> : activityLog.schemaType==="Section" ? <FaDharmachakra/> : ""} {activityLog.name} </> :


              activityLog.type==="Updated" ? <>Updated {activityLog.schemaType==="Channel"?"#" : activityLog.schemaType==="Canvas"?<FaNoteSticky/> : activityLog.schemaType==="Forum"?<MdForum/> :activityLog.schemaType==="Test Channel" ? <RiSurveyFill/> : ""} {activityLog.name} </> :

              activityLog.type==="Updated" && activityLog.schemaType==="Server" && activityLog.name==="Cover Picture" ? <>{activityLog.createdMember.user.name} updated the cover picture. </>  :

              activityLog.type==="Updated" && activityLog.schemaType==="Server" && activityLog.action==="Display picture" ? <>{activityLog.createdMember.user.name} updated the Display picture. </>  :

              activityLog.type==="Updated" && activityLog.schemaType==="Server" && activityLog.name==="Description" ? <>{activityLog.createdMember.user.name} updated the description </>  :

              activityLog.type==="Updated" && activityLog.schemaType==="Server" && activityLog.action==="Name" ? <>{activityLog.createdMember.user.name} change the server name to {activityLog.name} </>  :
              activityLog.type==="Updated" && activityLog.schemaType==="Server" && activityLog.action==="Name" ? <>{activityLog.createdMember.user.name} change the server type to {activityLog.name} </>  :
              activityLog.type==="Deleted" ? <>Deleted {activityLog.schemaType==="Channel"?"#" : activityLog.schemaType==="Canvas"?<FaNoteSticky/> : activityLog.schemaType==="Forum"?<MdForum/> :activityLog.schemaType==="Test Channel" ? <RiSurveyFill/> : ""} {activityLog.name} </> :
              
              
              activityLog.type==="Joined" && activityLog.schemaType==="Server" ? <> {activityLog.name} has joined. </> :


              activityLog.type==="Removed" && activityLog.schemaType==="Server" && activityLog.action==="Member" ? <>
              {activityLog.name} has been removed by {activityLog.createdMember.user.name}
              </> :


              // activityLog.type==="Invited" ? <>Invited {activityLog.schemaType==="Channel"?"#" : activityLog.schemaType==="Canvas"?<FaNoteSticky/> : activityLog.schemaType==="Forum"?<MdForum/> :activityLog.schemaType==="Test Channel" ? <RiSurveyFill/> : ""} {activityLog.name} </> :
              // activityLog.type==="Kicked" ? <>Kicked {activityLog.schemaType==="Channel"?"#" : activityLog.schemaType==="Canvas"?<FaNoteSticky/> : activityLog.schemaType==="Forum"?<MdForum/> :activityLog.schemaType==="Test Channel" ? <RiSurveyFill/> : ""} {activityLog.name} </> :


              activityLog.type==="Activated" ? <>Activated {activityLog.schemaType==="Group"? <HiUserGroup/>  :""} {activityLog.name} </> : 


              activityLog.type==="Deactivated" ? <>Deactivated {activityLog.schemaType==="Group"? <HiUserGroup/>  :""} {activityLog.name} </> : ""
            }
            
            </TableCell>
            <TableCell>{format(new Date(activityLog.createdAt), DATE_FORMAT)}</TableCell>
           
          </TableRow>
        ))}

    
      </TableBody>
      
    </Table>

             
        </div>
    </div>
    </>
  )
}

export default ActivityLogComp