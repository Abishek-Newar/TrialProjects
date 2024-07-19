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


module.exports = todoRouter