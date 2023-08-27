const express = require ("express")
const { createService, getServices, updateService, deleteService, getService } = require("../controllers/Service.controller")
const router= express.Router()

router.post('/', createService)
router.get('/', getServices)
router.get('/:serviceName', getService)
router.put('/:_id', updateService)
router.delete('/:_id', deleteService)

module.exports=router