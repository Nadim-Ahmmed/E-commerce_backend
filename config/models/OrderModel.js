const { default: mongoose, Schema } = require("mongoose");

const orderSchema= new Schema({

    cartlist:[{
        productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
         },
    }
        
        
    ],
    totalprice:{
        type:String,
        require:true
    },
 
    
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
   paymentmethord:{
        type:String,
        enum:["COD","Online"],
        required:true
    },
   fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    deliveryCharge:{
        type:String,
        required:true
    },
   state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
},
{
    timestamps:true
});

module.exports=mongoose.model("order",orderSchema)