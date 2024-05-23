const express = require('express')
const router  = express.Router()

const authController   = require('../../Controllers/authController')
const errorController  = require('../../Controllers/errorController')
const userController   = require('../../Controllers/userController')
const searchController = require('../../Controllers/searchController')

router.get('/', searchController.search)


//= ===== ROTAS
app.get('/', function (request, response) {
    response.render('search')
})
  
app.get('/signup', function (request, response) {
    response.render('signup')
})
  
app.get('/login', function (request, response) {
    response.render('login')
})
  
app.post('/settings', function (request, response) {
    const user = request.query.user
  
    response.render('settings', { user })
})
  
app.get('/:username', function (request, response) {
    const username = request.params.username
  
    const user = userController.findUserByUsername(username)
  
    // Se não for encontrado um Usuário com o `username` passado pela URL, vai para tela de Busca de Usuário.
    if (!user) {
      const error = Errors.Users.userNotFound
      response.render('search', { error })
      return
    }
  
    response.render('index', { user })
})
  

module.exports = router
