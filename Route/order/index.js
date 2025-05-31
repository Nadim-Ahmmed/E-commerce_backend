const express=require("express")
const { OrderController, getOrderController } = require("../../config/controllers/orderController")
const router=express.Router()

// http://localhost:5000/order/placeorder
router.post("/placeorder",OrderController)

// http://localhost:5000/order/getallorder
router.get("/getallorder",getOrderController)

module.exports=router