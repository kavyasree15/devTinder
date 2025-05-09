const express=require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const ConnectionRequest=require('../models/connectionRequest');
const user = require("../models/user");
const userRouter=express.Router();
const User=require('../models/user');

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        })
        .populate("fromUserId", ['firstName', 'lastName', 'photoUrl', 'about', 'age', 'gender'])
        .populate("toUserId", ['firstName', 'lastName', 'photoUrl', 'about', 'age', 'gender']);
        
        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    } catch (error) {
        res.status(400).send("ERROR " + error.message);
    }
});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
   
    try {
         const loggedInUser=req.user;
         const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
            ],
         }).populate('fromUserId', 'firstName lastName photoUrl about age gender')
           .populate('toUserId', 'firstName lastName photoUrl about age gender');

         res.json({data:connectionRequests});

    } catch (error) {
        res.status(400).send("ERROR "+error.message);
    }

})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try {

        const loggedInUser=req.user;

        const page=parseInt(req.query.page);
        let limit=parseInt(req.query.limit);
        limit =limit>50?50:limit;

        const skip=(page-1)*limit;

        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ],
        }).select("fromUserId toUserId");
        
        const hideUsersFromFeed=new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        //console.log(hideUsersFromFeed);

        const users= await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select("firstName lastName photoUrl about age gender")
          .skip(skip)
          .limit(limit); 

        res.send({data:users});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
    
})


module.exports=userRouter;