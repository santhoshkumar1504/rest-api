const multer=require('multer');
const path=require('path');
const generateCode = require('../utils/generateCode');

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
            callback(null,"./uploads");
        },
    filename:(req,file,callback)=>{
        const originalFileName=file.originalname;
        const ext=path.extname(originalFileName);
        const fileName=originalFileName.replace(ext,"");
        const compressedFileName=fileName.split(' ').join('_');
        const lowercase=compressedFileName.toLocaleLowerCase();
        const code=generateCode(12);
        const finalFileName=`${lowercase}_${code}${ext}`;
        
        callback(null,finalFileName);
    }
    
})

const upload=multer({
    storage,
    fileFilter:(req,file,callback)=>{
        const mimetype=file.mimetype;

        if(mimetype==="image/jpeg"||mimetype==="image/jpg"||mimetype==="image/png"||mimetype==="application/pdf")
        {
            callback(null,true);
        }
        else{
        callback(new Error("Only image and pdf is allowed"));
        }
    }
})

module.exports=upload;