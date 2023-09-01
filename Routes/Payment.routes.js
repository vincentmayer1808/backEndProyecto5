const express = require ('express')
const { createPayment, successPayment, pendingPayment, failurePayment } = require('../controllers/Payment.controller')
const router=express.Router()


router.post('/create-payment', createPayment)
router.post('/success-payment',successPayment)
router.post('/pending-payment',pendingPayment)
router.post('/failure-payment',failurePayment)

module.exports=router