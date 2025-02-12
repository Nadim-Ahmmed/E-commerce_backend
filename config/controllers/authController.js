const UserModel = require("../models/UserModel")

async function signupController(req,res){
   
//    res.send(req.body);
   
   
   
    const {name,email,password,phone,role}=req.body
    try {
        const user= new UserModel({name,email,password,phone,role,})
        await user.save();
        res.status(201).json({ msg: "sign succesfully",succes:true,data:user})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}
module.exports={signupController}