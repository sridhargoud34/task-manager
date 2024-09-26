const express = require('express')
const controller = require('../controller/controller')
const router = express.Router()
const {authenticateJWT,generateToken} = require('../middleware/auth')
router.get('/get-task-data',controller.getTaskData)
router.post('/login',generateToken)
router.post('/register',controller.postRegister)
module.exports = router