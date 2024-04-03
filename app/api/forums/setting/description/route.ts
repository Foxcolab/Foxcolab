import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {description} = reqBdoy;

    console.log(forumChannelId, serverId, description)
    const userId = await GetDataFromToken(req);
    const member = await db.member.findFirst({
        where:{
            userId:userId,
            serverId:serverId as string
        }
    });

    if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

    const forumChannel = await db.forumsChannel.findFirst({
        where:{
            id:forumChannelId as string,
            serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!forumChannel) return NextResponse.json({error:"Forum Channel not found"}, {status:409});
    const managers = forumChannel?.manager?.memberIds;
    const isAdmin = managers?.some(m => m === member?.id);
    
    if(!isAdmin) return NextResponse.json({error:"You are not authorized to change the setting"}, {status:403});

    const section = await db.section.update({
        where:{
            id:forumChannel?.sectionId as string,
            serverId:serverId as string
        },
        data:{
            forumsChannel:{
                update:{
                    where:{
                        id:forumChannelId as string,
                        createdBy:userId,
                    },
                    data:{
                        description

                    }
                }
            }
        }
    });
    
    return NextResponse.json({
        success:true,
        section
    }, {status:200});


} catch (error) {
    
}
}