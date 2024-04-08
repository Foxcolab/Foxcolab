

import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const channelId = req.nextUrl.searchParams.get('channelId');
        if(!channelId || !serverId) return NextResponse.json({error:"channel Id or Server Id not found"}, {status:409});
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
        
        
        let schemaType;
        if(title==="Read Message"){
            schemaType="whoCanReadMessage";
          }else if(title==="Send Message"){
            schemaType="whoCanSendMessage";
          }else if(title==="Upload Media"){
            schemaType="whoCanUploadMedia";
          }else if(title==="Update Channel"){
            schemaType="whoCanUpdateChannel";
          }else if(title==="Update Public Channel to Private Channel"){
            schemaType="whoCanMakePublicToPrivate";
          }else if(title==="Manage Channel Managers"){
            schemaType="whoCanManageManager";
          }else if(title==="Manage Channel Members"){
            schemaType="whoCanManageMember";
          }else if(title==="Manage Messages"){
            schemaType="whoCanDeleteMessage";
          }else if(title==="Create Polls"){
            schemaType="whoCanCreatePolls";
          }else if(title==="Create Forms"){
            schemaType="whoCanCreateForms";
          }else {
            return NextResponse.json({error:"Something went wrong"}, {status:409});
          }

        console.log(schemaType, schemaValue);
        if(schemaType==="whoCanReadMessage"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanReadMessage:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }
        else if(schemaType==="whoCanSendMessage"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanSendMessage:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanMakePublicToPrivate"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanMakePublicToPrivate:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanUploadMedia"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanUploadMedia:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanUpdateChannel"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanUpdateChannel:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanManageManager"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanManageManager:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanManageMember"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanManageMember:schemaValue
                }
            });
            await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanDeleteMessage"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanDeleteMessage:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanCreateForms"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanCreateForms:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }else if(schemaType==="whoCanCreatePolls"){
            const channel = await db.channel.update({
                where:{
                    id:channelId as string
                },
                data:{
                    whoCanCreatePolls:schemaValue
                }
            });
            // await CreateActivityLog(channelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, channel}, {status:200});
        }


       
    } catch (error) {
        console.log(error);
    }
}
