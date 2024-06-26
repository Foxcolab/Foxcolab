import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";





 const POST =async(req:NextApiRequest,res: NextApiResponseServerIo)=>{
  try {
        const userId = await GetAuth(req);
        const { content, fileUrl, attachments } =  req.body;
      const { serverId, channelId, sectionId, messageId } = req.query;
      
      
      const user = await db.user.findUnique({
        where:{
            id:userId
        }
    });
    
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }    
    
      if (!serverId) {
        return res.status(400).json({ error: "Server ID missing" });
      }
        
      if (!channelId) {
        return res.status(400).json({ error: "Channel ID missing" });
      }
      if (!sectionId) {
        return res.status(400).json({ error: "Section ID missing" });
      }
            
      if (!content) {
        return res.status(400).json({ error: "Content missing" });
      }
      if (!messageId) {
        return res.status(400).json({ error: "Message ID missing" });
      }
      const server = await db.server.findFirst({
        where: {
          id: serverId as string,
          Members: {
            some: {
              userId: user.id
            }
          }
        },
        include: {
          Members: true,
        }
      });
      
      if (!server) {
        return res.status(404).json({ message: "Server not found" });
      }
      const channel = await db.channel.findFirst({
        where: {
          id: channelId as string,
          // serverId: serverId as string,
        }
      });
  
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
      const member = server.Members.find((member) => member.userId === user.id);

      if(!member) return res.status(404).json({ message: "Member not found" });
      
      const Sendmessage = await db.message.findFirst({
        where:{
            id:messageId as string,
            serverId:serverId as string,
            channelId:channelId as string,
            sectionId:sectionId as string
        },
      });
      
    if (!Sendmessage) {
        return res.status(404).json({ message: "Message not found" });
    }
    
    //  await db.message.update({
    //   where:{
    //     id:messageId as string,
    //   },
    //   data:{
    //     threads:{
    //       create:{
    //         createdBy:member.id as string,
    //         content,
    //         serverId:serverId as string,
    //         fileUrl,
    //         uploadedFiles:{
    //           connect:fileUrl?.map((file:string)=>({id:file}))
    //         },
    //         channelId:channelId as string
    //       },
          
    //     },
    //     incl
      
    //   }
    // })

    const threads = await db.threads.create({
      data:{
        messageId:messageId as string,
        createdBy:member.id as string,
        content,
        serverId:serverId as string,
        fileUrl,
        uploadedFiles:{
          connect:fileUrl?.map((file:string)=>({id:file}))
        },
        attachments:attachments
      },
      include:{
        member:{
          include:{
            user:true
          }
        },
        uploadedFiles:true
      }
    })


    
    const channelKey = `chat:${Sendmessage.id}:messages`;

    res?.socket?.server?.io?.emit(channelKey, threads);

    return res.status(200).json(Sendmessage.id);
  } catch (error) {
    console.log(error);
    
  }
}

export default POST;