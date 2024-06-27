const Router = require('express')
const router = new Router()

// routers
const UserR = require("./userR")
const PostR = require('./postR')

router.use('/user', UserR)
router.use('/post', PostR)

module.exports = router