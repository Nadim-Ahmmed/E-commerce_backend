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

async function getallproductcontroller(req,res){
try {
    const products=await ProductModel.find({})
    return res.status(201).json({ msg: "product create succesfully",succes:true, products})
} catch (error) {
    return res.status(500).json({error : error.message? error.message :error ,succes:false})
}
}

async function updateproductcontroller(req,res) {
    

    
    let {id}=req.params;
    let {title,discription,sellingprice,discountprice,stock,color}=req.body;
    let image=req.files.map((item)=>`http://localhost:5000/${item.filename}`);

    try {
        if (title&&discription&&sellingprice&&discountprice&&stock&&color) {
            let updatecproduct = await ProductModel.findOneAndUpdate({_id:id},{title,discription,sellingprice,discountprice,stock,color},{new:true});
                    return res.status(201).json({ msg: "update succesfully",succes:true,data:updatecproduct})
            
        } else if(image) {
           
            let existingpath=path.join(__dirname,"../../uploads")
            

                    let existingproduct= await ProductModel.findOneAndUpdate({_id:id},{images:image})
            
                    let splitpath=existingproduct.images.split("/")
                    let imagepath=splitpath[splitpath.length-1]
            
                    fs.unlink(`${existingpath}/${imagepath}`,(error)=>{
                        console.log(error)
                    })

                    return res.status(201).json({ msg: "product image Update succesfully",succes:true,data:existingproduct})
        }
        
    } catch (error) {
        return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
}

async function deleteproductcontroller(req,res) {
     const {  id }=req.params;

    

    try {
       
        const deleteproduct= await ProductModel.findOneAndDelete({_id:id})
        let existingpath=path.join(__dirname,"../uploads")
       
       deleteproduct.images.forEach((imgpath)=> {
    
        let splitpath=imgpath.split("/")
    
       let imagepath=splitpath[splitpath.length-1]
        
        fs.unlink(`${existingpath}/${imagepath}`,(error)=>{
            console.log(error)
        });
    
        });
// res.send("delet")
        const findcatagory=await CategoryModel.findOneAndUpdate(
            {product:id, },{$pull:{product:id}},{new:true}
        )
      await findcatagory.save();
        
         return res.status(200).json({ msg: "product deleted succesfully",succes:true,data:deleteproduct})
    }
  
     catch (error) {
        return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
   

}

async function singleproductcontroller(req,res){

    const {  id }=req.params;
    try {
        const singleproduc= await ProductModel.findOne({_id:id}).populate("category")
        return res.status(200).json({ msg: "singleproduct fetch succesfully",succes:true,product:singleproduc})
    } catch (error) {
        return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }

}

module.exports={createproductcontroller,getallproductcontroller,updateproductcontroller,deleteproductcontroller,singleproductcontroller}