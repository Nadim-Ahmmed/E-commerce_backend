const CategoryModel = require("../models/CategoryModel");

 async function categorycontroller(req,res){
    let {titel,description}=req.body;
    let {filename}=req.file;

    try {
        let category = new CategoryModel({
            titel,description,
            image:`http://localhost:5000/${filename}`,
        });

        await category.save()
       return res.status(201).json({ msg: "category succesfully",succes:true,data:category})

    } catch (error) {
       return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
    

}

async function fetchallcategorycontroller(req,res){
    try {
        let category= await CategoryModel.find({})
        return res.status(201).json({ msg: "category succesfully",succes:true,data:category}) 
    } catch (error) {
        return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
}
async function singlecategorycontroller(req,res){
    
    let { id }=req.params;

    try {
        let singlecategory = await CategoryModel.findOne({_id:id})
        return res.status(201).json({ msg: "singlecategory succesfully",succes:true,data:singlecategory}) 
    } catch (error) {
        return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
}


module.exports={categorycontroller,fetchallcategorycontroller,singlecategorycontroller}