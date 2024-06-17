const profileController = require("./profileController.js");

async function indexView(req, res) {
	const userParam = req.query.user;
	if (!userParam) {
		res.render("search");
		return;
	}

	profileController.findProfile(userParam).then((result) => {
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
			res.render("search");
		}
	});
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

	return collection.join("");
}

module.exports = {
	indexView,
};
