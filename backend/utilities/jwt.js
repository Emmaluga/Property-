
const jwt = require("jsonwebtoken")


const  sendTokenFunc = async (User,res)=>{

    const tokenFunc = await secretTokenFunc(User.id)
    res.cookie("token", tokenFunc, {maxAge:60*60*1000,httpOnly:true,secure:true})


}


const  secretTokenFunc = async (id)=> {
 
    return jwt.sign({id}, process.env.SECRETTOKENKEY, {expiresIn: "30days"})


}

module.exports = {
    sendTokenFunc,
    secretTokenFunc
}