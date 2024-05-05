class LoginRouter {
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
    }
}

class MissingParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`)
        this.name = 'MissingParamError'
    }
}

class HTTPStatusCode {
    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static internalServer() {
        return {
            statusCode: 500
        }
    }
}


describe('Login Router', () => {
    test('Should return 400 if no email is provided', () => {
        const sut= new LoginRouter()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    
    test('Should return 400 if no password is provided', () => {
        const sut= new LoginRouter()
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    
    test('Should return 500 if no httpRequest is provided', () => {
        const sut= new LoginRouter()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })
    
    test('Should return 500 if httpRequest has no body', () => {
        const sut= new LoginRouter()
        const httpRequest = { }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})