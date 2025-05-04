const { default: mongoose, Schema } = require("mongoose");

const CartSchema= new Schema({
 
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    quntity:{
        type:Number,
        default:1
    },
},
{
    timestamps:true
});

module.exports=mongoose.model("cart",CartSchema)