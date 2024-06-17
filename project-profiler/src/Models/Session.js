const Sequelize = require("sequelize");
const db = require("../../db");

const Session = db.define("session", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	sessionToken: {
		type: Sequelize.UUIDV4,
		allowNull: false,
	},
	expiresAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	admin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
});

module.exports = Session;
