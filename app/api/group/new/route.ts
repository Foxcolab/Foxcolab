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
        console.log(name, description, handle);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!serverId ) return NextResponse.json({error:"Semething went wrong"}, {status:409});
        
        if(!member ) return NextResponse.json({error:"You a not member", success:false}, {status:200});

        if(member.role!=="admin" && member.role!=="moderator"){
            return NextResponse.json({error:'You are not authorized to create a group',success:false}, {status:403})
        }
        
        const existing = await db.group.findFirst({
            where:{
                handle,
                serverId:serverId as string
            }
        });
        console.log("existing", existing);
        
        if(existing) return NextResponse.json({error:"Handle name already exists"}, {status:409});


        
        const groups = await db.group.create({
            data:{
                name,
                description,
                createdBy:userId as string,
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

