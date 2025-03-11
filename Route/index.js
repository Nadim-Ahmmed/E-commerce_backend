const express=require("express")
const route=express.Router()
const auth=require("./auth")
const category=require("./category")
const product=require("./product")

route.use("/auth",auth)
route.use("/category",category)
route.use("/product",product)

module.exports=route