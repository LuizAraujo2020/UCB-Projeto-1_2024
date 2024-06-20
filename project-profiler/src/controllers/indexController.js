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

			if (req.session.usuario.usuario === "admin") {
				res.redirect("/adm");

			} else {
				res.render("index", { profile, ownProfile, logged });
			}
				
		} else {
			res.render("search");
		}
	});
}

async function editView(req, res) {
	if (!req.session.autorizado || !req.session.usuario) {
		res.redirect("/login");
		return;
	}

	const logged = true;
	const user = req.session.usuario;

	profileController.findProfile(user.email).then((profile) => {
		if (profile) {
			res.render("edit", { profile, logged });
		} else {
			res.render("login");
		}
	});
}

async function edit(req, res) {
	const user = req.session.usuario;

	let profileAux = await profileController.findProfile(user.email)

	if (profileAux) {
		let softskills = "";
		if (req.body.softskills) {
			softskills = req.body.softskills;
		}
		if (req.file) {
			profileAux.foto = req.file.filename;
		}
		profileAux.nome = req.body.nome;
		profileAux.cargo = req.body.cargo;
		profileAux.pais = req.body.pais;
		profileAux.estado = req.body.estado;
		profileAux.sobre = req.body.sobre;
		profileAux.hardskills = req.body.hardskills;
		profileAux.softskills = softskills;
		profileAux.experienciaLocal = req.body.experienciaLocal;
		profileAux.expexperienciaCargo = req.body.expexperienciaCargo;
		profileAux.experienciaPeriodo = req.body.experienciaPeriodo;
		profileAux.educacaoCurso = req.body.educacaoCurso;
		profileAux.educacaoInstituicao = req.body.educacaoInstituicao;
		profileAux.educacaoPeriodo = req.body.educacaoPeriodo;
		profileAux.telefone = req.body.telefone;
		profileAux.linkedin = req.body.linkedin;
		profileAux.github = req.body.github;
		profileAux.instagram = req.body.instagram;

		await profileController.updateProfile(profileAux);

		res.redirect(`/?user=` + profileAux.email);
	} else {
		res.render("login");
	}
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
	editView,
	edit,
};
