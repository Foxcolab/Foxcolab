import nextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/prisma";
import {session} from "./session"
 const authOption:NextAuthOptions = {
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),
    ],
    callbacks:{
        async signIn({account, profile}){
            if(!profile?.email){
                throw new Error("No email");
            }
            await db.user.upsert({
                where:{
                    email:profile.email,
                },
                create:{
                    email:profile.email,
                    name:profile.name,
                    profilePic:profile.image,
                },
                update: {
                    name:profile.name
                }
            });

            return true;
        
        },
        session, 
        async jwt({token, user, account, profile}){
            if(profile){
                const user = await db.user.findUnique({
                    where:{
                        email:profile.email
                    },
                });
                if(!user){
                    throw new Error("User not found");
                    
                }
                token.id = user.id;
            }
            return token;
        }
    }
}

const handler = nextAuth(authOption);
export {handler as GET, handler as POST};