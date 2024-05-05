const HTTPStatusCode = require('../helpers/http-status-code')

module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase
    }
    
    route(httpRequest) {
        if(!httpRequest || !httpRequest.body) {
            return HTTPStatusCode.internalServer()
        }

        const { email, password } = httpRequest.body

        if(!email) {
            return HTTPStatusCode.badRequest('email')
        }

        if(!password) {
            return HTTPStatusCode.badRequest('password')
        }

        this.authUseCase.auth(email, password)

        return {
            statusCode: 401,
            body: 'Login realizado com sucesso'
        }
    }
}