const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    try{
        var verified=jwt.verify(token,'TEST API TOKN');
        next();
    }catch(err){
        return res.status(500).json({
            message:"invalid token"
        })
    }
   
}