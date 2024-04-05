
import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"
import { CreateActivityLog } from "../../activityLog/ActivityLog";


export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const groupId = req.nextUrl.searchParams.get('groupId');
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!serverId || !groupId) return NextResponse.json({error:"Semething went wrong"}, {status:409});
        
        if(!member ) return NextResponse.json({error:"You a not member", success:false}, {status:200});

        if(member.role!=="admin" && member.role!=="moderator"){
            return NextResponse.json({error:'You are not authorized to create a group',success:false}, {status:403})
        }
 
        const group = await db.group.findFirst({
            where:{
                id:groupId as string,
                serverId:serverId as string
            }
        });
        if(!group) return NextResponse.json({error:"Group not found"}, {status:409});
        const groups = await db.group.update({
            where:{
                id:groupId as string,
                serverId:serverId as string
            },
            data:{
                isDeactivated:true
            }
        });
       
        
        await CreateActivityLog(serverId, member.id, "Deactivated", "Group", group.name, '' );


        return NextResponse.json({
            success:true,
            groups
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}