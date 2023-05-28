const router = require('express').Router()
const userModel = require('../models/userModel')
const authMiddleware= require('../middleware/authMiddleware')

router.post('/register', userModel.registerUser)

router.post('/login', userModel.loginUser)

router.post('/admin', userModel.loginAdmin)

router.post('/:id', authMiddleware, userModel.createAdmin)

router.get('/', authMiddleware, userModel.getUsers)

module.exports = router