const asyncHandler = require("express-async-handler");
const authModel = require("../model/authModel");
// const propertyModel = require("../model/propertyModel");





const allUserContrl = asyncHandler ( async (req,res)=> {

 const users = await authModel.find()

    if(!users){
      res.status(500)
      throw new Error('cant find all users')
    }

    res.status(200)
    res.json({message: " users loaded successfully", users })

   
})


const singleUserControl = asyncHandler ( async (req,res)=> {

    const singleuser = await authModel.findById(req.params.id)
   
       if(!singleuser){
         res.status(500)
         throw new Error('cant find single user')
       }
   
       res.status(200)
       res.json({message: " user loaded successfully", singleuser })
   
    
   })

   const updateUserControl = asyncHandler ( async (req,res)=> {

    const updateuser = 
    await authModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
   
       if(!updateuser){
         res.status(500)
         throw new Error('cant update user')
       }
   
       res.status(200)
       res.json({message: " user upddated successfully", updateuser})
  
   })

   const propertyHistCtrl = asyncHandler( async (req,res)=> {

      const { propertyTittle, propertyType, propertyLocation,

        propertyDescription, propertyPrice, propertyImage } = req.body

       const user = await authModel.findOne({_id: req.createdUsers.id})

       const property = {

        propertyTittle, propertyType, propertyLocation,
        propertyDescription, propertyPrice, propertyImage


       }

       await user.propertyHistory.push(property)
       await user.save()

       res.status(200)
       res.json({message: 'displayed property history'})
      



   })


   const deleteUserControl = asyncHandler ( async (req,res)=> {

    const deleteeuser = await authModel.findByIdAndDelete(req.params.id)
   
       if(!deleteeuser){
         res.status(500)
         throw new Error('cant delete user')
       }
   
       res.status(200)
       res.json({message: " user deleted successfully", deleteeuser})
   
  
   })


 

   module.exports = {
     allUserContrl,
      singleUserControl,
      updateUserControl,
      deleteUserControl,
      propertyHistCtrl
 
      
   }

