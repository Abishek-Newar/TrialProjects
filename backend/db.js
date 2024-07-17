const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoose connected")
})

const todoSchema = new mongoose.Schema({
    title: String,
    description: String
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const Todo = mongoose.model("todo",todoSchema);
const User = mongoose.model("user",userSchema)

module.exports = {Todo,User}