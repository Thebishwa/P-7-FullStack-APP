//modules require
const chalk = require('chalk')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('express-async-errors');
const { Sequelize } = require("sequelize")
const { sequelize } = require("./sequelize/models")
const path = require('path')

const userRoutes = require('./sequelize/routes/user')
const postRoutes = require('./sequelize/routes/post')
const commentRoutes = require('./sequelize/routes/comment')
const likeRoutes = require('./sequelize/routes/like')



const app = express();
app.use(morgan('combined'))
app.use(cors())

//sync with SQL database
async function main() {
    await sequelize.sync({ /*force:true*/ })
    console.log(chalk.bgGreen('Database synced!'))
}
main()

//test connection
sequelize.authenticate().then(() => {
    console.log(chalk.bgGreen('[sequelize] Connection has been established successfully.'));
}).catch ((error) => {
    console.error(chalk.bgRed('[sequelize] Unable to connect to the database:', error));
});

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Middleware
app.use('/images', express.static(path.join(__dirname, '../images')));

//user login and register
app.use('/api/user', userRoutes)

//post
app.use('/post', postRoutes)

//comment
app.use('/api/comment', commentRoutes)

//like
app.use('/api/post/like', likeRoutes)






//post
// app.post('/post/create', (req, res) => {
//     const post = new Post ({
//         postText: req.body.postText,
//     })
//     post.save().then(() => {
//         res.status(201).json({
//             message: 'Post created successfully!'
//         })
//     }).catch((error) => {res.status(400).json({error: error})
//     })
// })

// app.post('/post/create', async (req,res) => {
//     const { userID , postText } = req.body

//     try {
//         const user = await User.findOne({ where: { user_id : userID }})

//         const post = await Post.create({ postText, userId: user.user_id})
//         return res.json(post)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })

//test
// app.post('/home/create', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({
//     message: 'Post create successfully!'
//   });
// })

module.exports = app;
