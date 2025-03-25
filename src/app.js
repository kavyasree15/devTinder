const express=require('express');
const connectDB=require('./config/database');
const app=express();


app.use("/user",(req,res)=>{
    res.send("hey i m kavya");
})


app.listen(2222, ()=>{
    console.log('Server started on port 2222');
    
})