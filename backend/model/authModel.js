const crypto = require('crypto')
const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')



const propertySchema = new mongoose.Schema({

    propertyTittle: {
        type: String,
        text: true
        
    },
    
    propertyDescription: {
        type: String,
 
    },

    propertyType: {
        type: String,
       
    },

    propertyImage: {
        type: String,
    
    },

    propertyPrice: {
        type: String
       
    },

    propertyLocation: {
        state: {
            type: String
        
        },
        city: {
        type: String
 
        },
        address:{
        type: String
         
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
 


// 


const authModel = new mongoose.Schema({ 

    firstName : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String,
     
       
    },
     role: {
        type: String,
        enum: ['user', 'admin', 'agent'],
        default: 'user',
     
     },

     propertyHistory: [propertySchema],


     Property: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Property",
        required: true,
    
    }],

   

    password: {
        type: String,
        required: true,

    },
   resetTokenPassword: String,
   resetTokenPasswordExpires: Date


}, {timestamps: true})

 authModel.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
      }
    
      this.password = await bcryptjs.hash(this.password, 10);
 })

authModel.methods.comparePassword =  async function(comparePassword){
   return await bcryptjs.compare(comparePassword, this.password )
}

authModel.methods.getForgotPassToken = async function(){
    //generate token for forgot password using crypto
   const forgotpasstoken = crypto.randomBytes(20).toString('hex')

   //set the generated token to model 
   this.resetTokenPassword = crypto.createHash('sha256')
    .update(forgotpasstoken)
    .digest('hex')

    //set date of expiration

    this.resetTokenPasswordExpires = Date.now() + 10 * (60 * 1000)

       return forgotpasstoken 

}


module.exports = mongoose.model("authUsers", authModel)