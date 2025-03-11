const { default: mongoose, Schema } = require("mongoose");

const ProductSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        
        
    },
    images:[
        {
        type:String,
        required:true
        },
      ],
    sellingprice:{
        type:String,
        required:true
    },
    discountprice:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },

    color: [String],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
},
{
    timestamps:true
});

module.exports=mongoose.model("product",ProductSchema)