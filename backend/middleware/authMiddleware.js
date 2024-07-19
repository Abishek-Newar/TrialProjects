const jwt = require("jsonwebtoken")
require("dotenv").config()
function authMiddleware(req,res,next){
    const headers = req.headers.authorization;
    console.log(headers)
    try {
        const token = jwt.verify(headers,process.env.SECRET_KEY)
        req.userId = token
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({msg: "invalid token"})
    }
    
}
module.exports = authMiddleware