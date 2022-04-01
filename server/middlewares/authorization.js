const { Note } = require('../models')

const authorization = async(req, res, next) => {
  try {
    const { id } = req.params
    const idUser = req.userLogin.id

    const getNote = await Note.findOne({
      where: {
        id,
        creatorId: idUser
      }
    })

    if (!getNote) {
      throw {
        code: 403,
        name: 'Forbidden',
        message: 'Permission is not enough!'
      }
    }

    next()

  } catch (error) {
    next(error)
  }
}

module.exports = authorization