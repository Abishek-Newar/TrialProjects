const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User } = require("../db");
require("dotenv").config()
const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    const body = req.body;
    try {
        const user = await User.findOne({email: body.email})
        if(user){
        return res.status(403).json({msg:"user already exists"})
       }
        const response = await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
       })
       const token = jwt.sign(response._id.toHexString(),process.env.SECRET_KEY)
       return res.json({token: token})
    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "error"})
    }
})

userRouter.post("/signin",async(req,res)=>{
    const body = req.body;
    console.log(body)
    try {
        const user = await User.findOne({
            email: body.email,
            password: body.password
        })
        console.log(user)
        if(!user){
            return res.status(404).json({msg: "user not found"})
        }
        const token = jwt.sign(user._id.hexString(),process.env.SECRET_KEY)
        return res.json({token: token})
    } catch (error) {
        console.log(error)
        res.status(403).json({msg: "error"})
    }
})

module.exports = userRouter