// const { use } = require("../../routes");
const User = require("../Models/user");
const userController = require("../Controllers/userController")


//====== VIEW
function admView(req, res) {
	// // const sessionToken = req.cookies["session_token"];

	// // console.log("✅✅✅sessionToken✅✅✅");
	// // console.log(sessionToken);
	
	// // if (!sessionToken) {
	// // 	// If the cookie is not set, return an unauthorized status
	// // 	res.redirect("/index");
	// // 	return;
	// // }
	
	// // // if (!userController.sessionPersisted()) {
	// // // 	console.log("🚨 Você não tem permissão para acessar essa página.");
	// // // 	res.redirect("index");
	// // // }
	
	// // // try {
	// // // 	const admin = validateAdmPanelAccess(userController.userLogged);

	// // // } catch (error) {
	// // // 	console.log(error)
	// // // 	res.redirect('index')
	// // // }
	// const session = sessionController.getSession();
	// // if (!userSession) {
	// // 	// If the session token is not present in session map, return an unauthorized error
	// // 	res.status(401).end();
	// // 	return;
	// // }
	// // // if the session has expired, return an unauthorized error, and delete the
	// // // session from our map
	// // if (userSession.isExpired()) {
	// // 	sessionController.deleteSession(sessionToken)
	// // 	res.redirect("index");
	// // 	return;
	// // }

	// // If all checks have passed, we can consider the user authenticated and
	// // send a welcome message
	// // res.send(`Welcome  ${userSession.username}!`).end()'
	// try {
	// 	sessionController.getSession().then((session) => {
	// 		console.log("✅ Achou a session!");
	// 		console.log(session);

	// 		// if (!session || !validateAdmPanelAccess(session)) {
	// 		if (!session || session.admin == false) {
	// 			res.render("login", { fail: "Efetue o login como administrador para acessar o Painel Administrativo!" });
	// 			return;
	// 		}

			deleteUser(req);

			createListAllUsers()
				.then((result) => {
					res.render("adm", { body: result });
				})
				.catch((err) => {
					console.log(err);
				});
	// 	});
	// } catch (error) {
	// 	console.log("❌ Erro ao buscar a session! " + error);
	// 	res.render("login", {
	// 		fail: "Efetue o login como administrador para acessar o Painel Administrativo!",
	// 	});
	// 	return;
	// }
	// console.log("⚠️");
	// console.log(session);
	// if (!session || !validateAdmPanelAccess(session) || session == null) {
	// 	// res.redirect("login");
	// 	console.log("Efetue o login como administrador para acessar o Painel Administrativo!");
	// 	res.render("login", { fail: "Efetue o login como administrador para acessar o Painel Administrativo!" });

	// 	return;
	// } else {
	// 	console.log('✅ Achou a session!')

	// 	deleteUser(req);

	// 	createListAllUsers()
	// 		.then((result) => {
	// 			res.render("adm", { body: result });
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }
}

//====== VIEW COMPONENTS
async function createListAllUsers() {
	const users = await listAllUsers();
	let rows = [];

	const size = users.length;

	for (let index = 0; index < size; index++) {
		const element = users[index];
		rows.push(`
			<tr>
				<td>${index}</td> 
				<td>${element.email}</td>
				<td>${element.senha}</td>
				<td>
					<a
						href="/adm/?delete=${element.email}"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-sm btn-outline-danger"
					>
						X
					</a>
				</td>
			</tr>
			`);
	}
				// <td>
				// 	<button type="button" class="btn btn-sm btn-outline-danger">
				// 		X
				// 	</button>
				// </td>;

	return rows.join("\n");
}

//====== HELPERS
async function listAllUsers() {
	const users = await User.findAll();
	return users;
}

function deleteUser(req) {
	const userToDelete = req.query.delete
	if (userToDelete) {
		userController.deleteUser(userToDelete);
	}
}

//====== VALIDATIONS
// async function validateAdmPanelAccess(user) {
// 	if (!user || !user.admin) {
// 		// throw new Error("Você não tem permissão para acessar essa página.");
// 		console.log("Você não tem permissão para acessar essa página.");
// 		return false;
// 	}

// 	return true
// }

module.exports = {
	admView,
	createListAllUsers,
};