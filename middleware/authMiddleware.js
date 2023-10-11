const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authenticationMiddleware }