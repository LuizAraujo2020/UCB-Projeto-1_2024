const Sequelize = require("sequelize");
const db = require("../../db");

const Profile = db.define("profile", {
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
	foto: {
		type: Sequelize.BLOB,
		allowNull: true,
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	cargo: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	pais: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	estado: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	sobre: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	hardskills: {
		type: Sequelize.STRING,
		allowNull: true,
		// get: function () {
		// 	return JSON.parse(this.getDataValue("hardskills"));
		// },
		// set: function (skills) {
		// 	// if (!skills) {
		// 	// 	return this.setDataValue("hardskills", JSON.stringify([]));
		// 	// }
		// 	return this.setDataValue("hardskills", JSON.stringify(skills));
		// },
	},
	softskills: {
		type: Sequelize.STRING,
		allowNull: true,
		// get: function () {
		// 	return JSON.parse(this.getDataValue("softskills"));
		// },
		// set: function (skills) {
		// 	// if (!skills) {
		// 	// 	return this.setDataValue("softskills", JSON.stringify([]));
		// 	// }
		// 	return this.setDataValue("softskills", JSON.stringify(skills));
		// },
	},
	// experiencia: {
	// 	type: Sequelize.STRING,
	// 	allowNull: true,
	// 	get: function () {
	// 		return JSON.parse(this.getDataValue("experiencia"));
	// 	},
	// 	set: function (xp) {
	// 		// if (!xp) {
	// 		// 	return this.setDataValue("experiencia", JSON.stringify([]));
	// 		// }
	// 		return this.setDataValue("experiencia", JSON.stringify(xp));
	// 	},
	// },
	// educacao: {
	// 	type: Sequelize.STRING,
	// 	allowNull: true,
	// 	get: function () {
	// 		return JSON.parse(this.getDataValue("educacao"));
	// 	},
	// 	set: function (course) {
	// 		// if (!course) {
	// 		// 	return this.setDataValue("educacao", JSON.stringify([]));
	// 		// }
	// 		return this.setDataValue("educacao", JSON.stringify(course));
	// 	},
	// },
	telefone: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	linkedin: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	github: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	instagram: {
		type: Sequelize.STRING,
		allowNull: true,
	},
});

module.exports = Profile;