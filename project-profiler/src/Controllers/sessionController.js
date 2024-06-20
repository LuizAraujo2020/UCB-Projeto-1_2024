const User = require("../models/user");


//=====================================================================================================================
//====== AUTH
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


//=====================================================================================================================
//====== CHECK AUTH
function verificarAutenticacao(req, res, next) {
	if (req.session.autorizado) {
		console.log("usuário autorizado");
		next();
	} else {
		console.log("usuário NÃO autorizado");
		const fail = "Efetue o login para acessar a referida página."
		res.render("login", { fail })
		// res.redirect("/login");
	}
}

function verificarAdm(req, res, next) {
	if (req.session.autorizado && req.session.usuario.admin) {
		console.log("usuário autorizado");
		next();
		
	} else {
		console.log("usuário NÃO autorizado");
		const fail = "Efetue o login para acessar a referida página.";
		res.render("login", { fail });
		res.redirect("/login");
	}
}

function logout(req, res) {
	req.session.destroy();
	res.redirect("/login");
}


//=====================================================================================================================
//====== EXPORT
module.exports = {
	autenticar,
	verificarAutenticacao,
	verificarAdm,
	logout,
};
