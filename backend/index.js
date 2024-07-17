const express = require("express")
const userRouter = require("./routes/user")
const app = express();
require("dotenv").config()
app.use(express.json())
app.use("/user",userRouter)

app.listen(process.env.PORT,()=>{
    console.log("connected")
})


