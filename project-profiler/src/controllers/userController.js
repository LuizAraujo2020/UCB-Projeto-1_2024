//====== USER MANAGEMENT

const Usuario = require('../Models/User')


// CREATE
function createUser(req) {
  let user = createUserObject(req.body)

  Usuario.create(user).then(() => {
    // res.redirect('/?cadastrar_usuario=true')
    // res.send(data)
    return true
  }).catch((err) => {
    // res.redirect('/?cadastrar_usuario=false')
    // res.status(500).send({ message: err.message })
    throw err
  })

  // user.create(usuario, (err, data) => {
  //   if (err) {
      
  //   } else {
  //   }
  // })
}

// READ
function readUserByID(id) {
  return Usuario.findById(id)
}

function readUserByUsername(username) {
  // return Usuario.findBy
}

function listAllUsers() {
  return Usuario.find()
}

// UPDATE
function updateUser(id, user) {
  return Usuario.findByIdAndUpdate(id, user, { new: true })
}

// DELETE
function deleteUser(id) {
  return Usuario.findByIdAndRemove(id)
}


//====== HELPERS
function createUserObject(body) {
  let usuario = {
    email: body.email,
    senha: body.senha,
    perfil: body.perfil
  }

  return usuario
}


//====== MODULE EXPORTING
module.exports = {
  createUser,
  readUserByID, readUserByUsername, listAllUsers, 
  updateUser,
  deleteUser,
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
