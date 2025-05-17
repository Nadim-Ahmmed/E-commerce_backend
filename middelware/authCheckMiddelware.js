

const jwt = require('jsonwebtoken');


async function authCheckMiddelware(req,res,next) {
    jwt.verify(req.headers.token, process.env.JWT_Secret, function(err, decoded) {
        if(err){
            return res.status(500).json({succ:false,msg:"token error"})
        }else{
            next()
        }
  
    })
    
} 
module.exports={authCheckMiddelware};