const express=require("express");
const app=express();
const studentRoute=require("./routes/student");
const facultyRoute=require("./routes/faculty");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/my_db');
const userRoute=require("./routes/user");

mongoose.connection.on("error",function(){
    console.log("Failed to connect to database");
})

mongoose.connection.on("connected",function(){
    console.log("Connected to database");
})


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use("/student",studentRoute);
app.use("/faculty",facultyRoute);
app.use("/user",userRoute);

app.use("*",(req,res,next)=>{
    res.status(404).json({
        error:"Bad Request"
    })
})

module.exports=app;

