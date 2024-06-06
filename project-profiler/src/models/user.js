const mockUsers = [
  {
    username: 'fulanadetal',
    name: 'Fulana',
    surname: 'de Tal',
    email: 'fulana_tal@email.com',
    password: 'any_password'
  },
  {
    username: 'fulanodetal',
    name: 'Fulano',
    surname: 'de Tal',
    email: 'fulano_tal2@email.com',
    password: 'any_password'
  },
  {
    username: 'abrilinasantos',
    name: 'Abrilina',
    surname: 'Santos',
    email: 'abrilina@email.com',
    password: 'any_password'
  }
]

function createUserObject(body) {
  return {
    username: body.username,
    name: body.name,
    surname: body.surname,
    email: body.email,
    password: body.password
  }
}

function registerUser(tempUser) {
  mockUsers.push(tempUser)
  return tempUser
}

function findUser(tempUser) {
  return mockUsers.find(user => user.username === tempUser.username || user.email === tempUser.email)
}

function deleteUser(tempUser) {
  mockUsers.pop(tempUser)
  return tempUser
}

module.exports = {
  mockUsers,
  createUserObject, registerUser, findUser, deleteUser
}
