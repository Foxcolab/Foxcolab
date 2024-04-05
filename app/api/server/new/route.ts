import {v4 as uuidv4} from "uuid"
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma";
import { Channel, MemberRole } from "@prisma/client";
import { CreateActivityLog } from "../../activityLog/ActivityLog";

export const POST =async(req:NextRequest)=>{
    try {
        const reqBody =await req.json()
        const userId = GetDataFromToken(req);
        console.log(userId);
        
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const user = await db.user.findFirst({where:{id:userId}})
        const {name, description, type, displayPic, coverPic} = reqBody;

        if(!name || !description ) return NextResponse.json({success:false ,message:"Enter the fields"}, {status:409});
        console.log(name, description);
        const discoverable = type==="public" ? true : false;
        let server = await db.server.create({
            data:{
                name,
                description,
                type,
                displayPic,
                coverPic,
                inviteCode:uuidv4(),
                createdBy:user?.id,
                discoverable:discoverable,
                sections:{
                    create:[
                        {name:"Welcome", createdBy:user?.id as string, 
                    }
                    ]
                },
                Members:{
                    create:[
                        {
                            userId:user?.id as string,
                            role:MemberRole.admin,
                            
                            }
                    ]
                }
                
            },
            include:{
                Members:true,
                sections:true
            }
        });

        const channel = await db.section.update({
            where:{
                id:server.sections[0].id,
                serverId:server.id
            },
            data:{
                channels:{
                    create:[{
                        name:"General", 
                        createdBy:user?.id as string, 
                        description:"this is general", 
                        serverId:server.id,
                        memberIds:[server.Members[0].id],
                        Members:{
                            connect:[{id:server.Members[0].id}]
                        },
                    },
                    {
                        name:"Random", 
                        createdBy:user?.id as string, 
                        description:"This is random Channel", 
                        serverId:server.id,
                        memberIds:[server.Members[0].id],
                        Members:{
                            connect:[{id:server.Members[0].id}]
                        },
                    },
                    {
                        name:"announcement", 
                        createdBy:user?.id as string, 
                        description:"This channel is for announcement purpose", 
                        serverId:server.id,
                        memberIds:[server.Members[0].id],
                        Members:{
                            connect:[{id:server.Members[0].id}]
                        },
                    },                
                
                
                ]                       
                    }
                
            }
        })

        console.log("servers", server);


        await CreateActivityLog(server.createdBy, "Created", "Member", name, "" );




        return NextResponse.json({
            success:true,
            message:"Server Created Succssfully",
            server
        }, {status:200})
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }



}