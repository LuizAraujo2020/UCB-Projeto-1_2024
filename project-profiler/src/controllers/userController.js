//====== USER MANAGEMENT

const User = require('../Models/user')


//====== VIEWS
function signupView(req, res) {
  res.render('signup')
}

function loginView(req, res) {
  res.render('login')
}


//====== USER CRUD

// CREATE
function createUser(req, res) {
  /// Helper that reates an Object from the request body .
  let user = createUserObject(req.body)

  /// Validations
  const fail = validateSignup(user.senha, user.confirmarSenha)
  if (fail) { res.render('signup', { fail }) }

  User.create(user).then(() => {
    res.redirect(`/?user=` + user.email)

  }).catch((err) => {
      let fail = 'Error: ' + err.errors.map(e => e.message)
      res.render('signup', { fail })
  })
}

// // READ
// function readUserByID(id) {
//   return Usuario.findById(id)
// }

// function readUserByUsername(username) {
//   // return Usuario.findBy
// }

// function listAllUsers() {
//   return Usuario.find()
// }

// // UPDATE
// function updateUser(id, user) {
//   return Usuario.findByIdAndUpdate(id, user, { new: true })
// }

// // DELETE
// function deleteUser(id) {
//   return Usuario.findByIdAndRemove(id)
// }


//====== VALIDATIONS
/// Validates the entries in the Signup journey.
function validateSignup(senha, confirmarSenha) {
  let fail

  if (senha !== confirmarSenha) { 
    fail = 'Senha e Confirmar Senha devem ser iguais.' 
  }

  // TODO: Adicionar mais validações ao `fail` com \n pra ficar um erro em cada linha.

  return fail
}

//====== HELPERS
function createUserObject(body) {
  let usuario = {
    usuario: body.email,
    email: body.email,
    senha: body.senha,
    confirmarSenha: body.confirmarSenha
  }

  return usuario
}


//====== MODULE EXPORTING
module.exports = {
  signupView, loginView,
  createUser,
  // readUserByID, readUserByUsername, listAllUsers, 
  // updateUser,
  // deleteUser,
  createUserObject
}


// function findUserByUsername (username) {
//   const users = userDB.mockUsers

//   let found

//   users.forEach(user => {
//     if (user.username == username) {
//       found = user
//     }
//   })

//   return found
// }

// //====== VIEWS
// function indexView(req, res) {
//   res.render('index.html')
// }

// function indexView(req, res) {
//   res.render('index.html')
// }


// module.exports = {
  // indexView
// }
