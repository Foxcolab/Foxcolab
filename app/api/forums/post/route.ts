import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";




export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const forumId =  req.nextUrl.searchParams.get('forumId');
        if(!forumId || !serverId || !sectionId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});
        const reqBody = await req.json();

        const {title, fileUrl, content} = reqBody;
        console.log(title, fileUrl, content);
        if(!title) return NextResponse.json({error:"Please enter the title fields"}, {status:409});

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        });
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        })
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});


        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumId as string,
                serverId:server.id,
                sectionId:sectionId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            },
            include:{
                manager:true
            }
        });
        if(!forumChannel) return NextResponse.json({error:"Forums not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = forumChannel?.whoCanCreatePost;
        const managers = forumChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = forumChannel.createdBy===member.id;
        const isMember = forumChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        

        const forums = await db.forums.create({
            data:{
                title,      
                memberId:member?.id as string,
                serverId:server.id as string,
                sectionId:forumChannel.sectionId as string,
                forumsChannelId:forumId,
                responses:{
                    create:[
                        {
                            content,
                            fileUrl,
                            uploadedFiles:{
                                connect:fileUrl?.map((file:string)=>({id:file}))
                            },
                            createdBy:member?.id as string,
                            serverId:server.id as string,
                            sectionId:forumChannel.sectionId as string
                        }
                    ]
                }
            }
        })

        await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumId as string, activityType:"Create", schemaType:"Forum Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:title, name:"Forum", message:"Create a new forum"});

        return NextResponse.json({
            success:true,
            error:"Post created successfully"
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}


export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const forumChannelId =  req.nextUrl.searchParams.get('forumChannelId');
        const forumId =  req.nextUrl.searchParams.get('forumId');
        if(!forumChannelId || !serverId || !forumId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});


        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        });
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        })
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});


        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:server.id,
                // sectionId:sectionId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                },
                Forums:{
                    some:{
                        id:forumId
                    }
                }
            },
            include:{
                Forums:{
                    where:{
                        id:forumId,
                        forumsChannelId:forumChannelId
                    }
                },
                manager:true
            }
        });
        if(!forumChannel) return NextResponse.json({error:"Forums not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = forumChannel?.whoCanDeletePost;
        const managers = forumChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = forumChannel.createdBy===member.id || forumChannel.Forums[0].memberId===member.id;
        const isMember = forumChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        



       const forum  = await db.forums.delete({
        where:{
            id:forumId as string,
            forumsChannelId:forumChannelId as string,
            serverId:serverId as string,
            
        }
       })

        await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumId as string, activityType:"Delete", schemaType:"Forum Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:forumChannel.Forums[0].title, name:"Forum", message:"Deleted a forum"});

        return NextResponse.json({
            success:true,
            error:"Post created successfully"
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}

export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const forumChannelId =  req.nextUrl.searchParams.get('forumChannelId');
        const forumId =  req.nextUrl.searchParams.get('forumId');
        if(!forumChannelId || !serverId  || !forumId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const reqBody = await req.json();
        const {title} = reqBody;

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        });
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        })
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});


        const forumChannel = await db.forumsChannel.findFirst({
            where:{
                id:forumChannelId as string,
                serverId:server.id,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            },
            include:{
                Forums:{
                    where:{
                        id:forumId,
                        forumsChannelId:forumChannelId
                    }
                },
                manager:true
            }
        });
        if(!forumChannel) return NextResponse.json({error:"Forums not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = forumChannel?.whoCanDeletePost;
        const managers = forumChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = forumChannel.createdBy===member.id || forumChannel.Forums[0].memberId===member.id;
        const isMember = forumChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        



       const forum  = await db.forums.update({
        where:{
            id:forumId as string,
            forumsChannelId:forumChannelId as string,
            serverId:serverId as string,
            
        },
        data:{
            title
        },

        include:{
            responses:{
                include:{
                    member:{
                        include:{
                            user:true
                        }
                    }
                }
            }
        }


       })

        await SchemaActivity({serverId:serverId as string, sectionId:forumChannel?.sectionId as string, schemaId:forumId as string, activityType:"Delete", schemaType:"Forum Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:forumChannel.Forums[0].title, name:"Forum", message:"Deleted a forum"});
        console.log("Updated Successfully");
        return NextResponse.json({
            success:true,
            error:"Post updated successfully",
            forum
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}