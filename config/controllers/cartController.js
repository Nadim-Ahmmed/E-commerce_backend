const CartModel = require("../models/CartModel")

 async function addtocartcontroller(req,res){
  
    let {productid,quntity,userid}=req.body
try {
    let cart=new CartModel({productid,quntity,userid})

    await cart.save() 
   return res.status(200).json({ msg: "add to cart succesfully",succes:true})
} catch (error) {
    return res.status(500).json({error : error.message? error.message :error ,succes:false})
}
}

async function getusercartcontroller(req,res){
   try {
    let {id}=req.params;

    let findcart= await CartModel.find({userid:id}).populate("productid")

    return res.status(200).json({ msg: "get cart succesfully",succes:true, data:findcart})
   } catch (error) {
    return res.status(500).json({error : error.message? error.message :error ,succes:false})
   }
}



module.exports={addtocartcontroller,getusercartcontroller}