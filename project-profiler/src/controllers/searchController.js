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

			const list = createList(result);
			res.render("search", { list });
			return;
		})
		.catch((err) => {
			console.log(err);
			const fail = "Erro: nenhum perfil encontrado.";
			res.render("search", { fail });
			return;
		});
}

function createList(result) {
	let list = [];

	for (let index = 0; index < result.length; index++) {
		let item = result[index];
		list.push(`
            <div class="row ms-5 me-5">
            <div class="col-12 text-center bg-secondary">
                <h5 class=" text-center">${item.nome}</h5>
                <h6 class=" text-center">${item.cargo}</h6>
                <h6 class=" text-center">${item.estado}, ${item.pais}</h6>
            </div>
            </div>
            `);
	}

	return list.join("</br>");
}

module.exports = {
	searchView,
	search,
};
