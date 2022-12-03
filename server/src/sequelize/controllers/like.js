/******************************************************* 
                Like controllers
******************************************************/

const { Like, sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////////////////////////////////////////
// like a post
exports.likes = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];          
  const decodedToken = jwt.verify(token, "secret_token_dev");
  const userId = decodedToken.userID;

  if(userId == req.body.userId){
   try{
    const userId = req.body.userId;
    const postId = req.params.id;
    let insert = { userId, postId };
    await Like.findOne({
      where: { userId: userId, postId : postId }
    }).then((user) => {
      if(user) {
        Like.destroy(
          { where: { userId: userId, postId : postId }},
          { truncate: true }
        ).then((response) => res.status(200).json(response))
      } else {
        Like.create(insert).then((response) => res.status(201).json(response))
      }
    })
  } catch {
    res.status(500).send({ error: "like error" })
  }
  }

};

//////////////////////////////////////////////////////////////////////////////////////////
// get likes - render all likes with counter
exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({
      attributes: ["postId",
      [sequelize.fn('COUNT', sequelize.col('postId')), 'n_like']],
      group: "postId"
    });
    return res.json(likes);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
