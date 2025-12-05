const express=require('express');
const router=express.Router();
const isAuth=require('../middlewares/isAuth');
const upload = require('../middlewares/file');
const fileUpload = require('../controllers/file');

router.post('/upload',isAuth,upload.single("media"),fileUpload); //single file upload

router.post('/multipleupload',isAuth,upload.array("media",3),fileUpload); //multiple file upload

module.exports=router;