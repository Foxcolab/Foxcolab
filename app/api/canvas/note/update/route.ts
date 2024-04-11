import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT =async(req:NextRequest, params:{noteId:String})=>{
    try {
        console.log("EXECUTING");
        
        const userId = GetDataFromToken(req);
        const reqBody = await req.json();
        const {title, content} = reqBody;
        console.log("EXECUTING 2");

        console.log(title, content)
        if(!title) return NextResponse.json({error:"Please write something", success:false}, {status:400});

        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        const noteId = req.nextUrl.searchParams.get('noteId');
     
        console.log("NOTEID", noteId);
        
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
        console.log(server?.id);
        
        if(!server)return NextResponse.json({success:false, error:"Server not found"}, {status:400});

        const note = await db.note.findFirst({
            where:{
                id:noteId as string,
                canvasId:canvasId as string,
            },
            include:{
                createdUser:true
            }
        });
        if(!note) return NextResponse.json({error:"Note not found"}, {status:409});
        
        if(member.id!==note?.createdBy && note.canEveryoneUpdate===false ){
            return NextResponse.json({message:"You are not authorized to edit this note.", status:401, success:false}, {status:401})
        }

        console.log("VERified");
        

         await db.note.update({
            where:{
                id:noteId as string,
                serverId:serverId as string,
                canvasId:canvasId as string,
            },
            data:{
                title,
                content
            }
        });


        console.log("**** UPDATED SUCCESSFULLY***", note);
        
        return NextResponse.json({
            success:true,
            note
        })
        
    } catch (error) {
        console.log(error);
        
    }
}