const jwt=require('jsonwebtoken');
const User=require('../models/user');

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Not authenticated");
        }

        const decodedObj=await jwt.verify(token,"kavya@134#");
        const {_id}=decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();

    }
    catch(err){
        res.status(401).send("Unauthorized"+err.message);
    }

      
};
module.exports={
    userAuth
 
}