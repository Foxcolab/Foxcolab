import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const userId =  await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const canvasId =  req.nextUrl.searchParams.get('canvasId');
        const noteId = req.nextUrl.searchParams.get('noteId');
        const commentId = req.nextUrl.searchParams.get('commentId')
        const reqBody = await req.json();
        const {content} = reqBody;
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
            },
            include:{
                Members:{
                    where:{
                        userId:userId
                    }
                }
            }
        });
        if(!server) return NextResponse.json({error:"No server found"}, {status:409});
        
        let comment =  await db.noteComment.findFirst({
            where:{
                id:commentId as string,
                serverId:serverId as string,
                canvasId:canvasId as string,
                noteId:noteId as string
            }
        });
        if(!comment) return NextResponse.json({error:"No server found"}, {status:409});
        const canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
                serverId:serverId as string,
                notes:{
                    some:{
                        id:noteId as string
                    }
                }
            },
            include:{
                Members:true
            }
        });
        if(!canvas) return NextResponse.json({error:"Canvas not found"}, {status:409});
        const isAdmin = comment.createdBy===member.id;
        // const manager = canvas.memberIds;
        // const isManager = manager?.some(m => m === member?.id);

        if(!isAdmin) return NextResponse.json({error:"You are not authorized to delete the message"}, {status:409});

         comment = await db.noteComment.update({
            where:{
                id:commentId as string,
                serverId:serverId as string,
                canvasId:canvasId as string,
                noteId:noteId as string
            },
            data:{
                isUpdated:true,
                // fileUrl,
                content
            }
        });

    
    return NextResponse.json({
        success:true
    }, {status:200});


    
    } catch (error) {
        console.log(error);
    }
}