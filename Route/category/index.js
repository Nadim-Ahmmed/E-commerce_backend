const express=require("express")
const multer  = require('multer')
const { categorycontroller, fetchallcategorycontroller, singlecategorycontroller } = require("../../config/controllers/categorycontroller")

const route=express.Router()

// canfig multer
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




route.post("/createcategory",upload.single('image'),categorycontroller)

route.get("/allcategory",fetchallcategorycontroller)
route.get("/singlecategory/:id",singlecategorycontroller)




module.exports=route