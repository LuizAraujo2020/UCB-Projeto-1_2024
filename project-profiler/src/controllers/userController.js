//====== USER MANAGEMENT

const User = require("../models/user");
const Profile = require("../models/Profile");
// const profileController = require("../Controllers/profileController")
const sessionController = require("./sessionController");

//====== VIEWS
function signupView(req, res) {
	res.render("signup");
}

function loginView(req, res) {
	res.render("login");
}

//====== SIGNUP & LOGIN JOURNEY

async function createUser(req, res) {
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
			// profileController.createProfile(profile)
			// res.redirect(`/?user=` + user.email);
			req.session.autorizado = true;
			req.session.usuario = user;
		})
		.catch((err) => {
			let fail = "Erro: falha ao criar o usuário."; // + err.errors.map((e) => e.message);
			res.render("signup", { fail });
			return
		});

	Profile.create(profile)
		.then(() => {
			console.log("✅ Profile criado no DB com sucesso.");
			res.redirect(`/?user=` + user.email);
		})
		.catch((err) => {
			let fail = "Erro ao criar o Profile no DB.";
			console.log("🚨 Erro ao criar o Profile no DB.");
			res.render("signup", { fail });
			return;
		});

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

// UPDATE
async function updateUser(id, user) {
	await User.update(
		{
			usuario: user.usuario,
			email: user.email,
			senha: user.senha,
		},
		{
			where: {
				id: id,
			},
		}
	);
	// // return User.findByIdAndUpdate(id, user, { new: true });
	// let result = await User.update(user, {
	//     where: {
	//         _id: id,
	//     },
	// })

	// console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️");
	// console.log(result);
}

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
		foto: null,
		nome: "Insira o Seu Nome",
		cargo: "Seu Cargo/função atual ou que procura",
		pais: "Seu País",
		estado: "Seu Estado",
		sobre: "Insira uma brave descrição sobre você. Comece com uma frase impactante que resuma quem você é e o que faz. Descreva suas principais habilidades e experiências, destacando o valor que você agrega. Mencione algumas conquistas importantes com dados concretos. Explique seus objetivos de carreira e o que busca no momento. Adicione um toque pessoal falando de suas paixões profissionais. Use uma linguagem clara e direta, sem jargões. Finalize com um convite para se conectar ou discutir oportunidades.",
		hardskills:
			"Linguagens de Programação, Desenvolvimento Web, Machine Learning, Data Science, Cloud Computing, Testing, APIs e Web Services, Controle de Versão, Banco de Dados",
		softskills:
			"Comunicação, Trabalho em Equipe, Resolução de Problemas, Adaptabilidade, Gestão de Tempo, Atenção aos Detalhes, Pensamento Crítico, Empatia, Criatividade, Proatividade, Paciência, Mentoria, Liderança, Curiosidade",
		experienciaLocal: "Nome da Empresa",
		expexperienciaCargo: "Cargo ou Função Desempenhada",
		experienciaPeriodo: "20XX - 20XX",
		educacaoCurso: "Principal Curso Feito",
		educacaoInstituicao: "Instituição Onde Estudou",
		educacaoPeriodo: "20XX - 20XX",
		telefone: "(XX) XXXXX-XXXX",
		linkedin: "link do linkedIn",
		github: "link do github",
		instagram: "link do instagram",
	};

	return profile;
}

// function createObjectFromProfile(profile) {
// 	let profile = {
// 		usuario: user.usuario,
// 		email: user.email,
// 		foto: null,
// 		nome: null,
// 		cargo: null,
// 		pais: null,
// 		estado: null,
// 		sobre: null,
// 		hardskills: null,
// 		softskills: null,
// 		experiencia: null,
// 		educacao: null,
// 		telefone: null,
// 		linkedin: null,
// 		github: null,
// 		instagram: null,
// 	};

// 	return profile;
// }

//====== MODULE EXPORTING
module.exports = {
	signupView,
	loginView,
	createUser,
	findUser, //readUserByID, listAllUsers,
	updateUser,
	// deleteUser,
	/// Helpers
	createUserObject,
	// c	login,
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