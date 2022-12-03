/*************************************************
    like routes -
    contains all of our like related business logic
 *************************************************/

const express = require('express')
const router = express.Router()
    
const auth = require('../middlewares/auth')
        
const likeCtrl = require('../controllers/like')
    
try {
    
    //GET
    router.get('/all', auth, likeCtrl.getLikes)
    
    //POST
    router.post('/all/:id', auth, likeCtrl.likes)

    
} catch (error) {
    console.log(error)
}

module.exports = router;