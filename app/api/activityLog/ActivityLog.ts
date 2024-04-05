import { db } from "@/prisma"
import { Member } from "@prisma/client"


export const CreateActivityLog =async(serverId:string, memberId:string, type:string, schemaType:string, name:string, action:string)=>{
    try {

        const res = await db.activityLog.create({
            data:{
                action,
                type,
                createdBy:memberId,
                name,
                schemaType,
                serverId
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

