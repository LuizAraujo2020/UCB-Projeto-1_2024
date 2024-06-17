//====== PROFILE MANAGEMENT

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Profile = require("../models/Profile");

async function createProfile(profile) {
	Profile.create(profile)
		.then(() => {
			console.log("✅ Profile criado no DB com sucesso.");
		})
		.catch((err) => {
			console.log("🚨 Erro ao criar o Profile no DB.");
		});
}

async function findProfile(termo) {
	let found = await Profile.findOne({ where: { usuario: termo } });

	if (!found) {
		found = await Profile.findOne({ where: { email: termo } });
	}

	if (!found) {
		//TODO: Fazer Custom Error msg
		console.log("Perfil não encontrado!");
		return null;
	}

	return found;
}

async function findProfileByType(tipo, termo) {
	let found;

	switch (tipo) {
		case "usuario":
			found = await Profile.findAll({
				where: {
					usuario: termo,
				},
			});

			/// If can't find the exactly word, the code below searches for it as part of something bigger.
			if (!found || found.length <= 0) {
				found = await Profile.findAll({
					where: {
						usuario: {
							[Op.like]: "%" + termo + "%",
						},
					},
				});
			}
			break;
		case "email":
			found = await Profile.findAll({
				where: {
					email: termo,
				},
			});

			if (!found || found.length <= 0) {
				found = await Profile.findAll({
					where: {
						email: {
							[Op.like]: "%" + termo + "%",
						},
					},
				});
			}

			break;
		case "cargo":
			found = await Profile.findAll({
				where: {
					cargo: termo,
				},
			});

			if (!found || found.length <= 0) {
				found = await Profile.findAll({
					where: {
						cargo: {
							[Op.like]: "%" + termo + "%",
						},
					},
				});
			}
			break;
		case "hardskills":
			found = await Profile.findAll({
				where: {
					hardskills: termo,
				},
			});

			if (!found || found.length <= 0) {
				found = await Profile.findAll({
					where: {
						hardskills: {
							[Op.like]: "%" + termo + "%",
						},
					},
				});
			}
			break;
		case "softskills":
			found = await Profile.findAll({
				where: {
					softskills: termo,
				},
			});

			if (!found || found.length <= 0) {
				found = await Profile.findAll({
					where: {
						softskills: {
							[Op.like]: "%" + termo + "%",
						},
					},
				});
			}
			break;

		default:
			break;
	}

	if (!found) {
		//TODO: Fazer Custom Error msg
		console.log("Não encontrado!");
		return null;
	}

	return found;
}

async function updateProfileUserInfo(email, userInfo) {
	let found = await findProfileByType("email", email);
	found.usuario = userInfo.usuario;
	found.email = userInfo.email;
	console.log("✅ FOUND");
	console.log(found);

	await Profile.update(found, {
		where: {
			email: email,
		},
	});
}

function deleteProfile(email) {
	Profile.destroy({
		where: {
			email: email,
		},
	});
}

module.exports = {
	createProfile,
	findProfile,
	findProfileByType,
	updateProfileUserInfo,
	deleteProfile,
};
