

import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole, Message } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";






export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const { messageId, serverId } = req.query;
        const { content,  channelIds } = req.body;
        if (!userId) {
            // return res.status(401).json({ error: "Unauthorized" });
            return res.status(401).json({error:"Unauthorized"});
          }
      
          if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
          }
      
          if (!channelIds || channelIds?.length===0) {
            return res.status(400).json({ error: "Channel ID missing" });
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


    let messages:Message[]  = []


    const forwardedMessagePromises =channelIds && channelIds.map(async (channelId:string) => {
      const message =  await db.message.create({
         data: {
           content,
           serverId:serverId as string,
           channelId:channelId as string,
           memberId:member.id as string,
           forwardedMessageId:messageId as string
         },
         include: {
           member: {
             include: {
               user: true,
             }
           },
           channel:true
         }
       });
       console.log("MEssage", message);
       messages=[...messages , message];
       console.log("MEssageesss", messages.length)
 
       channelIds && channelIds?.map(async (channelId:string,i:number) => {
         const updateKey = `chat:${channelId}:messages`;
         res?.socket?.server?.io?.emit(updateKey, messages[i]);
         console.log("Soket Key", i, messages[i]);
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


