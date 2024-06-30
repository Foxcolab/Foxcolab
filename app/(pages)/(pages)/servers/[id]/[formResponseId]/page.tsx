import FormDetails from '@/app/(pages)/components/forms/FormDetails/FormDetails'
import { getServer } from '@/lib/db/ServerLib'
import { myProfile } from '@/lib/db/profile'
import { db } from '@/prisma'
import { redirect } from 'next/navigation'
import React from 'react'


interface Props {
    params:{
        id:string
        formResponseId:string
    }
}
async function page({params}:Props) {

    const profile = await myProfile();
    if(!profile) redirect('/home')
    const server = await getServer(params.id, profile.id);
    if(!server) redirect('/home')

    const member = await db.member.findFirst({
        where:{
            userId:profile.id,
            serverId:params?.id
        }
    })

    const FormResponse = await db.formResponse.findFirst({
        where:{
            id:params?.formResponseId,
            serverId:params?.id,
        },
        include:{
            createdMember:{
                include:{
                    user:true
                }
            },
            formFieldResponses:{
                include:{
                    formField:true,
                    files:true
                }
            }
        }
    });

    if(!FormResponse) redirect(`/servers/${params?.formResponseId}`);

    const form = await db.form.findFirst({
        where:{
            id:FormResponse.formId,
            serverId:params?.id,
            // createdMember:{
            //     userId:profile.id
            // }
        },
        include:{
            createdMember:{
                include:{
                    user:true
                }
            }
        }
    });

    if(!form) redirect(`/servers/${params?.id}`);

    const isAdmin = form?.createdMember?.userId === profile.id;
    const isRespondent = FormResponse.createdBy = profile?.id;
    if(!isAdmin && !isRespondent) redirect(`/servers/${params?.id}`);




  return (
    <>
    
    
    <FormDetails formResponse={FormResponse} form={form} />
    
    
    
    
    </>
  )
}

export default page