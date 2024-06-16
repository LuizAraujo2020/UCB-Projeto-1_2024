const Sequelize = require("sequelize");
const db = require("../../db");

const Experience = db.define("experience", {
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
	local: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	cargo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	periodo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Experience;
