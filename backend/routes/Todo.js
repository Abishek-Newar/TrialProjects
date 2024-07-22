const express = require("express");
const { Todo } = require("../db");
const authMiddleware = require("../middleware/authMiddleware")
require("dotenv").config()

const todoRouter = express.Router()
todoRouter.use(authMiddleware)
todoRouter.post("/add",authMiddleware,async(req,res)=>{
    const body = req.body;
    try {
        const response = await Todo.create({
            title: body.title,
            description: body.description,
            done: false,
            userId: req.userId
        })
        res.json({msg: "todo added"})
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg: "error"})
    }
})

todoRouter.get("/gettodo",authMiddleware,async(req,res)=>{
    try {
        const todos = await Todo.find({userId: req.userId})
        res.json({todos})
    } catch (error) {
        return res.status(401).json({msg: "error"})
    }
})

todoRouter.put("/update", authMiddleware, async(req,res)=>{
    const body = req.body;
    try{
        const resposne = await Todo.updateOne({
            _id: body.id
        },{done: true})
        res.json({msg: "Todo Updated"})
    }catch(error){
        return res.status(401).json({msg: "error"})
    }
})

todoRouter.delete("/delete", authMiddleware, async (req,res)=>{
    const body = req.body
    try {
        const resposne = await Todo.deleteOne({
            _id: body.id
        })
        res.json({msg: "deleted"})
    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "error"})
    }
})




module.exports = todoRouter