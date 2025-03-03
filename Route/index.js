const express=require("express")
const route=express.Router()
const auth=require("./auth")
const category=require("./category")

route.use("/auth",auth)
route.use("/category",category)

module.exports=route