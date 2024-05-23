//==== IMPORTAÇÃO DE MÓDULOS / DEPENDÊNCIAS
const express = require('express')
const mustacheExpress = require('mustache-express')

const userController = require('./src/Controllers/userController')
const Errors = require('./src/Models/error')


//==== CONFIGURAÇÃO INICIAL
const app = express()

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/src/Views')

// Decode dos dados vindos do POST
app.use(express.urlencoded({ extended: true }))
// Pasta estática para expor arquivos ao html: css, imagens e etc.
app.use(express.static('Static'))


//==== ROTAS
const router = require('./src/Utils/Routes/mainRoutes')
app.use('/', router)


//==== EXECUTAR O SERVIDOR
const PORT = 8080

app.listen(PORT, function () {
  console.log('Servidor rodando na porta: ' + PORT)
})