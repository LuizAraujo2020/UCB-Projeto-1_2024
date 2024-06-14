const express = require("express");
const router = express.Router();

// const authController     = require('./src/Controllers/authController')
const mainController = require("./src/Controllers/mainController");
const searchController = require("./src/Controllers/searchController");

const userController = require("./src/Controllers/userController");
const settingsController = require("./src/Controllers/settingsController");
// const errorController    = require('./Controllers/errorController')

const admController = require("./src/Controllers/admController");
const sessionController = require("./src/Controllers/sessionController");


router.get("/", mainController.indexView);

router.get("/signup", userController.signupView);
router.post("/signup", userController.createUser);

router.get("/settings", sessionController.verificarAutenticacao, settingsController.settingsView);

router.get("/login", userController.loginView);
router.post("/login", sessionController.autenticar, mainController.indexView);

router.get("/logout", sessionController.logout);

router.get("/search", searchController.searchView);
router.post("/search", searchController.search);

router.get("/adm", sessionController.verificarAdmAutenticacao, admController.admView);

// app.get('/signup', function (request, response) {
//     response.render('signup')
// })

// app.get('/login', function (request, response) {
//     response.render('login')
// })

// app.post('/settings', function (request, response) {
//     const user = request.query.user

//     response.render('settings', { user })
// })

// app.get('/:username', function (request, response) {
//     const username = request.params.username

//     const user = userController.findUserByUsername(username)

//     // Se não for encontrado um Usuário com o `username` passado pela URL, vai para tela de Busca de Usuário.
//     if (!user) {
//       const error = Errors.Users.userNotFound
//       response.render('search', { error })
//       return
//     }

//     response.render('index', { user })
// })

module.exports = router;
