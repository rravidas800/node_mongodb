const express=require("express");
const routes=express.Router();

routes.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"Faculty get request"
    })
})

routes.post("/",(req,res,next)=>{
    res.status(200).json({message:"Faculty Post request"});
})

module.exports=routes;


