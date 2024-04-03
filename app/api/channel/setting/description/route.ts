import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const channelId = req.nextUrl.searchParams.get('channelId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {description} = reqBdoy;

    const userId = await GetDataFromToken(req);
    const member = await db.member.findFirst({
        where:{
            userId:userId,
            serverId:serverId as string
        }
    });

    if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

    const channel = await db.channel.findFirst({
        where:{
            id:channelId as string,
            // serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!channel) return NextResponse.json({error:"Channel not found"}, {status:409});

    const managers = channel?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    if(!isManager) return NextResponse.json({error:"You are not authorized to change the setting"}, {status:403});

    const section = await db.section.update({
        where:{
            id:channel?.sectionId as string,
            serverId:serverId as string
        },
        data:{
            channels:{
                update:{
                    where:{
                        id:channelId as string,
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