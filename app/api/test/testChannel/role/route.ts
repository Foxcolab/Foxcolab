

import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const testChannelId = req.nextUrl.searchParams.get('testChannelId');
        if(!testChannelId || !serverId) return NextResponse.json({error:"Test Channel Id or Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        if(!member || (member.role!=="admin")) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const {title, schemaValue} = reqBody;
      
        if(!title || !schemaValue) return NextResponse.json({error:"Something went wrong"}, {status:409});


        console.log(title, schemaValue);
        if(title==="Update Test Channels"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanUpdateTestChannel:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
        else if(title==="Public Test Channel to Private Test Channel"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanMakePublicToPrivate:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
        else if(title==="Create Test"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanCreateTest:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
        else if(title==="Manage Test"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanManageTest:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
        else if(title==="Give Test"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanGiveTest:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
        else if(title==="Manage Test Channel Member"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanManageMember:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
        else if(title==="Manage Test Channel Managers"){
            const testChannel = await db.testChannel.update({
                where:{
                    id:testChannelId as string
                },
                data:{
                    whoCanManageManager:schemaValue
                }
            });
            // await CreateActivityLog(testChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, testChannel}, {status:200});
        }
          
    } catch (error) {
        console.log(error);
    }
}
