import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE =async(req:NextRequest)=>{
    try {
        
        const userId =await GetDataFromToken(req);
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
        if(!canvas) return NextResponse.json({error:"Canvas not found"}, {status:409});

        const note = await db.note.findFirst({
            where:{
                id:noteId, 
                canvasId:canvasId as string,
                serverId:serverId as string
            }
        });

        if(!note) return NextResponse.json({error:"Note not found"}, {status:409});



        let hasPermission = false;
        const whoHavePermission = canvas?.whoCanCreateNote;
        const managers = canvas?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = canvas.createdBy===member.id || note.createdBy===member.id;
        const isMember = canvas.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});


        
        

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
        await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Delete", schemaType:"Canvas", memberId:member.id as string, memberId2:null, oldData:null, newData:note.title, name:"Note", message:"Delete a note"});
        // console.log("**** UPDATED SUCCESSFULLY***", note);
        
        return NextResponse.json({
            success:true,
        
        })
        
    } catch (error) {
        console.log(error);
        
    }
}