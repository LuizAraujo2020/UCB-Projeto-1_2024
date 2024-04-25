//====== IMPORTAÇÃO DE MÓDULOS / DEPENDÊNCIAS
const express = require('express');
const mustacheExpress = require('mustache-express');

const userController = require('./src/controllers/userController');


const Errors = require('./src/models/error');


//====== CONFIGURAÇÃO INICIAL
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

// Pasta estática para expor arquivos ao html: css, imagens e etc.
app.use(express.static('static'));


//====== ROTAS
app.get('/', function(request, response) {
    response.render('search');
});

app.get('/signup', function(request, response) {
    response.render('signup');
});

app.get('/login', function(request, response) {
    response.render('login');
});

app.post('/settings', function(request, response) {
    let user = request.query.user;

    response.render('settings', { user });
});

app.get('/:username', function(request, response) {
    const username = request.params.username;

    let user = userController.findUserByUsername(username);

    // Se não for encontrado um Usuário com o `username` passado pela URL, vai para tela de Busca de Usuário.
    if (!user) {
        const error = Errors.Users.userNotFound;
        response.render('search', { error });
        return;
    }

    response.render('index', { user });
});


//====== EXECUTAR O SERVIDOR
const PORT = 8080;

app.listen(PORT, function() {
    console.log('Servidor rodando na porta: ' + PORT);
});