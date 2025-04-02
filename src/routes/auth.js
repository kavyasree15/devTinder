const express = require('express');

const authRouter=express.Router();

const bcrypt=require('bcrypt');
const {validateSignUpData}=require('../utils/validations')
const User=require('../models/user')


authRouter.post('/signUp',async(req,res)=>{
    try {
        validateSignUpData(req);
        
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);

        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        });
    
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        res.status(404).send("an error occurred"+error.message);
    }
    
});


authRouter.post('/login',async(req,res)=>{
    
    try {
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("invalid credentials");
        }
        const isValidPassword=await user.validatePassword(password);
        
        
        if(isValidPassword){
            const token=await user.getJWT();
            res.cookie("token",token);
            res.send("Logged in successfully");
        }else{
            throw new Error("Invalid password");
        }
    }catch(err){
        res.status(404).send("an error occurred:" + err.message);
    }
})

authRouter.post('/logout',async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now()),});
    res.send("logout successfull");
})

module.exports=authRouter;