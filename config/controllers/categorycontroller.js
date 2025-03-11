const fs = require("fs");
const CategoryModel = require("../models/CategoryModel");
const path=require("path")

 async function categorycontroller(req,res){
    let {titel,description,product}=req.body;
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

async function deletecategorycontroller(req,res) {
   let {id}=req.params
   let findcategory= await CategoryModel.findOne({_id:id})
    if (!findcategory) {
        return res.status(404).json({ msg: "category not found",succes:false}) 
    } else {
        let existingpath=path.join(__dirname,"../../uploads")
        
        
        let existingcategory= await CategoryModel.findOneAndDelete({_id:id})

        let splitpath=existingcategory.image.split("/")
        let imagepath=splitpath[splitpath.length-1]

        fs.unlink(`${existingpath}/${imagepath}`,(error)=>{
            console.log(error)
        })

         return res.status(201).json({ msg: "category deleted succesfully",succes:true,data:findcategory})
    }
  
}

async function updatecategorycontroller(req,res){
    let {id}=req.params
    let{titel}=req.body
    let {filename}=req.file;

    try {
        if(titel&&filename){

            let existingpath=path.join(__dirname,"../../uploads")
        
        let existingcategory= await CategoryModel.findOneAndUpdate({_id:id},{image:`http://localhost:5000/${filename}`,titel})

        let splitpath=existingcategory.image.split("/")
        let imagepath=splitpath[splitpath.length-1]

        fs.unlink(`${existingpath}/${imagepath}`,(error)=>{
            console.log(error)
        })

         return res.status(201).json({ msg: "all category Update succesfully",succes:true,data:existingcategory})

        }
        else if (titel) {
            let updatecategory = await CategoryModel.findOneAndUpdate({_id:id},{titel},{new:true});
        return res.status(201).json({ msg: "update succesfully",succes:true,data:updatecategory})
        } else if(filename){
            let existingpath=path.join(__dirname,"../../uploads")
        
        let existingcategory= await CategoryModel.findOneAndUpdate({_id:id},{image:`http://localhost:5000/${filename}`})

        let splitpath=existingcategory.image.split("/")
        let imagepath=splitpath[splitpath.length-1]

        fs.unlink(`${existingpath}/${imagepath}`,(error)=>{
            console.log(error)
        })

         return res.status(201).json({ msg: "category Update succesfully",succes:true,data:existingcategory})
        }
        
    } catch (error) {
        return res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
}
module.exports={categorycontroller,fetchallcategorycontroller,singlecategorycontroller,deletecategorycontroller,updatecategorycontroller}