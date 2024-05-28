import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";



export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, conversationId} = req.query;
        if(!serverId || !conversationId) return res.status(409).json({ error: "Something went wrong" });

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return res.status(401).json({ error: "Member not found" }); 

        const {question, options, answerType, expiryDate,anonymous } = req.body;
    
        const polls = await db.poll.create({
            data:{
                question,
                options,
                answerType,
                anonymous,
                expiryDate,
                createdBy:member.id,
                serverId:serverId as string
                
            }
        });

        const message = await db.directMessage.create({
            data:{
                pollId:polls.id,
                serverId:serverId as string,
                memberId:member.id,
                conversationId: conversationId as string,
            },
            include:{
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
                },
                member:{
                    include:{
                        user:true
                    }
                },
            }
        });

    const channelKey = `chat:${conversationId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json("Polls created successfully");
    } catch (error) {
        console.log(error);
    }
}


export default POST;