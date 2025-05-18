const express=require("express")
const { addtocartcontroller, getusercartcontroller, getusercartdeletedcontroller, updatecartquntitycontroller } = require("../../config/controllers/cartController")
const { authCheckMiddelware } = require("../../middelware/authcheckmiddelware")

const route=express.Router()
// http://localhost:5000/cart/addtocart

route.post("/addtocart",authCheckMiddelware,addtocartcontroller)
route.get("/usercartlist/:id", getusercartcontroller)
route.delete("/usercartdelete/:id",getusercartdeletedcontroller)
route.patch("/updatecartquntity/:id",updatecartquntitycontroller)




module.exports=route