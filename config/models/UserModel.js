const { default: mongoose, Schema } = require("mongoose");

const UserSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email uniqe"]
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
    }
})

module.exports=mongoose.model("user",UserSchema)