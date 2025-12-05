const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    }
},{timestamps:true})


const Category=mongoose.model("categorys",categorySchema);

module.exports=Category;