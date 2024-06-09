//====== PROFILE MANAGEMENT

const Profile = require("../Models/Profile");

async function findProfile(termo) {
	let found = await Profile.findOne({ where: { usuario: termo } });

	if (!found) {
		found = await Profile.findOne({ where: { email: termo } });
	}

	if (!found) {
		//TODO: Fazer Custom Error msg
		console.log("Não encontrado!");
		return null;
	}

	return found;
}

async function findProfileByType(tipo, termo) {
	let found 

	switch (tipo) {
		case "usuario":
			found = await Profile.findAll({
				where: {
					usuario: termo,
				},
			});
			break;
		case "email":
			found = await Profile.findAll({
				where: {
					email: termo,
				},
			});
			break;
		case "cargo":
			found = await Profile.findAll({
				where: {
					cargo: termo,
				},
			});
			break;
		case "hardskills":
			found = await Profile.findAll({
				where: {
					hardskills: termo,
				},
			});
			break;
		case "softskills":
			found = await Profile.findAll({
				where: {
					softskills: termo,
				},
			});
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

module.exports = {
	findProfile,
	findProfileByType,
};
