const userRepository = require('../Models/user')


//==== SIGN UP
function signupPage(req, res) {
    res.render('signup')
}

function signup(req, res) {
    /// Create a object with the received Data from the Form POST method. 
    const tempUser = userRepository.createUserObject(req.body)
    
    /// Check if the user is already registered.
    let user = userRepository.findUser(tempUser)

    /// Register the user if not found in the DB.
    if (!user) {
        user = userRepository.registerUser(tempUser)
    }

    /// If the register is succeded.
    if (user) {
        // TODO: Iniciar uma sessão
        res.redirect('/?user=' + user.username)

    } else {
        const fail = 'Não foi possível realizar o cadastro, verifique as informações e tente novamente.'
        res.render('signup', { fail })
    }
}


//==== LOG IN
function loginPage(req, res) {

    res.render('login')
}

function login(req, res) {
    // TODO: Fazer o login
    // TODO: Iniciar a Session
    // res.redirect('/?user=' + req.body.username)


    /// Create a object with the received Data from the Form POST method. 
    const tempEmail = req.body.email
    const tempPassword = req.body.password
    
    /// Check if the user is already registered.
    let user = userRepository.findUser(tempUser)

    /// If found the user.
    if (user) {
        // TODO: Iniciar uma sessão
        res.redirect('/?user=' + user.username)

    } else {
        const fail = 'Não foi possível realizar o cadastro, verifique as informações e tente novamente.'
        res.render('login', { fail })
    }
}


//==== EXPORTING
module.exports = {
    signupPage, signup,
    loginPage, login
}