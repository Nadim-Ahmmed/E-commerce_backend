const express=require("express")
const { addtocartcontroller, getusercartcontroller } = require("../../config/controllers/cartController")

const route=express.Router()
// http://localhost:5000/cart/addtocart

route.post("/addtocart",addtocartcontroller)
route.get("/usercartlist/:id", getusercartcontroller)




module.exports=route