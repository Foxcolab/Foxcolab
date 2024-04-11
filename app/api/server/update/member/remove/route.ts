import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid';


export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({error:"Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
         const reqBody = await req.json();
        const { memberId} = reqBody;
        if(!memberId) return NextResponse.json({error:"Name not found"}, {status:409});

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                },
            },
            include:{
                Members:{
                    where:{
                        userId:userId
                    }
                }
            }
        })
        if(!server) return NextResponse.json({success:false, message:"Server not found"}, {status:409});

        const member = server.Members[0];
        let hasPermission = false;
        const whoCanUpdate = server.whoCanKickMember;
        if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
            hasPermission = true;
        }

        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});

        let removeMember = await db.member.findFirst({
            where:{
                id: memberId,
                serverId:serverId as string
            },
            include:{
                user:true
            }
        });

        if(!removeMember) return NextResponse.json({error:"Member not found"}, {status:409});
        let myuuid = uuidv4();
        const user = await db.user.create({
            data:{
                name: "Deactivated User",
                role:"user",
                email:`deactivateduser${memberId}@foxcolab.com`,
                password:myuuid

            }
        })

        removeMember = await db.member.update({
            where:{
                id:memberId,
                serverId:serverId as string
            },
            data:{
                isDeleted:true,
                userId:user.id as string,
                channelIds:[],
                canvasIds:[],
                forumsChannelIds:[],
                testChannelIds:[],
                groupIds:[],
                managedChannelId:[],
                managedCanvasId:[],
                managedForumId:[],
                managedTestChannelId:[],
                // user:{
                //     connect:{
                //         id:user.id
                //     }
                }
        
        })

        await CreateActivityLog(serverId, member.id, "Removed", "Server", removeMember?.user?.name as string , "Member" );

        return NextResponse.json({success:true, server}, {status:200});
    } catch (error) {
        console.log(error);
    }
}