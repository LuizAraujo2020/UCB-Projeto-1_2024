const HTTPStatusCode = require('../helpers/http-status-code')

module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase
    }
    
    route(httpRequest) {
        if(!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
            return HTTPStatusCode.internalServer()
        }

        const { email, password } = httpRequest.body

        if(!email) {
            return HTTPStatusCode.badRequest('email')
        }

        if(!password) {
            return HTTPStatusCode.badRequest('password')
        }

       const accessToken = this.authUseCase.auth(email, password)

        if(!accessToken) {
            return HTTPStatusCode.unauthorized()
        }
        
        return HTTPStatusCode.ok({ accessToken })
    }
}