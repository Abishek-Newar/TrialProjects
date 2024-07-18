const express = require("express")
const userRouter = require("./routes/user");
const todoRouter = require("./routes/Todo");
const app = express();
require("dotenv").config()
app.use(express.json())
app.use("/user",userRouter)
app.use("/todo",todoRouter)
app.listen(process.env.PORT,()=>{
    console.log("connected")
})


