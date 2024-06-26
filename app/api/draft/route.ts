import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);

        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
        const  sectionId= req.nextUrl.searchParams.get('sectionId');
        if(!serverId) return NextResponse.json({error:"Channel Id missing."}, {status:409});
        const reqBody = await req.json();
        const {content, fileUrl,contentText, ScheduledAt } = reqBody;

        if(!content && fileUrl.length===0) return NextResponse.json({error:"Content missing."}, {status:400});

        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string,
            }
            
        }); 



        if(!member) return NextResponse.json({error:"You are not a member of this server"}, {status:404});
  
        const draft = await db.draft.create({
            data:{
                content:content as string,
                fileUrl:fileUrl,
                uploadedFiles:{
                    connect:fileUrl?.map((file:string)=>({id:file}))
                },
                ScheduledDate:ScheduledAt,
                contentText:contentText,
                createdBy:member.id as string,
                serverId:serverId as string,
                channelId:channelId as string,
                sectionId:sectionId as string,
                

            },
            include:{
                createdMember:true
            }
        })

        return NextResponse.json({
            success:true,
            draft
        }, {status:200});


    } catch (error) {
        
    }
}


export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);

        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
        const draftId = req.nextUrl.searchParams.get('draftId');
        const reqBody = await req.json();
        const {content, fileUrl} = reqBody;

        if(!content && fileUrl.length===0) return NextResponse.json({error:"Content missing."}, {status:400});

        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string,
            }
        });

        if(!member) return NextResponse.json({error:"You are not a member of this server"}, {status:404});
        
        const Olddraft = await db.draft.findFirst({
            where:{
                id:draftId as string,
                serverId:serverId as string,
                channelId:channelId as string,
                createdBy:member.id as string
            }
        })
        if(!Olddraft) return NextResponse.json({error:"Draft not exists"}, {status:404});

        const draft = await db.draft.update({
            where:{
                id:Olddraft?.id as string,
            },
            data:{
                content:content as string,
                fileUrl:fileUrl,

            }
        })

        return NextResponse.json({
            success:true,
            draft
        }, {status:200});


    } catch (error) {
        
    }
}

export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);

        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
        const draftId = req.nextUrl.searchParams.get('draftId');

        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string,
                // channelIds:{
                //     hasSome:[channelId as string]
                // }
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member of this server"}, {status:404});
 
        const Olddraft = await db.draft.findFirst({
            where:{
                id:draftId as string,
                serverId:serverId as string,
                channelId:channelId as string,
                createdBy:member.id as string
            }
        })

        if(!Olddraft) return NextResponse.json({error:"Draft not exists"}, {status:404});

         await db.draft.delete({
            where:{
                id:Olddraft.id as string,
                createdBy:member.id as string
            }
        });

        return NextResponse.json({
            success:true,
        }, {status:200});


    } catch (error) {
        console.log(error)
    }
}