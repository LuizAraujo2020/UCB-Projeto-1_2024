//==== MODULES/PACKAGES/IMPORTS/DEPENDENCIES
const express = require('express')
const mustacheExpress = require('mustache-express')
const db = require('./db')

const router = require('./routes')

// const userController = require('./src/Controllers/userController')
// const Errors = require('./src/Models/error')


//==== INITIAL CONFIG
const app = express()

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/src/Views')

// Decode the data that comes from POST method.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folder to expose the files to js, html e so on: css, images and etc.
app.use(express.static(__dirname + "/src/static"));

app.use('/', router)

//==== DATABASE
db.sync(function() {
  console.log('Banco de dados sincronizado com sucesso!')
})


//==== EXECUTE THE SERVER
const PORT = 8080

app.listen(PORT, function () {
  console.log(`🖥️  Servidor rodando na porta: ${PORT}`)
})