
import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";



export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, pollId, messageId} = req.query;
    
        if(!serverId  || !pollId || !messageId) return res.status(409).json({ error: "Something went wrong" });


        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return res.status(401).json({ error: "Member not found" }); 


        
        const {votes} = req.body;
        console.log(votes);
        if(!votes) return res.status(401).json({ error: "Vote not found" }); 


        const polls = await db.poll.findFirst({
            where:{
                serverId:serverId as string,
                id:pollId as string,
            }
        });
        console.log("Polls Found:", polls?.id)
        if(!polls) return res.status(401).json({ error: "Polls not found" }); 

        const message = await db.directMessage.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string,
                pollId:pollId as string
            },
            include:{
                poll:true
            }
        });
        if(!message) return res.status(401).json({ error: "Message not found" }); 

        const updatedMessage = await db.directMessage.update({
            where:{
                id:messageId as string,
                serverId:serverId as string,
                conversationId:message.conversationId as string
            },
            data:{
                pollVotes:{
                    create:{
                        vote:votes,
                        createdBy:member.id,
                        serverId:serverId as string,
                        pollId:pollId as string
                    }
                }
            },
            include:{
                member:{
                    include:{
                        user:true
                    }
                },
                poll:{
                    include:{
                        createdMember:{
                            include:{
                                user:true
                            }
                        },
                        votes:{
                            include:{
                                createdMember:{
                                    include:{
                                        user:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
       

        const updateKey = `chat:${message.conversationId}:messages:update`;
        res?.socket?.server?.io?.emit(updateKey, updatedMessage);

        console.log("Polls Submitted Successfully");

    return res.status(200).json("Polls created successfully");
    } catch (error) {
        console.log(error);
    }
}


export default POST;