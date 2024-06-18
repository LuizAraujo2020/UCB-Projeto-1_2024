const express = require("express");
const router = express.Router();

const mainController = require("./src/controllers/indexController");
const searchController = require("./src/controllers/searchController");

const userController = require("./src/controllers/userController");
const settingsController = require("./src/controllers/settingsController");

const admController = require("./src/controllers/admController");
const sessionController = require("./src/controllers/sessionController");

// const errorController    = require('./Controllers/errorController')

router.get("/", mainController.indexView);
router.get("/edit", sessionController.verificarAutenticacao, mainController.editView);
router.post("/edit", sessionController.verificarAutenticacao, mainController.edit);

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
