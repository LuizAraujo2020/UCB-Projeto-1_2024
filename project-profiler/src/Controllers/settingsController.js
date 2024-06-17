const userController = require("./userController");
const profileController = require("./profileController");

function settingsView(req, res) {
	const usuario = req.session.usuario;

	res.render("settings", { usuario });
}

async function settings(req, res) {
	let fail = "";
	let success = "Usuário atualizado com sucesso.";

	const userPost = {
		settingsUsuario: req.body.settingsUsuario,
		settingsConfirmarUsuario: req.body.settingsConfirmarUsuario,

		settingsEmail: req.body.settingsEmail,
		settingsConfirmEmail: req.body.settingsConfirmEmail,

		settingsSenhaAtual: req.body.settingsSenhaAtual,
		settingsSenhaNova: req.body.settingsSenhaNova,
		settingsConfirmarNovaSenha: req.body.settingsConfirmarNovaSenha,
	};

	let newUser = await userController.findUser(req.session.usuario.email);

	const oldEmail = newUser.email;

	if (!newUser) {
		fail = "Usuário não encontrado! Tente logar novamente ou com outras credenciais.";
		res.render("login", { fail });
		return;
	}

	/// Username
	if (!userPost.settingsConfirmarUsuario || userPost.settingsConfirmarUsuario === "") {
		// fail += "<p>Confirme o novo nome de usuário.</p>";
	} else {
		if (userPost.settingsConfirmarUsuario != userPost.settingsUsuario) {
			fail += "<p>Os nomes de usuário não coincidem.</p>";

		} else {
			const found = await userController.findUser(userPost.settingsConfirmarUsuario);

			if (found) {
				fail += "<p>O nome de usuário já está em uso.</p>";
				// res.render("settings", { fail });
			} else {
				newUser.usuario = userPost.settingsConfirmarUsuario;
			}
		}
	}

	/// Email
	if (!userPost.settingsConfirmEmail || userPost.settingsConfirmEmail === "") {
		// fail += "<p>Confirme o novo email.</p>";
	} else {
		if (userPost.settingsConfirmEmail != userPost.settingsEmail) {
			fail += "<p>Os e-mails não coincidem.</p>";
		} else {
			const found = await userController.findUser(userPost.settingsConfirmEmail);

			if (found) {
				fail += "<p>O e-mail já está em uso.</p>";
				// res.render("settings", { fail });
			} else {
				newUser.email = userPost.settingsConfirmEmail;
			}
		}
	}

	/// Password
	if (!userPost.settingsConfirmarNovaSenha || userPost.settingsConfirmarNovaSenha === "") {
		// fail += "<p>Confirme a nova senha.</p>";
	} else {
		if (userPost.settingsConfirmarNovaSenha != userPost.settingsSenhaNova) {
			fail += "<p>As senhas não coincidem.</p>";

		} else if (userPost.settingsSenhaAtual !== newUser.senha) {
			fail += "<p>Insira a senha atual corretamente.</p>";

		} else if (userPost.settingsConfirmarNovaSenha.length < 4) {
			fail += "<p>A senha deve ter no mínimo 4 caracteres.</p>";

			//TODO: Fazer validação depois...
		} else {
			newUser.senha = userPost.settingsConfirmarNovaSenha;
		}
	}

	if (fail !== "") {
		res.render("settings", { fail });
		return;
	}

	await userController.updateUser(newUser.id, newUser);
	await profileController.updateProfileUserInfo(oldEmail, newUser);

	req.session.usuario = newUser;
	res.redirect(`/?user=` + newUser.email);
}

async function deleteAccount(req, res) {
	let user = await userController.findUser(req.session.usuario.email);

	userController.deleteUser(user.email);
	profileController.deleteProfile(user.email);

	user = await userController.findUser(req.session.usuario.email);

	if (!user) {
		req.session.destroy();
		res.redirect("/");

	} else {
		const fail = "Falha ao deletar o usuário, tente novamente mais tarde!";
		res.render("settings", { fail });
	}
}

//==== EXPORTING
module.exports = {
	settingsView,
	settings,
	deleteAccount,
};
