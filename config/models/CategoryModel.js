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

   product:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
   },
   ],
 
},
{
    timestamps:true
});

module.exports=mongoose.model("Category",CategorySchema)