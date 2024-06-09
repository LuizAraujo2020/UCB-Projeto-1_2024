const Sequelize = require("sequelize");
const db = require("../../db");

const User = db.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	usuario: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	senha: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = User;
