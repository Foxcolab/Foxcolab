import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";





 const POST =async(req:NextApiRequest,res: NextApiResponseServerIo)=>{
  try {
        const userId = await GetAuth(req);
        const { content, fileUrl, attachments } =  req.body;
      const { serverId,   forumId,forumsChannelId } = req.query;
   
      
      // console.log(serverId, forumId, forumsChannelId, content, fileUrl)
      
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
        
      if (!forumsChannelId) {
        return res.status(400).json({ error: "Forum Channel ID missing" });
      }    
      console.log("content");
      
      if (!content) {
        return res.status(400).json({ error: "Content missing" });
      }
      console.log("Found");
      
      if (!forumId) {
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
      console.log("SERVER");
      
      if (!server) {
        return res.status(404).json({ message: "Server not found" });
      }
     const forumChannel = await db.forumsChannel.findUnique({
      where:{
        id:forumsChannelId as string,
        serverId:serverId as string,
      }
     });
     console.log("FORUMSCHANNE")
     if (!forumChannel) {
      return res.status(404).json({ message: "Forum Channel not found" });
    }
      const member = server.Members.find((member) => member.userId === user.id);
      if(!member) return res.status(404).json({ message: "Member not found" });

      const Sendmessage = await db.forums.findFirst({
        where:{
            id:forumId as string,
            serverId:serverId as string,
        },
      });
      console.log("Forums", Sendmessage?.id);
      
    if (!Sendmessage) {
        return res.status(404).json({ message: "Message not found" });
    }
    
    //  await db.forums.update({
    //   where:{
    //     id:forumId as string,
    //   },
    //   data:{
    //     responses:{
    //       create:{
    //         content,
    //         fileUrl,
    //         serverId:serverId as string,
    //         sectionId:Sendmessage.sectionId as string,
    //         forumsChannelId:forumsChannelId as string,
    //         createdBy:member.id
    //       }
    //     }
    //   },
    //   include:{
    //     responses:{
    //       include:{
    //         member:{
    //           include:{
    //             user:true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })
    const forumRespnse = await db.forumResponse.create({
      data:{
        content,
        fileUrl,
        uploadedFiles:{
          connect:fileUrl?.map((file:string)=>({id:file}))
        },
        serverId:serverId as string,
        sectionId:Sendmessage.sectionId as string,
        forumsId:forumId as string,
        forumsChannelId:forumsChannelId as string,
        createdBy:member.id,
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

    res?.socket?.server?.io?.emit(channelKey, forumRespnse);

    return res.status(200).json(forumRespnse);
  } catch (error) {
    console.log(error);
    
  }
}

export default POST;