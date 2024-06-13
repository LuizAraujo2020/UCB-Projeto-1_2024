//====== USER MANAGEMENT

const User = require("../Models/user");
const Profile = require("../Models/Profile");
const sessionController = require('../Controllers/sessionController')


//====== VIEWS
function signupView(req, res) {
    res.render("signup");
}

function loginView(req, res) {
    // logout(req, res);
    logout(); 
    res.render("login");
}

//====== SIGNUP & LOGIN JOURNEY

function createUser(req, res) {
    /// Creates helper objects from the request body.
    let user = createUserObject(req.body);
    let profile = createProfileObjectFromUser(user);

    /// Validations
    const fail = validateSignup(user.senha, user.confirmarSenha);
    if (fail) {
        res.render("signup", { fail });
        return;
    }

    user.admin = user.usuario === "admin";

    User.create(user)
        .then(() => {
            res.redirect(`/?user=` + user.email);
        })
        .catch((err) => {
            let fail = "Erro: falha ao criar o usuário." // + err.errors.map((e) => e.message);
            res.render("signup", { fail });
        });
    

    Profile.create(profile)
        .then(() => {
            console.log("✅ Profile criado no DB com sucesso.");
        })
        .catch((err) => {
            console.log("🚨 Erro ao criar o Profile no DB.");
        });

    sessionController.initSession(user.email, user.admin, res);    
}

// READ
// function readUserByID(id) {
//   return Usuario.findById(id)
// }

async function findUser(termo) {
    let found = await User.findOne({ where: { usuario: termo } });

    if (!found) {
        found = await User.findOne({ where: { email: termo } });
    }

    if (!found) {
        //TODO: Fazer Custom Error msg
        console.log("Não encontrado!");
        return null;
    }

    return found;
}

// function listAllUsers() {
//   return Usuario.find()
// }

// // UPDATE
// function updateUser(id, user) {
//   return Usuario.findByIdAndUpdate(id, user, { new: true })
// }

// // DELETE
function deleteUser(email) {
//   return Usuario.findByIdAndRemove(id)
    User.destroy({
		where: {
			email: email,
		},
	});

    Profile.destroy({
		where: {
			email: email,
		},
	});
}

//====== LOGIN JOURNEY

async function login(req, res) {
    let fail = "Erro: "; // + err.errors.map(e => e.message)

    /// Try to find the user.
    const userFound = await findUser(req.body.termo);

    if (!userFound) {
        fail += "usuário não encontrado.";
        res.render("login", { fail });
        return;
    }

    /// Confirm password
    if (!req.body.senha === userFound.senha) {
        fail += "Senha incorreta. ";
        res.render("login", { fail });
        return;
    }

    /// Login successfully.
    sessionController.initSession(userFound.email, userFound.admin, res);
    res.redirect(`/?user=` + userFound.usuario);
}

async function logout() {
	sessionController.logoutSession();
}

// async function logout(res) {
// 	sessionController.logoutSession();
// 	res.render("login");
// }

//====== VALIDATIONS
/// Validates the entries in the Signup journey.
function validateSignup(senha, confirmarSenha) {
    let fail; 

    if (senha !== confirmarSenha) {
        fail = "Senha e Confirmar Senha devem ser iguais.";
    }

    // TODO: Adicionar mais validações ao `fail` com \n pra ficar um erro em cada linha.

    return fail;
}

//====== HELPERS
function createUserObject(body) {
    let usuario = {
        usuario: body.usuario,
        email: body.email,
        senha: body.senha,
        confirmarSenha: body.confirmarSenha,
    };

    return usuario;
}

function createProfileObjectFromUser(user) {
    let profile = {
        usuario: user.usuario,
        email: user.email,
    };

    return profile;
}

//====== MODULE EXPORTING
module.exports = {
	signupView,
	loginView,
	createUser,
	findUser, //readUserByID, listAllUsers,
	// updateUser,
	// deleteUser,
	/// Helpers
	createUserObject,
	login,
	logout,
	deleteUser,
};

// function findUserByUsername (username) {
//   const users = userDB.mockUsers

//   let found

//   users.forEach(user => {
//     if (user.username == username) {
//       found = user
//     }
//   })

//   return found
// }

// //====== VIEWS
// function indexView(req, res) {
//   res.render('index.html')
// }

// function indexView(req, res) {
//   res.render('index.html')
// }

// module.exports = {
// indexView
// }
