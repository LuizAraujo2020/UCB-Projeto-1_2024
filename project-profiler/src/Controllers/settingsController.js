const userController = require('../Controllers/userController')

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

	// /// Username
	// if (!userPost.settingsConfirmarUsuario && userPost.settingsConfirmarUsuario != "") {
	// 	if (userPost.settingsConfirmarUsuario != userPost.settingsUsuario) {
	// 		fail += "<p>Os nomes de usuário não coincidem.</p>";
	// 		// res.render("settings", { fail });
	// 	} else {
	// 		const found = await userController.findUser(userPost.settingsConfirmarUsuario);

	// 		if (found) {
	// 			fail += "<p>O nome de usuário já está em uso.</p>";
	// 			// res.render("settings", { fail });
	// 		} else {
	// 			// await userController.updateUser(req.session.usuario.id, {
	// 			//     usuario: userPost.settingsConfirmarUsuario,
	// 			// });
	// 			// res.redirect("/settings", { success });
	newUser.usuario = userPost.settingsConfirmarUsuario;
	// 		}
	// 	}
	// }

	// /// Email
	// if (!userPost.settingsConfirmEmail && userPost.settingsConfirmEmail != "") {
	// 	if (userPost.settingsConfirmEmail != userPost.settingsEmail) {
	// 		fail += "<p>Os e-mails não coincidem.</p>";
	// 		// res.render("settings", { fail });
	// 	} else {
	// 		const found = await userController.findUser(userPost.settingsConfirmEmail);

	// 		if (found) {
	// 			fail += "<p>O e-mail já está em uso.</p>";
	// 			// res.render("settings", { fail });
	// 		} else {
	// 			// await userController.updateUser(req.session.usuario.id, {
	// 			//     usuario: userPost.settingsConfirmarUsuario,
	// 			// });
	// 			// res.redirect("/settings", { success });
	// 			newUser.email = userPost.settingsConfirmEmail;
	// 		}
	// 	}
	// }

	// /// Password
	// if (!userPost.settingsConfirmarNovaSenha && userPost.settingsConfirmarNovaSenha != '') {
	// 	if (userPost.settingsConfirmarNovaSenha != userPost.settingsSenhaNova) {
	// 		fail += "<p>As senhas não coincidem.</p>";
	// 	} else if (userPost.settingsSenhaAtual !== newUser.senha) {
	// 		fail += "<p>A senha atual não coincide com a senha cadastrada.</p>";
	// 	} else if (userPost.settingsConfirmarNovaSenha.length < 4) {
	// 		fail += "<p>A senha deve ter no mínimo 4 caracteres.</p>";

	// 		//TODO: Fazer validação depois...
	// 	} else {
	// 		newUser.senha = userPost.settingsConfirmarNovaSenha;
	// 	}
	// }

	// if (fail !== "") {
	//     console.log("🚨🚨🚨🚨🚨🚨");
	// 	console.log(userPost);
	// 	console.log(newUser);
	//     res.render("settings", { fail });
	// } else {
	//     console.log("✅✅✅✅✅✅");
	// 	console.log(userPost);
	// 	console.log(newUser);
	//     await userController.updateUser(req.session.usuario.id, newUser)
	//         .then(() => {

	//         console.log("✅✅✅1111");
	//             res.session.usuario = newUser;
	//             res.redirect(`/?user=` + newUser.email);
	//         })
	//         .catch(err => {
	//             const fail = "Falha na tentiva de atualização."
	//             res.render("settings", { fail });
	//         })
	// // }
	await userController.updateUser(newUser.id, newUser);
    req.session.usuario = newUser;
    res.redirect(`/?user=` + newUser.email);
}

//==== EXPORTING
module.exports = {
	settingsView,
	settings,
};
