const adminAuth=(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="xyz";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorized access")
        
    }
    else{
        next();
        //res.status(403).send("unauthorized access")
    }
};
const userAuth=(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="xyz";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorized access")
        
    }
    else{
        next();
        //res.status(403).send("unauthorized access")
    }
};

module.exports={adminAuth,userAuth}