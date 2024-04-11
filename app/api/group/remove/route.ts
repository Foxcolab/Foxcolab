import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const groupId = req.nextUrl.searchParams.get('groupId');
        const userId = await GetDataFromToken(req);

        const reqBody =await req.json();
        const {memberId} = reqBody; 

        if(!memberId) return NextResponse.json({error:"Please enter a member Id"}, {status:400});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });

        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});

        const isAdmin = member.role ==="admin" || member.role==="moderator";
        if(!isAdmin) return NextResponse.json({error:"You are not authorized to delete the member. "}, {status:409});

        let group = await db.group.findFirst({
            where:{
                id:groupId as string,
                serverId:serverId as string
            }
        });

        if(!group) return NextResponse.json({error:"Group not found"}, {status:409});
        
        group = await db.group.update({
            where:{
                id:group.id as string
            },
            data:{
                memberIds:{
                    set:group.memberIds.filter((id)=>id!==memberId)
                },
                members:{
                    disconnect:{
                        id:memberId as string
                    }
                }
            }
        });


        return NextResponse.json({
            message:"Group member removed successfully"
        }, {status:200})




    } catch (error) {
        console.log(error);
        
    }
}