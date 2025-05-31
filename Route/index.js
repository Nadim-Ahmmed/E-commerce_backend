const express=require("express")
const route=express.Router()
const auth=require("./auth")
const category=require("./category")
const product=require("./product")
const cart=require("./cart")
const order=require("./order")

route.use("/auth",auth)
route.use("/category",category)
route.use("/product",product)
route.use("/cart",cart)
route.use("/order",order)

module.exports=route