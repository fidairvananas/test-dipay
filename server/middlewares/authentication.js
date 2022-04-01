const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next)=>{
  try {
    const { access_token } = req.headers
    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)

    if (!user) {
      throw {
        code: 401,
        name: 'Invalid User',
        message: 'Invalid token or user'
      }
    } 

    req.userLogin = {
      id: user.id,
      fullName: user.fullName
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication