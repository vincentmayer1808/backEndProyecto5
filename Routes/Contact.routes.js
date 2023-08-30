const express = require ("express")
const { sendConsult } = require("../controllers/Contact.controller")
const router= express.Router()

router.post("/", sendConsult)

module.exports=router