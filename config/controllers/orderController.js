const OrderModel = require("../models/OrderModel");
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.store_id;
const store_passwd = process.env.store_passwd;
const is_live = false //true for live, false for sandbox

async function OrderController (req,res){
    
    try {
        let {paymentmethord,fullname,phone,address,state,zip,deliveryCharge,cartlist,userid,totalprice}=req.body;
        // cash on delivery
        if (paymentmethord && fullname && phone && address  && state && zip && deliveryCharge&& cartlist && totalprice&& userid) {
            if (paymentmethord == "COD") {
            let order= new OrderModel({
                paymentmethord,fullname,phone,address,state,zip,deliveryCharge,cartlist,userid,totalprice
            });
            await order.save()
            return res.status(201).json({ msg: "order placed succesfully",succes:true})
         } else {
            // online payment
            const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
             return res.status(201).json({ msg: "online succesfully",succes:true})
         }
        } else {
           return res.status(500).json({mass:"all fild ar required",succes:false})
        }
         
    } catch (error) {
       return res.status(500).json({mass:error,succes:false})
    }
}

async function getOrderController(req,res){
    try {
        const order=await OrderModel.find({}).populate("userid").populate({path:"cartlist.productid",model:"product"})
        return res.status(201).json({ msg: "order get succesfully",succes:true,data:order})
    } catch (error) {
       return res.status(500).json({mass:error,succes:false})
    }
}

module.exports={OrderController,getOrderController}