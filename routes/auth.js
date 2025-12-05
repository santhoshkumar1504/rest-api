const express=require('express');
const {authController}= require('../controllers');
const {signupValidator,signinValidator, emailValidator, verifyUserValidator, recoverpasswordValidator, changePassValidator, updateProfileValidator}=require('../validators/authValidate');
const validate = require('../validators/validate');
const { isAuth } = require('../middlewares');

const router=express.Router();

router.post('/signup',signupValidator,validate,authController.signup);

router.post('/signin',signinValidator,validate,authController.signin);

router.post('/send-verification-email',emailValidator,validate,authController.verifyCode);

router.post('/verify-user',verifyUserValidator,validate,authController.verifyUser);

router.post('/forgot-password-code',emailValidator,validate,authController.forgotPasswordCode);

router.post('/recover-password',recoverpasswordValidator,validate,authController.recoverPassword);

router.put('/change-password',changePassValidator,validate,isAuth,authController.changePassword);

router.put('/update-profile',isAuth,updateProfileValidator,validate,authController.updateProfile);

module.exports=router;