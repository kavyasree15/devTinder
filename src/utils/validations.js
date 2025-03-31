const validator=require('validator');

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password,age}=req.body;
    if(!firstName||!lastName){
        throw new Error("First name and last name are required");
    }else if(!validator.isEmail(emailId)){
        throw new Error("valid Email is required");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be strong");
    }
}

module.exports={validateSignUpData}