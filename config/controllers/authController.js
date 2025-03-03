const { sendEmail } = require("../../helpers/SendEmail")
const UserModel = require("../models/UserModel")
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { trace } = require("../../Route/auth");

async function signupController(req,res){
   
    const {name,email,password,phone,role}=req.body;



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

async function loginControler(req,res){
    const {email,password}=req.body
   try {
     const existinguser=await UserModel.findOne({email})

     if (!existinguser) {
        return res.status(404).json({succes:false,msg:"email is not found"})
        
     } else {
        bcrypt.compare(password, existinguser.password,async function(err, result) {
            const user=await UserModel.findOne({email}).select("-password")
            if (result) {
                if (existinguser.role== "user") {
                    const token = jwt.sign({user}, 'shhhhh');
                    return res.status(200).json({succes:true,msg:"user login succesful",data:user, token:token})

                } else if (existinguser.role=="admin") {
                    const token = jwt.sign({ user }, 'shhhhh');
                    return res.status(200).json({succes:true,msg:"admin login succesful",data:user, token:token})
                    
                }
                // return res.status(200).json({succes:true,msg:"login succesful",data:user})
            } else {
                return res.status(404).json({succes:false,msg:"invalid password"})
            }
        });
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
module.exports={signupController,loginControler,verifiotpcontroller}