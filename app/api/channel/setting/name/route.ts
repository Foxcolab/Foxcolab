import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const channelId = req.nextUrl.searchParams.get('channelId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {name} = reqBdoy;
    if(!channelId || !serverId || !name) return NextResponse.json({
        error:"ChannelId, ServerId and Name are required"
    }, {status:409})
    console.log(channelId, serverId, name)
    const userId = await GetDataFromToken(req);
    const member = await db.member.findFirst({
        where:{
            userId:userId,
            serverId:serverId as string
        }
    });

    if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

    const channel = await db.channel.findFirst({
        where:{
            id:channelId as string,
            serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!channel) return NextResponse.json({error:"Channel not found"}, {status:409});

    let hasPermission = false;
    const whoHavePermission = channel?.whoCanUpdateChannel;
    const managers = channel?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isAdmin = channel.createdBy===member.id;
    const isMember = channel.memberIds.includes(member.id);
    if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
        hasPermission = true;
    }
    if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});

    const updatedChannel = await db.channel.update({
        where:{
            id:channelId,
            serverId:serverId as string,
            sectionId:channel.sectionId
        },
        data:{
            name:name
        }
    })
    await SchemaActivity({serverId:serverId as string, sectionId:channel.sectionId as string, schemaId:channelId as string, activityType:"Update", schemaType:"Channel", memberId:member.id, memberId2:null, oldData:channel.name, newData:updatedChannel.name, name:"Name", message:"Updated the channel name"});
    return NextResponse.json({
        success:true,
        updatedChannel
    }, {status:200});


} catch (error) {
    
}
}