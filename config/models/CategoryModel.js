const { default: mongoose, Schema } = require("mongoose");

const CategorySchema= new Schema({
    titel:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   description:{
        type:String,
   },
 
},
{
    timestamps:true
});

module.exports=mongoose.model("Category",CategorySchema)