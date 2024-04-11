import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, forumChannelId, managerId);
        const reqBody = await req.json();
        const {managerIds} = reqBody;
        if(managerIds.length===0) return NextResponse.json({error:"Member not found"}, {status:200})
        console.log(managerIds)
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) {
            return NextResponse.json({
                error:"Member not found"
            }, {status:409});
        }


        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        if(!forumChannel){
            return NextResponse.json({
                error:"Forum Channel not found"
            }, {status:409});
        }
        let hasPermission = false;
        const whoHavePermission = forumChannel?.whoCanManageManager;
        const managers = forumChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = forumChannel.createdBy===member.id;
        const isMember = forumChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        await db.forumsChannel.update({
            where:{
                id:forumChannelId as string,
                serverId:serverId as string
            },
            data:{
                manager:{
                    update:{
                        where:{
                            id:managerId as string,
                            
                        },
                        data:{
                            memberIds:{
                                push:managerIds
                            }
                        }
                    }
                }
            }
        });

        for(let i=0; i<managerIds.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumChannelId as string, activityType:"Make Manager", schemaType:"Forum Channel", memberId:member.id as string, memberId2:managerIds[i], oldData:null, newData:null, name:null, message:"Make a new manager"});
        }

        return NextResponse.json({
            success:true
        }, {status:200});

    
    } catch (error) {
        
    }
}