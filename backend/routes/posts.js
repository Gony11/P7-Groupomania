const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// const Thing = require('../models/Thing');

router.get('/', auth, postsControllers.getPosts)
router.post('/', auth, multer, postsControllers.addPost)
router.delete('/:id', auth, postsControllers.deletePost)
router.post('/comments', auth, postsControllers.addComment)
router.get('/comments/:id', postsControllers.getComments)

module.exports = router;