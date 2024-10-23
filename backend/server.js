 require("dotenv").config()
 const express = require("express");
 const cors = require("cors");
 const cookieParser = require("cookie-parser");
 const errHandler = require('./middleware/errHandlerMiddleware')
 const notFound = require('./middleware/notFoundMiddleware')
 const authRoute =  require("./Route/authRoute")
 const propertyRoute =  require("./Route/propertyRoute")
 const contactRoute = require("./Route/contactRoute")
 const userRoute = require('./Route/userRoute')
 const connectDB = require("./config/connectDB");
 const app = express()


//middleware
app.use(express.json())
app.use(cors({origin: true, credentials: true}))  
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 

// app.get('/api/all/users', (req,res)=> {
//     res.send('hello user server')
// })
//routes
app.use("/api", authRoute)
app.use("/contact", contactRoute)
app.use("/api", propertyRoute)
app.use("/api", userRoute)


//custom middleware
app.use(notFound)
app.use(errHandler)


const port = process.env.port || 8080 

const start = async ()=> {

    try {
        
        connectDB(process.env.MONGO)
         console.log("connected")

         app.listen(port, ()=> console.log( `server running on port ${port} `))

     } catch (error) {
         console.log("failed")
         
     }
 
}

start()
