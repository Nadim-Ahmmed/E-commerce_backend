const { default: mongoose, Schema } = require("mongoose");

const UserSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email uniqe require"]
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    },
    otp:{
        type:String
    },

    isVerifi:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

module.exports=mongoose.model("user",UserSchema)