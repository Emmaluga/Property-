
const expressAsyncHandler = require('express-async-handler')


const notFound = (req,res,next)=> {
    res.status(404).send("Route not found")

    next()
} 

module.exports = notFound