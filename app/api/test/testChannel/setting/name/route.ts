import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const testChannelId = req.nextUrl.searchParams.get('testChannelId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {name} = reqBdoy;

    console.log(testChannelId, serverId, name)
    const userId = await GetDataFromToken(req);
    const member = await db.member.findFirst({
        where:{
            userId:userId,
            serverId:serverId as string
        }
    });

    if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

    const testChannel = await db.testChannel.findFirst({
        where:{
            id:testChannelId as string,
            serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!testChannel) return NextResponse.json({error:"Forum Channel not found"}, {status:409});

    const managers = testChannel?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
   

  if(!isManager) return NextResponse.json({error:"You are not authorized to change the setting"}, {status:403});

    // const section = await db.section.update({
    //     where:{
    //         id:testChannel?.sectionId as string,
    //         serverId:serverId as string
    //     },
    //     data:{
    //         TestChannels:{
    //             update:{
    //                 where:{
    //                     id:testChannelId as string,
    //                     createdBy:userId,
    //                 },
    //                 data:{
    //                     name:name
    //                 }
    //             }
    //         }
    //     }
    // });
    
    const updatedTestChannel = await db.testChannel.update({
        where:{
            id:testChannelId as string,
            serverId:serverId as string
        },
        data:{
            name:name
        }
    })

    await SchemaActivity({serverId:serverId as string, sectionId:testChannel.sectionId as string, schemaId:testChannelId as string, activityType:"Update", schemaType:"Test Channel", memberId:member.id, memberId2:null, oldData:testChannel.name, newData:updatedTestChannel.name, name:"Name", message:"Updated test channel name"});

    return NextResponse.json({
        success:true,
        TestChannel:updatedTestChannel
    }, {status:200});


} catch (error) {
    
}
}