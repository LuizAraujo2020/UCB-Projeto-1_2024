// const { use } = require("../../routes");
const User = require("../models/user");
const userController = require("./userController");
const Profile = require("../models/Profile");

//====== VIEW
function admView(req, res) {
	// deleteUser(req);

	createListAllUsers()
		.then((result) => {
			res.render("adm", { usuarios: result });
		})
		.catch((err) => {
			console.log(err);
		});
}


//====== ADM CRUD
async function admCreateUser(req, res) {
	let user = {
		usuario: req.body.usuario,
		email: req.body.email,
		senha: req.body.senha,
		confirmarSenha: req.body.senha,
		admin: req.body.usuario === "admin",
	};

	let profile = {
		usuario: user.usuario,
		email: user.email,
		foto: "profile.jpg",
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
	
	User.create(user)
		.then(() => {
			// req.session.autorizado = true;
			// req.session.usuario = user;
		})
		.catch((err) => {
			let fail = "Erro: falha ao criar o usuário.";
			res.render("adm", { fail });
			return;
		});

	Profile.create(profile)
		.then(() => {
			console.log("✅ Profile criado no DB com sucesso.");
			// res.redirect(`/?user=` + user.email);
		})
		.catch((err) => {
			let fail = "Erro ao criar o Profile no DB.";
			console.log("🚨 Erro ao criar o Profile no DB.");
			res.render("adm", { fail });
			return;
		});

	res.redirect("/adm");
}

async function admDeleteUser(req, res, next) {
	const email = req.body.delete;
	await userController.deleteUser(email); 

	next();
}

async function admEditUser(req, res, next) {
	const user = {
		id: req.body.id,
		usuario: req.body.usuario,
		email: req.body.email,
		senha: req.body.senha,
	};

	await userController.updateUser(user.id, user);

	next();
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
	const userToDelete = req.query.delete;
	if (userToDelete) {
		userController.deleteUser(userToDelete);
	}
}

//====== VALIDATIONS
module.exports = {
	admView,
	createListAllUsers,
	admCreateUser,
	admDeleteUser,
	admEditUser,
};
