//====== PROFILE MANAGEMENT

const Profile = require('../Models/Profile')


async function findProfile(termo) {
  let found = await Profile.findOne({ where: { usuario: termo } });

  if (!found) {
    found = await Profile.findOne({ where: { email: termo } });
  }

  if (!found) { 
    //TODO: Fazer Custom Error msg
    console.log('Não encontrado!');
    return null 
  }

  return found
}

module.exports = {
    findProfile
}