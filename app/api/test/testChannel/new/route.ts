



import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');

        if(!serverId || !sectionId) return NextResponse.json({error:"Semething went wrong"}, {status:409});
        

        const reqBody = await req.json();
        const {name, type} = reqBody;
        if(!name) return NextResponse.json({error:"Please enter the test channel name"}, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            },
            include:{
                user:true
            }
        });
        if(!member) return NextResponse.json({error:"You are not authorized member"}, {status:409});

        const testChannel = await db.section.update({
            where:{
                id:sectionId as string,
                serverId:serverId as string
            },
            data:{
                TestChannels:{
                    create:{
                        name,
                        type,
                        createdBy:userId,
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


        await CreateActivityLog(serverId, member.id, "Created", "Test Channel", name, "" );
        return NextResponse.json({error:"Test channel created successfully", success:true}, {status:200});

    } catch (error) {
        
    }
}