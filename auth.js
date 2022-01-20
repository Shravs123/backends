const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/conn')
const User = require("../model/userSchema")

router.get('/signin',(req,res)=>{
    
    res.send("hello world")
});


router.post('/register',async (req,res)=>{
    const {name,email,phone,password,cpassword } = req.body
    if(!name || !email || !phone  || !password || !cpassword){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    try{
       const userExist =await User.findOne({email:email})
        
            if(userExist){
                return res.status(422).json({error:"User Alreay exists"})
                }else if(password != cpassword){
                    return res.status(422).json({error:"Passwords are not matching"})
                }else{
            const user =new User({name,email,phone,password,cpassword })
            
            await user.save();
            
            res.status(201).json({message:"User saved successfully"})
                }
    }catch{
        err=>{console.log(err)}
    }
    
    
    //res.json({message:req.body})
    //res.send("helloooo!!!")

})

router.post('/signin',async (req,res)=>{
    try{
        const{email ,password}=req.body;
        if(!email || !password){
            return res.status(422).json({error:"please fill all fields"})

        }
        const userLogin = await User.findOne({email:email})
        //console.log(userLogin)
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            const token = await userLogin.generateAuthToken()
            console.log(token)

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now+3600000)
                //httpOnly:true
            })

        if(!isMatch){
            res.json({error :" Invalid Credentials"})
        }
        else{
            res.json({message:"User signedin syccessfully"})
        }
        }else{
            res.json({error :" Invalid Credentials"}) 
        }
        
        
    }
    catch(err){
        console.log(err)
    }
})
module.exports= router;

