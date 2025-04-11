const express = require('express');
const requestRouter = express.Router();
const {userAuth}=require('../middlewares/auth');
const ConnectionRequest=require("../models/connectionRequest")
const User=require('../models/user');

requestRouter.post('/request/send/:status/:toUserId',
    userAuth,async(req, res) => {
   try {
    
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"invalid status type: "+status});
        }

        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"user not found"});
        }

        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message:"connection request already exists!!"});
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data=await connectionRequest.save();

        res.json({
            message:req.user.firstName+" is "+status+" in "+toUser.firstName,
            data,
        });




   } catch (error) {
    res.status(400).send("error: "+error.message);
   }

})
module.exports=requestRouter;