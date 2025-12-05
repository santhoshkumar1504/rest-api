const { Category, userModel } = require("../models");

const addCategory=async(req,res,next)=>{
    try{
        const {title,desc}=req.body;
        const {_id}=req.user;

        const isCategoryexists=await Category.findOne({title});
        if(isCategoryexists)
        {
            res.code=400;
            throw new Error("Category already exists");
        }

        const user =await userModel.findById(_id);
        if(!user)
        {
            res.code=404;
            throw new Error("User Not found");
        }

        await Category.insertOne({title,desc,updatedBy:_id});

        res.status(200).json({code:200,status:true,message:"Category added successfully"});

    }
    catch(error)
    {
        next(error);
    }
}

const updateCategory=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {_id}=req.user;
        const {title,desc}=req.body;

        const category=await Category.findById(id);
        if(!category)
        {
            res.code=404;
            throw new Error("Category not found");
        }

        const isCategoryexists=await Category.findOne({title});
        if(isCategoryexists && isCategoryexists.title===title && String(isCategoryexists._id)!==String(category.id))
        {
            // if (id mismatch & title same)
            res.code=400;
            throw new Error("Title already exists");
        }

        category.title=title ? title :category.title;
        category.desc =desc;
        category.updatedBy=_id;
        await category.save();

        res.status(200).json({code:200,status:true,message:'Category updated successfully',data:{category}});

    }
    catch(error)
    {
        next(error);
    }
}

const deleteCategory=async(req,res,next)=>{
    try{
        const {id}=req.params;

        const isCategoryexists=await Category.findById(id);
        if(!isCategoryexists)
        {
            res.code=404;
            throw new Error("Category not exists");
        }

        await Category.findByIdAndDelete(id);
        res.status(200).json({code:200,status:true,message:"Categary deleted successfully"});
    }
    catch(error)
    {
        next(error);
    }
}


const getCategory=async (req,res,next)=>{
    try{
        const {q,size,page}=req.query;
        let query={};

        const sizeNumber=parseInt(size)||10;
        const pageNumber=parseInt(page)||1;


        if(q)
        {
            const search=RegExp(q,"i");         //i for case sensitive
            query={$or:[{title:search},{desc:search}]};
        }

        const total=await Category.countDocuments(query);

        const pages=Math.ceil(total/sizeNumber);

        //Search and Pagination
        const categories=await Category.find(query).skip((pageNumber-1)*sizeNumber).limit(sizeNumber).sort({updatedAt:-1});

        res.status(200).json({code:200,status:true,message:"Get category list successfully",data:{categories,total,pages}});
    }
    catch(error)
    {
        next(error);
    }
}

const getOneCategory=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const category=await Category.findById(id);
        if(!category)
        {
            res.code=404;
            throw new Error("Category not found");
        }

        res.status(200).json({code:200,status:true,message:"get category successfully",data:{category}});
    }
    catch(error)
    {
        next(error);
    }
}

module.exports={addCategory,updateCategory,deleteCategory,getCategory,getOneCategory};