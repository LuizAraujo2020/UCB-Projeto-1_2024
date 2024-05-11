const HTTPStatusCode = require('../helpers/http-status-code')
const { MissingParamError, InvalidParamError } = require('../errors')

module.exports = class LoginRouter {
    constructor(authUseCase, emailValidator) {
        this.authUseCase = authUseCase
        this.emailValidator = emailValidator
    }
    
    async route(httpRequest) {
        
        try {
            const { email, password } = httpRequest.body
    
            if(!email) {
                return HTTPStatusCode.badRequest(new MissingParamError('email'))
            }

            console.log(this.emailValidator.isValid(email))
            if(!this.emailValidator.isValid(email)) {
                return HTTPStatusCode.badRequest(new InvalidParamError('email'))
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