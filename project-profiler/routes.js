const express = require("express");
const router = express.Router();

const mainController = require("./src/controllers/indexController");
const searchController = require("./src/controllers/searchController");

const userController = require("./src/controllers/userController");
const settingsController = require("./src/controllers/settingsController");

const admController = require("./src/controllers/admController");
const sessionController = require("./src/controllers/sessionController");


//=====================================================================================================================
//====== Store the images
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "src", "static", "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });


//=====================================================================================================================
//====== INDEX: main page
router.get("/", mainController.indexView);
router.get("/edit", sessionController.verificarAutenticacao, mainController.editView);
router.post("/edit", sessionController.verificarAutenticacao, upload.single("foto_upload"), function (req, res, next) {
		if (req.file) {
			console.log("✅Image saved:");
			console.log(req.file.filename);
		}
		next();
	},
	mainController.edit
);


//=====================================================================================================================
//====== SIGNUP
router.get("/signup", userController.signupView);
router.post("/signup", userController.createUser, mainController.indexView);
// router.post("/signup", userController.createUser, sessionController.autenticar, mainController.indexView);


//=====================================================================================================================
//====== LOGIN
router.get("/login", userController.loginView);
router.post("/login", sessionController.autenticar, mainController.indexView);

router.get("/logout", sessionController.logout);


//=====================================================================================================================
//====== SETTINGS 
router.get("/settings", sessionController.verificarAutenticacao, settingsController.settingsView);
router.post("/settings", sessionController.verificarAutenticacao, settingsController.settings);
router.get("/delete", sessionController.verificarAutenticacao, settingsController.deleteAccount);


//=====================================================================================================================
//====== SEARCH
router.get("/search", searchController.searchView);
router.post("/search", searchController.search);


//=====================================================================================================================
//====== ADM
router.get("/adm", sessionController.verificarAdm, admController.admView);
router.post("/adm-create-user", sessionController.verificarAdm, admController.admCreateUser);
router.post("/adm-edit-user", sessionController.verificarAdm, admController.admEditUser, admController.admView);
router.post("/adm-delete-user", sessionController.verificarAdm, admController.admDeleteUser, admController.admView);


//=====================================================================================================================
//====== Export
module.exports = router;
