const adminAuth=(req,res,next)=>{
    const token ="xyz";
    const isAdminAuth=token==="xyz";
    if(isAdminAuth){
        res.send("Get user")
    }
    else{
        res.status(401).send("Unauthorized")
    }
      
}
module.exports={
    adminAuth,
 
}