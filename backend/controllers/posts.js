const jwt = require('jsonwebtoken')
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

const Sequelize = require('sequelize')

exports.getPosts = (req, res, next) => {

    User.hasMany(Post)
    Post.belongsTo(User)

    Post.hasMany(Comment)
    Comment.belongsTo(Post)

    Post.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Comment,
                attributes: []
            }
    ],
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'nb_comments']
            ]
        },
        order: [
            ['created_at', 'DESC']
        ],
        group: [
            ['id']
        ],
    })
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
}

exports.addPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'KEY')
    const userId = decodedToken.id;

    let media = null

    if(req.file) {
        media = `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
    }

    // console.log(req.body);

    // console.log(`${req.protocol}://${req.get('host')}/medias/${req.file.filename}`);

    Post.create({
        content: req.body.content,
        media: media,
        created_at: new Date(),
        userId: userId,
    })
        .then(() => res.status(201).json({ message: 'Contenu ajouté avec succés !' }))
        .catch(error => res.status(400).json(error))
}

exports.deletePost = (req, res, next) => {
    
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({
            message: 'Post surpprimé !'
        }))
        .catch(error => res.status(400).json({error}))
}

exports.addComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'KEY')
    const userId = decodedToken.id;

    Comment.create({
        content: req.body.content,
        created_at: new Date(),
        userId: userId,
        postId: req.body.postId
    })
        .then(() => res.status(201).json({message: 'Commentaire ajouté avec succés !'}))
        .catch(error => res.status(400).json(error))
}

exports.getComments = (req, res, next) => {

    User.hasMany(Comment)
    Comment.belongsTo(User)

    Comment.findAll({
        include: [
            {
                model: User,
            }
        ],
        where: {
            post_id: req.params.id
        }
    })
        .then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))
}