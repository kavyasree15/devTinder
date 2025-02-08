const express = require('express');
const connectDB=require("./config/database");
const app = express();
const User=require('./models/user');

//app.get("/user/:userId/:name/:age",(req,res)=>{
//     console.log(req.params);
//     res.send({Firstname:"John", Lastname:"bhu"});
// });
// app.post("/user",(req,res)=>{
//     res.send("posted successfully");
// })

// app.use(
//     "/user",
//     (req,res,next)=>{
//     console.log("handling the route user");
    
//     //next();
//     res.send("response!1");
// },
// (req,res,next)=>{
//     console.log("handling the route");
//     res.send("response 2!!");
//     //next();
// },
// (req,res,next)=>{
//     console.log("handling the route");
//     res.send("response 2!!");
    
// }

// );

// const {adminAuth,userAuth}=require("./middlewares/auth")


// app.use("/admin",adminAuth);
// //app.use("/user",userAuth);

// app.get("/user",userAuth,(req,res)=>{
     
//         res.send("user data sent")
// });

// app.get("/admin/getAllData",(req,res)=>{
    
//         res.send("all data sent");
    
//     //res.send("all data sent");
// });

// app.get("/admin/deleteUser",(req,res)=>{
     
//         res.send("all data deleted")
    
//     //res.send("delete a data sent")
// });


// app.get("/getUserData",(req,res)=>{
//     res.send("user data sent");
// })

app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName:"virat",
        lastName:"gorjila",
        emailId:"virat@gmail.com",
        password: "1234"
    });
    await user.save();
    res.send("user added successfully");

})


connectDB()
.then(()=>{
    console.log("database connection established")
    app.listen(3000,()=>{
    console.log('listening to the port 3000');
})
}).catch(err=>{
    console.error("error connecting")
});


