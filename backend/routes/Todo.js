const express = require("express");
const { Todo } = require("../db");

require("dotenv").config()

const todoRouter = express.Router()

todoRouter.post("/add",async(req,res)=>{
    const body = req.body;
    try {
        const response = await Todo.create({
            title: body.title,
            description: body.description,
            done: false
        })
        res.json({msg: "todo added"})
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg: "error"})
    }
})


module.exports = todoRouter