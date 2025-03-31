const express=require('express');
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user')
const {validateSignUpData}=require('./utils/validations')
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {userAuth}=require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

app.get('/profile',userAuth,async(req, res)=>{
    try{


    const user=req.user;
    res.send(user);
    }catch(err){
        res.status(404).send("error:",err.message);
    }
        
});

app.post('/signUp',async(req,res)=>{
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

app.post('/login',async(req,res)=>{
    
    try {
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("invalid credentials");
        }
        const isValidPassword=bcrypt.compare(password,user.password);
        
        const token=await jwt.sign({_id:user._id},"kavya@134#");
        console.log(token);

        
        if(isValidPassword){
            res.cookie("token",token);
            res.send("Logged in successfully");
        }else{
            throw new Error("Invalid password");
        }
    }catch(err){
        res.status(404).send("an error occurred:" + err.message);
    }
})
app.post('/sendConnectionRequest',userAuth,(req, res) => {
    const user=req.user;
    console.log("sending the connection request");
    res.send(user.firstName+" sent the connection request");
})

app.get('/user',async(req,res)=>{

    
    // const users=await User.findById('67e29eee57d676cb7601c18c');
    // res.send(users);



    // const userEmail=req.body.emailId;
    // try {
    //     const user=await User.find({emailId: userEmail});
    //     if(user.length===0){
    //         res.status(404).send("User not found");

    //     }else{
    //         res.send(user);
    //     }
       
    // } catch (error) {
    //     res.status(404).send("an error occurred"+error.message);
    // }
    
})

app.get('/feed',async(req,res)=>{
     try {
        const users=await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send("an error occurred"+error.message);
    }
})


app.delete('/delete',async(req,res)=>{
    const userId=req.body._id;
    const user=await User.findByIdAndDelete({_id:userId});
    res.send("user deleted successfully");
})


app.patch('/update',async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;

    

    try {
        const ALLOWED_UPDATES=["userId","skills","photoUrl","about","gender","age","firstName",];
        const isAllowedUpdate=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
        );
        if(!isAllowedUpdate) {
        throw new Error("invalid updates");
        
        }
        const user=await User.findByIdAndUpdate({_id:userId},data);
        console.log(user);
        res.send("user updated successfully");
    } catch (error) {
        res.status(404).send("an error occurred"+error.message);
    }
    
});

connectDB().then(()=>{
    console.log("database connection established");
    app.listen(2222, ()=>{
    console.log('Server started on port 2222');
    
})
})
.catch((err)=>{
    console.error("database cannot be connected")
});

