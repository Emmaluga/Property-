
const mongoose = require('mongoose')


const propertySchema = new mongoose.Schema({

    propertyTittle: {
        type: String,
        required: true,
        text: true
        
    },
    
    propertyDescription: {
        type: String,
        required: true
    },

    propertyType: {
        type: String,
        required: true
    },

    propertyImage: {
        type: String,
        required: true
    },

    propertyPrice: {
        type: String,
        required: true
    },

    propertyLocation: {
        state: {
            type: String,
            required: true
        },
        city: {
        type: String,
        required: true  
        },
        address:{
        type: String,
        required: true    
        }
    },

    authUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authUsers"
    }

 
},
 {timestamps: true}
)
   
propertySchema.index({
    
     propertyTittle: 'text',
     propertyType: 'text',
     propertyLocation: 'text'
    

  
  })
  

module.exports = mongoose.model("Property", propertySchema)

