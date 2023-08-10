const express = require ("express")
const router= express.Router()
const auth = require('../middlewares/auth')
const { signUp, login, deleteUserById, updateUserById, getUsers } = require("../controllers/User.controller")

router.post('/', signUp)
router.get('/', getUsers)
router.post('/login', login)
router.delete('/:_id', auth, deleteUserById)
router.put('/:_id', auth, updateUserById)

module.exports=router