import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
// import  "../../../../../../config/passport"


// export default async function() {
//     try {
//         // await connectDB();
//         passport.authenticate("google", (err:any, user:any, info:any)=>{
//             if(err || !user){
//                 return NextResponse.json({message:"Something error!", success:false}, {status:400});
//             }
//             const tokenData = {
//                 id:user._id,
//                 username:user.name,
//                 email:user.email
//             }
//             const token =  jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn:"15d"});
//             const response = NextResponse.json({
//                 message: "Login successful",
//                 success: true,
//             })
//             response.cookies.set("token",token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "none",     
//             });
//             return response;
            
//         })
//     } catch (error) {
        
//     }

// }