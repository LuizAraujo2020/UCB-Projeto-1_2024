// const userRepository = require('../Models/User')

function indexView(req, res) {
    // let userName = req.query.user

    // let user = userRepository.findUser(userName)

    // if (user) {
    //     res.render('index', { user })

    // } else {
        res.render('search')
    // }
}

module.exports = {
    indexView
}