const express = require("express")
const {registerContrl, loginContrl,rentUserProfileContrl,logoutContrl, 
     resetPassContrl, resetPassTokenContrl} = require("../Controller/authController")
     const {authMiddleware} = require('../middleware/authMiddleware')
    
     const authRoute = express.Router()

authRoute.post("/rent",   registerContrl)
authRoute.post("/login",  loginContrl)
authRoute.get("/userProfile", authMiddleware, rentUserProfileContrl)
authRoute.post("/resetpassword", resetPassContrl)
authRoute.put("/resetpassword/:resettoken", resetPassTokenContrl)
authRoute.get("/logout", logoutContrl)



module.exports = authRoute