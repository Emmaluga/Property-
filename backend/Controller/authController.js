const expressAsyncHandler = require("express-async-handler");
const authModel = require("../model/authModel");
const {secretTokenFunc, sendTokenFunc} = require("../utilities/jwt");
const { sendMailFunc } = require('../utilities/sendMail')
const crypto = require('crypto')



module.exports.registerContrl = expressAsyncHandler ( async (req, res  )=> {

    const {firstName , lastName , email,  avatar, password, role
      } = req.body

      //  if(!firstName, !lastName, !email, !password ){
      //   throw new Error("All fields are required")
      //  }

    const userExist = await authModel.findOne({email})

      if(userExist){
         res.status(500)
         throw new Error("Email already exist")
      }

      const User = await authModel.create({
         firstName,
         lastName,
         email,
         avatar,
         password,
         role,
         
      })

      res
      .status(200)
      .json({message:"rent user sign in succesfully", success: true, User

      
    })
    
    if(!User){
      throw new Error("invalidates user")
      
    }
    
  
   
})



module.exports.loginContrl = expressAsyncHandler ( async (req, res )=> {

    const {email, password} = req.body

    if(!email || !password ){
        throw new Error("All fields are required")

    }

    const checkUser = await authModel.findOne({email})
      if(!checkUser){
        throw new Error("email or password does not exist")
      }

     const authUser = await checkUser.comparePassword(password)
      if(!authUser){
        res.status(500)
         throw new Error("password or email does not match")
      }

       const store = await sendTokenFunc(checkUser, res)

      res
      .status(201)
      .json({message: "Logged in successfully" , success: true, store })



})

module.exports.rentUserProfileContrl = expressAsyncHandler ( async (req, res, next ) => {

   const {firstName } = await authModel.findById(req.createdUsers.id)
   

       if(!firstName ){

          res.status(500)
          throw new Error("bad auth")

       }
   
       res.status(201)
       res.json({message: `welcome to dashfuard ${firstName }`, success: true  })
 

     next()

})


 module.exports.logoutContrl = expressAsyncHandler ( async (req, res,  ) => {
  
    res
    .clearCookie("token")
    .json({message: "logged out", success: true })

       
 })

 module.exports.resetPassContrl = expressAsyncHandler ( async (req,res)=> {
    const {email} = req.body
    const existUser = await authModel.findOne({email})
      if(!existUser){
        res.status(404)
        throw new Error('email cant be sent')
      }

      const resetToken = existUser.getForgotPassToken()
      await existUser.save()

     const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`

      const message = `
          <h1>You have requested a password reset </h1>
         <p>Please click on this link to reset your password</p> 
         <a href=${resetUrl} clicktracking=off>${resetUrl}</a> `

       const sendingMail = await sendMailFunc({
        to: existUser.email,
        subject: 'password reset',
        html: message
       })

      
        res.status(200).json({message: 'email sent'})
    
      if(!sendingMail){
       existUser.resetTokenPassword = undefined
       existUser.resetTokenPasswordExpires = undefined
       await existUser.save()
        
       res.status(400)
       throw new Error('email not sent')

      }
 })


 module.exports.resetPassTokenContrl = expressAsyncHandler ( async (req,res)=> {
     const resetTokenPassword = crypto.createHash('sha256').update(req.params.resettoken).digest("hex")
     const user = await authModel.findOne({
       resetTokenPassword,
       resetTokenPasswordExpires: { $gt: Date.now() }
     })

     if(!user){
      res.status(400)
      throw new Error('invalide token')

     }

     user.password = req.body.password,
     user.resetTokenPassword = undefined,
     user.resetTokenPasswordExpires = undefined,

     await user.save()

     res.status(201)
     res.json({message: 'password reset'})
 })

