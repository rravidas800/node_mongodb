const express=require("express");
const router=express.Router();
const UserModel=require("../model/user");
const bcrypt=require("bcrypt");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");



router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{

        if(err)
        {
          return res.status(500).json({
                message:"Failed to register",
                error:err
            })
        }
        else
        {
            const User=new UserModel({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.user_type
            })

            User.save()
            .then(result=>{
                res.status(200).json({
                    message:"Record saved successfully",
                    result:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Failed to save",
                    error:err
                })
            })
        }

    })
})

router.post("/login",(req,res,next)=>{
    UserModel.find({phone:req.body.user_id}).exec()
    .then(user=>{
        if(user.length>0)
        {
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(result)
                {
                  const token=jwt.sign({
                        data:{
                            _id:user[0]._id,
                            username:user[0].username,
                            email:user[0].email,
                            phone:user[0].phone,
                            user_type:user[0].userType
                        }},'TEST API TOKN',{ expiresIn:60*2 });

                    if(token)
                    {
                        return res.status(200).json({
                            id:user[0]._id,
                            username:user[0].username,
                            email:user[0].email,
                            phone:user[0].phone,
                            token:token,
                            message:"loging successfully"
                        })
                    }else
                    {
                        return res.status(201).json({
                            message:"failed to login",
                        })
                    }    
                }else
                {
                    return res.status(200).json({
                        message:"Invalid password."
                    })
                }
            })
        }else{
            return res.status(201).json({
                message:"invalid user id"
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message:"Something went wrong.",
            error:err
        })
    })

})

router.get("/:token",(req,res,next)=>{
    
    try{
        const user_token=jwt.verify(req.params.token,'TEST API TOKN');
        return res.status(200).json({
            result:user_token
        })
    }
    catch(err)
    {
        return res.status(210).json({
            error:"session expired"
        })
    }
    
   //jwt.verify(token,'TEST API TOKN',)


    
})

module.exports=router;