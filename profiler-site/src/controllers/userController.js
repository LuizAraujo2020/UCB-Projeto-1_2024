const userDB = require('../models/user');

function findUserByUsername(username) {
    const users = userDB.mockUsers;

    let found;
    
    users.forEach(user => {
        if (user.username == username) {
            found = user;
        }
    });

    return found;
}

module.exports = {
    findUserByUsername
}