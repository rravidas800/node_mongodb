const express=require("express");
const router=express.Router();
const Student=require("../model/student");
const mongoose=require("mongoose");
const student = require("../model/student");
const checkAuth = require("../middleware/check-auth");

router.get("/",checkAuth,(req,res,next)=>{
   
    Student.find()
    .then(result=>{
        res.status(200).json({
            results:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})

router.get("/:id",(req,res,next)=>{
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            result:result
        })
    })
    .catch(err=>{
        res.status(200).json({
            error:err
        })
    })
})


router.delete("/:id",(req,res,next)=>{
    const _id=req.params.id;
    Student.remove({_id:_id})
    .then(result=>{
        res.status(200).json({
            message:"Product Deleted",
            result:result
        })        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

// Put Request
router.put("/:id",(req,res,next)=>{
    const id=req.params.id;
    student.findOneAndUpdate({_id:id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone
        }
    })
    .then(result=>{
        res.status(200).json({
            message:"Record updated successfully",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:"Failed to update",
            error:err
        })

    })
})

router.post("/",(req,res,next)=>{   

   const student=new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        phone:req.body.phone
    })

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

module.exports=router;