/******************************************************* 
                Comment controllers
******************************************************/

const { Comment, sequelize } = require('../models/index')
const jwt = require('jsonwebtoken');

//////////////////////////////////////////////////////////////////////////////////////////
//post comment
exports.postComment = async (req, res) => {
    let comText = req.body.comText
    let postId = req.body.postId
    let userId = req.body.userId
    let insert = { comText, postId, userId }

    await Comment.create(insert).then((response) => {
        res.status(201).json(response)
    }).catch((error) => res.status(400).json(error))
}

//////////////////////////////////////////////////////////////////////////////////////////
//Delete comment
exports.deleteComment = async (req, res) => {
  let comId = req.params.id; // --> define from the param the id of the comment user wants to delete

  const token = req.headers.authorization.split(" ")[1];            // ||||||||||||||||||||||||||||||||||
  const decodedToken = jwt.verify(token, "secret_token_dev");       // | user Id who wants delete comment
  const userId = decodedToken.userID;                               // ||||||||||||||||||||||||||||||||||

  await Comment.findOne({ where : { id: comId }})
  .then((comment) => {
    //check if comment exists
    if (!comment) {
      return res.status(404).json({
        error: "Comment doesn't exist!"
      });
    }
    // check if the user is authorized -> comment by author == user who wants delete post ?
    if ( comment.userId !== userId ) {
      return res.status(401).json({
        error: 'Unauthorized!'
    });
    }
    // if tests pass --> delete comment row on database
    Comment.destroy({ where: { id: comId } })
      .then((response) => {
        res.status(200).json(JSON.stringify(response));
      })
      .catch((error) => {
        res.status(400).json(JSON.stringify(error));
      });

  }).catch((error) => res.status(500).json(error))   
}

//////////////////////////////////////////////////////////////////////////////////////////
//Update comment
exports.updateComment = async (req, res) => {

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret_token_dev");
  const userId = decodedToken.userID;
  
  if( userId == req.body.userId ){
    let comText = req.body.comText
    let insert = { comText }
    await Comment.update(insert, {where : { id: req.body.comId }})
    .then(() => {
      res.status(200).json({ message: 'Comment updated!' })
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  } else {
    res.status(401).json({ message: 'Unauthorized!' })
  }

}
