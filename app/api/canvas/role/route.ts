

import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        if(!canvasId || !serverId) return NextResponse.json({error:"Canvas Id or Server Id not found"}, {status:409});
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
        if(title==="Update Canvas"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanUpdateCanvas:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }else if(title==="Manage Canvas Managers"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanManageManager:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Manage Canvas Members"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanManageMember:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Update public Canvas to private Canvas"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanMakePublicToPublic:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Manage Note"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanManageNote:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }

        else if(title==="Create Note"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanCreateNote:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Delete Note"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanDeleteNote:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Upload Media"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanUploadMediaInComment:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Update note"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanUpdateNote:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }
        else if(title==="Note Comment"){
            const Canvas = await db.canvas.update({
                where:{
                    id:canvasId as string
                },
                data:{
                    whoCanComment:schemaValue
                }
            });
            // await CreateActivityLog(forumChannelId, member.id, "Updated", "channel", schemaType, schemaValue );
            return NextResponse.json({success:true, Canvas}, {status:200});
        }


     
       
    } catch (error) {
        console.log(error);
    }
}
