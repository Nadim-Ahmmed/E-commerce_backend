const express=require("express")
const route=express.Router()
const auth=require("./auth")
const category=require("./category")
const product=require("./product")
const cart=require("./cart")

route.use("/auth",auth)
route.use("/category",category)
route.use("/product",product)
route.use("/cart",cart)

module.exports=route