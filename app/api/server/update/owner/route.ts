import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const reqBody =await req.json();
        const {memberId} = reqBody;
        console.log("MemberID", memberId);
        if(!memberId) return NextResponse.json({error:"Member id not found"}, {status:409});
        if(!serverId) return NextResponse.json({error:"Server id not found"}, {status:409});
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId as string
                    }
                }
            },
        });
        
        if(!server) return NextResponse.json({success:false, message:"Server not found"}, {status:409});


        const isAdmin = server.createdBy===userId;
        if(!isAdmin) return NextResponse.json({success:false, error:"You are not a owner of this server"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                id:memberId as string,
                serverId:serverId as string
            },
            include:{
                user:true
            }
        });
        if(!member) return NextResponse.json({success:false, error:"Member not found"}, {status:409});

        const updatedServer = await db.server.update({
            where:{
                id:serverId as string
            },
            data:{
                createdBy:member.userId,
                // createdUser:member.user
            }
        });
        const admin = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string
            }
        });
        if(!admin) return NextResponse.json({success:false, error:"Admin not found"}, {status:409});

        await db.member.update({
            where:{
                id:admin.id,
                serverId:serverId as string
            },
            data:{
                role: "moderator"
            }
        });
        await db.member.update({
            where:{
                id:memberId,
                serverId:serverId as string
            },
            data:{
                role: "admin"
            }
        });

        // await CreateActivityLog(member.id, "Updated", "Server", name, "Name" );

        return NextResponse.json({success:true, server}, {status:200});

    } catch (error) {
        console.log(error);
    }
}