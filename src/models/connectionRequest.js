const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },
    },
    
},{
    timestamps:true,
});

connectionRequestSchema.pre("save",function(next){
        const connectionRequest=this;
        //check if th from userid is same as to userid
        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("cannot send connection request to yourself");
            
        }
        next();
});

const connectionRequestModel=new mongoose.model("connectionRequest",connectionRequestSchema);

module.exports=connectionRequestModel;