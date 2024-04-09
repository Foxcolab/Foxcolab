import { db } from "@/prisma"
import { SchemaActivity } from "@prisma/client"

interface Props {
    schemaId:string
    sectionId:string
    serverId:string
    message:string | null
    activityType:"Create" | "Update" | "Delete" | "Add Member" | "Remove Member" | "Make Manager" | "Remove Manager" | "Change" | "Left"
    schemaType:"Channel"| "Forum Channel" | "Canvas" | "Test Channel" | "Canvas" 
    name:string | null
    memberId:string 
    memberId2:string | null
    oldData:string | null
    newData:string | null


}


 const SchemaActivity =async({serverId, sectionId, schemaId, message, activityType, schemaType, name, memberId, memberId2, oldData, newData}:Props)=>{
    try {
        if(schemaType==="Channel"){
            const activity = await db.schemaActivity.create({
                data:{
                    serverId:serverId,
                    channelId:schemaId,
                    sectionId:sectionId,
                    message:message,
                    activityType:activityType,
                    schemaType:schemaType,
                    name:name,
                    memberId:memberId,
                    memberId2:memberId2,
                    oldData:oldData,
                    newData:newData
                }
            });
            return;
        }else if(schemaType==="Canvas"){
            const activity = await db.schemaActivity.create({
                data:{
                    serverId:serverId,
                    canvasId:schemaId,
                    sectionId:sectionId,
                    message:message,
                    activityType:activityType,
                    schemaType:schemaType,
                    name:name,
                    memberId:memberId,
                    memberId2:memberId2,
                    oldData:oldData,
                    newData:newData
                }
            });
            return;
    
        }else if(schemaType==="Forum Channel"){
            const activity = await db.schemaActivity.create({
                data:{
                    serverId:serverId,
                    forumChannelId:schemaId,
                    sectionId:sectionId,
                    message:message,
                    activityType:activityType,
                    schemaType:schemaType,
                    name:name,
                    memberId:memberId,
                    memberId2:memberId2,
                    oldData:oldData,
                    newData:newData
                }
            });
            return;
    
        }else if(schemaType==="Test Channel"){
            const activity = await db.schemaActivity.create({
                data:{
                    serverId:serverId,
                    testChannelId:schemaId,
                    sectionId:sectionId,
                    message:message,
                    activityType:activityType,
                    schemaType:schemaType,
                    name:name,
                    memberId:memberId,
                    memberId2:memberId2,
                    oldData:oldData,
                    newData:newData
                }
            });
            return;
    
        }else {
            return;
        }
      

    } catch (error) {
        console.log(error);
    }
}

export default SchemaActivity;