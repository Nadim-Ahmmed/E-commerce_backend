const express=require("express")
const { createproductcontroller, updateproductcontroller, getallproductcontroller, deleteproductcontroller, singleproductcontroller } = require("../../config/controllers/productcontroller")
const multer = require("multer")
const { singlecategorycontroller } = require("../../config/controllers/categorycontroller")
const router=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let filename=file.originalname.split(".")
        let extention=filename[filename.length-1]
        // console.log(filename)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +`.${extention}`)
    }
  })
  
  const upload = multer({ storage: storage })


router.post("/createproduct",upload.array("images",4),createproductcontroller)
router.get ("/products",getallproductcontroller)
router.get ("/singleproduct/:id",singleproductcontroller)
router.patch("/updateproduct/:id",upload.array("images",4),updateproductcontroller)
router.delete("/deletproduct/:id",deleteproductcontroller)


module.exports=router