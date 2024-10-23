const contactModel = require("../model/contactModel")
const asyncHandler = require("express-async-handler")


const contactsContrl = asyncHandler (  async (req,res)=> {

    const { fullName, email, message } = req.body

     //validate form
     if( !fullName || !email || !message ){
         res.status(500)
         throw new Error("fill all fields")
     }

     const contact = await contactModel.create({ 
        fullName,
         email,
         message
      })

     if(!contact){
        res.status(500)
       throw new Error("Invalidate contact details")
     }

   
     res.json({message: "contacts successfull", success: true, contact})

})

module.exports = contactsContrl