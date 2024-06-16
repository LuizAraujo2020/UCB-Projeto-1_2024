const User = require("../models/user");

async function autenticar(req, res) {
	let usuario = await User.findOne({
		where: {
			email: req.body.termo,
			senha: req.body.senha,
		},
	});

	if (!usuario) {
		usuario = await User.findOne({
			where: {
				usuario: req.body.termo,
				senha: req.body.senha,
			},
		});
	}

	if (usuario !== null) {
		req.session.autorizado = true;
		req.session.usuario = usuario;
		res.redirect(`/?user=` + usuario.email);
	} else {
		let fail = "Falha ao realizar o login.";
		res.render("login", { fail });
	}
}

function verificarAutenticacao(req, res, next) {
	if (req.session.autorizado) {
		console.log("usuário autorizado");
		next();
	} else {
		console.log("usuário NÃO autorizado");
		// res.redirect("/");
		// res.redirect(`/?user=` + req.session.usuario.email);
		res.redirect("/login");
	}
}

function verificarAdm(req, res, next) {
	if (req.session.autorizado && req.session.usuario.admin) {
		console.log("usuário autorizado");
		next();
	} else {
		console.log("usuário NÃO autorizado");
		res.redirect("/login");
	}
}

function logout(req, res) {
	req.session.destroy();
	res.redirect("/login");
	// 	res.render("login");
}

module.exports = {
	autenticar,
	verificarAutenticacao,
	verificarAdm,
	logout,
};
