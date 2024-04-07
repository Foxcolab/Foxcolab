import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"




export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const forumId =  req.nextUrl.searchParams.get('forumId');
        const reqBody = await req.json();
        const {title, fileUrl, content} = reqBody;
        console.log(title, fileUrl, serverId, sectionId, forumId);
        if(!title) return NextResponse.json({error:"Please enter the title fields"}, {status:409});

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        });
        console.log("SERVER", server);
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        })
        const forums = await db.forumsChannel.findFirst({
            where:{
                id:forumId as string,
                serverId:server.id,
                sectionId:sectionId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        });
        if(!forums) return NextResponse.json({error:"Forums not found"}, {status:409});

        await db.forumsChannel.update({
            where:{
                id:forums.id as string,
            },
            data:{
                Forums:{
                    create:{
                        title,
                        
                        memberId:member?.id as string,
                        serverId:server.id as string,
                        sectionId:forums.sectionId as string,
                        responses:{
                            create:[
                                {
                                    content,
                                    fileUrl,
                                    createdBy:member?.id as string,
                                    serverId:server.id as string,
                                    sectionId:forums.sectionId as string
                                }
                            ]
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            success:true,
            error:"Post created successfully"
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}