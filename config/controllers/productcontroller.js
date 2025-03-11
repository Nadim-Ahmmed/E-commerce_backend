const fs = require("fs");
const path=require("path");
const ProductModel = require("../models/ProductModel");
const CategoryModel = require("../models/CategoryModel");


async function createproductcontroller(req,res) {
    let {title,discription,sellingprice,discountprice,stock,color,category}=req.body;
    let image=req.files.map((item)=>`http://localhost:5000/${item.filename}`)
   try {
    let productcreate= new ProductModel({title,discription,sellingprice,discountprice,stock,color,category,images:image,})

    await productcreate.save()
    let categoryupdate= await CategoryModel.findByIdAndUpdate(
        {_id:productcreate.category},
        {$push:{product:productcreate._id}},
        {new:true}
    );
    await categoryupdate.save();


    return res.status(201).json({ msg: "product create succesfully",succes:true,data:productcreate})
   } catch (error) {
    return res.status(500).json({error : error.message? error.message :error ,succes:false})
   }
    
}


module.exports={createproductcontroller,}