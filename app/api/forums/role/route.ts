

import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const forumChannelId = req.nextUrl.searchParams.get('forumChannelId');
        if(!forumChannelId || !serverId) return NextResponse.json({error:"channel Id or Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        if(!member ) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const {title, schemaValue} = reqBody;
      
        if(!title || !schemaValue) return NextResponse.json({error:"Something went wrong"}, {status:409});
        
        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId,
                serverId:serverId as string
            },
            
        });
        if(!forumChannel || forumChannel.createdBy!==member.id) return NextResponse.json({success:false, message:"Channel not found"}, {status:409});
        
        // let schemaType;
        // if(title==="Update Forum Channel"){
        //     schemaType="whoCanUpdateForums";
        //   }else if(title==="Update public Forum Channel to private Forum Channel"){
        //     schemaType="whoCanMakePublicToPrivate";
        //   }else if(title==="Manage Forums"){
        //     schemaType="whoCanCreatePost";
        //   }else if(title==="Manage Forums"){
        //     schemaType="whoCanManagePost"
        //   }
        //   else if(title==="Upload media in Forums's comment"){
        //     schemaType="whoCanUploadMediaInComment"
        //   }
        //   else if(title==="Manage comment"){
        //     schemaType="whoCanComment"
        //   }
        //   else if(title==="Delete Forums"){
        //     schemaType="whoCanDeletePost"
        //   }
        //   else if(title==="Manage Member"){
        //     schemaType="whoCanManageMember"
        //   }
        //   else if(title==="Create Forums"){
        //     schemaType="whoCanManageMember"
        //   }
        //   else if(title==="Manage Forum Channel Managers"){
        //     schemaType="whoCanManageManager"
        //   }
        //   else {
        //     return NextResponse.json({error:"Something went wrong"}, {status:409});
        //   }


        console.log(title, schemaValue);
        if(title==="Update Forum Channel"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanUpdateForums:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Update public Forum Channel to private Forum Channel"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanMakePublicToPrivate:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Manage Forums"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanCreatePost:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Upload media in Forums's comment"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanUploadMediaInComment:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }       
        else if(title==="Delete Forums"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanDeletePost:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Manage comment"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanComment:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Manage Member"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanManageMember:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Manage Forum Channel Managers"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanManageManager:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
        else if(title==="Manage Forums"){
            const forumChannel = await db.forumsChannel.update({
                where:{
                    id:forumChannelId as string
                },
                data:{
                    whoCanManagePost:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, forumChannel}, {status:200});
        }
       
    } catch (error) {
        console.log(error);
    }
}
