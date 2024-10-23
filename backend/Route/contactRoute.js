const express = require("express")
const contactRoute = express.Router()
const contactsContrl = require("../Controller/contactController")


contactRoute.post("/contact", contactsContrl)

module.exports = contactRoute