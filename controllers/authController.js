const { userModel } = require("../models");
const comparePassword = require("../utils/comparePassword");
const generateCode = require("../utils/generateCode");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const sendEmail = require("../utils/sendEmail");

const signup= async (req,res,next)=>{
    try{
        const {name,email,password,role}=req.body;

        const emailExists=await userModel.findOne({email:email});
        if(emailExists)
        {
            res.code=400;
            throw new Error("Email already exists");
        }

        const hashedPassword=await hashPassword(password);

        await userModel.insertOne({name:name,email:email,password:hashedPassword,role:role});
        res.status(201).json({code:201, status:true, message:"User registered successfully"});
    }
    catch(error)
    {
        next(error);
    }
}

const signin=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email:email});
        if(!user)
        {
            res.code=401;
            throw new Error("Invalid Credentials")
        }
        const match=await comparePassword(password,user.password);

        if(!match)
        {
            res.code=401;
            throw new Error("Invalid Credentials")
        }

       const token=generateToken(user);

        res.status(200).json({code:200,status:true,message:"User signin successful",data:token})
       
    }
    catch(error)
    {
        next(error);
    }
}

const verifyCode=async (req,res,next)=>{
    try{
        const {email}=req.body;

        const user=await userModel.findOne({email:email});

        if(!user)
        {
            res.code=404;
            throw new Error("User Not Found");
        }

        if(user.isverified)
        {
            res.code=400;  //Bad request
            throw new Error("User already verified")
        }

        const code=generateCode(6);

        await userModel.updateOne({email:user.email},{$set:{verificationCode:code}});
        // or user.verificationcode=code   
        // await user.save()
        await sendEmail(user.email,"Verify Account",code,"This is the code to verify user");

        res.status(200).json({code:200,status:true,message:"User verification code sent successfully"});
    }
    catch(error)
    {
        next(error);
    }
}

const verifyUser=async (req,res,next)=>{
    try{
        const {email,code}=req.body;

        const user=await userModel.findOne({email});
        if(!user)
        {
            res.code=404;
            throw new Error("User Not Found");
        }

        if(user.verificationCode!=code)
        {
            res.code=400;
            throw new Error("Invalid Code");
        }

        user.isverified=true;
        user.verificationCode=null;
        await user.save();


        res.status(200).json({code:200,status:true,message:"User verified successfully"});
        
    }
    catch(error)
    {
        next(error);
    }
}

const forgotPasswordCode=async (req,res,next)=>{
    try{
        const {email}=req.body;

        const user=await userModel.findOne({email});

        if(!user)
        {
            res.code=404;
            throw new Error("User Not Found");
        }

        const code=generateCode(6);

        // await userModel.updateOne({email:user.email},{$set:{forgotPasswordCode:code}});
        user.forgotPasswordCode=code;
        await user.save();

        await sendEmail(
               user.email,
               "Forgot password code",
               code,
               "Change your password" 
        );

        res.status(200).json({code:200,status:true,message:"Forgot password code sent successfully"})

    }
    catch(error)
    {
        next(error);
    }
}

const recoverPassword=async (req,res,next)=>{
    try{
        const {email,code,password}=req.body;

        const user=await userModel.findOne({email});
        if(!user)
        {
            res.code=404;
            throw new Error("User Not Found");
        }

        if(user.forgotPasswordCode!==code)
        {
            res.code=400;
            throw new Error("Invalid Code");
        }

        const hashedPassword=await hashPassword(password);

        user.password=hashedPassword;
        user.forgotPasswordCode=null;
        await user.save();

        res.status(200).json({code:200,status:true,message:'Password recovered successfully'})

    }
    catch(error)
    {
        next(error);
    }
}

const changePassword=async (req,res,next)=>{
    try{
        const {_id}=req.user;
        const {oldpass,newpass}=req.body;

        const user=await userModel.findById(_id);

        if(!user)
        {
            res.code=404;
            throw new Error("User not found");
        }

        const match=await comparePassword(oldpass,user.password);
        if(!match)
        {
            res.code=400;
            throw new Error("Old password doesn't match");
        }

        if(oldpass===newpass)
        {
             res.code=400;
            throw new Error("You are providing old password");           
        }

        const hashedPassword=await hashPassword(newpass);
        user.password=hashedPassword;
        await user.save();

        res.status(200).json({code:200,status:true,message:"Password changed successfully"});
    }
    catch(error)
    {
        next(error);
    }
}

const updateProfile=async (req,res,next)=>{
    try{
        const {_id}=req.user;
        const {name,email}=req.body;

        const user=await userModel.findById(_id).select("-password -verificationCode -forgotPasswordCode");

        if(!user)
        {
            res.code=404;
            throw new Error("User not found");
        }

        if(email)
        {
            const isEmailExist=await userModel.findOne({email});
            if(isEmailExist && isEmailExist.email===email && String(user._id)!==String(isEmailExist._id))
            {
                res.code=400;
                throw new Error("Email already exists");
            }
        }

        user.name=name ? name :user.name;
        user.email=email?email:user.email;

        if(email)
        {
            user.isverified=false;
        }

        await user.save();
        res.status(200).json({code:200,status:true,message:"User profile updated successfully",data:{user}});

    }
    catch(error)
    {
        next(error);
    }
}

module.exports={signup,signin,verifyCode,verifyUser,forgotPasswordCode,recoverPassword,changePassword,updateProfile};

