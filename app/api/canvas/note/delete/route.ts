import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE =async(req:NextRequest)=>{
    try {
        
        const userId = GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        const noteId = req.nextUrl.searchParams.get('noteId');
        if(!serverId || !canvasId || !noteId) return NextResponse.json({error:"Something went wrong"})
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        console.log("Member Id", member?.id);
        
        if(!member) return NextResponse.json({success:false, error:"You are not a member"}, {status:400});
        
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            },
        });
        
        if(!server)return NextResponse.json({success:false, error:"Server not found"}, {status:400});

        const canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
                serverId:serverId
            },
            include:{
                notes:{
                    where:{
                        id:noteId as string
                    }
                },
                manager:true
            }
        })

        console.log("Found Canvas:::::", canvas);
        const isAdmin = canvas?.createdBy===member.id;
        const isManager = canvas?.manager?.memberIds?.some(m => m === member?.id);
        
        if(!isAdmin && !isManager){
            return NextResponse.json({message:"You are not authorized to delete this note.", status:401, success:false}, {status:401})
        }

        
        

         await db.note.delete({
            where:{
                id:noteId as string,
                serverId:serverId as string,
                canvasId:canvasId as string,
                
            }
        });
        await db.noteComment.deleteMany({
            where:{
                noteId:noteId as string,
                canvasId:canvasId as string,
                serverId: serverId as string
            }
        })

        // console.log("**** UPDATED SUCCESSFULLY***", note);
        
        return NextResponse.json({
            success:true,
        
        })
        
    } catch (error) {
        console.log(error);
        
    }
}