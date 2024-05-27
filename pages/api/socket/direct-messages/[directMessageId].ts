// import { NextApiRequest } from "next";
// import { MemberRole } from "@prisma/client";

// import { NextApiResponseServerIo } from "@/types";
// import { db } from "@/prisma";
// import { GetAuth } from "@/lib/GetAuth";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponseServerIo,
// ) {
//   if (req.method !== "DELETE" && req.method !== "PATCH") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const profile = await GetAuth(req);
//     const { directMessageId, conversationId, serverId } = req.query;
//     const { content } = req.body;

//     if (!profile) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     if (!conversationId) {
//       return res.status(400).json({ error: "Conversation ID missing" });
//     }
//     if (!serverId) {
//       return res.status(400).json({ error: "Conversation ID missing" });
//     }
//     if (!directMessageId) {
//       return res.status(400).json({ error: "Direct message ID missing" });
//     }

//     const conversation = await db.conversation.findFirst({
//       where: {
//         id: conversationId as string,
//         OR: [
//           {
//             memberOne: {
//               userId: profile.id,
//             }
//           },
//           {
//             memberTwo: {
//               userId: profile.id,
//             }
//           }
//         ]
//       },
//       include: {
//         memberOne: {
//           include: {
//             user: true,
//           }
//         },
//         memberTwo: {
//           include: {
//             user: true,
//           }
//         }
//       }
//     })

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     const member = conversation.memberOne.user === profile.id ? conversation.memberOne : conversation.memberTwo;

//     if (!member) {
//       return res.status(404).json({ error: "Member not found" });
//     }

//     let directMessage = await db.directMessage.findFirst({
//       where: {
//         id: directMessageId as string,
//         conversationId: conversationId as string,
//       },
//       include: {
//         member: {
//           include: {
//             user: true,
//           }
//         },
//         uploadedFiles:true

//       }
//     })

//     if (!directMessage || directMessage.deleted) {
//       return res.status(404).json({ error: "Message not found" });
//     }

//     const isMessageOwner = directMessage.memberId === member.id;
//     const isAdmin = member.role === MemberRole.admin;
//     const isModerator = member.role === MemberRole.moderator;
//     const canModify = isMessageOwner || isAdmin || isModerator;

//     if (!canModify) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     if (req.method === "DELETE") {
//       directMessage = await db.directMessage.update({
//         where: {
//           id: directMessageId as string,
//           conversationId:conversationId as string
//         },
//         data: {
//           fileUrl: [],
//           uploadedFiles:[],
//           content: "This message has been deleted.",
//           deleted: true,
//         },
//         include: {
//           member: {
//             include: {
//               user: true,
//             }
//           }
//         }
//       })
//     }

//     if (req.method === "PATCH") {
//       if (!isMessageOwner) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       directMessage = await db.directMessage.update({
//         where: {
//           id: directMessageId as string,
//         },
//         data: {
//           content,
//         },
//         include: {
//           member: {
//             include: {
//               user: true,
//             }
//           }
//         }
//       })
//     }

//     const updateKey = `chat:${conversation.id}:messages:update`;

//     res?.socket?.server?.io?.emit(updateKey, directMessage);

//     return res.status(200).json(directMessage);
//   } catch (error) {
//     console.log("[MESSAGE_ID]", error);
//     return res.status(500).json({ error: "Internal Error" });
//   }
// }