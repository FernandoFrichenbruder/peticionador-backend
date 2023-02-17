const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect');

class User extends Sequelize.Model {}

User.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users',
  hooks: {
    beforeCreate: (user, options) => {
      return bcrypt
        .hash(user.password, 10)
        .then(hash => {
          user.password = hash;
        })
        .catch(err => {
          throw new Error();
        });
    }
  }
});

User.prototype.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;