const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:Number
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});



module.exports =mongoose.model("User",userSchema);