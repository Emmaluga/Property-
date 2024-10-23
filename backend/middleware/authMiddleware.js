require("dotenv").config()
const jwt = require("jsonwebtoken")
const authModel = require("../model/authModel")

module.exports.authMiddleware = async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    res.status(500)
    throw new Error("no token provide token")
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRETTOKENKEY)
    req.createdUsers = await authModel.findById(decoded.id).select('-password')

    next()
  } catch (error) {

    // if (!user) {
    //   res.status(500)
    //   throw new Error("no user")
    // }
    res.status(500)
    throw new Error("wrong token not authorized", error)

  }




}










