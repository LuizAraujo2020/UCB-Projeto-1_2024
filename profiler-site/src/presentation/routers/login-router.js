const HTTPStatusCode = require('../helpers/http-status-code')
const MissingParamError = require('../helpers/missing-params-error')

module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase
    }
    
    async route(httpRequest) {
        try {
            const { email, password } = httpRequest.body
    
            if(!email) {
                return HTTPStatusCode.badRequest(new MissingParamError('email'))
            }
    
            if(!password) {
                return HTTPStatusCode.badRequest(new MissingParamError('password'))
            }
    
           const accessToken = await this.authUseCase.auth(email, password)
    
            if(!accessToken) {
                return HTTPStatusCode.unauthorized()
            }
            
            return HTTPStatusCode.ok({ accessToken })
        } catch (error) {
            return HTTPStatusCode.internalServer()
        }
    }
}