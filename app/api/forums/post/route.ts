import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";




export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const forumId =  req.nextUrl.searchParams.get('forumId');
        if(!forumId || !serverId || !sectionId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});
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
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});


        const forumChannel = await db.forumsChannel.findFirst({
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
        if(!forumChannel) return NextResponse.json({error:"Forums not found"}, {status:409});

        // await db.forumsChannel.update({
        //     where:{
        //         id:forums.id as string,
        //     },
        //     data:{
        //         Forums:{
        //             create:{
        //                 title,
                        
        //                 memberId:member?.id as string,
        //                 serverId:server.id as string,
        //                 sectionId:forums.sectionId as string,
        //                 responses:{
        //                     create:[
        //                         {
        //                             content,
        //                             fileUrl,
        //                             createdBy:member?.id as string,
        //                             serverId:server.id as string,
        //                             sectionId:forums.sectionId as string
        //                         }
        //                     ]
        //                 }
        //             }
        //         }
        //     }
        // });

        const forums = await db.forums.create({
            data:{
                title,      
                memberId:member?.id as string,
                serverId:server.id as string,
                sectionId:forumChannel.sectionId as string,
                forumsChannelId:forumId,
                responses:{
                                        create:[
                                            {
                                                content,
                                                fileUrl,
                                                createdBy:member?.id as string,
                                                serverId:server.id as string,
                                                sectionId:forumChannel.sectionId as string
                                            }
                                        ]
                                    }
            }
        })

        await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumId as string, activityType:"Create", schemaType:"Forum Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:title, name:"Forum", message:"Create a new forum"});

        return NextResponse.json({
            success:true,
            error:"Post created successfully"
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}


export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const forumChannelId =  req.nextUrl.searchParams.get('forumChannelId');
        const forumId =  req.nextUrl.searchParams.get('forumId');
        if(!forumChannelId || !serverId || !sectionId || !forumId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

 

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
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        })
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});


        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumId as string,
                serverId:server.id,
                sectionId:sectionId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                },
                Forums:{
                    some:{
                        id:forumId
                    }
                }
            },
            include:{
                Forums:{
                    where:{
                        id:forumId,
                        forumsChannelId:forumChannelId
                    }
                }
            }
        });
        if(!forumChannel) return NextResponse.json({error:"Forums not found"}, {status:409});

       const forum  = await db.forums.delete({
        where:{
            id:forumId as string,
            forumsChannelId:forumChannelId as string,
            serverId:serverId as string,
            
        }
       })

        await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumId as string, activityType:"Delete", schemaType:"Forum Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:forumChannel.Forums[0].title, name:"Forum", message:"Deleted a forum"});

        return NextResponse.json({
            success:true,
            error:"Post created successfully"
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}