import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { Message, Threads } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const MESSAGES_BATCH = 10;

export async function GET(
  req: NextRequest
) {
  try {
    
    const userId = await GetDataFromToken(req);
    const profile = await db.user.findUnique({where:{
        id:userId
    }})
    const { searchParams } = new URL(req.nextUrl);
    
    const cursor = searchParams.get("cursor");
    const forumId = searchParams.get("forumId");
    
    
    
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    if (!forumId) {
        return new NextResponse("Forums ID missing", { status: 400 });
      }

    let messages: Threads[] = [];

    if (cursor) {
      messages = await db.threads.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          forumsId:forumId
        },
        include: {
          member: {
            include: {
              user: true,
            }
          },
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    } else {
      messages = await db.threads.findMany({
        take: MESSAGES_BATCH,
        where: {
            forumsId:forumId
        },
        include: {
          member: {
            include: {
              user: true,
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }
    
    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}