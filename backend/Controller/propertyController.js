const asyncHandler = require("express-async-handler");
const authModel = require("../model/authModel");
const  propertySchema = require("../model/propertyModel");



const createProperty = asyncHandler ( async (req,res)=> {

const { propertyTittle, propertyDescription, propertyImage,
  propertyType, propertyLocation, propertyPrice  } = req.body

  const user = await authModel.findOne({ _id: req.createdUsers.id})
    console.log(user)
  const check = await propertySchema.findOne({}, { _id: 1 })
   console.log(check)

    if(check){
      res.status(500)
      throw new Error('property  exist pls, create a new one')
    }

    const newProperty = await propertySchema.create({
      propertyTittle, propertyDescription, propertyImage,
      propertyType, propertyLocation, propertyPrice, 
      authUsers: req.createdUsers.id
  
    })
   
    // console.log(user)
   

    user.Property.push(newProperty.id)
    await user.save()
   
 
    res.status(200)
    res.json({message: "property created successfully" })

    if(!newProperty){
      res.status(500)
      throw new Error('invalid credentials')
    }
})


const allProperties = asyncHandler ( async (req,res)=> {
  // const q = req.query.q ? {
  //  propertyTittle: {
  //    $regex: req.query.q,
  //    $options: "i"
  //  }

  // }:{}
  const quary = req.query.q || ""
  const page = req.query.pageNumber || 0
  const limitPage = 5

  //search logic
  const filters = {
    propertyTittle: req.query.propertyTittle,
    propertyType: req.query.propertyType,
    propertyLocation: req.query.propertyLocation,
    propertyPrice: req.query.propertyPrice
  }
  const searchCritaria = {}
  if(quary){
  searchCritaria.$text = {$search: quary } 
  }

  if(filters.propertyTittle){
    searchCritaria.propertyTittle = {$regex: filters.propertyTittle, $options: "i" } 
    }
  if(filters.propertyLocation){
    searchCritaria['propertyLocation.city'] = {$regex: filters.propertyLocation, $options: "i" } 
    }
    if(filters.propertyType){
      searchCritaria.propertyType = {$regex: filters.propertyType, $options: "i" } 
      }
     
     
  const count = await propertySchema.find(searchCritaria)
  .countDocuments()
  
  //execute search 
  
    const properties = await propertySchema.find(searchCritaria)
    .skip(page * limitPage)
    .limit(limitPage)

  
    if(!properties){
    res.status(500)
      throw new Error('cant find properties')

   }

   res.json({
    properties,
    page,
    pages: Math.ceil(count / limitPage),
    count
  
  })
})

const singleProperty = asyncHandler (async (req,res)=> {
      
  const singleProperties = await propertySchema.findById(req.params.id)
  if(!singleProperties){
    res.status(500)
      throw new Error('cant find single properties')

   }
   res.json(singleProperties)

})

const updateSingleProperty = asyncHandler ( async (req,res)=> {
   const updateSingleProperty = 
   await propertySchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
  
   if(!updateSingleProperty){
    res.status(500)
      throw new Error('cant update single properties')

   }
   res.json(updateSingleProperty)
})

const  deleteProperty = asyncHandler ( async (req,res)=> {
  const deleteProperty = await propertySchema.findByIdAndDelete(req.params.id)
  if(!updateSingleProperty){
   res.status(500)
     throw new Error('cant delete properties')

  }
  res.json({ message: 'property deleted'} , deleteProperty)
})

module.exports = { 
    createProperty,
    allProperties,
    singleProperty,
    updateSingleProperty,
    deleteProperty,

}