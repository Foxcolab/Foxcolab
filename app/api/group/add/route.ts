import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



function addArraysAndRemoveDuplicates(arr1, arr2) {
    const combinedArray = arr1.concat(arr2);
  
    const uniqueArray = [...new Set(combinedArray)];
  
    return uniqueArray;
  }

export const PUT = async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        let {members} = reqBody;
        const serverId = await req.nextUrl.searchParams.get('serverId');
        const groupId = await req.nextUrl.searchParams.get('groupId');
        const userId = await GetDataFromToken(req);
        console.log(serverId);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
        // if(member.role!=="admin" && member.role!=="moderator") return NextResponse.json({error:"You are not authorized to add member "}, {status:409});
        
        const group = await db.group.findFirst({
            where:{
                id:groupId as string,
                serverId:serverId as string
            }
        });
        const groupMember = group?.memberIds;
        const resultArray = addArraysAndRemoveDuplicates(members, groupMember);
        if(!group)  return NextResponse.json({error:'Group not Found'},{status:409});

        await db.group.update({
            where:{
                id:group.id,
                serverId:serverId as string
            },
            data:{
                memberIds:resultArray
            }
        });
        console.log("******** ADDED SUCCESSFULLY");
        
        return NextResponse.json({
            success:true,
            group
        }, {status:200});


    } catch (error) {
        console.log(error);
        
    }
}