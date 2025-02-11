const express=require("express")
const route=express.Router()
// http://localhost:5000/auth/signup

route.post("/signup",(req,res)=>{
    res.send("signup")
})

// http://localhost:5000/auth/alluser

route.get("/alluser",(req,res)=>{
    res.send("alluser")
})


module.exports=route