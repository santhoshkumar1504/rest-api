const jwt=require('jsonwebtoken');
const { jwtSecret, email } = require('../config/Connection');

const isAuth=async(req,res,next)=>{
    try{
        const autherization=req.headers.authorization && req.headers.authorization.split(' ');

        const token=autherization.length > 1 ? autherization[1]:[];
        if(token)
        {
          const payload=jwt.verify(token,jwtSecret);
          if(payload)
          {
                req.user={
                    _id:payload._id,
                    name:payload.name,
                    email:payload.email,
                    role:payload.role
                }
                next();
          }
          else{
            res.code=400;
            throw new Error("Invalid Token");
          }
        }
        else
        {
            res.code=400;
            throw new Error("Token is required");
        }
        
    }
    catch(error)
    {
        next(error);
    }
}

module.exports=isAuth;