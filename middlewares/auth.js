import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/User.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  
  const { token } = req.cookies;
  let token2 = req.cookies["connect.sid"];
  
 
  if (!token && (req.cookies["connect.sid"]===null || req.cookies["connect.sid"]===undefined )) return next(new ErrorHandler("Not Logged In", 409));

  if( token2!==undefined){
    // // const decoded = jwt.verify(token2, process.env.JWT_SECRET);
    // req.user = req.user;
    next();

  }else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
  next();

  }


  // if(req.cookies["connect.sid"]===null || req.cookies["connect.sid"]===undefined){
    
  // } else {
  //   const decoded = jwt.verify(token2, process.env.JWT_SECRET);
  //   req.user = await User.findById(decoded._id);
  // }

});




export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
  
    next();
};

export const onlyUser = (req, res, next) => {
  if (req.user.role !== "user")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

  next();
};


  export const authorizeTeacher = (req, res, next) => {
    if (req.user.role !== "teacher")
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
  
    next();
  };


  export const notAuthorizeUser = (req, res, next) => {
   
    if (req.user.role === "user")
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
  
    next();
  };

export const authorizeSubscriber = (req, res, next) => {
   
    if (req.user.subscription.status !== "active" && (req.user.role!=="admin" || req.user.role!=="teacher"))
      return next(
        new ErrorHandler(
          `Only subscriber can access this resources`,
          403
        )
      );
  
    next();
  };

