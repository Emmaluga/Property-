const express = require("express")
const propertyRoute = express.Router()
const {createProperty, allProperties, singleProperty,
    updateSingleProperty, deleteProperty
} = require('../Controller/propertyController')
const {authMiddleware} = require('../middleware/authMiddleware')
    



propertyRoute.post("/createproperty", authMiddleware, createProperty )
propertyRoute.get("/allproperties", authMiddleware, allProperties )
propertyRoute.get("/singleproperty/:id", authMiddleware, singleProperty )
propertyRoute.put("/update/updateproperty/:id", authMiddleware, updateSingleProperty )
propertyRoute.delete("/deleteproperty/:id", authMiddleware, deleteProperty )


module.exports = propertyRoute