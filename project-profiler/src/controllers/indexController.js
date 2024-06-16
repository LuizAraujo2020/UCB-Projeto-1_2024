// const userController = require('../Controllers/userController')
const profileController = require("./profileController.js");

async function indexView(req, res) {
    const userParam = req.query.user;
    if (!userParam) {
        res.render("search");
        return;
    }

    profileController.findProfile(userParam).then((profile) => {
		// loadProfileInfo(userParam).then((profile) => {
		if (profile) {
			res.render("index", { profile: profile });
		} else {
			// const fail = "";
			// res.render("search", { fail });
			res.render("search");
		}
	}); //.catch((err) => {
    //     console.log('🚨 Erro ao criar o Profile no DB.')
    //     res.render('search')
    // }) 
}

// async function loadProfileInfo(param) {
//     return await profileController.findProfile(param);
// }

module.exports = {
    indexView,
};
