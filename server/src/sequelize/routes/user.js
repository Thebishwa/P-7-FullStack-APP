/**************************************
              user router
 *************************************/

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const checkPassword = require("../middlewares/password-validator");
const userCtrl = require('../controllers/user')

try{
    
    router.get('/profile/:id', auth, userCtrl.profile);
    router.delete('/profile/:id/delete', auth, userCtrl.deleteUser);
    router.put('/profile/:id/update', userCtrl.updateUser);

    router.post('/register', checkPassword, userCtrl.register);
    router.post('/login', userCtrl.login);



} catch (error) {
    console.log(error)
}


module.exports = router;
