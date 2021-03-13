const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user');
const User = require('../models/User');

// const Thing = require('../models/Thing');



router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
router.get('/:id', userControllers.getUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;