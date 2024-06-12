const uuid = require("uuid");
const Session = require("../Models/Session");

// const users = {
// 	user1: "password1",
// 	user2: "password2",
// };

async function initSession(email, admin, res) {
	const sessionToken = uuid.v4();
            console.log("✅ initSession(email, admin, res)");

	// set the expiry time as 120s after the current time
	const now = new Date();
	const expiresAt = new Date(+now + 120 * 1000);

	// create a session containing information about the user and expiry time
	const session = {
		sessionToken: sessionToken,
		expiresAt: expiresAt,
		email: email,
		admin: admin,
	};
	// add the session information to the sessions map
	Session.create(session)
        .then(() => {
            res.cookie("session_token", sessionToken, { expires: expiresAt });
            console.log("✅ Criação da Session bem sucedida.");
            return session
        })
        .catch((err) => {
            console.log("🚨 Erro na criação da Session.");
            console.log(err);
        });
}

async function getSession(sessionToken) {
	// let found = await Session.findOne({ where: { sessionToken: sessionToken } });

	// if (!found) {
	// 	console.log("Session não encontrada!");
	// 	return null;
	// }

	const found = await Session.findAll();

    if (found.length <= 0) {
        return null
    }
    console.log("🚨 found");
    console.log(found);
	return found[0];
}

// async function logoutSession(req, res) {
async function logoutSession() {
	// if (!req.cookies) {
    //     console.log("🚨 (!req.cookies)");
    //     res.redirect("/login");
	// 	return;
	// }

	// const sessionToken = req.cookies["session_token"];

	// if (!sessionToken) {
    //     console.log("🚨 (!sessionToken)");
    //     res.redirect("/login");
	// 	return;
	// } 

    // console.log("✅ sessionToken");
    // deleteSession(sessionToken);
    deleteSession();

	// res.cookie("session_token", "", { expires: new Date() });
	// res.redirect('login');
};


// function deleteSession(sessionToken) {
function deleteSession() {
	// Session.destroy({
	// 	where: {
	// 		sessionToken: sessionToken,
	// 	},
	// });
    Session.truncate();
}

module.exports = {
	initSession,
	getSession,
    logoutSession,
};