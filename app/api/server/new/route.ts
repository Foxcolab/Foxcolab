import {v4 as uuidv4} from "uuid"
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma";
import { Channel, MemberRole } from "@prisma/client";
import { CreateActivityLog } from "../../activityLog/ActivityLog";
import ShortUniqueId from "short-unique-id";



const FindUniqueShort:any = async()=>{
    try {
        const uiddddd = new ShortUniqueId({length:10});
        const actualUid = uiddddd.randomUUID();
        console.log(actualUid);
        const res = await db.shortUrl.findFirst({
            where:{
                shortUrl:actualUid
            }
        });
        if(!res){
            return actualUid;
        }else {
            return await FindUniqueShort();
        }


    } catch (error) {
        console.log(error);
    }
}


export const POST =async(req:NextRequest)=>{
    try {
        const reqBody =await req.json()
        const userId =await GetDataFromToken(req);
        console.log(userId);
        
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        // const user = await db.user.findFirst({where:{id:userId}}) 
        const user = await db.user.findUnique({
            where:{
                id:userId
            }
        });
        if(!user) return NextResponse.json({
            error:"User not found"
        }, {status:409});
        // console.log(displayPic);
        let {name, description, type, displayPic, coverPic, serverType} = reqBody;
        console.log(displayPic, coverPic);

        if(!name  ) return NextResponse.json({success:false ,message:"Enter the fields"}, {status:409});
        // console.log(name, description);
        const discoverable = type==="public" ? true : false;

        const bot = await db.user.findFirst({
            where:{
                role:MemberRole.bot,
                name:"FoxcolabBot"
            }
        });

        if(!bot) return NextResponse.json({
            error:"Bot not found",
            success:false
        }, {status:409});
        
        

        let server = await db.server?.create({
            data:{
                name,
                description,
                type,
                coverPicId:coverPic,
                displayPicId:displayPic,
                inviteCode:uuidv4(),
                createdBy:user.id,
                discoverable:discoverable,
                serverType,
                sections:{
                    create:[
                        {name:"General", createdBy:user?.id as string, 
                    }
                    ]
                },
                Members:{
                    create:[
                        {
                            userId:user?.id as string,
                            role:MemberRole.admin,
                            
                        }, 
                        {
                            userId:bot.id as string,
                            role:MemberRole.bot
                        }
                    ]
                }
                
            },
            include:{
                Members:true,
                sections:true
            }
        });


        const actualUid = FindUniqueShort();
        console.log(actualUid);
        const copyText = `invite/${server.name}/${server.inviteCode}`;

        const ShortUrl = await db.shortUrl.create({
            data:{
                originalUrl:copyText,
                shortUrl:actualUid

            }
        })

        // let server = await db.server?.create({
        //     data:{
        //         name,
        //         description,
        //         type,
        //         displayPicId:displayPic,

        //         // displayPicture:displayPic && {
        //         //     connect:{
        //         //         id:displayPic
        //         //     }
        //         // },

        //         // displayPicture:{
        //         //     connect:{
        //         //         id:displayPic
        //         //     }
        //         // },
        //         coverPic,
        //         inviteCode:uuidv4(),
        //         createdBy:user?.id,
        //         discoverable:discoverable,
        //         serverType,
        //         sections:{
        //             create:[
        //                 {name:"General", createdBy:user?.id as string, 
        //             }
        //             ]
        //         },
        //         Members:{
        //             create:[
        //                 {
        //                     userId:user?.id as string,
        //                     role:MemberRole.admin,
                            
        //                 }, 
        //                 {
        //                     userId:bot.id as string,
        //                     role:MemberRole.bot
        //                 }
        //             ]
        //         }
                
        //     },
        //     include:{
        //         Members:true,
        //         sections:true
        //     }
        // });

        const updateServer = await db.server?.update({
            where:{
                id:server?.id
            },
            data:{
                shortInviteId:ShortUrl.id,
                groups:{
                    create:{
                        name:"Owner",
                        handle:"owner",
                        createdBy:server?.Members[0].id,
                        memberIds:[server?.Members[0].id],
                        members:{
                            connect:[{id:server?.Members[0].id}]
                        },
                    }
                }
            }
        })

        const channel = await db.section.update({
            where:{
                id:server?.sections[0].id,
                serverId:server?.id
            },
            data:{
                channels:{
                    create:{
                        name:"Random", 
                        // createdBy:user?.id as string, 
                        createdBy:server?.Members[0].id,
                        description:"This is random channel. This is automatically created at the time of server creation.", 
                        serverId:server?.id,
                        memberIds:[server?.Members[0].id],
                        Members:{
                            connect:[{id:server?.Members[0].id}]
                        },
                        manager:{
                            create:{
                                serverId:server?.id,
                                sectionId:server?.sections[0].id,
                                memberIds:[server?.Members[0].id],
                                member:{
                                    connect:[{id:server?.Members[0].id}]
                                },
                            }
                        }
                    }                    
                },
                canvas:{
                    create: {
                        title:"Canvas",
                        description:"This is canvas. This is automatically created at the time of server creation.",
                        createdBy:server?.Members[0].id,
                        memberIds:[server?.Members[0].id],
                        serverId:server?.id as string,
                        Members:{
                            connect:[{id:server?.Members[0].id}]
                        },
                        manager:{
                            create:{
                                serverId:server?.id,
                                sectionId:server?.sections[0].id,
                                memberIds:[server?.Members[0].id],
                                member:{
                                    connect:[{id:server?.Members[0].id}]
                                },
                            }
                        }
                    }
                },
                forumsChannel:{
                    create: {
                        name:"Forum",
                        description:"This is Forum. This is automatically created at the time of server creation.",
                        createdBy:server?.Members[0].id,
                        memberIds:[server?.Members[0].id],
                        serverId:server?.id as string,
                        Members:{
                            connect:[{id:server?.Members[0].id}]
                        },
                        manager:{
                            create:{
                                serverId:server?.id,
                                sectionId:server?.sections[0].id,
                                memberIds:[server?.Members[0].id],
                                member:{
                                    connect:[{id:server?.Members[0].id}]
                                },
                            }
                        }
                    }
                },
                TestChannels:{
                    create: {
                        name:"Test",
                        description:"This is test. This is automatically created at the time of server creation.",
                        createdBy:server?.Members[0].id,
                        memberIds:[server?.Members[0].id],
                        serverId:server?.id as string,
                        Members:{
                            connect:[{id:server?.Members[0].id}]
                        },
                        manager:{
                            create:{
                                serverId:server?.id,
                                sectionId:server?.sections[0].id,
                                memberIds:[server?.Members[0].id],
                                member:{
                                    connect:[{id:server?.Members[0].id}]
                                },
                            }
                        }
                    }
                },
            
                
                
            }
        })

        console.log("servers", server);


        // await CreateActivityLog(server?.createdBy, "Created", "Member", name, "" );




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