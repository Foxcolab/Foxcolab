import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";



export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, channelId} = req.query;
        if(!serverId || !channelId) return res.status(409).json({ error: "Something went wrong" });

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return res.status(401).json({ error: "Member not found" }); 
        const channel = await db.channel.findFirst({
            where:{
                id:channelId as string,
                serverId:serverId as string
            },
            include:{
                manager:true
            }
        })
        if(!channel) return res.status(401).json({ error: "Channel not found" }); 

        let hasPermission = false;
        const whoHavePermission = channel?.whoCanCreatePolls;
        const managers = channel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = channel.createdBy===member.id;
        const isMember = channel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return res.status(401).json({ error: "You are not authorized" });
        
        const {question, options, answerType, expiryDate,anonymous } = req.body;
        console.log(question, options, answerType, expiryDate, anonymous);

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

        const message = await db.message.create({
            data:{
                pollId:polls.id,
                serverId:serverId as string,
                sectionId:channel.sectionId,
                channelId:channel.id,
                memberId:member.id,
            },
            include:{
                poll:{
                    include:{
                        createdMember:{
                            include:{
                                user:true
                            }
                        }
                    }
                },
                member:{
                    include:{
                        user:true
                    }
                }
            }
        });

    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json("Polls created successfully");
    } catch (error) {
        console.log(error);
    }
}


export default POST;