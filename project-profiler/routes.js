const express = require("express");
const router = express.Router();


const mainController = require("./src/Controllers/mainController");
const searchController = require("./src/Controllers/searchController");

const userController = require("./src/Controllers/userController");
const settingsController = require("./src/Controllers/settingsController");

const admController = require("./src/Controllers/admController");
const sessionController = require("./src/Controllers/sessionController");

// const errorController    = require('./Controllers/errorController')


router.get("/", mainController.indexView);

router.get("/signup", userController.signupView);
router.post("/signup", userController.createUser);

router.get("/settings", sessionController.verificarAutenticacao, settingsController.settingsView);
router.post("/settings", sessionController.verificarAutenticacao, settingsController.settings);

router.get("/login", userController.loginView);
router.post("/login", sessionController.autenticar, mainController.indexView);

router.get("/logout", sessionController.logout);

router.get("/search", searchController.searchView);
router.post("/search", searchController.search);

router.get("/adm", sessionController.verificarAdm, admController.admView);


module.exports = router;
