//==== MODULES/PACKAGES/IMPORTS/DEPENDENCIES
const express = require('express')
const mustacheExpress = require('mustache-express')

const userController = require('./src/Controllers/userController')
const Errors = require('./src/Models/error')


//==== INITIAL CONFIG
const app = express()

const router = require('./src/routes')

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/src/Views')

// Decode the data that comes from POST method.
app.use(express.urlencoded({ extended: true }))
// Static folder to expose the files to js, html e so on: css, images and etc.
app.use(express.static('Static'))


app.use('/', router)


//==== EXECUTE THE SERVER
const PORT = 8080

app.listen(PORT, function () {
  console.log('Servidor rodando na porta: ' + PORT)
})