

import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { LiaEthereum } from "react-icons/lia";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";


export const POST =async(req:NextRequest)=>{
    try {
        const userId = GetDataFromToken(req);
        const reqBody = await req.json();
        const {title} = reqBody;
        console.log("CABBBVVVASSSS", title);
        
        if(!title) return NextResponse.json({error:"Please write something", success:false}, {status:400});

        const serverId = req.nextUrl.searchParams.get('serverId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        console.log(serverId, sectionId, canvasId, title,);
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            },

        });
        
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
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
        // const canvas = await db.canvas.update({
        //     where:{
        //         id:canvasId as string,
        //         serverId:server?.id as string,
        //         sectionId:sectionId as string
        //     },
        //     data:{
        //         notes:{
        //             create:{
        //                 title,
        //                 // content,
        //                 // content:content,
        //                 createdBy:member?.id as string,
        //                 serverId:serverId as string
        //             }
        //         }
        //     }
        // })
        const canvas =await db.canvas.findFirst({
            where:{
                id:canvasId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            }
        });
        if(!canvas) return NextResponse.json({error:"Canvas not found"}, {status:409});
        
        const note =await db.note.create({
            data:{
                title,
                content:"",
                createdBy:member?.id as string,
                serverId:serverId as string,
                canvasId:canvasId as string,


            }
        })

        console.log(note);

            await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Create", schemaType:"Canvas", memberId:member.id as string, memberId2:null, oldData:null, newData:title, name:"Note", message:"Create a new note"});
  

        return NextResponse.json({
            success:true,
            note
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export const PUT =async(req:NextRequest)=>{
    try {
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        const noteId = req.nextUrl.searchParams.get('noteId');

        const userId = GetDataFromToken(req);
        const reqBody = await req.json();
        const {content} = reqBody;
        if(!content) return NextResponse.json({error:"No content"}, {status:409});
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
        if(!server) return NextResponse.json({error:"No server found"}, {status:409});

        let Canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
                serverId:serverId as string,
                notes:{
                    some:{
                        id:noteId as string
                    }
                }
            }
        });
        if(!Canvas) return NextResponse.json({error:"No canvas found"}, {status:409});
        const note = await db.note.update({
            where:{
                id:noteId as string,
                serverId:serverId as string,
                canvasId:canvasId as string
            },
            data:{
                content,
                // comments:{
                //     create:{
                //         content:commentContent,
                //         fileUrl:commentFileUrl,
                //         createdBy:userId,
                //         serverId:serverId as string,
                //         canvasId:canvasId as string

                //     }
                // }

            }
        });

        return NextResponse.json({
            success:true
        }, {status:200})
    } catch (error) {
        console.log(error)
    }

}
