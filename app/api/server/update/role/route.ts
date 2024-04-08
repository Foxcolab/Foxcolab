

import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({error:"Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        if(!member || member.role!=="admin" ) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const {title, schemaValue} = reqBody;
        





        console.log(title, schemaValue);
        if(!title || !schemaValue) return NextResponse.json({error:"Something went wrong"}, {status:409});
        // if()return NextResponse.json({error:"Something went wrong"}, {status:409});
        if(schemaValue!=="admin" && schemaValue!=="moderator" && schemaValue!=="user")return NextResponse.json({error:"Something went wrong"}, {status:409});
        
        let schemaType;
        if(title==="Update Server"){
            schemaType="whoCanUpdateServer";
          }else if(title==="Invite Members"){
            schemaType="whoCanInviteMember";
          }else if(title==="Kick/Ban a Member"){
            schemaType="whoCanKickMember";
          }else if(title==="Manage Groups"){
            schemaType="whoManageGroups";
          }else if(title==="Create Section"){
            schemaType="whoCreateSection";
          }else if(title==="Manage Channel"){
            schemaType="whoCreateChannel";
          }else if(title==="Manage Canvas"){
            schemaType="whoCreateCanvas";
          }else if(title==="Manage Forums"){
            schemaType="whoCreateForum";
          }else if(title==="Manage Test Channels"){
            schemaType="whoCreateTestChannel";
          }else if(title==="Manage Bot Response"){
            schemaType="whoCreateBotResponse";
          }else {
            return NextResponse.json({error:"Something went wrong"}, {status:409});
          }

        console.log(schemaType, schemaValue);
        if(schemaType==="whoCanUpdateServer"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCanUpdateServer:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }
        else if(schemaType==="whoCanKickMember"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCanKickMember:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoManageGroups"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoManageGroups:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCreateSection"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCreateSection:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCreateChannel"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCreateChannel:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCreateForum"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCreateForum:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCreateCanvas"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCreateCanvas:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCreateTestChannel"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCreateTestChannel:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCreateBotResponse"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCreateBotResponse:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }else if(schemaType==="whoCanInviteMember"){
            const server = await db.server.update({
                where:{
                    id:serverId as string
                },
                data:{
                    whoCanInviteMember:schemaValue
                }
            });
            await CreateActivityLog(serverId, member.id, "Updated", "Server", schemaType, schemaValue );
            return NextResponse.json({success:true, server}, {status:200});
        }


        // // const server = await db.server.update({
        // //     where:{
        // //         id:serverId as string
        // //     },
        // //     data:{
                
        // //     }
        // // });
        // await CreateActivityLog(serverId, member.id, "Updated", "Server", serverType, "Server Type" );
        // return NextResponse.json({success:true, server}, {status:200});
    } catch (error) {
        
    }
}
