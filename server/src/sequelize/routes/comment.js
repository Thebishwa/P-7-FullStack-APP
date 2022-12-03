/*************************************************
    comment routes -
    contains all of our comment related business logic
 *************************************************/

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const commentCtrl = require("../controllers/comment");

    try {
        router.post('/create', auth, commentCtrl.postComment)
        router.delete('/delete/:id', auth, commentCtrl.deleteComment)
        router.put('/update/:id', auth, commentCtrl.updateComment);

    } catch (error) {
        console.log(error);
    }

module.exports = router;
    