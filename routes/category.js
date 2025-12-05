const express=require('express');
const { categoryController } = require('../controllers');
const {addCategoryValidator,idValidator} = require('../validators/categoryValidate');
const validate = require('../validators/validate');
const { isAuth } = require('../middlewares');
const isAdmin = require('../middlewares/isAdmin');
const router=express.Router();

router.post('/',isAuth,isAdmin,addCategoryValidator,validate,categoryController.addCategory);

router.put('/:id',isAuth,isAdmin,idValidator,validate,categoryController.updateCategory);

router.delete('/:id',isAuth,isAdmin,idValidator,validate,categoryController.deleteCategory);

router.get('/',isAuth,categoryController.getCategory);

router.get('/:id',isAuth,idValidator,validate,categoryController.getOneCategory);

module.exports=router;