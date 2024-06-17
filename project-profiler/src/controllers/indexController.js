// const userController = require('../Controllers/userController')
const profileController = require("./profileController.js");

async function indexView(req, res) {
	const userParam = req.query.user;
	if (!userParam) {
		res.render("search");
		return;
	}

	profileController.findProfile(userParam).then((result) => {
		// loadProfileInfo(userParam).then((profile) => {
		if (result) {
			let profile = result;
			profile.hardskills = handleSkills(result.hardskills);
			profile.softskills = handleSkills(result.softskills);

			let logged = false;
			let ownProfile = false;
			if (req.session.autorizado) {
				logged = true;
				ownProfile = profile.email === req.session.usuario.email;
			}

			res.render("index", { profile, ownProfile, logged });
		} else {
			// const fail = "";
			// res.render("search", { fail });
			res.render("search");
		}
	}); //.catch((err) => {
	//     console.log('🚨 Erro ao criar o Profile no DB.')
	//     res.render('search')
	// })
}

function handleSkills(skills) {
	let collection = skills + "";

	collection = collection.trim();
	collection = collection.split(",");

	collection = collection.map((skill) => {
		return skill.trim();
	});

	collection = collection.map((skill) => {
		return `<li>${skill}</li>`;
	});

	collection = collection.filter((skill) => skill !== "<li></li>");

	// const result = collection.join("");

	return collection.join("");
}

module.exports = {
	indexView,
};
