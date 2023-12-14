const jwt = require('jsonwebtoken')

exports.authMiddleware = async (req,res,next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWTKEY)
        console.log(decoded)
        const { id, login } = decoded
        req.user = {id, login}
        next()
    } catch (error) {
        res.status(403).json({msg: 'caiu no catch'})
        
    }
}
