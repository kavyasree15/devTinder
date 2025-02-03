const express = require('express');

const app = express();

app.use("/test",(req,res)=>{
    res.send("no test");
})
app.use("/hello",(req,res)=>{
    res.send("Hello, world!");
})
app.use("/",(req,res)=>{
    res.send('Welcome');
})

app.listen(3000,()=>{
    console.log('listening to the port 3000');
})