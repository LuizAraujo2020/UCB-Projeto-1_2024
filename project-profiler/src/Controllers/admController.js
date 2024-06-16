// const { use } = require("../../routes");
const User = require("../Models/user");
const userController = require("../Controllers/userController")


//====== VIEW
function admView(req, res) {
	deleteUser(req);

	createListAllUsers()
		.then((result) => {
			res.render("adm", { usuarios: result });
		})
		.catch((err) => {
			console.log(err);
		});
}

//====== VIEW COMPONENTS
async function createListAllUsers() {
	const users = await listAllUsers();
	
	return users;
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
module.exports = {
	admView,
	createListAllUsers,
};