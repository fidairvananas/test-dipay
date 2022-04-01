const { User, Note } = require('../models');
const { comparePassword } = require('../helpers/hashPass')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async createUser(req, res, next){
    try {
      const { username, password, fullName } = req.body
      const result = await User.create({
        username,
        password,
        fullName
      })

      res.status(201).json({status: "Success", data: {userId: result.id}})
    } catch (error) {
      next(error)
    }
  }

  static async loginUser(req, res, next){
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username
        }
      })

      if (user) {
        const checkPass = comparePassword(password, user.password)
        if (checkPass) {
          const payload = {id: user.id, username: user.username}
          const accessToken = signToken(payload)
          res.status(201).json({status: "Success", data: {accessToken}})
        } else {
          throw {
            code: 401,
            name: 'Unauthorized',
            message: 'Invalid email or password'
          }
        }
      } else {
        throw {
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email or password'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}


class NoteController{
  static async getNotes(req, res, next){
    try {
      const notes = await Note.findAll({
        include: {
          model: User,
          attributes: ['fullName']
        }
      })
      res.status(200).json({status: "Success", data: {notes}})
    } catch (error) {
      next(error)
    }
  }


  static async getNoteById(req, res, next){
    try {
      const { id } = req.params
      const note = await Note.findOne({
        where: {
          id
        }
      })

      if (note) {
        res.status(200).json(result)
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Note not found'
        }
      }
      
    } catch (error) {
      next(error)
    }
  }


  static async createNote(req, res, next){
    try {
      const { id } = req.userLogin
      const { title, description } = req.body
      const addNote = await Note.create({
        title,
        description,
        creatorId: id
      })
      res.status(201).json({status: "Success", data: {noteId: addNote.id}})
    } catch (error) {
      next(error)
    }
  }


  static async updateNote(req, res, next){
    try {
      const { id } = req.params
      const userId = req.userLogin.id
      const { title, description } = req.body
      const find = await Note.findByPk(id)
      if (find) {
        const update = await Note.update({
          title,
          description,
          creatorId: userId
        }, {
          where: {
            id
          },
          returning: true
        })

        res.status(200).json({status: "Success", data: {note: update[1][0]}})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Note not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteNote(req, res, next){
    try {
      const { id } = req.params
      const find = await Note.findByPk(id)

      if (find) {
        await Note.destroy({
          where: {
            id
          }
        })

        res.status(200).json({status: "Success", message: "Deleted note successfull"})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Note not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  UserController,
  NoteController
}