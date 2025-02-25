const express=require("express")
const { signupController, verifiotpcontroller, loginControler } = require("../../config/controllers/authController")
const route=express.Router()
// http://localhost:5000/auth/signup

route.post("/signup",signupController)

// http://localhost:5000/auth/login

route.post("/login",loginControler)

// http://localhost:5000/auth/alluser

route.get("/alluser",(req,res)=>{
    res.send("alluser")
})

// http://localhost:5000/auth/verifiotp
route.post("/verifiotp",verifiotpcontroller)


module.exports=route