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


requestRouter.post('/request/review/:status/:requestId',
    userAuth,async(req, res) => {
   try {
        const loggedInUser=req.user;
        const {status,requestId}=req.params;

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"status not allowed!"});
        }

        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });
        //console.log("Logged-in user ID:", loggedInUser._id);
        //console.log("Request ID:", requestId);

        if(!connectionRequest){
            return res.status(400).json({message:"connection request not found"});
        }

        connectionRequest.status=status;

        const data=await connectionRequest.save();

        res.json({message:"connection request "+status,data});

   } catch (error) {
    res.status(400).send("error: "+error.message);
   }

})

module.exports=requestRouter;