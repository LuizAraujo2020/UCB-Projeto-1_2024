const profileController = require("./profileController");

function searchView(req, res) {
	//TODO: Fazer toda a lógica

	res.render("search");
}

function search(req, res) {
	const { tipo, termo } = req.body;

	profileController
		.findProfileByType(tipo, termo)
		.then((result) => {
			if (result.length <= 0) {
				const fail = "Erro: nenhum perfil encontrado.";
				res.render("search", { fail });
				return;
			} else if (result.length == 1) {
				res.redirect(`/?user=${result[0].email}`);
				return;
			}

			res.render("search", { list: result });
			return;
		})
		.catch((err) => {
			console.log(err);
			const fail = "Erro: nenhum perfil encontrado.";
			res.render("search", { fail });
			return;
		});
}

module.exports = {
	searchView,
	search,
};
