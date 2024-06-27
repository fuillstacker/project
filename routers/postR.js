const Router = require("express")
const router = new Router()
const PostC = require("../controllers/PostC")
const auth = require('../midlleware/authMiddleware')

//post
router.post('/', auth, PostC.createPost)
router.get('/', PostC.getPosts)

//comm
router.post('/:postId/comm/:userId', auth, PostC.addComm)
router.get('/:postId/comms', PostC.getComm)
router.delete('/:postId/comm/:id', auth, PostC.deleteComm)

//like
router.put('/:postId/like/:userId', auth, PostC.like)
router.delete('/:postId/like/:userId', auth, PostC.deleteLike)
router.get('/:postId/likes', PostC.getLike)

module.exports = router