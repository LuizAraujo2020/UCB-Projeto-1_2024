const express = require('express')
const router = express.Router();

const authController     = require('./Controllers/authController')
const mainController     = require('./Controllers/mainController')
const settingsController = require('./Controllers/settingsController')
const searchController   = require('./Controllers/searchController')

// const userController     = require('./Controllers/userController')
// const errorController    = require('./Controllers/errorController')


router.get('/', mainController.index)

router.get('/signup', authController.signupPage)
router.post('/signup', authController.signup)

router.get('/login', authController.loginPage)
router.post('/login', authController.login)

router.get('/settings', settingsController.settingsPage)

router.get('/search', searchController.searchPage)
router.post('/search', searchController.search)

  
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
  

module.exports = router
