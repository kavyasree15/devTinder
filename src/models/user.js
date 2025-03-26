const mongoose = require('mongoose');
const validator= require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid")
        }
        
    }
},
    password:{
        type:String,
        required:true,
        minlength:6,
        
    },
    age:{
        type:Number,
        required:true,
        min:18,
        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender must be male, female or other");
            }
        }
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"software development"
    },
    skills:{
        type:[String],
    },
},
{
    timestamps:true,
});


module.exports=new mongoose.model("User",userSchema);