const MissingParamError = require('./missing-params-error')
const UnauthorizedError = require('./unauthorized-error')

module.exports = class HTTPStatusCode {
    static ok() {
        return {
            statusCode: 200
        }
    }

    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static unauthorized() {
        return {
            statusCode: 401,
            body: new UnauthorizedError()
        }
    }

    static internalServer() {
        return {
            statusCode: 500
        }
    }
}