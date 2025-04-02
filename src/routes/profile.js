const express = require('express');
 const profileRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const validateEditProfileData=require('../utils/validations');
 profileRouter.get('/profile/view',userAuth,async(req, res)=>{
    try{


    const user=req.user;
    res.send(user);
    }catch(err){
        res.status(404).send("error:",err.message);
    }
        
});

profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try {
        if(!validateEditProfileData){
            throw new Error('Invalid data');
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        await loggedInUser.save();
        
        res.json({
            message:`${loggedInUser.firstName},your profile updated successfully `,
            data:loggedInUser,
        });
    } catch (error) {
        res.status(404).send("error:",error.message);
    }
});

module.exports=profileRouter;
