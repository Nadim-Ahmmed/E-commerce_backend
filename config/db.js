const { default: mongoose } = require("mongoose");


function dbConnect (){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("databess is connected")
    }).catch((error)=>{
        console.log(error)
    })
        
    }
module.exports= dbConnect