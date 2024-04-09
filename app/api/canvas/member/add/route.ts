import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        const reqBody = await req.json();
        let {members} = reqBody;
        
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
        
        const canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
                serverId:serverId as string
            },
            include:{
                manager:{
                    include:{
                        member:true
                    }
                }
            }
        });
        if(!canvas) return NextResponse.json({error:"Canvas not found"}, {status:409});

        
        const managers = canvas?.manager?.memberIds;
    
        const isAdmin = managers?.some(m => m === member?.id);

        
        if(!isAdmin) return NextResponse.json({error:"You are not authorized to add this member"}, {status:403});

        const section = await db.section.update({
            where:{
                id:canvas?.sectionId as string,
                serverId:serverId as string
            },
            data:{
                canvas:{
                    update:{
                        where:{
                            id:canvasId as string,
                            createdBy:userId,
                        },
                        data:{
                            memberIds:{
                                push:members
                            }
                            // Members:{
                            //     connect: members.map(member => ({ id: member })),
                            // }
                        }
                    }
                }
            }
        });
        console.log(section);

         for(let i=0; i<members.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Add Member", schemaType:"Canvas", memberId:member.id as string, memberId2:members[i], oldData:null, newData:null, name:null, message:"Added a new member"});
        }
        // console.log(section.channels.member);
        
        return NextResponse.json({
            success:true,
            section
        }, {status:200});

    } catch (error) {
        
    }
}