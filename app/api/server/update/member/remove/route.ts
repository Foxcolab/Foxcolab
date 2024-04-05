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
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        if(!member || (member.role!=="admin" && member.role!=="moderator")) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const { memberId} = reqBody;
        console.log("NAME->>>>", memberId);
        if(!memberId) return NextResponse.json({error:"Name not found"}, {status:409});

        const server = await db.server.findFirst({
            where:{
                id:serverId as string
            }
        });
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});
        const isOwner = server.createdBy===member.userId;
        const isAdmin = member.role==="admin" || member.role==="moderator";
        const ownerId = member.id;
        if(ownerId===memberId) return NextResponse.json({
            error:"You cannot remove the owner of this server"
        }, {status:409});
        if(!isAdmin && !isOwner) return NextResponse.json({error:"You are not authorized"}, {status:409});
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