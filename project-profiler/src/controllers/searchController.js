function searchPage(req, res) {
    //TODO: Fazer toda a lógica

    res.render('search')
}

function search(req, res) {
    /// Get the values from the POST method

    res.render('search')
}

module.exports = {
    searchPage, search
}