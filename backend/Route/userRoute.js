const express = require("express")
const userRoute = express.Router()
const {allUserContrl,singleUserControl,updateUserControl,
   propertyHistCtrl, deleteUserControl
} = require('../Controller/usersController')
const {authMiddleware} = require('../middleware/authMiddleware')
    

userRoute.get('/all/users', authMiddleware, allUserContrl)
userRoute.get('/single/user/:id', authMiddleware, singleUserControl)
userRoute.put('/update/user/:id', authMiddleware, updateUserControl)
userRoute.post('/property/history', authMiddleware, propertyHistCtrl )
userRoute.delete('/delete/user/:id', authMiddleware, deleteUserControl)



module.exports = userRoute