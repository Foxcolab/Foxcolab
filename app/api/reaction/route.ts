import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const messageId = req.nextUrl.searchParams.get('messageId');
        const serverId = req.nextUrl.searchParams.get('serverId');
        
        if(!messageId || !serverId) return NextResponse.json({
            error:"Something is missing"
        }, {status:400});
        const reqBody = await req.json();
        const {content} = reqBody;
        console.log("ADDING THIS REACTION: ",content);
        const message = await db.message.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string
            }
        });
        if(!message) return NextResponse.json({error:"Message not found"}, {status:404});



        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string,
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this sever"}, {status:404});
       
        let reaction;
        const reactions = await db.reaction.findMany({
            where:{
                messageId:message.id as string,
                createdBy:member.id
            }
        });
        if(reactions.length===0){
            // await db.message.update({
            //     where:{
            //         id:messageId as string,
            //         serverId:serverId as string
            //     },
            //     data:{
            //         Reactions:{
            //             create:{
            //                 content,
            //                 createdBy:member.id as string,
            //                 serverId:serverId as string
            //             }
            //         }
            //     }
        
            //    })
            reaction = await db.reaction.create({
                data:{
                   messageId:messageId as string,
                   createdBy:member.id as string,
                   serverId:serverId as string,
                   content 
                }
            })
        }else {
            let isPresent=false;
            for(let i=0; i<reactions.length; i++){
                if(reactions[i].content===content){
                    isPresent=true;
                    // await db.message.update({
                    //     where:{
                    //         id:messageId as string,
                    //         serverId:serverId as string
                    //     },
                    //     data:{
                    //         Reactions:{
                    //             delete:{
                    //                 id:reactions[i].id,
                    //                 createdBy:member.id
                    //             }
                    //         }
                    //     }
                
                    //    });
                    // break;
                    reaction = await db.reaction.delete({
                        where:{
                            id:reactions[i].id,
                            createdBy:member.id
                        }
                    })
                }
            }
            if(isPresent==false) {
                // await db.message.update({
                //     where:{
                //         id:messageId as string,
                //         serverId:serverId as string
                //     },
                //     data:{
                //         Reactions:{
                //             create:{
                //                 content,
                //                 createdBy:member.id as string,
                //                 serverId:serverId as string
                //             }
                //         }
                //     }
            
                //    })
                reaction = await db.reaction.create({
                    data:{
                       messageId:messageId as string,
                       createdBy:member.id as string,
                       serverId:serverId as string,
                       content 
                    }
                })
            }
        }
      
        console.log("SucessFul", content);
        
        return NextResponse.json({
            success:true,
            reaction
            // message:"Pinned a message",
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}

export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        
        const reactionId = req.nextUrl.searchParams.get('reactionId');
        const messageId = req.nextUrl.searchParams.get('messageId');
        const serverId = req.nextUrl.searchParams.get('serverId');
        
        if(!messageId || !reactionId) return NextResponse.json({
            error:"Something is missing"
        }, {status:400});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string,
            }
        });
        
        if(!member) return NextResponse.json({error:"You are not a member of this sever"}, {status:404});

        const message = await db.message.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string,
                Reactions:{
                    some:{
                        id:reactionId as string,
                        createdBy:member.id as string
                    }
                }
            }
        });
        if(!message) return NextResponse.json({error:"Message not found"}, {status:404});





        await db.message.update({
        where:{
            id:messageId as string,
            serverId:serverId as string
        },
        data:{
            Reactions:{
                delete:{
                    id: reactionId as string,
                    createdBy:member.id as string
                }
            }
        }

       })
        
        return NextResponse.json({
            success:true,
            // message:"Pinned a message",
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}