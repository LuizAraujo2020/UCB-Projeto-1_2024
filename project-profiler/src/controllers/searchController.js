const profileController = require("./profileController");


//=====================================================================================================================
//====== VIEWS
function searchView(req, res) {
	//TODO: Fazer toda a lógica

	res.render("search");
}


//=====================================================================================================================
//====== CRUD

//====== Read
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
			let boleanos = []
			for (let index = 0; index < result.length; index++) {
				result[index].boleano = index % 2 == 0;
			}
			
			res.render("searchResult", { list: result });
			return;
		})
		.catch((err) => {
			console.log(err);
			const fail = "Erro: nenhum perfil encontrado.";
			res.render("searchResult", { fail });
			return;
		});
}


//=====================================================================================================================
//====== EXPORT
module.exports = {
	searchView,
	search,
};
