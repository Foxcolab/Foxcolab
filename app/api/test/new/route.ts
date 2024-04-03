import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const reqBody = await req.json();
        const {name, time, level, description, passmarks} = reqBody;
        console.log(name, time, level, description, passmarks);
        console.log(serverId, sectionId, testChannelId);
        if(!serverId || !sectionId || !testChannelId) return NextResponse.json({error:"Something went wrong"}, {status:409});
        
        if(!name) return NextResponse.json({error:"Please write the test title"}, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        })
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});
        
        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            }
        });
        if(!testChannel) return NextResponse.json({error:"Test Channel not found"}, {status:409});


        await db.testChannel.update({
            where:{
                id:testChannel.id,
                serverId:serverId as string,
                sectionId:sectionId as string
            },
            data:{
                Tests:{
                    create:{
                       name, 
                       serverId:server.id,
                       sectionId:sectionId as string  ,
                       level,
                       time:parseInt(time),
                       description,
                       createdBy:member.id,
                       passmarks:parseInt(passmarks)
                    }
                }
            }
        })
        return NextResponse.json({
            success:true,
            message:"Test created successfully",
            testChannel
        });
    } catch (error) {
        console.log(error);
        
    }
}




export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId =  req.nextUrl.searchParams.get('testId');

        const reqBody = await req.json();
        const {name, time, level, description, passmarks} = reqBody;
        console.log(name, time, level, description);
        
        if(!name) return NextResponse.json({error:"Please write the test title"}, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        })
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});
        
        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                serverId:serverId as string,
                Tests:{
                    some:{
                        id:testId as string
                    }
                }
            }
        });
        if(!testChannel) return NextResponse.json({error:"Test Channel not found"}, {status:409});

 

        await db.testChannel.update({
            where:{
                id:testChannel.id,
                serverId:serverId as string,
                // sectionId:sectionId as string
            },
            data:{
                Tests:{
                    update:{
                       where:{
                        id:testId as string
                       },
                       data:{
                        name, 
                       serverId:server.id,
                       sectionId:testChannel.sectionId  ,
                       level,
                       time:parseInt(time),
                       description,
                       createdBy:member.id,
                       passmarks:parseInt(passmarks)
                       }
                    }
                }
            }
        })
        return NextResponse.json({
            success:true,
            message:"Test created successfully",
            testChannel
        });
    } catch (error) {
        console.log(error);
        
    }
}