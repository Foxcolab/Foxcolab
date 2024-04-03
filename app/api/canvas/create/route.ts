import { NextResponse, NextRequest } from "next/server";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { MemberRole } from "@prisma/client";

export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const { title, type  } = reqBody;
        const serverId = req.nextUrl.searchParams.get('serverId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});


        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId: serverId as string
            }
        })
        if(!member){return NextResponse.json({error:"You are not authorized to create a channel"}, {status:500})};



        const section = await db.section.update({
            where:{
                id:sectionId as string,
                serverId:serverId as string
            },
             data:{
                canvas:{
                    create: {
                        title,
                        type,
                        createdBy:user?.id as string,
                        serverId:serverId as string,
                        memberIds:[member.id],
                        Members:{
                            connect:[{id:member.id}]
                          },
                        manager:{
                            create:{
                                serverId:serverId as string,
                                sectionId:sectionId as string,
                                memberIds:[member.id]
                            }
                        }
                        
                    }
                }
             }

        })


        console.log(section);
        


        return NextResponse.json({
            success:true,
            section
        }, {status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}

