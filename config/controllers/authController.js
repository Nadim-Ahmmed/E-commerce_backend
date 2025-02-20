const { sendEmail } = require("../../helpers/SendEmail")
const UserModel = require("../models/UserModel")
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const { trace } = require("../../Route/auth");

async function signupController(req,res){
   
    const {name,email,password,phone,role}=req.body;

    
    return
    const otp=  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    
    try {
        
        const existinguser= await UserModel.findOne({email,otp})
        if (!existinguser) {
            bcrypt.hash(password, 10, async function(err, hash) {
                const user= new UserModel({name,email,password:hash,phone,role,})
            
                await user.save();
                sendEmail(email,otp);
                user.otp=otp
                await user.save();
        
                res.status(201).json({ msg: "sign succesfully",succes:true,data:user})
            });
         
        } else {
            res.status(500).json({succes:false, msg:"alrede create a account"})
        }
        
    } catch (error) {
        res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
}

async function verifiotpcontroller (req,res) {
    const {email,otp}=req.body
    try {
        const existinguser= await UserModel.findOne({email})
        if (existinguser) {
            if(existinguser.otp==otp){
                existinguser.isVerifi=true
                existinguser.otp=null
                await existinguser.save()
                res.status(200).json({msg:"account verifid succesfull" ,succes:true}) 
            }else{
                res.status(404).json({error : "invalid otp" ,succes:false})  
            }
        } else {
            
        }
    } catch (error) {
        res.status(500).json({error : error.message? error.message :error ,succes:false})
    }
    
}
module.exports={signupController,verifiotpcontroller}