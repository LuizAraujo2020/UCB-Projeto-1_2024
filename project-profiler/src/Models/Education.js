const Sequelize = require("sequelize");
const db = require("../../db");

const Education = db.define("education", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	curso: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	instituicao: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	periodo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Education;
