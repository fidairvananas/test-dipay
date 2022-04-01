'use strict';
const {
  Model
} = require('sequelize');
const { hassPassword } = require('../helpers/hashPass')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user){
        user.password = hassPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};