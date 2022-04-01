const bcrypt = require('bcrypt')

function hassPassword(password) {
  return bcrypt.hashSync(password, 8)
}

function comparePassword(password, hassPass) {
  return bcrypt.compareSync(password, hassPass)
}

module.exports = {hassPassword, comparePassword}