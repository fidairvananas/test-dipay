const router = require('express').Router()
const { UserController, NoteController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.post('/users', UserController.createUser)
router.post('/authentications', UserController.loginUser)
router.use( authentication)
router.get('/notes', NoteController.getNotes)
router.get('/notes/:id', NoteController.getNoteById)
router.post('/notes', NoteController.createNote)
router.put('/notes/:id',authorization, NoteController.updateNote)
router.delete('/notes/:id',authorization, NoteController.deleteNote)

module.exports = router