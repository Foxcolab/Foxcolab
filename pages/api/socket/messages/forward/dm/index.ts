

import { GetAuth } from "@/lib/GetAuth";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { DirectMessage, MemberRole, Message } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";






export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const { messageId, directMessageId, serverId } = req.query;
        const { content,  memberIds } = req.body;
        // console.log()
        if (!userId) {
            // return res.status(401).json({ error: "Unauthorized" });
            return res.status(401).json({error:"Unauthorized"});
          }
      
          if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
          }
      

          const server = await db.server.findFirst({
            where: {
              id: serverId as string,
              Members: {
                some: {
                  userId: userId as string,
                }
              }
            },
            include: {
              Members: true,
            }
          })
      
          if (!server) {
            return res.status(404).json({ error: "Server not found" });
          }

  
          const member = server.Members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let conversationIds:string[] = [];
    for(let i=0; i<memberIds.length;i++){
        const conversationId:object = await getOrCreateConversation(member.id, memberIds[i]);

        console.log("Conversation ID", conversationId?.id);
        conversationIds.push(conversationId?.id);
    }

    console.log("Conversation IDs :", conversationIds);

    let messages:DirectMessage[]  = []


    const forwardedMessagePromises =conversationIds && conversationIds.map(async (conversationId:string) => {
        const message = await db.directMessage.create({
            data: {
              content,
              conversationId: conversationId as string,
              memberId: member.id,
              forwardedMessageId: messageId as string,
              forwardedDirectMessageId:directMessageId as string
            },
            include: {
              member: {
                include: {
                  user: true,
                }
              },
            
            }
          });
       messages=[...messages , message];
 
       conversationIds && conversationIds?.map(async (conversationId:string,i:number) => {
        const channelKey = `chat:${conversationId}:messages`;
        res?.socket?.server?.io?.emit(channelKey, message);
       })
   
       // return NextResponse.json({
       //     success:true,
       //     message
       // }, {status:200});
       return res.status(200).json({ success:true, messages });
 
     });

  






    } catch (error) {
        console.log(error);
    }

}

export default POST;


