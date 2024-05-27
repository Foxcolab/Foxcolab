
import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";



export const PUT =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, pollId, messageId, voteId} = req.query;
        console.log(serverId, pollId, messageId);
        if(!serverId  || !pollId || !messageId || !voteId) return res.status(409).json({ error: "Something went wrong" });


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
        
        const PollVotes = await db.pollVote.findFirst({
            where:{
                id:voteId as string,
                messageId:messageId as string,
                pollId:pollId as string
                
            }
        });
        if(!PollVotes) return NextResponse.json({
            error:"Vote does not exists"
        }, {status:200});

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
                    update:{
                        where:{
                            id:voteId as string,
                            createdBy:member.id
                        },
                        data:{
                            vote:votes
                        }
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


export default PUT;