const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        role:{
            type:Number,
            default:3
        },
        forgotPasswordCode:String,
        verificationCode:String,
        isverified:{type:Boolean,default:false}
        // 1 for super admin
        // 2 for normal admin
        // 3 for normal user
    },
    {timestamps:true}
)

const userModel=mongoose.model("users",userSchema);

module.exports=userModel;