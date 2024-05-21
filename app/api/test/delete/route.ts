import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";

export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId = req.nextUrl.searchParams.get('testId');

  
        if(!serverId ||  !testChannelId || !testId) return NextResponse.json({error:"Something went wrong"}, {status:409});
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        })
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});
        
      


        const test = await db.test.findFirst({
            where:{
                id:testId as string,
                testChannelId:testChannelId as string
            }
        });
        if(!test) return NextResponse.json({success:false, message:"Test Not Found"}, {status:409});
        const isAdmin = test.createdBy===member.id;
        if(!isAdmin) return NextResponse.json({success:false, message:"You are not the admin of this test"}, {status:409});

        const deleteTest = await db.test.delete({
            where:{
                id:testId as string,
                testChannelId:testChannelId as string
            }
        });



        // await SchemaActivity({serverId:serverId as string, sectionId:testChannel?.sectionId as string, schemaId:testChannelId as string, activityType:"Create", schemaType:"Test Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:test.name, name:"Test", message:"Created a test"});

        console.log(test);

        return NextResponse.json({
            success:true,
            message:"Test deleted successfully",
         
        });
    } catch (error) {
        console.log(error);
        
    }
}


