/*************************************************
    post routes -
    contains all of our post related business logic
 *************************************************/

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
    
const postCtrl = require('../controllers/post')

try {

    //GET
    router.get('/all', auth, postCtrl.getAllPosts)
    router.get('/all/:id', auth, postCtrl.getPostsByUser)
    router.get('/status/isRead/:id', auth, postCtrl.getIsRead)

    //POST
    router.post('/newPost', auth, multer, postCtrl.createPost)
    router.post('/isRead', auth, postCtrl.isRead)

    //PUT
    router.put('/updatePost/:id', auth, multer, postCtrl.updatePost)
    //DELETE
    router.delete('/all/:id', auth, postCtrl.deletePost)

} catch (error) {
    console.log(error)
}



module.exports = router;
