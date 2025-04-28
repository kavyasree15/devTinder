const mongoose = require('mongoose');
const validator= require('validator');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s"
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

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id},"kavya@134#");
    return token;
};

userSchema.methods.validatePassword=async function(passwordByInputUser){
    const user=this;
    const passwordHash=user.password;

    const isValidPassword=bcrypt.compare(passwordByInputUser,passwordHash);
    return isValidPassword;

};


module.exports=new mongoose.model("User",userSchema);