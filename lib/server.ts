import { db } from "@/prisma";
import { NextRequest } from "next/server";
import { GetDataFromToken2 } from "@/middlewares/getDataFromToken";
import jwt from "jsonwebtoken"

// export const getServerDetails = async(id:any, req:NextRequest)=>{
//     try {
//         // const userId = await GetuserId();
//         console.log(req);
        
//         const userId = await GetDataFromToken(req);
//         // console.log("OARA", params);
//         const url = new URL(req.url);
//         const serverId = url.searchParams.get('id');
//         console.log(serverId);
        
//         const server = await db.server.findUnique({
//             where:{
//                 id:serverId, 
//             Members: {
//                 some: {
//                     userId: userId
//                 }
//             }
//             },
//             include: {
//                 sections: {
//                     include:{
//                         channels: {
//                             orderBy: {
//                               createdAt: "asc",
//                             },
//                           },
//                     },
//                     orderBy: {
//                       createdAt: "asc",
//                     },
//                   },
                
//                 Members: {
//                   include: {
//                     user: true
//                   },
//                   orderBy: {
//                     role: "asc",
//                   }
//                 }
//               }
//         });
//         console.log(server);
        
//         return server;
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getServerDetails = async(id:any,token:any)=>{
  try {
    
    
    const server = await db.server.findUnique({
      where:{
        id:id,
        Members:{
          some:{
            // userId:userId
          }
        }
      }      
    });
    console.log(server);
    return server;
    
  } catch (error) {
   console.log(error);
    
  }
}