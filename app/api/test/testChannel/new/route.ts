



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
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                },

            },
            include:{
                Members:{
                    where:{
                        userId:userId
                    }
                }
            }
        })

        if(!server ) return NextResponse.json({success:false, message:"Server not found"}, {status:409});

        const member = server.Members[0];
        let hasPermission = false;
        const whoCanUpdate = server.whoCreateTestChannel;
        if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
            hasPermission = true;
        }

        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
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
                        createdBy:member.id as string,
                        serverId:serverId as string,
                        memberIds:[member.id],
                        Members:{
                            connect:[{id:member.id}]
                          },
                        manager:{
                            create:{
                                serverId:serverId as string,
                                sectionId:sectionId as string,
                                memberIds:[member.id],
                                member:{
                                    connect:[{id:member.id}]
                                  },
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