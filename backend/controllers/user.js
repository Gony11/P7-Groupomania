const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

const User = require('../models/User');

exports.signup = (req, res, next) => {

    const passwordSchema = new passwordValidator();

    passwordSchema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols()
        .has().not().spaces()

    if(passwordSchema.validate(req.body.password) && emailValidator.validate(req.body.email)) {

        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                firstname: req.body.firstname,
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json(error))
        })
        .catch(error => res.status(500).json({error}))
    } else {
        let message = '';
        if (!passwordSchema.validate(req.body.password)) {
            message = 'Le mot de passe doit être composé de 8 caratères dont au moins : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial. Les espaces ne sont pas autorisés.'
        } else if (!emailValidator.validate(req.body.email)) {
            message = 'Veuillez saisir une adresse mail valide.'
        }
        res.status(400).json({ message })
    }
}

exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        } 
    })
        .then(user => {
            if(!user) {
                return res.status(401).json({message: 'Adresse e-mail ou mot de passe incorrect.'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.'})
                    }
                    res.status(200).json({
                        token: jwt.sign({id: user.id}, 'KEY', {expiresIn: '24h'}),
                        user: {
                            id: user.id,
                            name: user.name,
                            firstname: user.firstname,
                            email: user.email,
                        }
                    })
                })
                .catch(error => res.status(500).json({error, message: 'erreur bcrypt'}))
        })
        .catch(error => res.status(500).json({error}))
    // console.log(req.body)
};

exports.getUser = (req, res, next) => {

    const userId = jwt.verify(req.params.id, 'KEY').id

    console.log(userId);

    User.findOne({
        where: {
            id: userId
        }
    })
        .then(response => {
            if(response) {
                res.status(200).json(response)
            } else {
                res.status(400).json({message: 'Utilisateur non trouvé !'})
            }
        })
        .catch(err => console.log(err))
}