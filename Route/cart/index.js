const express=require("express")
const { addtocartcontroller, getusercartcontroller } = require("../../config/controllers/cartController")
const { authCheckMiddelware } = require("../../middelware/authcheckmiddelware")

const route=express.Router()
// http://localhost:5000/cart/addtocart

route.post("/addtocart",authCheckMiddelware,addtocartcontroller)
route.get("/usercartlist/:id", getusercartcontroller)




module.exports=route