const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        // const decodedToken = jwt.verify(token, 'KEY')
        // const userId = decodedToken.id

        // console.log(userId)

        jwt.verify(token, 'KEY', (err, user) => {
            if(err) {
                return res.status(403).json({message: 'token invalide !', err, user, token})
            } else {
                next()
            }
        })
    } catch (error) {
        res.status(401).json({error: 'Requête non authentifiée !'})
    }
}