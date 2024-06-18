const express = require("express");
const router = express.Router();

const mainController = require("./src/controllers/indexController");
const searchController = require("./src/controllers/searchController");

const userController = require("./src/controllers/userController");
const settingsController = require("./src/controllers/settingsController");

const admController = require("./src/controllers/admController");
const sessionController = require("./src/controllers/sessionController");

// const errorController    = require('./Controllers/errorController')

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "src", "static", "uploads"));
            // cb(null, "./aaaaaa");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

router.get("/", mainController.indexView);
router.get("/edit", sessionController.verificarAutenticacao, mainController.editView);
router.post("/edit", sessionController.verificarAutenticacao, 
	upload.single("foto_upload"),
	function (req, res, next) {
		// // req.file is the name of your file in the form above, here 'uploaded_file'
		// // req.body will hold the text fields, if there were any
		// // console.log(req.file, req.body);

		// // upload.single("foto");
		console.log("✅Image saved:");
		console.log(req.file.filename);
		// // let ASDADAS = path.join(__dirname, "src", "static", "uploads");
		// console.log("✅✅✅✅2");
		// // console.log(ASDADAS);
		// console.log(req.body);
		// console.log("✅✅✅✅3");

		next();
	},
	mainController.edit
);

router.get("/signup", userController.signupView);
router.post("/signup", userController.createUser, mainController.indexView);
// router.post("/signup", userController.createUser, sessionController.autenticar, mainController.indexView);

router.get("/settings", sessionController.verificarAutenticacao, settingsController.settingsView);
router.post("/settings", sessionController.verificarAutenticacao, settingsController.settings);
router.get("/delete", sessionController.verificarAutenticacao, settingsController.deleteAccount);

router.get("/login", userController.loginView);
router.post("/login", sessionController.autenticar, mainController.indexView);

router.get("/logout", sessionController.logout);

router.get("/search", searchController.searchView);
router.post("/search", searchController.search);

router.get("/adm", sessionController.verificarAdm, admController.admView);

module.exports = router;
