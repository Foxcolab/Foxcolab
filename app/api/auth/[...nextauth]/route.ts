import nextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/prisma";
import {session} from "./session"
 const authOption:NextAuthOptions = {
    session:{
        strategy:"jwt",
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: { params: { scope: 'user' } },
            checks:['none']
          })

    ],
    callbacks:{
        async signIn({account, profile}){
            if(account?.provider==="google"){
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
                        profilePic:profile?.picture,
                        googleId:profile?.at_hash,
                        verified:true
                    },
                    update: {
                        name:profile.name
                    }
                });
    
                return true;
            }else {
                console.log("Executing...");
                console.log("Profile:", profile);
                console.log("Account:", account);

                console.log(profile?.email);
                if(!profile?.email){
                    throw new Error("No email");
                }
                console.log("Email::", profile.email);
                await db.user.upsert({
                    where:{
                        email:profile.email
                    },
                    create:{
                        email:profile.email,
                        name:profile.name,
                        profilePic:profile?.avatar_url,
                        githubId:account?.providerAccountId,
                        verified:true
                    },
                    update:{
                        name:profile.name
                    }
                })
                return true


                // const user = await db.user.findFirst({
                //     where:{
                //         email:profile.email
                //     }
                // });
                // console.log("User",user);
                // if(user===null){
                //     await db.user.create({
                //         data:{
                //             email:profile.email,
                //             name:profile.name,
                //             profilePic:profile?.picture,
                //             githubId:profile?.id
                //         }
                //     });
                //     return true;
                // }else {
                //     await db.user.update({
                //         where:{
                //             email:profile.email
                //         },
                //         data:{
                //             name:profile.name
                //         }
                //     })
                //     return true
                // }
                
                
    
            }
                
            
           
        
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
    },
    cookies:{
        sessionToken:{
            name:'next-auth.session-token',
            options: {
                // Provide the required cookie options here
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            }
        },
        
    }
}
 

const handler = nextAuth(authOption);
export {handler as GET, handler as POST};