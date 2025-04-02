const express=require('express');
const connectDB=require('./config/database');
const app=express();

const cookieParser=require('cookie-parser');



app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);




// app.get('/user',async(req,res)=>{

    
//     // const users=await User.findById('67e29eee57d676cb7601c18c');
//     // res.send(users);



//     // const userEmail=req.body.emailId;
//     // try {
//     //     const user=await User.find({emailId: userEmail});
//     //     if(user.length===0){
//     //         res.status(404).send("User not found");

//     //     }else{
//     //         res.send(user);
//     //     }
       
//     // } catch (error) {
//     //     res.status(404).send("an error occurred"+error.message);
//     // }
    
// })

// app.get('/feed',async(req,res)=>{
//      try {
//         const users=await User.find({});
//         res.send(users);
//     } catch (error) {
//         res.status(404).send("an error occurred"+error.message);
//     }
// })


// app.delete('/delete',async(req,res)=>{
//     const userId=req.body._id;
//     const user=await User.findByIdAndDelete({_id:userId});
//     res.send("user deleted successfully");
// })


// app.patch('/update',async(req,res)=>{
//     const userId=req.body.userId;
//     const data=req.body;

    

//     try {
//         const ALLOWED_UPDATES=["userId","skills","photoUrl","about","gender","age","firstName",];
//         const isAllowedUpdate=Object.keys(data).every((k)=>
//         ALLOWED_UPDATES.includes(k)
//         );
//         if(!isAllowedUpdate) {
//         throw new Error("invalid updates");
        
//         }
//         const user=await User.findByIdAndUpdate({_id:userId},data);
//         console.log(user);
//         res.send("user updated successfully");
//     } catch (error) {
//         res.status(404).send("an error occurred"+error.message);
//     }
    
// });

connectDB().then(()=>{
    console.log("database connection established");
    app.listen(2222, ()=>{
    console.log('Server started on port 2222');
    
})
})
.catch((err)=>{
    console.error("database cannot be connected")
});

