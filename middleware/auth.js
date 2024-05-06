
const config = require('../config/config')
const ErrorHandler = require('./errorHanlder')

exports.isAuthenticated =  async (req, res, next) => {
    const { token} = req.cookies

    if(!token) {
        return next(new ErrorHandler('You must be logged in to access this',401))
    }

    const decoded = jwt.verify(token,config.JWT_SECRET)

    req.user = await User.findById(decoded.id)
    next()
    
}