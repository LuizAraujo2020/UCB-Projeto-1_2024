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
		type: Sequelize.STRING,
		allowNull: true,
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	cargo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	pais: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	estado: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	sobre: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	hardskills: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	softskills: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	experienciaLocal: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	expexperienciaCargo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	experienciaPeriodo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	educacaoCurso: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	educacaoInstituicao: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	educacaoPeriodo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	telefone: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	linkedin: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	github: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	instagram: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Profile;
