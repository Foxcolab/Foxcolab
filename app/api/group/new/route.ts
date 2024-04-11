import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"
import { CreateActivityLog } from "../../activityLog/ActivityLog";





export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const reqBody = await req.json();
        const { name, description, handle, members} = reqBody;

 
        if(!serverId ) return NextResponse.json({error:"Semething went wrong"}, {status:409});
        
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
        const whoCanUpdate = server.whoManageGroups;
        if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
            hasPermission = true;
        }

        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        
        const existing = await db.group.findFirst({
            where:{
                handle,
                serverId:serverId as string
            }
        });
        
        if(existing) return NextResponse.json({error:"Handle name already exists"}, {status:409});


        
        const groups = await db.group.create({
            data:{
                name,
                description,
                createdBy:member.id as string,
                serverId:serverId as string,
                handle:handle,
                memberIds:members
            }
        });
       
        
        await CreateActivityLog(serverId, member.id, "Created", "Group", name, handle );


        return NextResponse.json({
            success:true,
            groups
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}

