const express = require('express')
const router = express.Router()
const UserC = require('../controllers/UserC')
const auth = require('../midlleware/authMiddleware')

router.post('/register', UserC.register)
router.post('/login', UserC.login)
router.get('/auth', auth, UserC.auth)

module.exports = router