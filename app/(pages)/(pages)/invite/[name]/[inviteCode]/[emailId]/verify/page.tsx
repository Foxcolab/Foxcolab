import VerifyEmail from "@/app/(pages)/components/inviteCode/InvitePage/VerifyEmail";
import { db } from "@/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Verify Email | Foxcolab',
  description: "Verify your email to acccept the invitation.",
}


interface InviteCodePageProps {
    params:{
      inviteCode:string,
      name:string,
      emailId:string
    }
  }
async function VerifyPage({params}:InviteCodePageProps) {
    
  const server = await db.server.findFirst({
    where:{
      inviteCode:params.inviteCode as string
    },
    include:{
      Members:{
        include:{
          user:true
        }
      }
    }
  });
  if(!server) redirect('/');

  const user = await db.user.findFirst({
    where:{
      email: decodeURIComponent(params?.emailId )as string
    }
  });
  if(!user) redirect('/');

    
  return (
    <>
    
    <VerifyEmail createdAt={user.otpGenerate} params={params} />
    
    </>
  )
}

export default VerifyPage