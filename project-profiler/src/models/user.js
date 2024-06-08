const Sequelize = require('sequelize')
const db = require('../../db')

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  //==== SIGNUP INFO
  usuario: {
    type: Sequelize.STRIN,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
      type: Sequelize.STRING,
      allowNull: false
  },

  //==== PROFILE INFO
  photo: {
    type: Sequelize.BLOB,
    allowNull: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: true
  },
  position: {
    type: Sequelize.STRING,
    allowNull: true
  },
  about: {
    type: Sequelize.STRING,
    allowNull: true
  },
  hardskills: {
    type: Sequelize.STRING,
    allowNull: true,
    get: function() {
        return JSON.parse(this.getDataValue('hardskills'));
    }, 
    set: function(skills) {
        return this.setDataValue('hardskills', JSON.stringify(skills));
    }
  },
  softkills: {
    type: Sequelize.STRING,
    allowNull: true,
    get: function() {
        return JSON.parse(this.getDataValue('softkills'));
    }, 
    set: function(skills) {
        return this.setDataValue('softkills', JSON.stringify(skills));
    }
  },
  experience: {
    type: Sequelize.STRING,
    allowNull: true,
    get: function() {
        return JSON.parse(this.getDataValue('experience'));
    }, 
    set: function(xp) {
        return this.setDataValue('experience', JSON.stringify(xp));
    }
  },
  education: {
    type: Sequelize.STRING,
    allowNull: true,
    get: function() {
        return JSON.parse(this.getDataValue('education'));
    }, 
    set: function(course) {
        return this.setDataValue('education', JSON.stringify(course));
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  linekdin: {
    type: Sequelize.STRING,
    allowNull: true
  },
  github: {
    type: Sequelize.STRING,
    allowNull: true
  },
  instagram: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = User
